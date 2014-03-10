(function($) {
    $.fn.bootstrapValidator.validators.date = {
        /**
         * Return true if the input value is valid date
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - format: The date format.
         * It is a combination of YYYY, MM, DD, and separators (which can be / or -)
         * Default is MM/DD/YYYY
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }
            options.format = options.format || 'MM/DD/YYYY';

            var separator = (options.format.indexOf('/') == -1) ? '-' : '/',
                parts     = value.split(separator);
            if (parts.length != 3) {
                return false;
            }

            var d, m, y;
            switch (options.format.toUpperCase().replace(/-/g, '/')) {
                case 'YYYY/MM/DD':
                    d = parts[2];
                    m = parts[1];
                    y = parts[0];
                    break;
                case 'YYYY/DD/MM':
                    d = parts[1];
                    m = parts[2];
                    y = parts[0];
                    break;
                case 'DD/MM/YYYY':
                    d = parts[0];
                    m = parts[1];
                    y = parts[2];
                    break;
                case 'MM/DD/YYYY':
                    d = parts[1];
                    m = parts[0];
                    y = parts[2];
                    break;
                default:
                    return false;
            }

            d = parseInt(d, 10);
            m = parseInt(m, 10);
            y = parseInt(y, 10);

            if (y < 1000 || y > 9999 || m == 0 || m > 12) {
                return false;
            }

            var numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            // Update the number of days in Feb of leap year
            if (y % 400 == 0 || (y % 100 != 0 && y % 4 == 0)) {
                numDays[1] = 29;
            }

            // Check the day
            return (d > 0 && d <= numDays[m - 1]);
        }
    };
}(window.jQuery));

