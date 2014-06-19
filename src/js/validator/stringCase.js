(function($) {
    $.fn.bootstrapValidator.i18n.stringCase = $.extend($.fn.bootstrapValidator.i18n.stringCase || {}, {
        'default': 'Please enter only lowercase characters',
        upper: 'Please enter only uppercase characters',

        getMessage: function(options) {
            var stringCase = (options['case'] || 'lower').toLowerCase();
            switch (stringCase) {
                case 'upper':
                    return this.upper;
                case 'lower':
                default:
                    return this['default'];
            }
        }
    });

    $.fn.bootstrapValidator.validators.stringCase = {
        html5Attributes: {
            message: 'message',
            'case': 'case'
        },

        /**
         * Check if a string is a lower or upper case one
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * - case: Can be 'lower' (default) or 'upper'
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            var stringCase = (options['case'] || 'lower').toLowerCase();
            switch (stringCase) {
                case 'upper':
                    return value === value.toUpperCase();
                case 'lower':
                default:
                    return value === value.toLowerCase();
            }
        }
    };
}(window.jQuery));
