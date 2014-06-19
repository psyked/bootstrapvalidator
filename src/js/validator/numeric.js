(function($) {
    $.fn.bootstrapValidator.i18n.numeric = $.extend($.fn.bootstrapValidator.i18n.numeric || {}, {
        'default': 'The value is not a valid number'
    });

    $.fn.bootstrapValidator.validators.numeric = {
        html5Attributes: {
            message: 'message',
            separator: 'separator'
        },

        /**
         * Validate decimal number
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * - separator: The decimal separator. Can be "." (default), ","
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }
            var separator = options.separator || '.';
            if (separator != '.') {
                value = value.replace(separator, '.');
            }

            return !isNaN(parseFloat(value)) && isFinite(value);
        }
    };
}(window.jQuery));
