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
                'CH': 'CHE[0-9]{9}(MWST)?',                         // Switzerland
                'CY': 'CY[0-5|9]{1}[0-9]{7}[A-Z]{1}',               // Cyprus
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
            var country = (options.country || value.substr(0, 2)).toUpperCase();
            if (!vatRegex[country] || !(new RegExp('^' + vatRegex[country] + '$')).test(value)) {
                return false;
            }

            var method = ['_', country.toLowerCase()].join('');
            if (this[method] && 'function' == typeof this[method]) {
                return this[method](value);
            }

            return true;
        },

        /**
         * Validate Austrian VAT number
         * Example:
         * - Valid: ATU13585627
         * - Invalid: ATU13585626
         *
         * @param {String} value VAT number
         * @return {Boolean}
         */
        _at: function(value) {
            value = value.substr(3);
            var sum    = 0,
                weight = [1, 2, 1, 2, 1, 2, 1],
                temp   = 0;

            for (var i = 0; i < 7; i++) {
                temp = parseInt(value.charAt(i)) * weight[i];
                if (temp > 9) {
                    temp = Math.floor(temp / 10) + temp % 10;
                }
                sum += temp;
            }

            sum = 10 - (sum + 4) % 10;
            if (sum == 10) {
                sum = 0;
            }

            return (sum == value.substr(7, 1));
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
        _be: function(value) {
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
         * Validate Bulgarian VAT number
         * Example:
         * - Valid: BG175074752,
         * BG7523169263, BG8032056031,
         * BG7542011030,
         * BG7111042925
         * - Invalid: BG175074753, BG7552A10004, BG7111042922
         *
         * @param {String} value VAT number
         * @return {Boolean}
         */
        _bg: function(value) {
            value = value.substr(2);

            var total = 0, sum = 0, weight = [], i = 0;

            // Legal entities
            if (value.length == 9) {
                for (i = 0; i < 8; i++) {
                    sum += parseInt(value.charAt(i)) * (i + 1);
                }
                sum = sum % 11;
                if (sum == 10) {
                    sum = 0;
                    for (i = 0; i < 8; i++) {
                        sum += parseInt(value.charAt(i)) * (i + 3);
                    }
                }
                sum = sum % 10;
                return (sum == value.substr(8));
            }
            // Physical persons, foreigners and others
            else if (value.length == 10) {
                // Validate Bulgarian national identification numbers
                var egn = function(value) {
                        // Check the birth date
                        var year  = parseInt(value.substr(0, 2), 10) + 1900,
                            month = parseInt(value.substr(2, 2), 10),
                            day   = parseInt(value.substr(4, 2), 10);
                        if (month > 40) {
                            year += 100;
                            month -= 40;
                        } else if (month > 20) {
                            year -= 100;
                            month -= 20;
                        }

                        try {
                            var d = new Date(year, month, day);
                        } catch (ex) {
                            return false;
                        }

                        var sum    = 0,
                            weight = [2, 4, 8, 5, 10, 9, 7, 3, 6];
                        for (var i = 0; i < 9; i++) {
                            sum += parseInt(value.charAt(i)) * weight[i];
                        }
                        sum = (sum % 11) % 10;
                        return (sum == value.substr(9, 1));
                    },
                    // Validate Bulgarian personal number of a foreigner
                    pnf = function(value) {
                        var sum    = 0,
                            weight = [21, 19, 17, 13, 11, 9, 7, 3, 1];
                        for (var i = 0; i < 9; i++) {
                            sum += parseInt(value.charAt(i)) * weight[i];
                        }
                        sum = sum % 10;
                        return (sum == value.substr(9, 1));
                    },
                    // Finally, consider it as a VAT number
                    vat = function(value) {
                        var sum    = 0,
                            weight = [4, 3, 2, 7, 6, 5, 4, 3, 2];
                        for (var i = 0; i < 9; i++) {
                            sum += parseInt(value.charAt(i)) * weight[i];
                        }
                        sum = 11 - sum % 11;
                        if (sum == 10) {
                            return false;
                        }
                        if (sum == 11) {
                            sum = 0;
                        }
                        return (sum == value.substr(9, 1));
                    };
                return (egn(value) || pnf(value) || vat(value));
            }

            return false;
        },

        /**
         * Validate Swiss VAT number
         *
         * @param {String} value VAT number
         * @return {Boolean}
         */
        _ch: function(value) {
            value = value.substr(3);
            var sum    = 0,
                weight = [5, 4, 3, 2, 7, 6, 5, 4];
            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }

            sum = 11 - sum % 11;
            if (sum == 10) {
                return false;
            }
            if (sum == 11) {
                sum = 0;
            }

            return (sum == value.substr(8, 1));
        },

        /**
         * Validate Cypriot VAT number
         * Examples:
         * - Valid: CY10259033P
         * - Invalid: CY10259033Z
         *
         * @param {String} value VAT number
         * @return {Boolean}
         */
        _cy: function(value) {
            value = value.substr(2);

            // Do not allow to start with "12"
            if (value.substr(0, 2) == '12') {
                return false;
            }

            // Extract the next digit and multiply by the counter.
            var sum         = 0,
                translation = {
                    '0': 1,  '1': 0,  '2': 5,  '3': 7,  '4': 9,
                    '5': 13, '6': 15, '7': 17, '8': 19, '9': 21
                };
            for (var i = 0; i < 8; i++) {
                var temp = parseInt(value.charAt(i), 10);
                if (i % 2 == 0) {
                    temp = translation[temp + ''];
                }
                sum += temp;
            }

            sum = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[sum % 26];
            return (sum == value.substr(8, 1));
        },

        /**
         * Validate German VAT number
         * Examples:
         * - Valid: DE136695976
         * - Invalid: DE136695978
         *
         * @param {String} value VAT number
         * @return {Boolean}
         */
        _de: function(value) {
            value = value.substr(2);
            var product = 10,
                sum     = 0;
            for (var i = 0; i < 8; i++) {
                sum = (parseInt(value.charAt(i), 10) + product) % 10;
                if (sum == 0) {
                    sum = 10;
                }
                product = (sum * 2) % 11;
            }

            var checkDigit = (11 - product == 10) ? 0 : (11 - product);
            return (checkDigit == value.substr(8, 1));
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
        _dk: function(value) {
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
        _ee: function(value) {
            value = value.substr(2);
            var sum    = 0,
                weight = [3, 7, 1, 3, 7, 1, 3, 7, 1];

            for (var i = 0; i < 9; i++) {
                sum += parseInt(value.charAt(i)) * weight[i];
            }

            return (sum % 10 == 0);
        },

        /**
         * Validate Finnish VAT number
         * Examples:
         * - Valid: FI20774740
         * - Invalid: FI20774741
         *
         * @param {String} value VAT number
         * @return {Boolean}
         */
        _fi: function(value) {
            value = value.substr(2);
            var sum    = 0,
                weight = [7, 9, 10, 5, 8, 4, 2, 1];

            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i)) * weight[i];
            }

            return (sum % 11 == 0);
        },

        /**
         * Validate Greek VAT number
         * Examples:
         * - Valid: GR023456780, EL094259216
         * - Invalid: EL123456781
         *
         * @param {String} value VAT number
         * @return {Boolean}
         */
        _gr: function(value) {
            value = value.substr(2);
            if (value.length == 8) {
                value = '0' + value;
            }

            var sum    = 0,
                weight = [256, 128, 64, 32, 16, 8, 4, 2];
            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i)) * weight[i];
            }
            sum = (sum % 11) % 10;

            return (sum == value.substr(8, 1));
        },

        _el: function(value) {
            return this._gr(value);
        },

        /**
         * Validate Hungarian VAT number
         * Examples:
         * - Valid: HU12892312
         * - Invalid: HU12892313
         *
         * @param {String} value VAT number
         * @return {Boolean}
         */
        _hu: function(value) {
            value = value.substr(2);
            var sum    = 0,
                weight = [9, 7, 3, 1, 9, 7, 3, 1];

            for (var i = 0; i < 8; i++) {
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
        _lu: function(value) {
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
        _mt: function(value) {
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
        _pl: function(value) {
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
        _pt: function(value) {
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
        },

        /**
         * Validate Slovenian VAT number
         * Examples:
         * - Valid: SI50223054
         * - Invalid: SI50223055
         *
         * @param {String} value VAT number
         * @return {Boolean}
         */
        _si: function(value) {
            value = value.substr(2);
            var sum    = 0,
                weight = [8, 7, 6, 5, 4, 3, 2];

            for (var i = 0; i < 7; i++) {
                sum += parseInt(value.charAt(i)) * weight[i];
            }
            sum = 11 - sum % 11;
            if (sum == 10) {
                sum = 0;
            }
            return (sum == value.substr(7, 1));
        }
    };
}(window.jQuery));
