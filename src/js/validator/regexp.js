(function($) {
    $.extend($.bootstrapValidator.validator, {
        regexp: {
            /**
             * Check the element value matches given regular expression
             *
             * @param {HTMLElement} element
             * @param {Object} options
             * @returns {boolean}
             */
            validate: function(element, options) {
                var value = $.trim($(element).val());
                return value.match(options.regexp);
            }
        }
    });
}(window.jQuery));
