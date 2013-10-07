/**
 * BootstrapValidate v0.1.0 (http://github.com/nghuuphuoc/bootstrapvalidate)
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
;(function($) {
    $.extend($.bootstrapValidator.validator, {
        between: {
            /**
             * Return true if the input value is between (strictly or not) two given numbers
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {jQuery} $field Field element
             * @param {Object} options Can consist of the following keys:
             * - min
             * - max
             * - inclusive [optional]: Can be true or false. Default is true
             * - message: The invalid message
             * @returns {boolean}
             */
            validate: function(validateInstance, $field, options) {
                var value = parseFloat($field.val());
                return (options.inclusive === true)
                            ? (value > options.min && value < options.max)
                            : (value >= options.min && value <= options.max);
            }
        }
    });
}(window.jQuery));
;(function($) {
    $.extend($.bootstrapValidator.validator, {
        digits: {
            /**
             * Return true if the input value contains digits only
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {jQuery} $field Field element
             * @param {Object} options
             * @returns {boolean}
             */
            validate: function(validateInstance, $field, options) {
                return /^\d+$/.test($field.val());
            }
        }
    });
}(window.jQuery));
;(function($) {
    $.extend($.bootstrapValidator.validator, {
        emailAddress: {
            /**
             * Return true if and only if the input value is a valid email address
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {jQuery} $field Field element
             * @param {Object} options
             * @returns {boolean}
             */
            validate: function(validateInstance, $field, options) {
                var value       = $.trim($field.val()),
                    // Email address regular expression
                    // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
                    emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return emailRegExp.test(value);
            }
        }
    });
}(window.jQuery));
;(function($) {
    $.extend($.bootstrapValidator.validator, {
        greaterThan: {
            /**
             * Return true if the input value is greater than or equals to given number
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {jQuery} $field Field element
             * @param {Object} options Can consist of the following keys:
             * - value: The number used to compare to
             * - inclusive [optional]: Can be true or false. Default is true
             * - message: The invalid message
             * @returns {boolean}
             */
            validate: function(validateInstance, $field, options) {
                var value = parseFloat($field.val());
                return (options.inclusive === true) ? (value > options.value) : (value >= options.value);
            }
        }
    });
}(window.jQuery));
;(function($) {
    $.extend($.bootstrapValidator.validator, {
        hexColor: {
            /**
             * Return true if the input value is a valid hex color
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {jQuery} $field Field element
             * @param {Object} options Can consist of the following keys:
             * - message: The invalid message
             * @returns {boolean}
             */
            validate: function(validateInstance, $field, options) {
                var value = $field.val();
                return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(value);
            }
        }
    });
}(window.jQuery));
;(function($) {
    $.extend($.bootstrapValidator.validator, {
        identical: {
            /**
             * Check if input value equals to value of particular one
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {jQuery} $field Field element
             * @param {Object} options Consists of the following key:
             * - field: The name of field that will be used to compare with current one
             * @returns {boolean}
             */
            validate: function(validateInstance, $field, options) {
                var value        = $field.val(),
                    $compareWith = validateInstance.getForm().find('[name="' + options.field + '"]');
                if (value == $compareWith.val()) {
                    validateInstance.removeError($compareWith);
                    return true;
                } else {
                    return false;
                }
            }
        }
    });
}(window.jQuery));
;(function($) {
    $.extend($.bootstrapValidator.validator, {
        lessThan: {
            /**
             * Return true if the input value is less than or equal to given number
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {jQuery} $field Field element
             * @param {Object} options Can consist of the following keys:
             * - value: The number used to compare to
             * - inclusive [optional]: Can be true or false. Default is true
             * - message: The invalid message
             * @returns {boolean}
             */
            validate: function(validateInstance, $field, options) {
                var value = parseFloat($field.val());
                return (options.inclusive === true) ? (value < options.value) : (value <= options.value);
            }
        }
    });
}(window.jQuery));
;(function($) {
    $.extend($.bootstrapValidator.validator, {
        notEmpty: {
            /**
             * Check if input value is empty or not
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {jQuery} $field Field element
             * @param {Object} options
             * @returns {boolean}
             */
            validate: function(validateInstance, $field, options) {
                var type = $field.attr('type');
                return ('checkbox' == type || 'radio' == type) ? $field.is(':checked') : ($.trim($field.val()) != '');
            }
        }
    });
}(window.jQuery));
;(function($) {
    $.extend($.bootstrapValidator.validator, {
        regexp: {
            /**
             * Check if the element value matches given regular expression
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {jQuery} $field Field element
             * @param {Object} options Consists of the following key:
             * - regexp: The regular expression you need to check
             * @returns {boolean}
             */
            validate: function(validateInstance, $field, options) {
                var value = $.trim($field.val());
                return value.match(options.regexp);
            }
        }
    });
}(window.jQuery));
;(function($) {
    $.extend($.bootstrapValidator.validator, {
        remote: {
            /**
             * Request a remote server to check the input value
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {jQuery} $field Field element
             * @param {Object} options Can consist of the following keys:
             * - url
             * - data [optional]: By default, it will take the value
             *  {
             *      <fieldName>: <fieldValue>
             *  }
             * - message: The invalid message
             * @returns {string}
             */
            validate: function(validateInstance, $field, options) {
                var value = $field.val(), name = $field.attr('name');
                var data = options.data;
                if (data == null) {
                    data       = {};
                    data[name] = value;
                }
                var xhr = $.ajax({
                    type: 'POST',
                    url: options.url,
                    dataType: 'json',
                    data: data
                }).success(function(response) {
                    validateInstance.completeRequest($field, 'remote');
                    if (response.valid === false || response.valid === 'false') {
                        validateInstance.showError($field, 'remote');
                    }
                });
                validateInstance.startRequest($field, 'remote', xhr);

                return 'pending';
            }
        }
    });
}(window.jQuery));
;(function($) {
    $.extend($.bootstrapValidator.validator, {
        stringLength: {
            /**
             * Check if the length of element value is less or more than given number
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {jQuery} $field Field element
             * @param {Object} options Consists of following keys:
             * - min
             * - max
             * At least one of two keys is required
             * @returns {boolean}
             */
            validate: function(validateInstance, $field, options) {
                var value = $.trim($field.val()), length = value.length;
                if ((options.min && length < options.min) || (options.max && length > options.max)) {
                    return false;
                }

                return true;
            }
        }
    });
}(window.jQuery));
;(function($) {
    $.extend($.bootstrapValidator.validator, {
        uri: {
            /**
             * Return true if the input value is a valid URL
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {jQuery} $field Field element
             * @param {Object} options
             * @returns {boolean}
             */
            validate: function(validateInstance, $field, options) {
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
                return urlExp.test($field.val());
            }
        }
    });
}(window.jQuery));
;(function($) {
    $.extend($.bootstrapValidator.validator, {
        usZipCode: {
            /**
             * Return true if and only if the input value is a valid US zip code
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {jQuery} $field Field element
             * @param {Object} options
             * @returns {boolean}
             */
            validate: function(validateInstance, $field, options) {
                var value = $field.val();
                return /^\d{5}([\-]\d{4})?$/.test(value);
            }
        }
    });
}(window.jQuery));
