(function($) {
    $.fn.bootstrapValidator.i18n.hslaColor = $.extend($.fn.bootstrapValidator.i18n.hslaColor || {}, {
        'default': 'Please enter a valid hsla color'
    });

    $.fn.bootstrapValidator.validators.hslaColor = {

        /**
         * Return true if the input value is a valid hsla() color
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
            return /^hsla\((\s*(-?\d+)\s*,)(\s*(\b(0?\d{1,2}|100)\b%)\s*,){2}(\s*(0?(\.\d+)?|1(\.0+)?)\s*)\)$/.test(value);
        }
    };
}(window.jQuery));

