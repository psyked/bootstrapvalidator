(function($) {
    $.fn.bootstrapValidator.validators.date = {
        html5Attributes: {
            message: 'message',
            format: 'format'
        },

        /**
         * Return true if the input value is valid date
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - format: The date format. Default is MM/DD/YYYY
         * Support the following formats:
         *      YYYY/DD/MM
         *      YYYY/DD/MM h:m A
         *      YYYY/MM/DD
         *      YYYY/MM/DD h:m A
         *
         *      YYYY-DD-MM
         *      YYYY-DD-MM h:m A
         *      YYYY-MM-DD
         *      YYYY-MM-DD h:m A
         *
         *      MM/DD/YYYY
         *      MM/DD/YYYY h:m A
         *      DD/MM/YYYY
         *      DD/MM/YYYY h:m A
         *
         *      MM-DD-YYYY
         *      MM-DD-YYYY h:m A
         *      DD-MM-YYYY
         *      DD-MM-YYYY h:m A
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }
            // Determine the separator
            options.format = options.format || 'MM/DD/YYYY';
            var separator = (options.format.indexOf('/') != -1)
                            ? '/'
                            : ((options.format.indexOf('-') != -1) ? '-' : null);
            if (separator == null) {
                return false;
            }

            var month, day, year, minutes = null, hours = null, matches;
            switch (true) {
                case (separator == '/' && (matches = value.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/i)) && options.format == 'YYYY/DD/MM'):
                case (separator == '-' && (matches = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/i)) && options.format == 'YYYY-DD-MM'):
                    year = matches[1]; day = matches[2]; month = matches[3];
                    break;

                case (separator == '/' && (matches = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/i)) && options.format == 'DD/MM/YYYY'):
                case (separator == '-' && (matches = value.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/i)) && options.format == 'DD-MM-YYYY'):
                    day = matches[1]; month = matches[2]; year = matches[3];
                    break;

                case (separator == '/' && (matches = value.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/i)) && options.format == 'YYYY/MM/DD'):
                case (separator == '-' && (matches = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/i)) && options.format == 'YYYY-MM-DD'):
                    year = matches[1]; month = matches[2]; day = matches[3];
                    break;

                case (separator == '/' && (matches = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/i)) && options.format == 'MM/DD/YYYY'):
                case (separator == '-' && (matches = value.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/i)) && options.format == 'MM-DD-YYYY'):
                    month = matches[1]; day = matches[2]; year = matches[3];
                    break;

                case (separator == '/' && (matches = value.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})\s+(\d{1,2}):(\d{1,2})\s+(AM|PM)$/i)) && options.format == 'YYYY/DD/MM h:m A'):
                case (separator == '-' && (matches = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{1,2})\s+(AM|PM)$/i)) && options.format == 'YYYY-DD-MM h:m A'):
                    year = matches[1]; day = matches[2]; month = matches[3]; hours = matches[4]; minutes = matches[5];
                    break;

                case (separator == '/' && (matches = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{1,2})\s+(AM|PM)$/i)) && options.format == 'DD/MM/YYYY h:m A'):
                case (separator == '-' && (matches = value.match(/^(\d{1,2})-(\d{1,2})-(\d{4})\s+(\d{1,2}):(\d{1,2})\s+(AM|PM)$/i)) && options.format == 'DD-MM-YYYY h:m A'):
                    day = matches[1]; month = matches[2]; year = matches[3]; hours = matches[4]; minutes = matches[5];
                    break;

                case (separator == '/' && (matches = value.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})\s+(\d{1,2}):(\d{1,2})\s+(AM|PM)$/i)) && options.format == 'YYYY/MM/DD h:m A'):
                case (separator == '-' && (matches = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{1,2})\s+(AM|PM)$/i)) && options.format == 'YYYY-MM-DD h:m A'):
                    year = matches[1]; month = matches[2]; day = matches[3]; hours = matches[4]; minutes = matches[5];
                    break;

                case (separator == '/' && (matches = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{1,2})\s+(AM|PM)$/i)) && options.format == 'MM/DD/YYYY h:m A'):
                case (separator == '-' && (matches = value.match(/^(\d{1,2})-(\d{1,2})-(\d{4})\s+(\d{1,2}):(\d{1,2})\s+(AM|PM)$/i)) && options.format == 'MM-DD-YYYY h:m A'):
                    month = matches[1]; day = matches[2]; year = matches[3]; hours = matches[4]; minutes = matches[5];
                    break;

                default:
                    return false;
            }

            // Validate hours and minutes
            if (hours && minutes) {
                hours   = parseInt(hours, 10);
                minutes = parseInt(minutes, 10);
                if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) {
                    return false;
                }
            }

            // Validate day, month, and year
            day   = parseInt(day, 10);
            month = parseInt(month, 10);
            year  = parseInt(year, 10);

            if (year < 1000 || year > 9999 || month == 0 || month > 12) {
                return false;
            }

            var numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            // Update the number of days in Feb of leap year
            if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
                numDays[1] = 29;
            }

            // Check the day
            return (day > 0 && day <= numDays[month - 1]);
        }
    };
}(window.jQuery));
