(function($) {
    $.extend($.bootstrapValidator.validator, {
        stringLength: {
            validate: function(element, options) {
                var value = $.trim($(element).val()), length = value.length;
                if ((options.min && length < options.min) || (options.max && length > options.max)) {
                    return false;
                }

                return true;
            }
        }
    });
}(window.jQuery));
