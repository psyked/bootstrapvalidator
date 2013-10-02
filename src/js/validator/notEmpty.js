(function($) {
    $.extend($.bootstrapValidator.validator, {
        notEmpty: {
            /**
             * Check if input value is empty or not
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {HTMLElement} element
             * @param {Object} options
             * @returns {boolean}
             */
            validate: function(validateInstance, element, options) {
                var value = $.trim($(element).val());
                return (value != '');
            }
        }
    });
}(window.jQuery));
