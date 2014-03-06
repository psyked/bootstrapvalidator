/**
 * BootstrapValidator (http://github.com/nghuuphuoc/bootstrapvalidator)
 *
 * A jQuery plugin to validate form fields. Use with Bootstrap 3
 *
 * @version     v0.3.0
 * @author      https://twitter.com/nghuuphuoc
 * @copyright   (c) 2013 - 2014 Nguyen Huu Phuoc
 * @license     MIT
 */

(function($) {
    var BootstrapValidator = function(form, options) {
        this.$form   = $(form);
        this.options = $.extend({}, BootstrapValidator.DEFAULT_OPTIONS, options);

        this.dfds    = {};      // Array of deferred
        this.results = {};      // Validating results

        this.invalidField  = null;  // First invalid field
        this.$submitButton = null;  // The submit button which is clicked to submit form

        this._init();
    };

    // The default options
    BootstrapValidator.DEFAULT_OPTIONS = {
        // The form CSS class
        elementClass: 'bootstrap-validator-form',

        // Default invalid message
        message: 'This value is not valid',

        // The number of grid columns
        // Change it if you use custom grid with different number of columns
        columns: 12,

        // Shows ok/error icons based on the field validity.
        // This feature requires Bootstrap v3.1.0 or later (http://getbootstrap.com/css/#forms-control-validation).
        // Since Bootstrap doesn't provide any methods to know its version, this option cannot be on/off automatically.
        // In other word, to use this feature you have to upgrade your Bootstrap to v3.1.0 or later.
        feedbackIcons: false,

        // The submit buttons selector
        // These buttons will be disabled when the form input are invalid
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
            if (this.options.fields == null) {
                return;
            }

            var that = this;
            this.$form
                // Disable client side validation in HTML 5
                .attr('novalidate', 'novalidate')
                .addClass(this.options.elementClass)
                // Disable the default submission first
                .on('submit.bootstrapValidator', function(e) {
                    e.preventDefault();
                    that.validate();
                });

            this.$form
                .find(this.options.submitButtons)
                .on('click', function() {
                    that.$submitButton = $(this);
                });

            for (var field in this.options.fields) {
                this._initField(field);
            }

            this._setLiveValidating();
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

            this.dfds[field]    = {};
            this.results[field] = {};

            var fields = this.$form.find('[name="' + field + '"]');

            // We don't need to validate ...
            if (fields.length == 0                                  // ... non-existing fields
                || (fields.length == 1 && fields.is(':disabled')))  // ... disabled field
            {
                delete this.options.fields[field];
                delete this.dfds[field];
                return;
            }

            // Create a help block element for showing the error
            var $field  = $(fields[0]),
                $parent = $field.parents('.form-group'),
                // Calculate the number of columns of the label/field element
                // Then set offset to the help block element
                label, cssClasses, offset, size;

            if (label = $parent.find('label').get(0)) {
                // The default Bootstrap form don't require class for label (http://getbootstrap.com/css/#forms)
                if (cssClasses = $(label).attr('class')) {
                    cssClasses = cssClasses.split(' ');
                    for (var i = 0; i < cssClasses.length; i++) {
                        if (/^col-(xs|sm|md|lg)-\d+$/.test(cssClasses[i])) {
                            offset = cssClasses[i].substr(7);
                            size   = cssClasses[i].substr(4, 2);
                            break;
                        }
                    }
                }
            } else if (cssClasses = $parent.children().eq(0).attr('class')) {
                cssClasses = cssClasses.split(' ');
                for (var i = 0; i < cssClasses.length; i++) {
                    if (/^col-(xs|sm|md|lg)-offset-\d+$/.test(cssClasses[i])) {
                        offset = cssClasses[i].substr(14);
                        size   = cssClasses[i].substr(4, 2);
                        break;
                    }
                }
            }

            if (size && offset) {
                for (var validatorName in this.options.fields[field].validators) {
                    if (!$.fn.bootstrapValidator.validators[validatorName]) {
                        delete this.options.fields[field].validators[validatorName];
                        continue;
                    }

                    this.results[field][validatorName] = null;
                    $('<small/>')
                        .css('display', 'none')
                        .attr('data-bs-validator', validatorName)
                        .addClass('help-block')
                        .addClass(['col-', size, '-offset-', offset].join(''))
                        .addClass(['col-', size, '-', this.options.columns - offset].join(''))
                        .appendTo($parent);
                }
            }

            // Prepare the feedback icons
            // Available from Bootstrap 3.1 (http://getbootstrap.com/css/#forms-control-validation)
            if (this.options.feedbackIcons) {
                $parent.addClass('has-feedback');
                $('<span/>')
                    .css('display', 'none')
                    .addClass('glyphicon form-control-feedback')
                    .insertAfter($(fields[fields.length - 1]));
            }
        },

        /**
         * Enable live validating
         */
        _setLiveValidating: function() {
            if ('enabled' == this.options.live) {
                var that = this;
                // Since this should be called once, I have to disable the live validating mode
                this.options.live = 'disabled';

                for (var field in this.options.fields) {
                    (function(f) {
                        var fields = that.getFieldElements(f);
                        if (fields) {
                            var type  = fields.attr('type'),
                                event = ('radio' == type || 'checkbox' == type || 'SELECT' == fields[0].tagName) ? 'change' : 'keyup';

                            fields.on(event, function() {
                                that.validateField(f);
                            });
                        }
                    })(field);
                }
            }
        },

        /**
         * Called when all validations are completed
         */
        _submit: function() {
            if (!this.isValid()) {
                if ('submitted' == this.options.live) {
                    this.options.live = 'enabled';
                    this._setLiveValidating();
                }

                // Focus to the first invalid field
                if (this.invalidField) {
                    this.getFieldElements(this.invalidField).focus();
                }

                return;
            }

            // Call the custom submission if enabled
            if (this.options.submitHandler && 'function' == typeof this.options.submitHandler) {
                this.options.submitHandler.call(this, this, this.$form, this.$submitButton);
            } else {
                // Submit form
                this.$form.off('submit.bootstrapValidator').submit();
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
            var fields = this.$form.find('[name="' + field + '"]');
            return (fields.length == 0) ? null : fields;
        },

        /**
         * Validate the form
         */
        validate: function() {
            if (!this.options.fields) {
                return this;
            }
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
         */
        validateField: function(field) {
            var that       = this,
                fields     = this.$form.find('[name="' + field + '"]'),
                $field     = $(fields[0]),
                validators = this.options.fields[field].validators,
                validatorName,
                validateResult;
            for (validatorName in validators) {
                if (this.dfds[field][validatorName]) {
                    this.dfds[field][validatorName].reject();
                }

                validateResult = $.fn.bootstrapValidator.validators[validatorName].validate(this, $field, validators[validatorName]);
                if ('object' == typeof validateResult) {
                    this.dfds[field][validatorName] = validateResult;
                    validateResult.done(function(isValid, v) {
                        // v is validator name
                        delete that.dfds[field][v];
                        /*
                        if (isValid) {
                            that._submit();
                        }*/
                    });
                }

                $.when(validateResult).then(function(isValid) {
                    that.results[field][validatorName] = isValid;
                    if (isValid) {
                        that.removeError($field, validatorName);
                    } else {
                        that.showError($field, validatorName);
                    }
                });
            }
        },

        /**
         * Check the form validity
         *
         * @returns {Boolean}
         */
        isValid: function() {
            var field, validatorName;
            for (field in this.results) {
                for (validatorName in this.results[field]) {
                    if (!this.results[field][validatorName]) {
                        this.invalidField = field;
                        return false;
                    }
                }
            }

            return true;
        },

        /**
         * Show field error
         *
         * @param {jQuery} $field The field element
         * @param {String} validatorName
         */
        showError: function($field, validatorName) {
            var field     = $field.attr('name'),
                validator = this.options.fields[field].validators[validatorName],
                message   = validator.message || this.options.message,
                $parent   = $field.parents('.form-group');

            $parent
                // Add has-error class to parent element
                .removeClass('has-success')
                .addClass('has-error')
                // Show error element
                .find('.help-block[data-bs-validator="' + validatorName + '"]')
                    .html(message)
                    .show();

            if (this.options.feedbackIcons) {
                // Show feedback icon
                $parent
                    .find('.form-control-feedback')
                        .removeClass('glyphicon-ok')
                        .addClass('glyphicon-remove')
                        .show();
            }
        },

        /**
         * Remove error from given field
         *
         * @param {jQuery} $field The field element
         */
        removeError: function($field, validatorName) {
            var $parent = $field.parents('.form-group'),
                $errors = $parent.find('.help-block[data-bs-validator]'),
                field   = $field.attr('name');

            // Hide error element
            $errors
                .filter('[data-bs-validator="' + validatorName + '"]')
                    .hide();

            // If the field is valid
            var that = this;
            if ($errors.filter(function() {
                    var display = $(this).css('display');
                    return ('block' == display) || ('none' == display && that.results[field][validatorName] == null);
                }).length == 0
            ) {
                $parent
                    .removeClass('has-error')
                    .addClass('has-success')
                // Show the "ok" icon
                if (this.options.feedbackIcons) {
                    $parent
                        .find('.form-control-feedback')
                            .removeClass('glyphicon-remove')
                            .addClass('glyphicon-ok')
                            .show();
                }
            }
        }
    };

    // Plugin definition
    $.fn.bootstrapValidator = function(options) {
        return this.each(function() {
            var $this = $(this), data = $this.data('bootstrapValidator');
            if (!data) {
                $this.data('bootstrapValidator', (data = new BootstrapValidator(this, options)));
            }
            if ('string' == typeof options) {
                data[options]();
            }
        });
    };

    // Available validators
    $.fn.bootstrapValidator.validators = {};

    $.fn.bootstrapValidator.Constructor = BootstrapValidator;
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.between = {
        /**
         * Return true if the input value is between (strictly or not) two given numbers
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - min
         * - max
         * - inclusive [optional]: Can be true or false. Default is true
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            value = parseFloat(value);
            return (options.inclusive === true)
                        ? (value > options.min && value < options.max)
                        : (value >= options.min && value <= options.max);
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.callback = {
        /**
         * Return result from the callback method
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - callback: The callback method that passes 2 parameters:
         *      callback: function(fieldValue, validator) {
         *          // fieldValue is the value of field
         *          // validator is instance of BootstrapValidator
         *      }
         * - message: The invalid message
         * @returns {Boolean|Deferred}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (options.callback && 'function' == typeof options.callback) {
                var dfd = new $.Deferred();
                dfd.resolve(options.callback.call(this, value, validator), 'callback');
                return dfd;
            }
            return true;
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.choice = {
        /**
         * Check if the number of checked boxes are less or more than a given number
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of following keys:
         * - min
         * - max
         * At least one of two keys is required
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var numChoices = validator
                                    .getFieldElements($field.attr('name'))
                                    .filter(':checked')
                                    .length;
            if ((options.min && numChoices < options.min) || (options.max && numChoices > options.max)) {
                return false;
            }

            return true;
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.creditCard = {
        /**
         * Return true if the input value is valid credit card number
         * Based on https://gist.github.com/DiegoSalazar/4075533
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following key:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            // Accept only digits, dashes or spaces
            if (/[^0-9-\s]+/.test(value)) {
                return false;
            }

            // The Luhn Algorithm
            // http://en.wikipedia.org/wiki/Luhn
            value = value.replace(/\D/g, '');
            var check = 0, digit = 0, even = false, length = value.length;

            for (var n = length - 1; n >= 0; n--) {
                digit = parseInt(value.charAt(n), 10);

                if (even) {
                    if ((digit *= 2) > 9) {
                        digit -= 9;
                    }
                }

                check += digit;
                even = !even;
            }

            return (check % 10) == 0;
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.different = {
        /**
         * Return true if the input value is different with given field's value
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of the following key:
         * - field: The name of field that will be used to compare with current one
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            var compareWith = validator.getFieldElements(options.field);
            if (compareWith == null) {
                return true;
            }

            if (value != compareWith.val()) {
                validator.removeError(compareWith, 'different');
                return true;
            } else {
                return false;
            }
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.digits = {
        /**
         * Return true if the input value contains digits only
         *
         * @param {BootstrapValidator} validator Validate plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            return /^\d+$/.test(value);
        }
    }
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.emailAddress = {
        /**
         * Return true if and only if the input value is a valid email address
         *
         * @param {BootstrapValidator} validator Validate plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            // Email address regular expression
            // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
            var emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailRegExp.test(value);
        }
    }
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.greaterThan = {
        /**
         * Return true if the input value is greater than or equals to given number
         *
         * @param {BootstrapValidator} validator Validate plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - value: The number used to compare to
         * - inclusive [optional]: Can be true or false. Default is true
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }
            value = parseFloat(value);
            return (options.inclusive === true) ? (value > options.value) : (value >= options.value);
        }
    }
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.hexColor = {
        /**
         * Return true if the input value is a valid hex color
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(value);
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.identical = {
        /**
         * Check if input value equals to value of particular one
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of the following key:
         * - field: The name of field that will be used to compare with current one
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            var compareWith = validator.getFieldElements(options.field);
            if (compareWith == null) {
                return true;
            }

            if (value == compareWith.val()) {
                validator.removeError(compareWith, 'identical');
                return true;
            } else {
                return false;
            }
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.lessThan = {
        /**
         * Return true if the input value is less than or equal to given number
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - value: The number used to compare to
         * - inclusive [optional]: Can be true or false. Default is true
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }
            value = parseFloat(value);
            return (options.inclusive === true) ? (value < options.value) : (value <= options.value);
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.notEmpty = {
        /**
         * Check if input value is empty or not
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var type = $field.attr('type');
            if ('radio' == type || 'checkbox' == type) {
                return validator
                            .getFieldElements($field.attr('name'))
                            .filter(':checked')
                            .length > 0;
            }

            return $.trim($field.val()) != '';
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.regexp = {
        /**
         * Check if the element value matches given regular expression
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of the following key:
         * - regexp: The regular expression you need to check
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            return options.regexp.test(value);
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.remote = {
        /**
         * Request a remote server to check the input value
         *
         * @param {BootstrapValidator} validator Plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - url
         * - data [optional]: By default, it will take the value
         *  {
         *      <fieldName>: <fieldValue>
         *  }
         * - message: The invalid message
         * @returns {Boolean|Deferred}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            var name = $field.attr('name'), data = options.data;
            if (data == null) {
                data = {};
            }
            data[name] = value;

            var dfd = new $.Deferred();
            var xhr = $.ajax({
                type: 'POST',
                url: options.url,
                dataType: 'json',
                data: data
            });
            xhr.then(function(response) {
                dfd.resolve(response.valid === true || response.valid === 'true', 'remote');
            });

            dfd.fail(function() {
                xhr.abort();
            });

            return dfd;
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.stringLength = {
        /**
         * Check if the length of element value is less or more than given number
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of following keys:
         * - min
         * - max
         * At least one of two keys is required
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            var length = $.trim(value).length;
            if ((options.min && length < options.min) || (options.max && length > options.max)) {
                return false;
            }

            return true;
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.uri = {
        /**
         * Return true if the input value is a valid URL
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            // Credit to https://gist.github.com/dperini/729294
            //
            // Regular Expression for URL validation
            //
            // Author: Diego Perini
            // Updated: 2010/12/05
            //
            // the regular expression composed & commented
            // could be easily tweaked for RFC compliance,
            // it was expressly modified to fit & satisfy
            // these test for an URL shortener:
            //
            //   http://mathiasbynens.be/demo/url-regex
            //
            // Notes on possible differences from a standard/generic validation:
            //
            // - utf-8 char class take in consideration the full Unicode range
            // - TLDs have been made mandatory so single names like "localhost" fails
            // - protocols have been restricted to ftp, http and https only as requested
            //
            // Changes:
            //
            // - IP address dotted notation validation, range: 1.0.0.0 - 223.255.255.255
            //   first and last IP address of each class is considered invalid
            //   (since they are broadcast/network addresses)
            //
            // - Added exclusion of private, reserved and/or local networks ranges
            //
            // Compressed one-line versions:
            //
            // Javascript version
            //
            // /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i
            //
            // PHP version
            //
            // _^(?:(?:https?|ftp)://)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}-\x{ffff}0-9]+-?)*[a-z\x{00a1}-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}-\x{ffff}0-9]+-?)*[a-z\x{00a1}-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}-\x{ffff}]{2,})))(?::\d{2,5})?(?:/[^\s]*)?$_iuS
            var urlExp = new RegExp(
                "^" +
                // protocol identifier
                "(?:(?:https?|ftp)://)" +
                // user:pass authentication
                "(?:\\S+(?::\\S*)?@)?" +
                "(?:" +
                // IP address exclusion
                // private & local networks
                "(?!10(?:\\.\\d{1,3}){3})" +
                "(?!127(?:\\.\\d{1,3}){3})" +
                "(?!169\\.254(?:\\.\\d{1,3}){2})" +
                "(?!192\\.168(?:\\.\\d{1,3}){2})" +
                "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
                // IP address dotted notation octets
                // excludes loopback network 0.0.0.0
                // excludes reserved space >= 224.0.0.0
                // excludes network & broacast addresses
                // (first & last IP address of each class)
                "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
                "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
                "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
                "|" +
                // host name
                "(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)" +
                // domain name
                "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*" +
                // TLD identifier
                "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
                ")" +
                // port number
                "(?::\\d{2,5})?" +
                // resource path
                "(?:/[^\\s]*)?" +
                "$", "i"
            );
            return urlExp.test(value);
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.zipCode = {
        /**
         * Return true if and only if the input value is a valid country zip code
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - country: The ISO 3166 country code
         *
         * Currently it supports the following countries:
         * - US (United State)
         * - DK (Denmark)
         * - SE (Sweden)
         *
         * @returns {Boolean}
         */
        validate: function(validateInstance, $field, options) {
            var value = $field.val();
            if (value == '' || !options.country) {
                return true;
            }
            switch (options.country.toUpperCase()) {
                case 'DK':
                    return /^(DK(-|\s)?)?\d{4}$/i.test(value);
                case 'SE':
                    return /^(S-)?\d{3}\s?\d{2}$/i.test(value);
                case 'US':
                default:
                    return /^\d{5}([\-]\d{4})?$/.test(value);
            }
        }
    };
}(window.jQuery));
