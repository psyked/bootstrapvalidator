(function($) {
    $.fn.bootstrapValidator.validators.allowedValue = {
        /**
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field The jQuery object represents the field element
         * @param {Object} options The validator options
         * @returns {boolean}
         */
        validate: function(validator, $field, options) {
			var value = $field.val();
			var allowedValues = (options.allowedValues !== undefined) ? options.allowedValues : [];
			return ($.inArray(value, allowedValues) > -1 ? true : false);
        }
    };
}(window.jQuery));