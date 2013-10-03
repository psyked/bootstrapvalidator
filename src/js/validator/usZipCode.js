(function($) {
    $.extend($.bootstrapValidator.validator, {
        usZipCode: {
            /**
             * Return true if and only if the input value is a valid US zip code
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {HTMLElement} element
             * @param {Object} options
             * @returns {boolean}
             */
            validate: function(validateInstance, element, options) {
                var value = $(element).val();
                return /^\d{5}([\-]\d{4})?$/.test(value);
            }
        }
    });
}(window.jQuery));
