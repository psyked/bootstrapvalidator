(function($) {
    $.extend($.bootstrapValidator.validator, {
        greaterThan: {
            /**
             * Return true if the input value is greater than or equals to given number
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {jQuery} $field Field element
             * @param {Object} options Can consist of the following keys:
             * - value: The number used to compare to
             * - inclusive [optional]: Can be true or false. Default is true
             * - message: The invalid message
             * @returns {boolean}
             */
            validate: function(validateInstance, $field, options) {
                var value = parseFloat($field.val());
                return (options.inclusive === true) ? (value > options.value) : (value >= options.value);
            }
        }
    });
}(window.jQuery));
