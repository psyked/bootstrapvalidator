(function($) {
    $.fn.bootstrapValidator.validators.callback = {
        /**
         * Return result from the callback method
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - callback: The callback method that passes 2 parameters:
         *      callback: function(fieldValue, validator) {
         *          // fieldValue is the value of field
         *          // validator is instance of BootstrapValidator
         *      }
         * - message: The invalid message
         * @returns {Boolean|Deferred}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (options.callback && 'function' == typeof options.callback) {
<<<<<<< HEAD
                var dfd = new $.Deferred();
                dfd.resolve(options.callback.call(this, value, validator), 'callback');
                return dfd;
=======
                return options.callback.call(this, value, validator);
>>>>>>> c025cbea8fc37eb3c7b6c2d3dad0b670a5de40b6
            }
            return true;
        }
    };
}(window.jQuery));
