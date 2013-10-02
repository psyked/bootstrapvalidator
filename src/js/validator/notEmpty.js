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
                var $element = $(element),
                    type     = $element.attr('type');
                return ('checkbox' == type || 'radio' == type)
                            ? $element.is(':checked')
                            : ($.trim($(element).val()) != '');
            }
        }
    });
}(window.jQuery));
