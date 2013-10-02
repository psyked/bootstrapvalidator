(function($) {
    $.extend($.bootstrapValidator.validator, {
        identical: {
            /**
             * Check if input value equals to value of particular one
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {HTMLElement} element
             * @param {Object} options Consists of the following key:
             * - field: The name of field that will be used to compare with current one
             * @returns {boolean}
             */
            validate: function(validateInstance, element, options) {
                var value        = $(element).val(),
                    $compareWith = validateInstance.getForm().find('[name="' + options.field + '"]');
                if (value == $compareWith.val()) {
                    validateInstance.removeError($compareWith);
                    return true;
                } else {
                    return false;
                }
            }
        }
    });
}(window.jQuery));
