(function ($) {

    $.fn.bootstrapValidator.validators.blank = {
        /**
         * placeholder validator that can be used to display a custom validation message 
         * returned from the server
         * Example:
         *
         * (0) a "blank" validator is applied to an input field.
         * (1) data is entered via the UI that is unable to be validated client-side.  
         * (2) server returns a 400 with JSON data that contains the field that failed 
         *     validation and an associated message.
         * (3) ajax 400 call handler does the following:
         *
         *      bv.updateMessage(field, 'blank', errorMessage);
         *      bv.updateStatus(field, 'INVALID');
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */

        validate: function (validator, $field, options) {
            return true;
        }
    };

}(window.jQuery));
