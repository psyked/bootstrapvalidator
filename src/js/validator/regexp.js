(function($) {
    $.extend($.bootstrapValidator.validator, {
        regexp: {
            /**
             * Check if the element value matches given regular expression
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {jQuery} $field Field element
             * @param {Object} options Consists of the following key:
             * - regexp: The regular expression you need to check
             * @returns {boolean}
             */
            validate: function(validateInstance, $field, options) {
                var value = $.trim($field.val());
                return value.match(options.regexp);
            }
        }
    });
}(window.jQuery));
