(function($) {
    $.extend($.bootstrapValidator.validator, {
        between: {
            /**
             * Return true if the input value is between (strictly or not) two given numbers
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {HTMLElement} element
             * @param {Object} options Can consist of the following keys:
             * - min
             * - max
             * - inclusive [optional]: Can be true or false. Default is true
             * - message: The invalid message
             * @returns {boolean}
             */
            validate: function(validateInstance, element, options) {
                var value = parseFloat($(element).val());
                return (options.inclusive === true)
                            ? (value > options.min && value < options.max)
                            : (value >= options.min && value <= options.max);
            }
        }
    });
}(window.jQuery));
