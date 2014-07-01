(function($) {
    $.fn.bootstrapValidator.i18n.zipCode = $.extend($.fn.bootstrapValidator.i18n.zipCode || {}, {
        'default': 'Please enter a valid zip code',
        countryNotSupported: 'The country code %s is not supported',
        country: 'Please enter a valid %s',
        countries: {
            'CA': 'Canadian postal code',
            'DK': 'Danish postal code',
            'GB': 'United Kingdom postal code',
            'IT': 'Italian postal code',
            'NL': 'Dutch postal code',
            'SE': 'Swiss postal code',
            'SG': 'Singapore postal code',
            'US': 'US zip code'
        },

        getMessage: function(options) {
            var country = (options.country || 'US').toUpperCase();
            if ($.inArray(country, $.fn.bootstrapValidator.validators.zipCode.COUNTRIES) === -1) {
                return $.fn.bootstrapValidator.helpers.format(this.countryNotSupported, country);
            }

            if (this.countries[country]) {
                return $.fn.bootstrapValidator.helpers.format(this.country, this.countries[country]);
            }

            return this['default'];
        }
    });

    $.fn.bootstrapValidator.validators.zipCode = {
        html5Attributes: {
            message: 'message',
            country: 'country',
            countryfield: 'countryfield'
        },

        COUNTRIES: ['CA', 'DK', 'GB', 'IT', 'NL', 'SE', 'SG', 'US'],

        /**
         * Return true if and only if the input value is a valid country zip code
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * - country: The ISO 3166 country code
         * - counryfield: Another field that contains the country code
         *
         * Currently it supports the following countries:
         * - US (United State)
         * - CA (Canada)
         * - DK (Denmark)
         * - GB (United Kingdom)
         * - IT (Italy)
         * - NL (Netherlands)
         * - SE (Sweden)
         * - SG (Singapore)
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value === '' || (!options.country && !options.countryfield)) {
                return true;
            }

            var cField = options.countryfield ? validator.getFieldElements(options.countryfield) : null;
            var country = (cField ? cField.val() : null || options.country || 'US').toUpperCase();
            if ($.inArray(country, this.COUNTRIES) === -1) {
                return false;
            }

            switch (country) {
                case 'CA': return /^(?:A|B|C|E|G|H|J|K|L|M|N|P|R|S|T|V|X|Y){1}[0-9]{1}(?:A|B|C|E|G|H|J|K|L|M|N|P|R|S|T|V|X|Y){1}\s?[0-9]{1}(?:A|B|C|E|G|H|J|K|L|M|N|P|R|S|T|V|X|Y){1}[0-9]{1}$/i.test(value);
                case 'DK': return /^(DK(-|\s)?)?\d{4}$/i.test(value);
                case 'GB': return this._gb(value);

                // http://en.wikipedia.org/wiki/List_of_postal_codes_in_Italy
                case 'IT': return /^(I-|IT-)?\d{5}$/i.test(value);

                // http://en.wikipedia.org/wiki/Postal_codes_in_the_Netherlands
                case 'NL': return /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i.test(value);

                case 'SE': return /^(S-)?\d{3}\s?\d{2}$/i.test(value);
                case 'SG': return /^([0][1-9]|[1-6][0-9]|[7]([0-3]|[5-9])|[8][0-2])(\d{4})$/i.test(value);
                case 'US':
                /* falls through */
                default: return /^\d{4,5}([\-]?\d{4})?$/.test(value);
            }
        },

        /**
         * Validate United Kingdom postcode
         * Examples:
         * - Standard: EC1A 1BB, W1A 1HQ, M1 1AA, B33 8TH, CR2 6XH, DN55 1PT
         * - Special cases:
         * AI-2640, ASCN 1ZZ, GIR 0AA
         *
         * @see http://en.wikipedia.org/wiki/Postcodes_in_the_United_Kingdom
         * @param {String} value The postcode
         * @returns {Boolean}
         */
        _gb: function(value) {
            var firstChar  = '[ABCDEFGHIJKLMNOPRSTUWYZ]',     // Does not accept QVX
                secondChar = '[ABCDEFGHKLMNOPQRSTUVWXY]',     // Does not accept IJZ
                thirdChar  = '[ABCDEFGHJKPMNRSTUVWXY]',
                fourthChar = '[ABEHMNPRVWXY]',
                fifthChar  = '[ABDEFGHJLNPQRSTUWXYZ]',
                regexps    = [
                    // AN NAA, ANN NAA, AAN NAA, AANN NAA format
                    new RegExp('^(' + firstChar + '{1}' + secondChar + '?[0-9]{1,2})(\\s*)([0-9]{1}' + fifthChar + '{2})$', 'i'),
                    // ANA NAA
                    new RegExp('^(' + firstChar + '{1}[0-9]{1}' + thirdChar + '{1})(\\s*)([0-9]{1}' + fifthChar + '{2})$', 'i'),
                    // AANA NAA
                    new RegExp('^(' + firstChar + '{1}' + secondChar + '{1}?[0-9]{1}' + fourthChar + '{1})(\\s*)([0-9]{1}' + fifthChar + '{2})$', 'i'),

                    new RegExp('^(BF1)(\\s*)([0-6]{1}[ABDEFGHJLNPQRST]{1}[ABDEFGHJLNPQRSTUWZYZ]{1})$', 'i'),        // BFPO postcodes
                    /^(GIR)(\s*)(0AA)$/i,                       // Special postcode GIR 0AA
                    /^(BFPO)(\s*)([0-9]{1,4})$/i,               // Standard BFPO numbers
                    /^(BFPO)(\s*)(c\/o\s*[0-9]{1,3})$/i,        // c/o BFPO numbers
                    /^([A-Z]{4})(\s*)(1ZZ)$/i,                  // Overseas Territories
                    /^(AI-2640)$/i                              // Anguilla
                ];
            for (var i = 0; i < regexps.length; i++) {
                if (regexps[i].test(value)) {
                    return true;
                }
            }

            return false;
        }
    };
}(window.jQuery));
