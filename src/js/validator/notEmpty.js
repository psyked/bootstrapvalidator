(function($) {
    $.extend($.bootstrapValidator.validator, {
        notEmpty: {
            /**
             * Check if input value is empty or not
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {jQuery} $field Field element
             * @param {Object} options
             * @returns {boolean}
             */
            validate: function(validateInstance, $field, options) {
                var type = $field.attr('type');
                return ('checkbox' == type || 'radio' == type) ? $field.is(':checked') : ($.trim($field.val()) != '');
            }
        }
    });
}(window.jQuery));
