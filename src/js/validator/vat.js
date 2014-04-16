(function($) {
    $.fn.bootstrapValidator.validators.vat = {
        html5Attributes: {
            message: 'message',
            country: 'country'
        },

        /**
         * Validate an European VAT number
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * - country: The ISO 3166-1 country code
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '' || !options.country) {
                return true;
            }

            var vatRegex = {
                'AT': 'ATU[0-9]{8}',                                // Austria
                'BE': 'BE[0]{0,1}[0-9]{9}',                         // Belgium
                'BG': 'BG[0-9]{9,10}',                              // Bulgaria
                'CY': 'CY[0-9]{8}L',                                // Cyprus
                'CZ': 'CZ[0-9]{8,10}',                              // Czech Republic
                'DE': 'DE[0-9]{9}',                                 // Germany
                'DK': 'DK[0-9]{8}',                                 // Denmark
                'EE': 'EE[0-9]{9}',                                 // Estonia
                'ES': 'ES[0-9A-Z][0-9]{7}[0-9A-Z]',                 // Spain
                'FI': 'FI[0-9]{8}',                                 // Finland
                'FR': 'FR[0-9A-Z]{2}[0-9]{9}',                      // France
                'EL': 'EL[0-9]{9}',                                 // Greece (EL is traditionally prefix of Greek VAT numbers)
                'GR': 'GR[0-9]{9}',                                 // Greece
                'GB': 'GB([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})',   // United Kingdom
                'HU': 'HU[0-9]{8}',                                 // Hungary
                'IE': 'IE[0-9]S[0-9]{5}L',                          // Ireland
                'IT': 'IT[0-9]{11}',                                // Italy
                'LT': 'LT([0-9]{9}|[0-9]{12})',                     // Lithuania
                'LU': 'LU[0-9]{8}',                                 // Luxembourg
                'LV': 'LV[0-9]{11}',                                // Latvia
                'MT': 'MT[0-9]{8}',                                 // Malta
                'NL': 'NL[0-9]{9}B[0-9]{2}',                        // Netherlands
                'PL': 'PL[0-9]{10}',                                // Poland
                'PT': 'PT[0-9]{9}',                                 // Portugal
                'RO': 'RO[0-9]{2,10}',                              // Romania
                'SE': 'SE[0-9]{12}',                                // Sweden
                'SI': 'SI[0-9]{8}',                                 // Slovenia
                'SK': 'SK[0-9]{10}'                                 // Slovakia
            };

            value = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
            var country = options.country || value.substr(0, 2);
            if (!vatRegex[country]) {
                return false;
            }
            return (new RegExp('^' + vatRegex[country] + '$')).test(value);
        }
    };
}(window.jQuery));
