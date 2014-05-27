/**
 * BootstrapValidator (http://bootstrapvalidator.com)
 *
 * The best jQuery plugin to validate form fields. Designed to use with Bootstrap 3
 *
 * @author      http://twitter.com/nghuuphuoc
 * @copyright   (c) 2013 - 2014 Nguyen Huu Phuoc
 * @license     MIT
 */

(function($) {
    var BootstrapValidator = function(form, options) {
        this.$form   = $(form);
        this.options = $.extend({}, BootstrapValidator.DEFAULT_OPTIONS, options);

        this.$invalidFields = $([]);    // Array of invalid fields
        this.$submitButton  = null;     // The submit button which is clicked to submit form

        // Validating status
        this.STATUS_NOT_VALIDATED = 'NOT_VALIDATED';
        this.STATUS_VALIDATING    = 'VALIDATING';
        this.STATUS_INVALID       = 'INVALID';
        this.STATUS_VALID         = 'VALID';

        // Determine the event that is fired when user change the field value
        // Most modern browsers supports input event except IE 7, 8.
        // IE 9 supports input event but the event is still not fired if I press the backspace key.
        // Get IE version
        // https://gist.github.com/padolsey/527683/#comment-7595
        var ieVersion = (function() {
            var v = 3, div = document.createElement('div'), a = div.all || [];
            while (div.innerHTML = '<!--[if gt IE '+(++v)+']><br><![endif]-->', a[0]);
            return v > 4 ? v : !v;
        }());

        var el = document.createElement('div');
        this._changeEvent = (ieVersion === 9 || !('oninput' in el)) ? 'keyup' : 'input';

        // The flag to indicate that the form is ready to submit when a remote/callback validator returns
        this._submitIfValid = null;

        // Field elements
        this._cacheFields = {};

        this._init();
    };

    // The default options
    BootstrapValidator.DEFAULT_OPTIONS = {
        // The form CSS class
        elementClass: 'bv-form',

        // Default invalid message
        message: 'This value is not valid',

        // The error messages container
        // It can be:
        // * 'tooltip' if you want to use Bootstrap tooltip to show error messages
        // * 'popover' if you want to use Bootstrap popover to show error messages
        // * a CSS selector indicating the container
        //
        // In the first two cases, since the tooltip/popover should be small enough, the plugin only shows only one error message
        // You also can define the message container for particular field
        container: null,

        // The field will not be live validated if its length is less than this number of characters
        threshold: null,

        // Indicate fields which won't be validated
        // By default, the plugin will not validate the following kind of fields:
        // - disabled
        // - hidden
        // - invisible
        //
        // The setting consists of jQuery filters. Accept 3 formats:
        // - A string. Use a comma to separate filter
        // - An array. Each element is a filter
        // - An array. Each element can be a callback function
        //      function($field, validator) {
        //          $field is jQuery object representing the field element
        //          validator is the BootstrapValidator instance
        //          return true or false;
        //      }
        //
        // The 3 following settings are equivalent:
        //
        // 1) ':disabled, :hidden, :not(:visible)'
        // 2) [':disabled', ':hidden', ':not(:visible)']
        // 3) [':disabled', ':hidden', function($field) {
        //        return !$field.is(':visible');
        //    }]
        excluded: [':disabled', ':hidden', ':not(:visible)'],

        // Shows ok/error/loading icons based on the field validity.
        // This feature requires Bootstrap v3.1.0 or later (http://getbootstrap.com/css/#forms-control-validation).
        // Since Bootstrap doesn't provide any methods to know its version, this option cannot be on/off automatically.
        // In other word, to use this feature you have to upgrade your Bootstrap to v3.1.0 or later.
        //
        // Examples:
        // - Use Glyphicons icons:
        //  feedbackIcons: {
        //      valid: 'glyphicon glyphicon-ok',
        //      invalid: 'glyphicon glyphicon-remove',
        //      validating: 'glyphicon glyphicon-refresh'
        //  }
        // - Use FontAwesome icons:
        //  feedbackIcons: {
        //      valid: 'fa fa-check',
        //      invalid: 'fa fa-times',
        //      validating: 'fa fa-refresh'
        //  }
        feedbackIcons: {
            valid:      null,
            invalid:    null,
            validating: null
        },

        // The submit buttons selector
        // These buttons will be disabled to prevent the valid form from multiple submissions
        submitButtons: '[type="submit"]',

        // The custom submit handler
        // It will prevent the form from the default submission
        //
        //  submitHandler: function(validator, form) {
        //      - validator is the BootstrapValidator instance
        //      - form is the jQuery object present the current form
        //  }
        submitHandler: null,

        // Live validating option
        // Can be one of 3 values:
        // - enabled: The plugin validates fields as soon as they are changed
        // - disabled: Disable the live validating. The error messages are only shown after the form is submitted
        // - submitted: The live validating is enabled after the form is submitted
        live: 'enabled',

        // Map the field name with validator rules
        fields: null
    };

    BootstrapValidator.prototype = {
        constructor: BootstrapValidator,

        /**
         * Init form
         */
        _init: function() {
            var that    = this,
                options = {
                    excluded:       this.$form.attr('data-bv-excluded'),
                    trigger:        this.$form.attr('data-bv-trigger'),
                    message:        this.$form.attr('data-bv-message'),
                    container:      this.$form.attr('data-bv-container'),
                    submitButtons:  this.$form.attr('data-bv-submitbuttons'),
                    threshold:      this.$form.attr('data-bv-threshold'),
                    live:           this.$form.attr('data-bv-live'),
                    fields:         {},
                    feedbackIcons: {
                        valid:      this.$form.attr('data-bv-feedbackicons-valid'),
                        invalid:    this.$form.attr('data-bv-feedbackicons-invalid'),
                        validating: this.$form.attr('data-bv-feedbackicons-validating')
                    }
                },
                validator,
                v,          // Validator name
                enabled,
                optionName,
                optionValue,
                html5AttrName,
                html5Attrs;

            this.$form
                // Disable client side validation in HTML 5
                .attr('novalidate', 'novalidate')
                .addClass(this.options.elementClass)
                // Disable the default submission first
                .on('submit.bv', function(e) {
                    e.preventDefault();
                    that.validate();
                })
                .on('click.bv', this.options.submitButtons, function() {
                    that.$submitButton  = $(this);
					// The user just click the submit button
					that._submitIfValid = true;
                })
                // Find all fields which have either "name" or "data-bv-field" attribute
                .find('[name], [data-bv-field]')
                    .each(function() {
                        var $field = $(this);
                        if (that._isExcluded($field)) {
                            return;
                        }

                        var field      = $field.attr('name') || $field.attr('data-bv-field'),
                            validators = {};
                        for (v in $.fn.bootstrapValidator.validators) {
                            validator  = $.fn.bootstrapValidator.validators[v];
                            enabled    = $field.attr('data-bv-' + v.toLowerCase()) + '';
                            html5Attrs = ('function' == typeof validator.enableByHtml5) ? validator.enableByHtml5($(this)) : null;

                            if ((html5Attrs && enabled != 'false')
                                || (html5Attrs !== true && ('' == enabled || 'true' == enabled)))
                            {
                                // Try to parse the options via attributes
                                validator.html5Attributes = validator.html5Attributes || { message: 'message' };
                                validators[v] = $.extend({}, html5Attrs == true ? {} : html5Attrs, validators[v]);

                                for (html5AttrName in validator.html5Attributes) {
                                    optionName  = validator.html5Attributes[html5AttrName];
                                    optionValue = $field.attr('data-bv-' + v.toLowerCase() + '-' + html5AttrName);
                                    if (optionValue) {
                                        if ('true' == optionValue) {
                                            optionValue = true;
                                        } else if ('false' == optionValue) {
                                            optionValue = false;
                                        }
                                        validators[v][optionName] = optionValue;
                                    }
                                }
                            }
                        }

                        var opts = {
                                feedbackIcons: $field.attr('data-bv-feedbackicons'),
                                trigger:       $field.attr('data-bv-trigger'),
                                message:       $field.attr('data-bv-message'),
                                container:     $field.attr('data-bv-container'),
                                selector:      $field.attr('data-bv-selector'),
                                threshold:     $field.attr('data-bv-threshold')
                            },
                            emptyOptions    = $.isEmptyObject(opts),        // Check if the field options are set using HTML attributes
                            emptyValidators = $.isEmptyObject(validators);  // Check if the field validators are set using HTML attributes

                        if (!emptyValidators || (!emptyOptions && that.options.fields[field])) {
                            opts.validators = validators;
                            $field.attr('data-bv-field', field);
                            options.fields[field] = $.extend({}, opts, options.fields[field]);
                        }
                    });

            this.options = $.extend(true, this.options, options);
            for (var field in this.options.fields) {
                this._initField(field);
            }
        },

        /**
         * Init field
         *
         * @param {String} field The field name
         */
        _initField: function(field) {
            if (this.options.fields[field] == null || this.options.fields[field].validators == null) {
                return;
            }

            var fields = this.getFieldElements(field);

            // We don't need to validate non-existing fields
            if (fields == []) {
                delete this.options.fields[field];
                return;
            }
            for (var validatorName in this.options.fields[field].validators) {
                if (!$.fn.bootstrapValidator.validators[validatorName]) {
                    delete this.options.fields[field].validators[validatorName];
                }
            }
            if (this.options.fields[field]['enabled'] == null) {
                this.options.fields[field]['enabled'] = true;
            }

            for (var i = 0; i < fields.length; i++) {
                this._initFieldElement($(fields[i]));
            }
        },

        /**
         * Init field element
         *
         * @param {jQuery} $field The field element
         */
        _initFieldElement: function($field) {
            var that      = this,
                field     = $field.attr('name') || $field.attr('data-bv-field'),
                fields    = this.getFieldElements(field),
                index     = fields.index($field),
                type      = $field.attr('type'),
                total     = fields.length,
                updateAll = (total == 1) || ('radio' == type) || ('checkbox' == type),
                $parent   = $field.parents('.form-group'),
                // Allow user to indicate where the error messages are shown
                container = this.options.fields[field].container || this.options.container,
                $message  = (container && container != 'tooltip' && container != 'popover') ? $(container) : this._getMessageContainer($field);

            if (container && container != 'tooltip' && container != 'popover') {
                $message.addClass('has-error');
            }

            // Remove all error messages and feedback icons
            $message.find('.help-block[data-bv-validator][data-bv-for="' + field + '"]').remove();
            $parent.find('i[data-bv-icon-for="' + field + '"]').remove();

            // Set the attribute to indicate the fields which are defined by selector
            if (!$field.attr('data-bv-field')) {
                $field.attr('data-bv-field', field);
            }

            // Whenever the user change the field value, mark it as not validated yet
            var event = ('radio' == type || 'checkbox' == type || 'file' == type || 'SELECT' == $field.get(0).tagName) ? 'change' : this._changeEvent;
            $field.off(event + '.update.bv').on(event + '.update.bv', function() {
                // Reset the flag
                that._submitIfValid = false;
                that.updateElementStatus($(this), that.STATUS_NOT_VALIDATED);
            });

            // Create help block elements for showing the error messages
            $field.data('bv.messages', $message);
            for (var validatorName in this.options.fields[field].validators) {
                $field.data('bv.result.' + validatorName, this.STATUS_NOT_VALIDATED);

                if (!updateAll || index == total - 1) {
                    $('<small/>')
                        .css('display', 'none')
                        .addClass('help-block')
                        .attr('data-bv-validator', validatorName)
                        .attr('data-bv-for', field)
                        .html(this.options.fields[field].validators[validatorName].message || this.options.fields[field].message || this.options.message)
                        .appendTo($message);
                }
            }

            // Prepare the feedback icons
            // Available from Bootstrap 3.1 (http://getbootstrap.com/css/#forms-control-validation)
            if (this.options.fields[field].feedbackIcons !== false && this.options.fields[field].feedbackIcons !== 'false'
                && this.options.feedbackIcons
                && this.options.feedbackIcons.validating && this.options.feedbackIcons.invalid && this.options.feedbackIcons.valid
                && (!updateAll || index == total - 1))
            {
                $parent.removeClass('has-success').removeClass('has-error').addClass('has-feedback');
                var $icon = $('<i/>').css('display', 'none').addClass('form-control-feedback').attr('data-bv-icon-for', field).insertAfter($field);
                // The feedback icon does not render correctly if there is no label
                // https://github.com/twbs/bootstrap/issues/12873
                if ($parent.find('label').length == 0) {
                    $icon.css('top', 0);
                }
                // Fix feedback icons in input-group
	            if ($parent.find('.input-group-addon').length != 0) {
	                $icon.css({
                        'top': 0,
                        'z-index': 100
                    });
	            }
            }

            // Set live mode
            var trigger = this.options.fields[field].trigger || this.options.trigger || event,
                events  = $.map(trigger.split(' '), function(item) {
                    return item + '.live.bv';
                }).join(' ');
            switch (this.options.live) {
                case 'submitted':
                    break;
                case 'disabled':
                    $field.off(events);
                    break;
                case 'enabled':
                default:
                    $field.off(events).on(events, function() {
                        that.validateFieldElement($(this));
                    });
                    break;
            }
        },

        /**
         * Get the element to place the error messages
         *
         * @param {jQuery} $field The field element
         * @returns {jQuery}
         */
        _getMessageContainer: function($field) {
            var $parent = $field.parent();
            if ($parent.hasClass('form-group')) {
                return $parent;
            }

            var cssClasses = $parent.attr('class');
            if (!cssClasses) {
                return this._getMessageContainer($parent);
            }

            cssClasses = cssClasses.split(' ');
            var n = cssClasses.length;
            for (var i = 0; i < n; i++) {
                if (/^col-(xs|sm|md|lg)-\d+$/.test(cssClasses[i]) || /^col-(xs|sm|md|lg)-offset-\d+$/.test(cssClasses[i])) {
                    return $parent;
                }
            }

            return this._getMessageContainer($parent);
        },

        /**
         * Called when all validations are completed
         */
        _submit: function() {
            var isValid   = this.isValid(),
                eventType = isValid ? 'success.form.bv' : 'error.form.bv',
                e         = $.Event(eventType);

            this.$form.trigger(e);

            // Call default handler
            // Check if whether the submit button is clicked
            if (this.$submitButton) {
                isValid ? this._onSuccess(e) : this._onError(e);
            }
        },

        /**
         * Check if the field is excluded.
         * Returning true means that the field will not be validated
         *
         * @param {jQuery} $field The field element
         * @returns {Boolean}
         */
        _isExcluded: function($field) {
            if (this.options.excluded) {
                // Convert to array first
                if ('string' == typeof this.options.excluded) {
                    this.options.excluded = $.map(this.options.excluded.split(','), function(item) {
                        // Trim the spaces
                        return $.trim(item);
                    });
                }

                var length = this.options.excluded.length;
                for (var i = 0; i < length; i++) {
                    if (('string' == typeof this.options.excluded[i] && $field.is(this.options.excluded[i]))
                        || ('function' == typeof this.options.excluded[i] && this.options.excluded[i].call(this, $field, this) == true))
                    {
                        return true;
                    }
                }
            }

            return false;
        },
        
        // --- Events ---

        /**
         * The default handler of error.form.bv event.
         * It will be called when there is a invalid field
         *
         * @param {jQuery.Event} e The jQuery event object
         */
        _onError: function(e) {
            if (e.isDefaultPrevented()) {
                return;
            }

            if ('submitted' == this.options.live) {
                // Enable live mode
                this.options.live = 'enabled';
                var that = this;
                for (var field in this.options.fields) {
                    (function(f) {
                        var fields  = that.getFieldElements(f);
                        if (fields.length) {
                            var type    = $(fields[0]).attr('type'),
                                event   = ('radio' == type || 'checkbox' == type || 'file' == type || 'SELECT' == $(fields[0]).get(0).tagName) ? 'change' : that._changeEvent,
                                trigger = that.options.fields[field].trigger || that.options.trigger || event,
                                events  = $.map(trigger.split(' '), function(item) {
                                    return item + '.live.bv';
                                }).join(' ');

                            for (var i = 0; i < fields.length; i++) {
                                $(fields[i]).off(events).on(events, function() {
                                    that.validateFieldElement($(this));
                                });
                            }
                        }
                    })(field);
                }
            }

            // Focus to the first invalid field
            var $firstInvalidField = this.$invalidFields.eq(0);
            if ($firstInvalidField) {
                // Activate the tab containing the invalid field if exists
                var $tab = $firstInvalidField.parents('.tab-pane'),
                    tabId;
                if ($tab && (tabId = $tab.attr('id'))) {
                    $('a[href="#' + tabId + '"][data-toggle="tab"]').trigger('click.bs.tab.data-api');
                }

                $firstInvalidField.focus();
            }
        },

        /**
         * The default handler of success.form.bv event.
         * It will be called when all the fields are valid
         *
         * @param {jQuery.Event} e The jQuery event object
         */
        _onSuccess: function(e) {
            if (e.isDefaultPrevented()) {
                return;
            }

            // Call the custom submission if enabled
            if (this.options.submitHandler && 'function' == typeof this.options.submitHandler) {
                // If you want to submit the form inside your submit handler, please call defaultSubmit() method
                this.options.submitHandler.call(this, this, this.$form, this.$submitButton);
            } else {
                this.disableSubmitButtons(true).defaultSubmit();
            }
        },

        /**
         * Called after validating a field element
         *
         * @param {jQuery} $field The field element
         */
        _onValidateFieldCompleted: function($field) {
            var field         = $field.attr('data-bv-field'),
                validators    = this.options.fields[field].validators,
                counter       = {},
                numValidators = 0;

            counter[this.STATUS_NOT_VALIDATED] = 0;
            counter[this.STATUS_VALIDATING]    = 0;
            counter[this.STATUS_INVALID]       = 0;
            counter[this.STATUS_VALID]         = 0;

            for (var validatorName in validators) {
                numValidators++;
                var result = $field.data('bv.result.' + validatorName);
                if (result) {
                    counter[result]++;
                }
            }

            var index = this.$invalidFields.index($field);
            if (counter[this.STATUS_VALID] == numValidators) {
                // Remove from the list of invalid fields
                if (index != -1) {
                    this.$invalidFields.splice(index, 1);
                }
                this.$form.trigger($.Event('success.field.bv'), [field, $field]);
            }
            // If all validators are completed and there is at least one validator which doesn't pass
            else if (counter[this.STATUS_NOT_VALIDATED] == 0 && counter[this.STATUS_VALIDATING] == 0 && counter[this.STATUS_INVALID] > 0) {
                // Add to the list of invalid fields
                if (index == -1) {
                    this.$invalidFields = this.$invalidFields.add($field);
                }
                this.$form.trigger($.Event('error.field.bv'), [field, $field]);
            }
        },

        // --- Public methods ---

        /**
         * Retrieve the field elements by given name
         *
         * @param {String} field The field name
         * @returns {null|jQuery[]}
         */
        getFieldElements: function(field) {
            if (!this._cacheFields[field]) {
                this._cacheFields[field] = this.options.fields[field].selector
                                         ? $(this.options.fields[field].selector)
                                         : this.$form.find('[name="' + field + '"]');
            }

            return this._cacheFields[field];
        },

        /**
         * Disable/enable submit buttons
         *
         * @param {Boolean} disabled Can be true or false
         * @returns {BootstrapValidator}
         */
        disableSubmitButtons: function(disabled) {
            if (!disabled) {
                this.$form.find(this.options.submitButtons).removeAttr('disabled');
            } else if (this.options.live != 'disabled') {
                // Don't disable if the live validating mode is disabled
                this.$form.find(this.options.submitButtons).attr('disabled', 'disabled');
            }

            return this;
        },

        /**
         * Validate the form
         *
         * @returns {BootstrapValidator}
         */
        validate: function() {
            if (!this.options.fields) {
                return this;
            }
            this.disableSubmitButtons(true);

            for (var field in this.options.fields) {
                this.validateField(field);
            }

            this._submit();

            return this;
        },

        /**
         * Validate given field
         *
         * @param {String} field The field name
         * @returns {BootstrapValidator}
         */
        validateField: function(field) {
            var fields = this.getFieldElements(field),
                type   = fields.attr('type'),
                n      = (('radio' == type) || ('checkbox' == type)) ? 1 : fields.length;

            for (var i = 0; i < n; i++) {
                this.validateFieldElement($(fields[i]));
            }

            return this;
        },

        /**
         * Validate field element
         *
         * @param {jQuery} $field The field element
         * @returns {BootstrapValidator}
         */
        validateFieldElement: function($field) {
            var that       = this,
                field      = $field.attr('data-bv-field'),
                fields     = this.getFieldElements(field),
                type       = $field.attr('type'),
                updateAll  = (fields && fields.length == 1) || ('radio' == type) || ('checkbox' == type),
                validators = this.options.fields[field].validators,
                validatorName,
                validateResult;

            if (!this.options.fields[field]['enabled'] || this._isExcluded($field)) {
                return this;
            }

            for (validatorName in validators) {
                if ($field.data('bv.dfs.' + validatorName)) {
                    $field.data('bv.dfs.' + validatorName).reject();
                }

                // Don't validate field if it is already done
                var result = $field.data('bv.result.' + validatorName);
                if (result == this.STATUS_VALID || result == this.STATUS_INVALID) {
                    this._onValidateFieldCompleted($field);
                    continue;
                }

                $field.data('bv.result.' + validatorName, this.STATUS_VALIDATING);
                validateResult = $.fn.bootstrapValidator.validators[validatorName].validate(this, $field, validators[validatorName]);

                // validateResult can be a $.Deferred object ...
                if ('object' == typeof validateResult) {
                    updateAll ? this.updateStatus(field, this.STATUS_VALIDATING, validatorName)
                              : this.updateElementStatus($field, this.STATUS_VALIDATING, validatorName);
                    $field.data('bv.dfs.' + validatorName, validateResult);

                    validateResult.done(function($f, v, isValid, message) {
                        // v is validator name
                        $f.removeData('bv.dfs.' + v);
                        if (message) {
                            // Update the error message
                            $field.data('bv.messages').find('.help-block[data-bv-validator="' + v + '"][data-bv-for="' + $f.attr('data-bv-field') + '"]').html(message);
                        }

                        updateAll ? that.updateStatus($f.attr('data-bv-field'), isValid ? that.STATUS_VALID : that.STATUS_INVALID, v)
                                  : that.updateElementStatus($f, isValid ? that.STATUS_VALID : that.STATUS_INVALID, v);

                        if (isValid && that._submitIfValid == true) {
						    // If a remote validator returns true and the form is ready to submit, then do it
							that._submit();
						}
                    });
                }
                // ... or a boolean value
                else if ('boolean' == typeof validateResult) {
                    updateAll ? this.updateStatus(field, validateResult ? this.STATUS_VALID : this.STATUS_INVALID, validatorName)
                              : this.updateElementStatus($field, validateResult ? this.STATUS_VALID : this.STATUS_INVALID, validatorName);
                }
            }

            return this;
        },

        /**
         * Update all validating results of elements which have the same field name
         *
         * @param {String} field The field name
         * @param {String} status The status. Can be 'NOT_VALIDATED', 'VALIDATING', 'INVALID' or 'VALID'
         * @param {String} [validatorName] The validator name. If null, the method updates validity result for all validators
         * @returns {BootstrapValidator}
         */
        updateStatus: function(field, status, validatorName) {
            var fields = this.getFieldElements(field),
                type   = fields.attr('type'),
                n      = (('radio' == type) || ('checkbox' == type)) ? 1 : fields.length;

            for (var i = 0; i < n; i++) {
                this.updateElementStatus($(fields[i]), status, validatorName);
            }

            return this;
        },

        /**
         * Update validating result of given element
         *
         * @param {jQuery} $field The field element
         * @param {String} status The status. Can be 'NOT_VALIDATED', 'VALIDATING', 'INVALID' or 'VALID'
         * @param {String} [validatorName] The validator name. If null, the method updates validity result for all validators
         * @returns {BootstrapValidator}
         */
        updateElementStatus: function($field, status, validatorName) {
            var that         = this,
                field        = $field.attr('data-bv-field'),
                $parent      = $field.parents('.form-group'),
                $message     = $field.data('bv.messages'),
                $allErrors   = $message.find('.help-block[data-bv-validator][data-bv-for="' + field + '"]'),
                $errors      = validatorName ? $allErrors.filter('[data-bv-validator="' + validatorName + '"]') : $allErrors,
                $icon        = $parent.find('.form-control-feedback[data-bv-icon-for="' + field + '"]'),
                container    = this.options.fields[field].container || this.options.container,
                isValidField = null;

            // Update status
            if (validatorName) {
                $field.data('bv.result.' + validatorName, status);
            } else {
                for (var v in this.options.fields[field].validators) {
                    $field.data('bv.result.' + v, status);
                }
            }

            // Determine the tab containing the element
            var $tabPane = $field.parents('.tab-pane'),
                tabId,
                $tab;
            if ($tabPane && (tabId = $tabPane.attr('id'))) {
                $tab = $('a[href="#' + tabId + '"][data-toggle="tab"]').parent();
            }

            // Show/hide error elements and feedback icons
            $errors.attr('data-bv-result', status);
            switch (status) {
                case this.STATUS_VALIDATING:
                    isValidField = null;
                    this.disableSubmitButtons(true);
                    $parent.removeClass('has-success').removeClass('has-error');
                    if ($icon) {
                        $icon.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.invalid).addClass(this.options.feedbackIcons.validating).show();
                    }
                    if ($tab) {
                        $tab.removeClass('bv-tab-success').removeClass('bv-tab-error');
                    }
                    break;

                case this.STATUS_INVALID:
                    isValidField = false;
                    this.disableSubmitButtons(true);
                    $parent.removeClass('has-success').addClass('has-error');
                    if ($icon) {
                        $icon.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.validating).addClass(this.options.feedbackIcons.invalid).show();
                    }
                    if ($tab) {
                        $tab.removeClass('bv-tab-success').addClass('bv-tab-error');
                    }
                    break;

                case this.STATUS_VALID:
                    // If the field is valid (passes all validators)
                    isValidField = $allErrors.filter(function() {
                                        var v = $(this).attr('data-bv-validator');
                                        return $field.data('bv.result.' + v) != that.STATUS_VALID;
                                    }).length == 0;
                    this.disableSubmitButtons(this.isValid() ? false : true);
                    if ($icon) {
                        $icon
                            .removeClass(this.options.feedbackIcons.invalid).removeClass(this.options.feedbackIcons.validating).removeClass(this.options.feedbackIcons.valid)
                            .addClass(isValidField ? this.options.feedbackIcons.valid : this.options.feedbackIcons.invalid)
                            .show();
                    }

                    // Check if all elements in given container are valid
                    var isValidContainer = function($container) {
                        var map = {};
                        $container.find('[data-bv-field]').each(function() {
                            var field = $(this).attr('data-bv-field');
                            if (!map[field]) {
                                map[field] = $(this);
                            }
                        });

                        for (var field in map) {
                            var $f = map[field];
                            if ($f.data('bv.messages')
                                  .find('.help-block[data-bv-validator][data-bv-for="' + field + '"]')
                                  .filter(function() {
                                      var v = $(this).attr('data-bv-validator');
                                      return ($f.data('bv.result.' + v) && $f.data('bv.result.' + v) != that.STATUS_VALID);
                                  })
                                  .length != 0)
                            {
                                // The field is not valid
                                return false;
                            }
                        }

                        return true;
                    };

                    $parent.removeClass('has-error has-success').addClass(isValidContainer($parent) ? 'has-success' : 'has-error');
                    if ($tab) {
                        $tab.removeClass('bv-tab-success').removeClass('bv-tab-error').addClass(isValidContainer($tabPane) ? 'bv-tab-success' : 'bv-tab-error');
                    }
                    break;

                case this.STATUS_NOT_VALIDATED:
                default:
                    isValidField = null;
                    this.disableSubmitButtons(false);
                    $parent.removeClass('has-success').removeClass('has-error');
                    if ($icon) {
                        $icon.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.invalid).removeClass(this.options.feedbackIcons.validating).hide();
                    }
                    if ($tab) {
                        $tab.removeClass('bv-tab-success').removeClass('bv-tab-error');
                    }
                    break;
            }

            switch (true) {
                // Only show the first error message if it is placed inside a tooltip ...
                case ($icon && 'tooltip' == container):
                    (isValidField === false)
                            ? $icon.css('cursor', 'pointer').tooltip('destroy').tooltip({
                                html: true,
                                placement: 'top',
                                title: $allErrors.filter('[data-bv-result="' + that.STATUS_INVALID + '"]').eq(0).html()
                            })
                            : $icon.css('cursor', '').tooltip('destroy');
                    break;
                // ... or popover
                case ($icon && 'popover' == container):
                    (isValidField === false)
                            ? $icon.css('cursor', 'pointer').popover('destroy').popover({
                                content: $allErrors.filter('[data-bv-result="' + that.STATUS_INVALID + '"]').eq(0).html(),
                                html: true,
                                placement: 'top',
                                trigger: 'hover click'
                            })
                            : $icon.css('cursor', '').popover('destroy');
                    break;
                default:
                    (status == this.STATUS_INVALID) ? $errors.show() : $errors.hide();
                    break;
            }

            // Trigger the "status.field.bv" event
            this.$form.trigger($.Event('status.field.bv'), [field, $field, status]);

            this._onValidateFieldCompleted($field);

            return this;
        },

        /**
         * Check the form validity
         *
         * @returns {Boolean}
         */
        isValid: function() {
            var fields, field, $field,
                type, status, validatorName,
                n, i;
            for (field in this.options.fields) {
                if (this.options.fields[field] == null || !this.options.fields[field]['enabled']) {
                    continue;
                }

                fields = this.getFieldElements(field);
                type   = fields.attr('type');
                n      = (('radio' == type) || ('checkbox' == type)) ? 1 : fields.length;

                for (i = 0; i < n; i++) {
                    $field = $(fields[i]);
                    if (this._isExcluded($field)) {
                        continue;
                    }

                    for (validatorName in this.options.fields[field].validators) {
                        status = $field.data('bv.result.' + validatorName);
                        if (status != this.STATUS_VALID) {
                            return false;
                        }
                    }
                }
            }

            return true;
        },

        /**
         * Submit the form using default submission.
         * It also does not perform any validations when submitting the form
         *
         * It might be used when you want to submit the form right inside the submitHandler()
         */
        defaultSubmit: function() {
            if (this.$submitButton) {
                // Create hidden input to send the submit buttons
                $('<input/>')
                    .attr('type', 'hidden')
                    .attr('data-bv-submit-hidden', '')
                    .attr('name', this.$submitButton.attr('name'))
                    .val(this.$submitButton.val())
                    .appendTo(this.$form);
            }
            // Submit form
            this.$form.off('submit.bv').submit();
        },

        // Useful APIs which aren't used internally

        /**
         * Get the list of invalid fields
         *
         * @returns {jQuery[]}
         */
        getInvalidFields: function() {
            return this.$invalidFields;
        },

        /**
         * Get the error messages
         *
         * @param {jQuery|String} [field] The field, which can be
         * - a string: The field name
         * - a jQuery object representing the field element
         * If the field is not defined, the method returns all error messages of all fields
         * @returns {String[]}
         */
        getErrors: function(field) {
            var that     = this,
                messages = [],
                $fields  = $([]);

            switch (true) {
                case (field && 'object' == typeof field):
                    $fields = field;
                    break;
                case (field && 'string' == typeof field):
                    var f = this.getFieldElements(field);
                    if (f.length > 0) {
                        var type = f.attr('type');
                        $fields = ('radio' == type || 'checkbox' == type) ? $(f[0]) : f;
                    }
                    break;
                default:
                    $fields = this.$invalidFields;
                    break;
            }

            $fields.each(function() {
                messages = messages.concat(
                    $(this)
                        .data('bv.messages')
                        .find('.help-block[data-bv-for="' + $(this).attr('data-bv-field') + '"][data-bv-result="' + that.STATUS_INVALID + '"]')
                        .map(function() {
                            return $(this).html()
                        })
                        .get()
                );
            });

            return messages;
        },

        /**
         * Add new field element
         *
         * @param {jQuery} $field The field element
         * @param {Object} options The field options
         * @returns {BootstrapValidator}
         */
        addFieldElement: function($field, options) {
            var field      = $field.attr('name') || $field.attr('data-bv-field'),
                type       = $field.attr('type'),
                isNewField = !this._cacheFields[field];

            // Update cache
            if (!isNewField && this._cacheFields[field].index($field) == -1) {
                this._cacheFields[field] = this._cacheFields[field].add($field);
            }

            if ('checkbox' == type || 'radio' == type || isNewField) {
                this._initField(field);
            } else {
                this._initFieldElement($field);
            }

            return this;
        },

        /**
         * Remove given field element
         *
         * @param {jQuery} $field The field element
         * @returns {BootstrapValidator}
         */
        removeFieldElement: function($field) {
            var field = $field.attr('name') || $field.attr('data-bv-field'),
                type  = $field.attr('type'),
                index = this._cacheFields[field].index($field);

            (index == -1) ? (delete this._cacheFields[field]) : this._cacheFields[field].splice(index, 1);
            // Remove from the list of invalid fields
            index = this.$invalidFields.index($field);
            if (index != -1) {
                this.$invalidFields.splice(index, 1);
            }

            if ('checkbox' == type || 'radio' == type) {
                this._initField(field);
            }

            return this;
        },

        /**
         * Reset the form
         *
         * @param {Boolean} resetFormData Reset current form data
         * @return {BootstrapValidator}
         */
        resetForm: function(resetFormData) {
            var field, fields, total, type, validator;
            for (field in this.options.fields) {
                fields = this.getFieldElements(field);
                total  = fields.length;

                for (var i = 0; i < total; i++) {
                    for (validator in this.options.fields[field].validators) {
                        $(fields[i]).removeData('bv.dfs.' + validator);
                    }
                }

                // Mark field as not validated yet
                this.updateStatus(field, this.STATUS_NOT_VALIDATED);

                if (resetFormData) {
                    type = fields.attr('type');
                    ('radio' == type || 'checkbox' == type) ? fields.removeAttr('checked').removeAttr('selected') : fields.val('');
                }
            }

            this.$invalidFields = $([]);
            this.$submitButton  = null;

            // Enable submit buttons
            this.disableSubmitButtons(false);

            return this;
        },

        /**
         * Enable/Disable all validators to given field
         *
         * @param {String} field The field name
         * @param {Boolean} enabled Enable/Disable field validators
         * @returns {BootstrapValidator}
         */
        enableFieldValidators: function(field, enabled) {
            this.options.fields[field]['enabled'] = enabled;
            this.updateStatus(field, this.STATUS_NOT_VALIDATED);

            return this;
        },

        /**
         * Destroy the plugin
         * It will remove all error messages, feedback icons and turn off the events
         */
        destroy: function() {
            var field, fields, $field, validator, $icon, container;
            for (field in this.options.fields) {
                fields    = this.getFieldElements(field);
                container = this.options.fields[field].container || this.options.container;
                for (var i = 0; i < fields.length; i++) {
                    $field = $(fields[i]);
                    $field
                        // Remove all error messages
                        .data('bv.messages')
                            .find('.help-block[data-bv-validator][data-bv-for="' + field + '"]').remove().end()
                            .end()
                        .removeData('bv.messages')
                        // Remove feedback classes
                        .parents('.form-group')
                            .removeClass('has-feedback has-error has-success')
                            .end()
                        // Turn off events
                        .off('.bv')
                        .removeAttr('data-bv-field');

                    // Remove feedback icons, tooltip/popover container
                    $icon = $field.parents('.form-group').find('i[data-bv-icon-for="' + field + '"]');
                    if ($icon) {
                        switch (container) {
                            case 'tooltip':
                                $icon.tooltip('destroy').remove();
                                break;
                            case 'popover':
                                $icon.popover('destroy').remove();
                                break;
                            default:
                                $icon.remove();
                                break;
                        }
                    }

                    for (validator in this.options.fields[field].validators) {
                        $field.removeData('bv.result.' + validator).removeData('bv.dfs.' + validator);
                    }
                }
            }

            // Enable submit buttons
            this.disableSubmitButtons(false);

            this.$form
                .removeClass(this.options.elementClass)
                .off('.bv')
                .removeData('bootstrapValidator')
                // Remove generated hidden elements
                .find('[data-bv-submit-hidden]').remove();
        }
    };

    // Plugin definition
    $.fn.bootstrapValidator = function(option) {
        var params = arguments;
        return this.each(function() {
            var $this   = $(this),
                data    = $this.data('bootstrapValidator'),
                options = 'object' == typeof option && option;
            if (!data) {
                data = new BootstrapValidator(this, options);
                $this.data('bootstrapValidator', data);
            }

            // Allow to call plugin method
            if ('string' == typeof option) {
                data[option].apply(data, Array.prototype.slice.call(params, 1));
            }
        });
    };

    // Available validators
    $.fn.bootstrapValidator.validators = {};

    $.fn.bootstrapValidator.Constructor = BootstrapValidator;

    // Helper methods, which can be used in validator class
    $.fn.bootstrapValidator.helpers = {
        /**
         * Validate a date
         *
         * @param {Number} year The full year in 4 digits
         * @param {Number} month The month number
         * @param {Number} day The day number
         * @param {Boolean} [notInFuture] If true, the date must not be in the future
         * @returns {Boolean}
         */
        date: function(year, month, day, notInFuture) {
            if (year < 1000 || year > 9999 || month == 0 || month > 12) {
                return false;
            }
            var numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            // Update the number of days in Feb of leap year
            if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
                numDays[1] = 29;
            }

            // Check the day
            if (day < 0 || day > numDays[month - 1]) {
                return false;
            }

            if (notInFuture === true) {
                var currentDate  = new Date(),
                    currentYear  = currentDate.getFullYear(),
                    currentMonth = currentDate.getMonth(),
                    currentDay   = currentDate.getDate();
                return (year < currentYear
                        || (year == currentYear && month - 1 < currentMonth)
                        || (year == currentYear && month - 1 == currentMonth && day < currentDay));
            }

            return true;
        },

        /**
         * Implement Luhn validation algorithm
         * Credit to https://gist.github.com/ShirtlessKirk/2134376
         *
         * @see http://en.wikipedia.org/wiki/Luhn
         * @param {String} value
         * @returns {Boolean}
         */
        luhn: function(value) {
            var length  = value.length,
                mul     = 0,
                prodArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]],
                sum     = 0;

            while (length--) {
                sum += prodArr[mul][parseInt(value.charAt(length), 10)];
                mul ^= 1;
            }

            return (sum % 10 === 0 && sum > 0);
        },

        /**
         * Implement modulus 11, 10 (ISO 7064) algorithm
         *
         * @param {String} value
         * @returns {Boolean}
         */
        mod_11_10: function(value) {
            var check  = 5,
                length = value.length;
            for (var i = 0; i < length; i++) {
                check = (((check || 10) * 2) % 11 + parseInt(value.charAt(i), 10)) % 10;
            }
            return (check == 1);
        },

        /**
         * Implements Mod 37, 36 (ISO 7064) algorithm
         * Usages:
         * mod_37_36('A12425GABC1234002M')
         * mod_37_36('002006673085', '0123456789')
         *
         * @param {String} value
         * @param {String} alphabet
         * @returns {Boolean}
         */
        mod_37_36: function(value, alphabet) {
            alphabet = alphabet || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var modulus = alphabet.length,
                length  = value.length,
                check   = Math.floor(modulus / 2);
            for (var i = 0; i < length; i++) {
                check = (((check || modulus) * 2) % (modulus + 1) + alphabet.indexOf(value.charAt(i))) % modulus;
            }
            return (check == 1);
        }
    };
}(window.jQuery));
