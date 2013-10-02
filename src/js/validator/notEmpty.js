(function($) {
    $.extend($.bootstrapValidator.validator, {
        notEmpty: {
            validate: function(element, options) {
                var value = $.trim($(element).val());
                return (value != '');
            }
        }
    });
}(window.jQuery));
