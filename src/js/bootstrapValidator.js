/**
 * BootstrapValidator (https://github.com/nghuuphuoc/bootstrapvalidator)
 *
 * A jQuery plugin to validate form fields. Use with Bootstrap 3
 *
 * @author      http://twitter.com/nghuuphuoc
 * @copyright   (c) 2013 - 2014 Nguyen Huu Phuoc
 * @license     MIT
 */

(function($) {
    var BootstrapValidator = function(form, options) {
        this.$form   = $(form);
        this.options = $.extend({}, BootstrapValidator.DEFAULT_OPTIONS, options);

        this.$invalidField = null;  // First invalid field
        this.$submitButton = null;  // The submit button which is clicked to submit form

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

        this._init();
    };

    // The default options
    BootstrapValidator.DEFAULT_OPTIONS = {
        // The form CSS class
        elementClass: 'bootstrap-validator-form',

        // Default invalid message
        message: 'This value is not valid',

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
        submitButtons: 'button[type="submit"]',

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
                    submitButtons:  this.$form.attr('data-bv-submitbuttons'),
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
                .on('click', this.options.submitButtons, function() {
                    that.$submitButton  = $(this);
					// The user just click the submit button
					that._submitIfValid = true;
                })
                // Find all fields which have either "name" or "data-bv-field" attribute
                .find('[name], [data-bv-field]').each(function() {
                    var $field = $(this);
                    // Don't initialize hidden input
                    if ('hidden' == $field.attr('type')) {
                        return;
                    }

                    var field  = $field.attr('name') || $field.attr('data-bv-field');
                    $field.attr('data-bv-field', field);

                    options.fields[field] = $.extend({}, {
                        trigger:    $field.attr('data-bv-trigger'),
                        message:    $field.attr('data-bv-message'),
                        container:  $field.attr('data-bv-container'),
                        selector:   $field.attr('data-bv-selector'),
                        validators: {}
                    }, options.fields[field]);

                    for (v in $.fn.bootstrapValidator.validators) {
                        validator  = $.fn.bootstrapValidator.validators[v];
                        enabled    = $field.attr('data-bv-' + v.toLowerCase()) + '';
                        html5Attrs = ('function' == typeof validator.enableByHtml5) ? validator.enableByHtml5($(this)) : null;

                        if ((html5Attrs && enabled != 'false')
                            || (html5Attrs !== true && ('' == enabled || 'true' == enabled)))
                        {
                            // Try to parse the options via attributes
                            validator.html5Attributes = validator.html5Attributes || { message: 'message' };
                            options.fields[field]['validators'][v] = $.extend({}, html5Attrs == true ? {} : html5Attrs, options.fields[field]['validators'][v]);

                            for (html5AttrName in validator.html5Attributes) {
                                optionName  = validator.html5Attributes[html5AttrName];
                                optionValue = $field.attr('data-bv-' + v.toLowerCase() + '-' + html5AttrName);
                                if (optionValue) {
                                    if ('true' == optionValue) {
                                        optionValue = true;
                                    } else if ('false' == optionValue) {
                                        optionValue = false;
                                    }
                                    options.fields[field]['validators'][v][optionName] = optionValue;
                                }
                            }
                        }
                    }
                });

            this.options = $.extend(true, this.options, options);
            if ('string' == typeof this.options.excluded) {
                this.options.excluded = $.map(this.options.excluded.split(','), function(item) {
                    // Trim the spaces
                    return $.trim(item);
                });
            }

            for (var field in this.options.fields) {
                this._initField(field);
            }

            this.setLiveMode(this.options.live);
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
            if (fields == null) {
                delete this.options.fields[field];
                return;
            }
            for (var validatorName in this.options.fields[field].validators) {
                if (!$.fn.bootstrapValidator.validators[validatorName]) {
                    delete this.options.fields[field].validators[validatorName];
                }
            }

            var that      = this,
                type      = fields.attr('type'),
                event     = ('radio' == type || 'checkbox' == type || 'file' == type || 'SELECT' == fields[0].tagName) ? 'change' : that._changeEvent,
                total     = fields.length,
                updateAll = (total == 1) || ('radio' == type) || ('checkbox' == type);

            for (var i = 0; i < total; i++) {
                var $field   = $(fields[i]),
                    $parent  = $field.parents('.form-group'),
                    // Allow user to indicate where the error messages are shown
                    $message = this.options.fields[field].container ? $parent.find(this.options.fields[field].container) : this._getMessageContainer($field);

                // Set the attribute to indicate the fields which are defined by selector
                if (!$field.attr('data-bv-field')) {
                    $field.attr('data-bv-field', field);
                }

                // Whenever the user change the field value, mark it as not validated yet
                $field.on(event + '.update.bv', function() {
                    // Reset the flag
                    that._submitIfValid = false;
                    updateAll ? that.updateStatus(field, that.STATUS_NOT_VALIDATED, null)
                              : that.updateElementStatus($(this), that.STATUS_NOT_VALIDATED, null);
                });

                // Create help block elements for showing the error messages
                $field.data('bv.messages', $message);
                for (validatorName in this.options.fields[field].validators) {
                    $field.data('bv.result.' + validatorName, this.STATUS_NOT_VALIDATED);

                    if (!updateAll || i == total - 1) {
                        $('<small/>')
                            .css('display', 'none')
                            .attr('data-bv-validator', validatorName)
                            .html(this.options.fields[field].validators[validatorName].message || this.options.fields[field].message || this.options.message)
                            .addClass('help-block')
                            .appendTo($message);
                    }
                }

                // Prepare the feedback icons
                // Available from Bootstrap 3.1 (http://getbootstrap.com/css/#forms-control-validation)
                if (this.options.feedbackIcons
                    && this.options.feedbackIcons.validating && this.options.feedbackIcons.invalid && this.options.feedbackIcons.valid
                    && (!updateAll || i == total - 1))
                {
                    $parent.addClass('has-feedback');
                    var $icon = $('<i/>').css('display', 'none').addClass('form-control-feedback').attr('data-bv-field', field).insertAfter($field);
                    // The feedback icon does not render correctly if there is no label
                    // https://github.com/twbs/bootstrap/issues/12873
                    if ($parent.find('label').length == 0) {
                        $icon.css('top', 0);
                    }
                }
            }

            if (this.options.fields[field]['enabled'] == null) {
                this.options.fields[field]['enabled'] = true;
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
            if (!this.isValid()) {
                if ('submitted' == this.options.live) {
                    this.setLiveMode('enabled');
                }

                // Focus to the first invalid field
                if (this.$invalidField) {
                    // Activate the tab containing the invalid field if exists
                    var $tab = this.$invalidField.parents('.tab-pane'),
                        tabId;
                    if ($tab && (tabId = $tab.attr('id'))) {
                        $('a[href="#' + tabId + '"][data-toggle="tab"]').trigger('click.bs.tab.data-api');
                    }

                    this.$invalidField.focus();
                }

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
         * Check if the field is excluded.
         * Returning true means that the field will not be validated
         *
         * @param {jQuery} $field The field element
         * @return {Boolean}
         */
        _isExcluded: function($field) {
            if (this.options.excluded) {
                for (var i in this.options.excluded) {
                    if (('string' == typeof this.options.excluded[i] && $field.is(this.options.excluded[i]))
                        || ('function' == typeof this.options.excluded[i] && this.options.excluded[i].call(this, $field, this) == true))
                    {
                        return true;
                    }
                }
            }

            return false;
        },

        // --- Public methods ---

        /**
         * Retrieve the field elements by given name
         *
         * @param {String} field The field name
         * @returns {null|jQuery[]}
         */
        getFieldElements: function(field) {
            var fields = this.options.fields[field].selector ? $(this.options.fields[field].selector) : this.$form.find('[name="' + field + '"]');
            return (fields.length == 0) ? null : fields;
        },

        /**
         * Set live validating mode
         *
         * @param {String} mode Live validating mode. Can be 'enabled', 'disabled', 'submitted'
         * @returns {BootstrapValidator}
         */
        setLiveMode: function(mode) {
            this.options.live = mode;
            if ('submitted' == mode) {
                return this;
            }

            var that = this;
            for (var field in this.options.fields) {
                (function(f) {
                    var fields = that.getFieldElements(f);
                    if (fields) {
                        var type      = fields.attr('type'),
                            total     = fields.length,
                            updateAll = (total == 1) || ('radio' == type) || ('checkbox' == type),
                            trigger   = that.options.fields[field].trigger
                                        || that.options.trigger
                                        || (('radio' == type || 'checkbox' == type || 'file' == type || 'SELECT' == fields[0].tagName) ? 'change' : that._changeEvent),
                            events    = $.map(trigger.split(' '), function(item) {
                                return item + '.live.bv';
                            }).join(' ');

                        for (var i = 0; i < total; i++) {
                            ('enabled' == mode)
                                ? $(fields[i]).on(events, function() {
                                    updateAll ? that.validateField(f) : that.validateFieldElement($(this), false);
                                })
                                : $(fields[i]).off(events);
                        }
                    }
                })(field);
            }

            return this;
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
         * @return {BootstrapValidator}
         */
        validate: function() {
            if (!this.options.fields) {
                return this;
            }
            this.disableSubmitButtons(true);

            for (var field in this.options.fields) {
                this.validateField(field);
            }

            // Check if whether the submit button is clicked
            if (this.$submitButton) {
                this._submit();
            }

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
                this.validateFieldElement($(fields[i]), (n == 1));
            }

            return this;
        },

        /**
         * Validate field element
         *
         * @param {jQuery} $field The field element
         * @param {Boolean} updateAll If true, update status of all elements which have the same name
         * @returns {BootstrapValidator}
         */
        validateFieldElement: function($field, updateAll) {
            var that       = this,
                field      = $field.attr('data-bv-field'),
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
                    continue;
                }

                $field.data('bv.result.' + validatorName, this.STATUS_VALIDATING);
                validateResult = $.fn.bootstrapValidator.validators[validatorName].validate(this, $field, validators[validatorName]);

                if ('object' == typeof validateResult) {
                    updateAll ? this.updateStatus(field, this.STATUS_VALIDATING, validatorName)
                              : this.updateElementStatus($field, this.STATUS_VALIDATING, validatorName);
                    $field.data('bv.dfs.' + validatorName, validateResult);

                    validateResult.done(function($f, v, isValid) {
                        // v is validator name
                        $f.removeData('bv.dfs.' + v);
                        updateAll ? that.updateStatus($f.attr('data-bv-field'), isValid ? that.STATUS_VALID : that.STATUS_INVALID, v)
                                  : that.updateElementStatus($f, isValid ? that.STATUS_VALID : that.STATUS_INVALID, v);

                        if (isValid && that._submitIfValid == true) {
						    // If a remote validator returns true and the form is ready to submit, then do it
							that._submit();
						}
                    });
                } else if ('boolean' == typeof validateResult) {
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
         * @return {BootstrapValidator}
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
         * @return {BootstrapValidator}
         */
        updateElementStatus: function($field, status, validatorName) {
            var that       = this,
                field      = $field.attr('data-bv-field'),
                $parent    = $field.parents('.form-group'),
                $message   = $field.data('bv.messages'),
                $rowErrors = $parent.find('.help-block[data-bv-validator]'),
                $errors    = $message.find('.help-block[data-bv-validator]'),
                $icon      = $parent.find('.form-control-feedback[data-bv-field="' + field + '"]');

            // Update status
            if (validatorName) {
                $field.data('bv.result.' + validatorName, status);
            } else {
                for (var v in this.options.fields[field].validators) {
                    $field.data('bv.result.' + v, status);
                }
            }

            // Show/hide error elements and feedback icons
            switch (status) {
                case this.STATUS_VALIDATING:
                    this.disableSubmitButtons(true);
                    $parent.removeClass('has-success').removeClass('has-error');
                    // TODO: Show validating message
                    validatorName ? $errors.filter('.help-block[data-bv-validator="' + validatorName + '"]').hide() : $errors.hide();
                    if ($icon) {
                        $icon.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.invalid).addClass(this.options.feedbackIcons.validating).show();
                    }
                    break;

                case this.STATUS_INVALID:
                    this.disableSubmitButtons(true);
                    $parent.removeClass('has-success').addClass('has-error');
                    validatorName ? $errors.filter('[data-bv-validator="' + validatorName + '"]').show() : $errors.show();
                    if ($icon) {
                        $icon.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.validating).addClass(this.options.feedbackIcons.invalid).show();
                    }
                    break;

                case this.STATUS_VALID:
                    validatorName ? $errors.filter('[data-bv-validator="' + validatorName + '"]').hide() : $errors.hide();

                    // If the field is valid (passes all validators)
                    var validField = ($errors.filter(function() {
                                        var display = $(this).css('display'), v = $(this).attr('data-bv-validator');
                                        return ('block' == display) || ($field.data('bv.result.' + v) != that.STATUS_VALID);
                                    }).length == 0);
                    this.disableSubmitButtons(validField ? false : true);
                    if ($icon) {
                        $icon
                            .removeClass(this.options.feedbackIcons.invalid).removeClass(this.options.feedbackIcons.validating).removeClass(this.options.feedbackIcons.valid)
                            .addClass(validField ? this.options.feedbackIcons.valid : this.options.feedbackIcons.invalid)
                            .show();
                    }

                    // Check if all fields in the same row are valid
                    var validRow = ($rowErrors.filter(function() {
                                        var display = $(this).css('display'), v = $(this).attr('data-bv-validator');
                                        return ('block' == display) || ($field.data('bv.result.' + v) != that.STATUS_VALID);
                                    }).length == 0);
                    $parent.removeClass('has-error has-success').addClass(validRow ? 'has-success' : 'has-error');
                    break;

                case this.STATUS_NOT_VALIDATED:
                default:
                    this.disableSubmitButtons(false);
                    $parent.removeClass('has-success').removeClass('has-error');
                    validatorName ? $errors.filter('.help-block[data-bv-validator="' + validatorName + '"]').hide() : $errors.hide();
                    if ($icon) {
                        $icon.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.invalid).removeClass(this.options.feedbackIcons.validating).hide();
                    }
                    break;
            }

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
                        if (status == this.STATUS_NOT_VALIDATED || status == this.STATUS_VALIDATING) {
                            return false;
                        }

                        if (status == this.STATUS_INVALID) {
                            this.$invalidField = $field;
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
            this.$form.off('submit.bv').submit();
        },

        // Useful APIs which aren't used internally

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
                this.updateStatus(field, this.STATUS_NOT_VALIDATED, null);

                if (resetFormData) {
                    type = fields.attr('type');
                    ('radio' == type || 'checkbox' == type) ? fields.removeAttr('checked').removeAttr('selected') : fields.val('');
                }
            }

            this.$invalidField = null;
            this.$submitButton = null;

            // Enable submit buttons
            this.disableSubmitButtons(false);

            return this;
        },

        /**
         * Enable/Disable all validators to given field
         *
         * @param {String} field The field name
         * @param {Boolean} enabled Enable/Disable field validators
         * @return {BootstrapValidator}
         */
        enableFieldValidators: function(field, enabled) {
            this.options.fields[field]['enabled'] = enabled;
            this.updateStatus(field, this.STATUS_NOT_VALIDATED, null);

            return this;
        }
    };

    // Plugin definition
    $.fn.bootstrapValidator = function(option, params) {
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
                data[option](params);
            }
        });
    };

    // Available validators
    $.fn.bootstrapValidator.validators = {};

    $.fn.bootstrapValidator.Constructor = BootstrapValidator;

    // Helper methods, which can be used in validator class
    $.fn.bootstrapValidator.helpers = {
        /**
         * Implement Luhn validation algorithm ((http://en.wikipedia.org/wiki/Luhn))
         * Credit to https://gist.github.com/ShirtlessKirk/2134376
         *
         * @param {String} value
         * @returns {boolean}
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
        }
    };
}(window.jQuery));
