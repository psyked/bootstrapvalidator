(function($) {
    $.fn.bootstrapValidator.validators.cvv = {
        /**
         * Return true if the input value is a valid CVV number.
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            return /^[0-9]{3,4}$/.test(value);
        }
    };
}(window.jQuery));
