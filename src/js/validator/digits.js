(function($) {
    $.extend($.bootstrapValidator.validator, {
        digits: {
            /**
             * Return true if the input value contains digits only
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {HTMLElement} element
             * @param {Object} options
             * @returns {boolean}
             */
            validate: function(validateInstance, element, options) {
                return /^\d+$/.test($(element).val());
            }
        }
    });
}(window.jQuery));
