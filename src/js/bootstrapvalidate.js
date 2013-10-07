/**
 * BootstrapValidate (https://github.com/nghuuphuoc/bootstrapvalidate)
 *
 * A jQuery plugin to validate form fields. Use with Bootstrap 3
 *
 * @author      Nguyen Huu Phuoc <phuoc@huuphuoc.me>
 * @copyright   (c) 2013 Nguyen Huu Phuoc
 * @license     MIT
 */

(function($) {
    // Plugin definition
    $.fn.bootstrapValidate = function(options) {
        return this.each(function() {
            var $this = $(this), data = $this.data('bootstrapValidate');
            if (!data) {
                $this.data('bootstrapValidate', (data = new $.bootstrapValidator(this, options)));
            }
        });
    };

    $.bootstrapValidator = function(form, options) {
        this.$form   = $(form);
        this.options = $.extend({}, $.bootstrapValidator.DEFAULT_OPTIONS, options);

        this.invalidFields      = {};
        this.xhrRequests        = {};
        this.numPendingRequests = 0;

        this.init();
    };

    $.extend($.bootstrapValidator, {
        /**
         * The default options
         */
        DEFAULT_OPTIONS: {
            // Default invalid message
            message: 'This value is not valid',

            // Map the field name with validator rules
            fields: null
        },

        // Available validators
        validator: {},

        prototype: {
            /**
             * Retrieve the form element
             * @returns {jQuery}
             */
            getForm: function() {
                return this.$form;
            },

            /**
             * Validate form
             */
            init: function() {
                if (this.options.fields == null) {
                    return;
                }

                var that = this;
                this.$form
                    .addClass('bootstrap-validate-form')
                    .on('submit', function(e) {
                        if (that.options.fields) {
                            for (var field in that.options.fields) {
                                that.validateField(field);
                            }
                            if (!that.isValid()) {
                                e.preventDefault();
                            }
                        }
                    });

                for (var field in this.options.fields) {
                    this.initField(field);
                }
            },

            initField: function(field) {
                if (this.options.fields[field] == null || this.options.fields[field].validator == null) {
                    return;
                }
                var foundFields = this.$form.find('[name="' + field + '"]');
                if (foundFields.length == 0) {
                    // Return if cannot find the field with given name
                    return;
                }

                // Create a help block element for showing the error
                var that      = this,
                    $field    = $(foundFields[0]),
                    $parent   = $field.parents('.form-group'),
                    helpBlock = $parent.find('.help-block');

                if (helpBlock.length == 0) {
                    var $small = $('<small/>').addClass('help-block').appendTo($parent);
                    $field.data('bootstrapValidator.error', $small);

                    // Calculate the number of columns of the label/field element
                    // Then set offset to the help block element
                    var label, cssClasses, offset;
                    if (label = $parent.find('label').get(0)) {
                        cssClasses = $(label).attr('class').split(' ');
                        for (var i = 0; i < cssClasses.length; i++) {
                            if (cssClasses[i].substr(0, 7) == 'col-lg-') {
                                offset = cssClasses[i].substr(7);
                                break;
                            }
                        }
                    } else {
                        cssClasses = $parent.children().eq(0).attr('class').split(' ');
                        for (var i = 0; i < cssClasses.length; i++) {
                            if (cssClasses[i].substr(0, 14) == 'col-lg-offset-') {
                                offset = cssClasses[i].substr(14);
                                break;
                            }
                        }
                    }
                    $small.addClass('col-lg-offset-' + offset).addClass('col-lg-' + parseInt(12 - offset));
                } else {
                    $field.data('bootstrapValidator.error', helpBlock.eq(0));
                }

                var type  = $field.attr('type'),
                    event = ('checkbox' == type || 'radio' == type) ? 'change' : 'keyup';
                $field.on(event, function() {
                    that.validateField(field);
                });
            },

            validateField: function(field) {
                var foundFields = this.$form.find('[name="' + field + '"]');
                if (foundFields.length == 0) {
                    // Return if cannot find the field with given name
                    return;
                }
                var that       = this,
                    $field     = $(foundFields[0]),
                    validators = that.options.fields[field].validator;
                for (var validatorName in validators) {
                    if (!$.bootstrapValidator.validator[validatorName]) {
                        continue;
                    }
                    var isValid = $.bootstrapValidator.validator[validatorName].validate(that, $field, validators[validatorName]);
                    if (isValid === false) {
                        that.showError($field, validatorName);
                        break;
                    } else if (isValid === true) {
                        that.removeError($field);
                    }
                }
            },

            showError: function($field, validatorName) {
                var field     = $field.attr('name'),
                    validator = this.options.fields[field].validator[validatorName],
                    message   = validator.message || this.options.message,
                    $parent   = $field.parents('.form-group');

                this.invalidFields[field] = true;

                // Add has-error class to parent element
                $parent.removeClass('has-success').addClass('has-error');

                $field.data('bootstrapValidator.error').html(message).show();
            },

            removeError: function($field) {
                this.invalidFields[$field.attr('name')] = false;
                $field.parents('.form-group').removeClass('has-error').addClass('has-success');
                $field.data('bootstrapValidator.error').hide();
            },

            startRequest: function($field, validatorName, xhr) {
                var field = $field.attr('name');

                this.completeRequest($field, validatorName);

                if (this.numPendingRequests < 0) {
                    this.numPendingRequests = 0;
                }
                this.numPendingRequests++;
                if (!this.xhrRequests[field]) {
                    this.xhrRequests[field] = {};
                }
                this.xhrRequests[field][validatorName] = xhr;
            },

            completeRequest: function($field, validatorName) {
                var field = $field.attr('name');
                if (!this.xhrRequests[field] || !this.xhrRequests[field][validatorName]) {
                    return;
                }

                this.numPendingRequests--;
                var xhr = this.xhrRequests[field][validatorName];
                xhr.abort();
                delete this.xhrRequests[field][validatorName];
            },

            isValid: function() {
                console.log(this.numPendingRequests);
                if (this.numPendingRequests > 0) {
                    return false;
                }
                for (var field in this.invalidFields) {
                    if (this.invalidFields[field]) {
                        return false;
                    }
                }
                return true;
            }
        }
    });
}(window.jQuery));
