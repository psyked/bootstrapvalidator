(function($) {
    $.extend($.bootstrapValidator.validator, {
        digits: {
            /**
             * Return true if the input value contains digits only
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {jQuery} $field Field element
             * @param {Object} options
             * @returns {boolean}
             */
            validate: function(validateInstance, $field, options) {
                return /^\d+$/.test($field.val());
            }
        }
    });
}(window.jQuery));
