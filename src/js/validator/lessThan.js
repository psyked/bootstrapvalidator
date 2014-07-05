(function($) {
    $.fn.bootstrapValidator.i18n.lessThan = $.extend($.fn.bootstrapValidator.i18n.lessThan || {}, {
        'default': 'Please enter a value less than or equal to %s',
        notInclusive: 'Please enter a value less than %s'
    });

    $.fn.bootstrapValidator.validators.lessThan = {
        html5Attributes: {
            message: 'message',
            value: 'value',
            inclusive: 'inclusive'
        },

        enableByHtml5: function($field) {
            var max = $field.attr('max');
            if (max) {
                return {
                    value: max
                };
            }

            return false;
        },

        /**
         * Return true if the input value is less than or equal to given number
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - value: The number used to compare to. It can be
         *      - A number
         *      - Name of field which its value defines the number
         *      - Name of callback function that returns the number
         *      - A callback function that returns the number
         *
         * - inclusive [optional]: Can be true or false. Default is true
         * - message: The invalid message
         * @returns {Object}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value === '') {
                return true;
            }

            var compareTo = options.value;
            if ('function' === typeof compareTo) {
                compareTo = $.fn.bootstrapValidator.helpers.call(compareTo, [value, validator, $field]);
            } else if ('string' === typeof compareTo && !$.isNumeric(compareTo)) {
                var $compareField = validator.getFieldElements(compareTo);
                if ($compareField.length) {
                    compareTo = $compareField.val();
                } else {
                    compareTo = $.fn.bootstrapValidator.helpers.call(compareTo, [value, validator, $field]);
                }
            }

            value = parseFloat(value);
            return (options.inclusive === true || options.inclusive === undefined)
                    ? { valid: value <= compareTo, message: $.fn.bootstrapValidator.helpers.format($.fn.bootstrapValidator.i18n.lessThan['default'],   compareTo) }
                    : { valid: value < compareTo,  message: $.fn.bootstrapValidator.helpers.format($.fn.bootstrapValidator.i18n.lessThan.notInclusive, compareTo) };
        }
    };
}(window.jQuery));
