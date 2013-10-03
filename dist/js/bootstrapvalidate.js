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
        this.validate();
    };
    $.extend($.bootstrapValidator, {
        /**
         * The default options
         */
        DEFAULT_OPTIONS: {
            // Default invalid message
            message: 'This value is not valid',

            // Map the field name with validator rules
            fields: null,

            // CSS class of icons indicating that the field value is valid or not
            iconClass: {
                valid: 'icon-ok',
                invalid: 'icon-remove'
            }
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
            validate: function() {
                if (this.options.fields == null) {
                    return;
                }
                for (var field in this.options.fields) {
                    this.validateField(field);
                }
            },

            validateField: function(field) {
                if (this.options.fields[field] == null || this.options.fields[field].validator == null) {
                    return;
                }
                var foundFields = this.$form.find('[name="' + field + '"]');
                if (foundFields.length == 0) {
                    // Return if cannot find the field with given name
                    return;
                }

                var that         = this,
                    fieldElement = $(foundFields[0]),
                    type         = $(fieldElement).attr('type'),
                    event        = ('checkbox' == type) ? 'change' : 'keyup';

                $(fieldElement)
                    .on(event, function() {
                        var validators = that.options.fields[field].validator;
                        for (var validatorName in validators) {
                            if (!$.bootstrapValidator.validator[validatorName]) {
                                continue;
                            }
                            var options = validators[validatorName];
                            if (!$.bootstrapValidator.validator[validatorName].validate(that, fieldElement, options)) {
                                that.showError(fieldElement, validatorName);
                                break;
                            } else {
                                that.removeError(fieldElement);
                            }
                        }
                    })
                    .blur(function() {
                        that.hideError(fieldElement);
                    });
            },

            showError: function(fieldElement, validatorName) {
                var $fieldElement = $(fieldElement),
                    field         = $fieldElement.attr('name'),
                    validator     = this.options.fields[field].validator[validatorName],
                    message       = validator.message || this.options.message;

                if (!$fieldElement.data('bootstrapValidator.tooltip')) {
                    var $a = $('<a/>').attr('href', '#')
                                      .attr('title', message)
                                      // Bootstrap tooltip options
                                      // see http://getbootstrap.com/javascript/#tooltips
                                      .attr('data-toggle', 'tooltip').attr('data-placement', 'right')
                                      .css('text-decoration', 'none')
                                      .css('position', 'absolute')
                                      .insertAfter(fieldElement);
                    $('<i/>').addClass(this.options.iconClass.invalid).appendTo($a);
                    $fieldElement.data('bootstrapValidator.tooltip', $a);

                    $a.on('shown.bs.tooltip', function() {
                        if (!$(this).data('bootstrapValidator.tooltip.calculated')) {
                            $(this).data('bootstrapValidator.tooltip.calculated', true);
                            var $parent   = $(this).parent(),
                                $tip      = $(this).data('bs.tooltip').$tip,
                                w         = $parent.width(),
                                h         = $parent.height(),
                                tipWidth  = parseInt($tip.width()),
                                tipHeight = parseInt($tip.height()),
                                tipLeft   = parseInt($tip.css('left')),
                                tipTop    = parseInt($tip.css('top'));
                            $tip.css('left', tipLeft + w + 10)
                                .css('top', tipTop - h + 5)
                                .width(tipWidth);
                            $(this).css('position', 'absolute')
                                   .css('left', tipLeft - $(this).width() + w + 5)
                                   .css('top', tipTop + tipHeight / 2 - $(this).height() / 2 - h + 5);
                        }
                    });
                }

                // Add has-error class to parent element
                $fieldElement.parents('.form-group').removeClass('has-success').addClass('has-error');

                var $tip = $fieldElement.data('bootstrapValidator.tooltip');
                $tip.find('i').attr('class', this.options.iconClass.invalid).end()
                    .attr('title', message)
                    .attr('data-original-title', message)
                    .tooltip('show');
            },

            hideError: function(fieldElement) {
                if (tip = $(fieldElement).data('bootstrapValidator.tooltip')) {
                    $(tip).tooltip('hide');
                }
            },

            removeError: function(fieldElement) {
                var $fieldElement = $(fieldElement);
                $fieldElement.parents('.form-group').removeClass('has-error').addClass('has-success');
                if (tip = $fieldElement.data('bootstrapValidator.tooltip')) {
                    $(tip).find('i').attr('class', this.options.iconClass.valid);
                    $(tip).tooltip('destroy');

                    $(tip).remove();
                    $fieldElement.removeData('bootstrapValidator.tooltip');
                }
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
             * @param {HTMLElement} element
             * @param {Object} options
             * @returns {boolean}
             */
            validate: function(validateInstance, element, options) {
                return /^\d+$/.test($(element).val());
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
             * @param {HTMLElement} element
             * @param {Object} options
             * @returns {boolean}
             */
            validate: function(validateInstance, element, options) {
                var value       = $.trim($(element).val()),
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
        identical: {
            /**
             * Check if input value equals to value of particular one
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {HTMLElement} element
             * @param {Object} options Consists of the following key:
             * - field: The name of field that will be used to compare with current one
             * @returns {boolean}
             */
            validate: function(validateInstance, element, options) {
                var value        = $(element).val(),
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
        notEmpty: {
            /**
             * Check if input value is empty or not
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {HTMLElement} element
             * @param {Object} options
             * @returns {boolean}
             */
            validate: function(validateInstance, element, options) {
                var $element = $(element),
                    type     = $element.attr('type');
                return ('checkbox' == type || 'radio' == type)
                            ? $element.is(':checked')
                            : ($.trim($(element).val()) != '');
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
             * @param {HTMLElement} element
             * @param {Object} options Consists of the following key:
             * - regexp: The regular expression you need to check
             * @returns {boolean}
             */
            validate: function(validateInstance, element, options) {
                var value = $.trim($(element).val());
                return value.match(options.regexp);
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
             * @param {HTMLElement} element
             * @param {Object} options Consists of following keys:
             * - min
             * - max
             * At least one of two keys is required
             * @returns {boolean}
             */
            validate: function(validateInstance, element, options) {
                var value = $.trim($(element).val()), length = value.length;
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
             * @param {HTMLElement} element
             * @param {Object} options
             * @returns {boolean}
             */
            validate: function(validateInstance, element, options) {
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
                return urlExp.test($(element).val());
            }
        }
    });
}(window.jQuery));
