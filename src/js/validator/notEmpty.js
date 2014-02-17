(function($) {
    $.fn.bootstrapValidator.validators.notEmpty = {
        /**
         * Check if input value is empty or not
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {


            var type = $field.attr('type');
            if('radio' == type) {
                var radioSelector = "input[name=" + $field.attr('name') + "]:checked";
                return ($(radioSelector).length > 0);
            }

            return ('checkbox' == type) ? $field.is(':checked') : ($.trim($field.val()) != '');
        }
    };
}(window.jQuery));
