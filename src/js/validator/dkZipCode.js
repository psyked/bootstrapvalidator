(function($) {
    $.fn.bootstrapValidator.validators.dkZipCode = {
        /**
         * Return true if and only if the input value is a valid DK zip code
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options
         * @returns {Boolean}
         */
        validate: function(validateInstance, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }
            return /^(DK(-|\s)?)?\d{4}$/i.test(value);
        }
    };
}(window.jQuery));
