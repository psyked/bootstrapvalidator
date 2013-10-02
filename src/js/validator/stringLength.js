(function($) {
    $.extend($.bootstrapValidator.validator, {
        stringLength: {
            /**
             * Check if the length of element value is less or more than given number
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {HTMLElement} element
             * @param {Object} options Consists of following keys:
             * - min
             * - max
             * At least one of two keys is required
             * @returns {boolean}
             */
            validate: function(validateInstance, element, options) {
                var value = $.trim($(element).val()), length = value.length;
                if ((options.min && length < options.min) || (options.max && length > options.max)) {
                    return false;
                }

                return true;
            }
        }
    });
}(window.jQuery));
