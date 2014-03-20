(function($) {
    $.fn.bootstrapValidator.validators.zipCode = {
        /**
         * Return true if and only if the input value is a valid country zip code
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - country: The ISO 3166 country code
         *
         * Currently it supports the following countries:
         * - US (United State)
         * - DK (Denmark)
         * - SE (Sweden)
         *
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '' || !options.country) {
                return true;
            }

            options.country = options.country || 'US';
            switch (options.country.toUpperCase()) {
                case 'DK':
                    return /^(DK(-|\s)?)?\d{4}$/i.test(value);
                case 'SE':
                    return /^(S-)?\d{3}\s?\d{2}$/i.test(value);
                case 'US':
                default:
                    return /^\d{5}([\-]\d{4})?$/.test(value);
            }
        }
    };
}(window.jQuery));
