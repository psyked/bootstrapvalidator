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

            var country = options.country || value.substr(0, 2),
                method  = ['_', country.toLowerCase()].join('');
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
            if (!/^ATU[0-9]{8}$/.test(value)) {
                return false;
            }

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
            if (!/^BE[0]{0,1}[0-9]{9}$/.test(value)) {
                return false;
            }

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
            if (!/^BG[0-9]{9,10}$/.test(value)) {
                return false;
            }

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
            if (!/^CHE[0-9]{9}(MWST)?$/.test(value)) {
                return false;
            }

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
            if (!/^CY[0-5|9]{1}[0-9]{7}[A-Z]{1}$/.test(value)) {
                return false;
            }

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
         * Validate Czech Republic VAT number
         * Can be:
         * i) Legal entities (8 digit numbers)
         * ii) Individuals with a RC (the 9 or 10 digit Czech birth number)
         * iii) Individuals without a RC (9 digit numbers beginning with 6)
         *
         * Examples:
         * - Valid: i) CZ25123891; ii) CZ7103192745, CZ991231123; iii) CZ640903926
         * - Invalid: i) CZ25123890; ii) CZ1103492745, CZ590312123
         *
         * @param {String} value VAT number
         * @return {Boolean}
         */
        _cz: function(value) {
            if (!/^CZ[0-9]{8,10}$/.test(value)) {
                return false;
            }

            value = value.substr(2);

            var sum = 0, weight = [], i = 0;
            if (value.length == 8) {
                // Do not allow to start with '9'
                if (value.charAt(0) + '' == '9') {
                    return false;
                }

                sum = 0;
                for (var i = 0; i < 7; i++) {
                    sum += parseInt(value.charAt(i), 10) * (8 - i);
                }
                sum = 11 - sum % 11;
                if (sum == 10) {
                    sum = 0;
                }
                if (sum == 11) {
                    sum = 1;
                }

                return (sum == value.substr(7, 1));
            } else if (value.length == 9 && (value.charAt(0) + '' == '6')) {
                sum = 0;
                // Skip the first (which is 6)
                for (var i = 0; i < 7; i++) {
                    sum += parseInt(value.charAt(i + 1), 10) * (8 - i);
                }
                sum = 11 - sum % 11;
                if (sum == 10) {
                    sum = 0;
                }
                if (sum == 11) {
                    sum = 1;
                }
                sum = [8, 7, 6, 5, 4, 3, 2, 1, 0, 9, 10][sum - 1];
                return (sum == value.substr(8, 1));
            } else if (value.length == 9 || value.length == 10) {
                // Validate Czech birth number (Rodné číslo), which is also national identifier
                var rc = function(value) {
                    var year  = 1900 + parseInt(value.substr(0, 2)),
                        month = parseInt(value.substr(2, 2)) % 50 % 20,
                        day   = parseInt(value.substr(4, 2));
                    if (value.length == 9) {
                        if (year >= 1980) {
                            year -= 100;
                        }
                        if (year > 1953) {
                            return false;
                        }
                    } else if (year < 1954) {
                        year += 100;
                    }

                    try {
                        var d = new Date(year, month, day);
                    } catch (ex) {
                        return false;
                    }

                    // Check that the birth date is not in the future
                    if (value.length == 10) {
                        var check = parseInt(value.substr(0, 9), 10) % 11;
                        if (year < 1985) {
                            check = check % 10;
                        }
                        return (check == value.substr(9, 1));
                    }

                    return true;
                };
            }

            return false;
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
            if (!/^DE[0-9]{9}$/.test(value)) {
                return false;
            }

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
            if (!/^DK[0-9]{8}$/.test(value)) {
                return false;
            }

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
            if (!/^EE[0-9]{9}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            var sum    = 0,
                weight = [3, 7, 1, 3, 7, 1, 3, 7, 1];

            for (var i = 0; i < 9; i++) {
                sum += parseInt(value.charAt(i)) * weight[i];
            }

            return (sum % 10 == 0);
        },

        /**
         * Validate Spanish VAT number (NIF - Número de Identificación Fiscal)
         * Can be:
         * i) DNI (Documento nacional de identidad), for Spaniards
         * ii) NIE (Número de Identificación de Extranjeros), for foreigners
         * iii) CIF (Certificado de Identificación Fiscal), for legal entities and others
         *
         * Examples:
         * - Valid: i) ES54362315K; ii) ESX2482300W, ESX5253868R; iii) ESM1234567L, ESJ99216582, ESB58378431, ESB64717838
         * - Invalid: i) ES54362315Z; ii) ESX2482300A; iii) ESJ99216583
         *
         * @param {String} value VAT number
         * @return {Boolean}
         */
        _es: function(value) {
            if (!/^ES[0-9A-Z][0-9]{7}[0-9A-Z]$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            var dni = function(value) {
                    var check = parseInt(value.substr(0, 8), 10);
                    check = 'TRWAGMYFPDXBNJZSQVHLCKE'[check % 23];
                    return (check == value.substr(8, 1));
                },
                nie = function(value) {
                    var check = ['XYZ'.indexOf(value.charAt(0)), value.substr(1)].join('');
                    check = parseInt(check, 10);
                    check = 'TRWAGMYFPDXBNJZSQVHLCKE'[check % 23];
                    return (check == value.substr(8, 1));
                },
                cif = function(value) {
                    var first = value.charAt(0), check;
                    if ('KLM'.indexOf(first) != -1) {
                        // K: Spanish younger than 14 year old
                        // L: Spanish living outside Spain without DNI
                        // M: Granted the tax to foreigners who have no NIE
                        check = parseInt(value.substr(1, 8), 10);
                        check = 'TRWAGMYFPDXBNJZSQVHLCKE'[check % 23];
                        return (check == value.substr(8, 1));
                    } else if ('ABCDEFGHJNPQRSUVW'.indexOf(first) != -1) {
                        var sum    = 0,
                            weight = [2, 1, 2, 1, 2, 1, 2],
                            temp   = 0;

                        for (var i = 0; i < 7; i++) {
                            temp = parseInt(value.charAt(i + 1)) * weight[i];
                            if (temp > 9) {
                                temp = Math.floor(temp / 10) + temp % 10;
                            }
                            sum += temp;
                        }
                        sum = 10 - sum % 10;
                        return (sum == value.substr(8, 1) || 'JABCDEFGHI'[sum] == value.substr(8, 1));
                    }

                    return false;
                };

            var first = value.charAt(0);
            if (/^[0-9]$/.test(first)) {
                return dni(value);
            } else if (/^[XYZ]$/.test(first)) {
                return nie(value);
            } else {
                return cif(value);
            }
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
            if (!/^FI[0-9]{8}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            var sum    = 0,
                weight = [7, 9, 10, 5, 8, 4, 2, 1];

            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i)) * weight[i];
            }

            return (sum % 11 == 0);
        },

        /**
         * Validate French VAT number (TVA - taxe sur la valeur ajoutée)
         * It's constructed by a SIREN number, prefixed by two characters.
         *
         * Examples:
         * - Valid: FR40303265045, FR23334175221, FRK7399859412, FR4Z123456782
         * - Invalid: FR84323140391
         *
         * @param {String} value VAT number
         * @return {Boolean}
         */
        _fr: function(value) {
            if (!/^FR[0-9A-Z]{2}[0-9]{9}$/.test(value)) {
                return false;
            }

            value = value.substr(2);

            // Validate SIREN number first
            var siren = function(value) {
                var sum    = 0,
                    length = value.length,
			        tmp;
                for (var i = 0; i < length; i++) {
                    tmp = parseInt(value.charAt(i), 10);
                    if ((i % 2) == 1) {
                        tmp = tmp * 2;
                        if (tmp > 9) {
                            tmp -= 9;
                        }
                    }
                    sum += tmp;
                }
                return (sum % 10 == 0);
            };

			if (!siren(value.substr(2))) {
                return false;
            }

            if (/^[0-9]{2}$/.test(value.substr(0, 2))) {
                // First two characters are digits
                return value.substr(0, 2) == (parseInt(value.substr(2) + '12', 10) % 97);
            } else {
                // The first characters cann't be O and I
                var alphabet = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ',
                    check;
                // First one is digit
                if (/^[0-9]{1}$/.test(value.charAt(0))) {
                    check = alphabet.indexOf(value.charAt(0)) * 24 + alphabet.indexOf(value.charAt(1)) - 10;
                } else {
                    check = alphabet.indexOf(value.charAt(0)) * 34 + alphabet.indexOf(value.charAt(1)) - 100;
                }
                return ((parseInt(value.substr(2), 10) + 1 + Math.floor(check / 11)) % 11) == (check % 11);
            }
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
            if (!/^GR[0-9]{9}$/.test(value)) {
                return false;
            }

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

        // EL is traditionally prefix of Greek VAT numbers
        _el: function(value) {
            if (!/^EL[0-9]{9}$/.test(value)) {
                return false;
            }

            value = 'GR' + value.substr(2);
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
            if (!/^HU[0-9]{8}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            var sum    = 0,
                weight = [9, 7, 3, 1, 9, 7, 3, 1];

            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i)) * weight[i];
            }

            return (sum % 10 == 0);
        },

        /**
         * Validate Croatian VAT number
         * Examples:
         * - Valid: HR33392005961
         * - Invalid: HR33392005962
         *
         * @param {String} value VAT number
         * @return {Boolean}
         */
        _hr: function(value) {
            if (!/^HR[0-9]{11}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            var sum  = 10,
                temp = 0;

            for (var i = 0; i < 10; i++) {
                temp = (parseInt(value.charAt(i), 10) + sum) % 10;
                if (temp == 0) {
                    temp = 10;
                }
                sum = (temp * 2) % 11;
            }
            sum += parseInt(value.substr(10, 1), 10);
            return (sum % 10 == 1);
        },

        /**
         * Validate Irish VAT number
         * Examples:
         * - Valid: IE6433435F, IE6433435OA, IE8D79739I
         * - Invalid: IE8D79738J
         *
         * @param {String} value VAT number
         * @return {Boolean}
         */
        _ie: function(value) {
            if (!/^IE[0-9]{1}[0-9A-Z\*\+]{1}[0-9]{5}[A-Z]{1,2}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            var getCheckDigit = function(value) {
                while (value.length < 7) {
                    value = '0' + value;
                }
                var alphabet = 'WABCDEFGHIJKLMNOPQRSTUV',
                    sum      = 0;
                for (var i = 0; i < 7; i++) {
                    sum += parseInt(value.charAt(i)) * (8 - i);
                }
                sum += 9 * alphabet.indexOf(value.substr(7));
                return alphabet[sum % 23];
            };

            // The first 7 characters are digits
            if (/^[0-9]+$/.test(value.substr(0, 7))) {
                // New system
                return value.charAt(7) == getCheckDigit(value.substr(0, 7) + value.substr(8) + '');
            } else if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ+*'.indexOf(value.charAt(1)) != -1) {
                // Old system
                return value.charAt(7) == getCheckDigit(value.substr(2, 5) + value.substr(0, 1) + '');
            }

            return true;
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
            if (!/^LU[0-9]{8}$/.test(value)) {
                return false;
            }

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
            if (!/^MT[0-9]{8}$/.test(value)) {
                return false;
            }

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
            if (!/^PL[0-9]{10}$/.test(value)) {
                return false;
            }

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
            if (!/^PT[0-9]{9}$/.test(value)) {
                return false;
            }

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
            if (!/^SI[0-9]{8}$/.test(value)) {
                return false;
            }

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
        },

        /**
         * Validate Slovak VAT number
         * Examples:
         * - Valid: SK2022749619
         * - Invalid: SK2022749618
         *
         * @param {String} value VAT number
         * @return {Boolean}
         */
        _sk: function(value) {
            if (!/^SK[1-9][0-9][(2-4)|(6-9)][0-9]{7}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            return (value % 11 == 0);
        }
    };
}(window.jQuery));
