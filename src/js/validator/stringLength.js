(function($) {
    $.fn.bootstrapValidator.i18n.stringLength = $.extend($.fn.bootstrapValidator.i18n.stringLength || {}, {
        'default': 'The value length is not valid',
        less: 'The value must be less than %s characters long',
        more: 'The value must be more than %s characters long',
        between: 'The value must be between %s and %s characters long',

        getMessage: function(options) {
            switch (true) {
                case (!!options.min && !!options.max):
                    return $.fn.bootstrapValidator.helpers.format(this.between, [options.min, options.max]);
                    break;
                case (!!options.min):
                    return $.fn.bootstrapValidator.helpers.format(this.more, [options.min]);
                case (!!options.max):
                    return $.fn.bootstrapValidator.helpers.format(this.less, [options.max]);
            }
        }
    });

    $.fn.bootstrapValidator.validators.stringLength = {
        html5Attributes: {
            message: 'message',
            min: 'min',
            max: 'max'
        },

        enableByHtml5: function($field) {
            var maxLength = $field.attr('maxlength');
            if (maxLength) {
                return {
                    max: parseInt(maxLength, 10)
                };
            }

            return false;
        },

        /**
         * Check if the length of element value is less or more than given number
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of following keys:
         * - min
         * - max
         * At least one of two keys is required
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            var length = $.trim(value).length;
            if ((options.min && length < options.min) || (options.max && length > options.max)) {
                return false;
            }

            return true;
        }
    };
}(window.jQuery));
