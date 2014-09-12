(function($) {
    $.fn.bootstrapValidator.i18n.hexColor = $.extend($.fn.bootstrapValidator.i18n.hexColor || {}, {
        'default': 'Please enter a valid hex color'
    });

    $.fn.bootstrapValidator.validators.hexColor = {
        enableByHtml5: function($field) {
            return ('color' === $field.attr('type'));
        },

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
            return $.fn.bootstrapValidator.validators.color._hexColor(validator, $field, options);
        }
    };
}(window.jQuery));
