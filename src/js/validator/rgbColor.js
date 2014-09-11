(function($) {
    $.fn.bootstrapValidator.i18n.rgbColor = $.extend($.fn.bootstrapValidator.i18n.rgbColor || {}, {
        'default': 'Please enter a valid rgb color'
    });

    $.fn.bootstrapValidator.validators.rgbColor = {

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
            var regexInteger = /^rgb\((\s*(\b([01]?\d{1,2}|2[0-4]\d|25[0-5])\b)\s*,){2}(\s*(\b([01]?\d{1,2}|2[0-4]\d|25[0-5])\b)\s*)\)$/;
            var regexPercent = /^rgb\((\s*(\b(0?\d{1,2}|100)\b%)\s*,){2}(\s*(\b(0?\d{1,2}|100)\b%)\s*)\)$/;
            if (value === '') {
                return true;
            }
            return regexInteger.test(value) || regexPercent.test(value);
        }
    };
}(window.jQuery));

