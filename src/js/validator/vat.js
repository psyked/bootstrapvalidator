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
            if (!vatRegex[country] || !(new RegExp('^' + vatRegex[country] + '$')).test(value)) {
                return false;
            }

            var method = '_isValid' + country + 'Vat';
            if (this[method] && 'function' == typeof this[method]) {
                return this[method](value);
            }

            return true;
        },

        /**
         * Validate Belgium VAT number
         * Example:
         * - Valid: BE0428759497
         * - Invalid: BE431150351
         *
         * @param {String} value VAT number
         * @return {Boolean}
         */
        _isValidBEVat: function(value) {
            value = value.substr(2);
            if (value.length == 9) {
                value = '0' + value;
            }

            if (value.substr(1, 1) == 0) {
                return false;
            }

            var sum = parseInt(value.substr(0, 8), 10) + parseInt(value.substr(8, 2), 10);
            return (sum % 97 == 0);
        },

        /**
         * Validate Danish VAT number
         * Example:
         * - Valid: DK13585628
         * - Invalid: DK13585627
         *
         * @param {String} value VAT number
         * @return {Boolean}
         */
        _isValidDKVat: function(value) {
            value = value.substr(2);
            var sum    = 0,
                weight = [2, 7, 6, 5, 4, 3, 2, 1];
            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }

            return (sum % 11 == 0);
        },

        /**
         * Validate Estonian VAT number
         * Examples:
         * - Valid: EE100931558, EE100594102
         * - Invalid: EE100594103
         *
         * @param {String} value VAT number
         * @return {Boolean}
         */
        _isValidEEVat: function(value) {
            value = value.substr(2);
            var sum    = 0,
                weight = [3, 7, 1, 3, 7, 1, 3, 7, 1];

            for (var i = 0; i < 9; i++) {
                sum += parseInt(value.charAt(i)) * weight[i];
            }

            return (sum % 10 == 0);
        },

        /**
         * Validate Luxembourg VAT number
         * Examples:
         * - Valid: LU15027442
         * - Invalid: LU15027443
         *
         * @param {String} value VAT number
         * @return {Boolean}
         */
        _isValidLUVat: function(value) {
            value = value.substr(2);
            return (value.substr(0, 6) % 89 == value.substr(6, 2));
        },

        /**
         * Validate Maltese VAT number
         * Examples:
         * - Valid: MT11679112
         * - Invalid: MT11679113
         *
         * @param {String} value VAT number
         * @return {Boolean}
         */
        _isValidMTVat: function(value) {
            value = value.substr(2);
            var sum    = 0,
                weight = [3, 4, 6, 7, 8, 9, 10, 1];

            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i)) * weight[i];
            }

            return (sum % 37 == 0);
        },

        /**
         * Validate Polish VAT number
         * Examples:
         * - Valid: PL8567346215
         * - Invalid: PL8567346216
         *
         * @param {String} value VAT number
         * @return {Boolean}
         */
        _isValidPLVat: function(value) {
            value = value.substr(2);
            var sum    = 0,
                weight = [6, 5, 7, 2, 3, 4, 5, 6, 7, -1];

            for (var i = 0; i < 10; i++) {
                sum += parseInt(value.charAt(i)) * weight[i];
            }

            return (sum % 11 == 0);
        },

        /**
         * Validate Portuguese VAT number
         * Examples:
         * - Valid: PT501964843
         * - Invalid: PT501964842
         *
         * @param {String} value VAT number
         * @return {Boolean}
         */
        _isValidPTVat: function(value) {
            value = value.substr(2);
            var sum    = 0,
                weight = [9, 8, 7, 6, 5, 4, 3, 2];

            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i)) * weight[i];
            }
            sum = 11 - sum % 11;
            if (sum > 9) {
                sum = 0;
            }
            return (sum == value.substr(8, 1));
        }
    };
}(window.jQuery));
