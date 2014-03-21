(function($) {
    $.fn.bootstrapValidator.validators.isbn = {
        /**
         * Return true if the input value is a valid ISBN 10 or ISBN 13 number
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            // Replace all special characters except digits and X
            value = value.replace(/[^\dX]/gi, '');
            var chars = value.split(''),
                sum   = 0,
                checksum;

            // See http://en.wikipedia.org/wiki/International_Standard_Book_Number
            switch (chars.length) {
                // ISBN 10
                case 10:
                    sum = 0;
                    for (var i = 0; i < 9; i++) {
                        sum += ((10 - i) * parseInt(chars[i]));
                    }
                    checksum = 11 - (sum % 11);
                    if (checksum == 11) {
                        checksum = 0;
                    } else if (checksum == 10) {
                        checksum = 'X';
                    }
                    return (checksum == chars[9]);

                // ISBN 13
                case 13:
                    sum = 0;
                    for (var i = 0; i < 12; i++) {
                        sum += ((i % 2 == 0) ? parseInt(chars[i]) : (parseInt(chars[i]) * 3));
                    }
                    checksum = 10 - (sum % 10);
                    if (checksum == 10) {
                        checksum = '0';
                    }
                    return (checksum == chars[12]);

                default:
                    return false;
            }
        }
    };
}(window.jQuery));
