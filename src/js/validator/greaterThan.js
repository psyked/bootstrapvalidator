(function($) {
    $.extend($.bootstrapValidator.validator, {
        greaterThan: {
            /**
             * Return true if the input value is greater than or equals to given number
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {HTMLElement} element
             * @param {Object} options Can consist of the following keys:
             * - value: The number used to compare to
             * - strict [optional]: Can be true or false. Default is true
             * - message: The invalid message
             * @returns {boolean}
             */
            validate: function(validateInstance, element, options) {
                var value = parseFloat($(element).val());
                return (options.strict === true) ? (value > options.value) : (value >= options.value);
            }
        }
    });
}(window.jQuery));
