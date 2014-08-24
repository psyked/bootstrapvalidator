(function($) {
    $.fn.bootstrapValidator.i18n.different = $.extend($.fn.bootstrapValidator.i18n.different || {}, {
        'default': 'Please enter a different value'
    });

    $.fn.bootstrapValidator.validators.different = {
        html5Attributes: {
            message: 'message',
            field: 'field'
        },

        /**
         * Return true if the input value is different with given field's value
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of the following key:
         * - field: The name of field that will be used to compare with current one
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value === '') {
                return true;
            }

            var compareWith = validator.getFieldElements(options.field);
            if (compareWith === null || compareWith.length === 0) {
                return true;
            }
            var spl = options.field.split(',');
            var isValid = true;
            for (i = 0; i < spl.length; i++) {
                var compareWith = validator.getFieldElements(spl[i]);
                if (compareWith == null) {
                    continue;
                }

                if (value == compareWith.val())
                    isValid = false;
                else
                    validator.updateStatus(spl[i], validator.STATUS_VALID, 'different');
            }
            return isValid;
        }
    };
}(window.jQuery));
