(function($) {
    $.extend($.bootstrapValidator.validator, {
        stringLength: {
            /**
             * Check the length of element value is less or more than given number
             *
             * @param {HTMLElement} element
             * @param {Object} options
             * @returns {boolean}
             */
            validate: function(element, options) {
                var value = $.trim($(element).val()), length = value.length;
                if ((options.min && length < options.min) || (options.max && length > options.max)) {
                    return false;
                }

                return true;
            }
        }
    });
}(window.jQuery));
