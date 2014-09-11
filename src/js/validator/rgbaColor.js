(function($) {
    $.fn.bootstrapValidator.i18n.rgbaColor = $.extend($.fn.bootstrapValidator.i18n.rgbaColor || {}, {
        'default': 'Please enter a valid rgb color'
    });

    $.fn.bootstrapValidator.validators.rgbaColor = {

        /**
         * Return true if the input value is a valid rgb() color
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            var regexInteger = /^rgba\((\s*(\b([01]?\d{1,2}|2[0-4]\d|25[0-5])\b)\s*,){3}(\s*(0?(\.\d+)?|1(\.0+)?)\s*)\)$/;
            var regexPercent = /^rgba\((\s*(\b(0?\d{1,2}|100)\b%)\s*,){3}(\s*(0?(\.\d+)?|1(\.0+)?)\s*)\)$/;
            if (value === '') {
                return true;
            }
            return regexInteger.test(value) || regexPercent.test(value);
        }
    };
}(window.jQuery));

