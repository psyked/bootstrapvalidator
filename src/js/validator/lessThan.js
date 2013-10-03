(function($) {
    $.extend($.bootstrapValidator.validator, {
        lessThan: {
            /**
             * Return true if the input value is less than or equal to given number
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {HTMLElement} element
             * @param {Object} options Can consist of the following keys:
             * - value: The number used to compare to
             * - inclusive [optional]: Can be true or false. Default is true
             * - message: The invalid message
             * @returns {boolean}
             */
            validate: function(validateInstance, element, options) {
                var value = parseFloat($(element).val());
                return (options.inclusive === true) ? (value < options.value) : (value <= options.value);
            }
        }
    });
}(window.jQuery));
