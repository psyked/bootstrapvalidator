/**
 * BootstrapValidator (https://github.com/nghuuphuoc/bootstrapvalidate)
 *
 * A jQuery plugin to validate form fields. Use with Bootstrap 3
 *
 * @author      Nguyen Huu Phuoc <phuoc@huuphuoc.me>
 * @copyright   (c) 2013 Nguyen Huu Phuoc
 * @license     MIT
 */

(function($) {
    var BootstrapValidator = function(form, options) {
        this.$form   = $(form);
        this.options = $.extend({}, BootstrapValidator.DEFAULT_OPTIONS, options);

        this.invalidFields      = {};
        this.xhrRequests        = {};
        this.numPendingRequests = 0;

        this._init();
    };

    // The default options
    BootstrapValidator.DEFAULT_OPTIONS = {
        // The form CSS class
        elementClass: 'bootstrap-validator-form',

        // Default invalid message
        message: 'This value is not valid',

        // Map the field name with validator rules
        fields: null
    };

    BootstrapValidator.prototype = {
        constructor: BootstrapValidator,

        _init: function() {
            if (this.options.fields == null) {
                return;
            }

            var that = this;
            this.$form
                .addClass(this.options.elementClass)
                .on('submit', function(e) {
                    that.formSubmited = true;
                    if (that.options.fields) {
                        for (var field in that.options.fields) {
                            if(that.numPendingRequests > 0){
                                that.validateField(field);
                            }
                        }
                        if (!that.isValid()) {
                            e.preventDefault();
                        }
                    }
                });

            for (var field in this.options.fields) {
                this._initField(field);
            }
        },

        _initField: function(field) {
            if (this.options.fields[field] == null || this.options.fields[field].validators == null) {
                return;
            }

            var $field = this.getFieldElement(field);
            if (null == $field) {
                return;
            }

            // Create a help block element for showing the error
            var that      = this,
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

        getFieldElement: function(field) {
            var fields = this.$form.find('[name="' + field + '"]');
            return (fields.length == 0) ? null : $(fields[0]);
        },

        validateField: function(field) {
            var $field = this.getFieldElement(field);
            if (null == $field) {
                // Return if cannot find the field with given name
                return;
            }
            var that       = this,
                validators = that.options.fields[field].validators;
            for (var validatorName in validators) {
                if (!$.fn.bootstrapValidator.validators[validatorName]
//                        || (this.xhrRequests[field] && this.xhrRequests[field][validatorName])
                    ) {     // Do not perform if there is pending remote validation
                    continue;
                }
                var isValid = $.fn.bootstrapValidator.validators[validatorName].validate(that, $field, validators[validatorName]);
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
                validator = this.options.fields[field].validators[validatorName],
                message   = validator.message || this.options.message,
                $parent   = $field.parents('.form-group');

            this.invalidFields[field] = true;

            // Add has-error class to parent element
            $parent.removeClass('has-success').addClass('has-error');

            $field.data('bootstrapValidator.error').html(message).show();
        },

        removeError: function($field) {
            delete this.invalidFields[$field.attr('name')];
            $field.parents('.form-group').removeClass('has-error').addClass('has-success');
            $field.data('bootstrapValidator.error').hide();
        },

        startRequest: function($field, validatorName, xhr) {
            var field = $field.attr('name');
            this.numPendingRequests++;
            // Abort the previous request
            if (!this.xhrRequests[field]) {
                this.xhrRequests[field] = {};
            }

            if (this.xhrRequests[field][validatorName]) {
                this.numPendingRequests--;
                this.xhrRequests[field][validatorName].abort();
            }
            this.xhrRequests[field][validatorName] = xhr;
        },

        completeRequest: function($field, validatorName, isValid) {
            var field = $field.attr('name');

            this.numPendingRequests--;
            if (this.numPendingRequests < 0) {
                this.numPendingRequests = 0;
            }
            delete this.xhrRequests[field][validatorName];
        },

        isValid: function() {
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
    };

    // Plugin definition
    $.fn.bootstrapValidator = function(options) {
        return this.each(function() {
            var $this = $(this), data = $this.data('bootstrapValidator');
            if (!data) {
                $this.data('bootstrapValidator', (data = new BootstrapValidator(this, options)));
            }
        });
    };

    // Available validators
    $.fn.bootstrapValidator.validators = {};

    $.fn.bootstrapValidator.Constructor = BootstrapValidator;
}(window.jQuery));
