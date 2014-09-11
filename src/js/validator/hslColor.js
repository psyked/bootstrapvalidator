(function($) {
    $.fn.bootstrapValidator.i18n.hslColor = $.extend($.fn.bootstrapValidator.i18n.hslColor || {}, {
        'default': 'Please enter a valid hsl color'
    });

    $.fn.bootstrapValidator.validators.hslColor = {

        /**
         * Return true if the input value is a valid hsl() color
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value === '') {
                return true;
            }
            return /^hsl\((\s*(-?\d+)\s*,)(\s*(\b(0?\d{1,2}|100)\b%)\s*,)(\s*(\b(0?\d{1,2}|100)\b%)\s*)\)$/.test(value);
        }
    };
}(window.jQuery));

