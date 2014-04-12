(function($) {
    $.fn.bootstrapValidator.validators.phone = {
        html5Attributes: {
            message: 'message',
            country: 'country'
        },

        /**
         * Return true if the input value contains a valid US phone number only
         *
         * @param {BootstrapValidator} validator Validate plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * - country: The ISO 3166 country code
         * Currently it only supports United State (US) country
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            var country = (options.country || 'US').toUpperCase();
            switch (country) {
                case 'US':
                default:
                    // Make sure US phone numbers have 10 digits
                    value = value.replace(/\(|\)|\s+/g, '');
                    return (/^(?:1\-?)?(\d{3})[\-\.]?(\d{3})[\-\.]?(\d{4})$/).test(value) && (value.length == 10);
            }
        }
    }
}(window.jQuery));
