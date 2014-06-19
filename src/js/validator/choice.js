(function($) {
    $.fn.bootstrapValidator.i18n.choice = $.extend($.fn.bootstrapValidator.i18n.choice || {}, {
        'default': 'Please enter a valid value',
        less: 'Please choose %s options at minimum',
        more: 'Please choose %s options at maximum',
        between: 'Please choose %s - %s options',

        getMessage: function(options) {
            switch (true) {
                case (!!options.min && !!options.max):
                    return $.fn.bootstrapValidator.helpers.format(this.between, [options.min, options.max]);
                    break;
                case (!!options.min):
                    return $.fn.bootstrapValidator.helpers.format(this.less, [options.min]);
                case (!!options.max):
                    return $.fn.bootstrapValidator.helpers.format(this.more, [options.max]);
                default:
                    return this['default'];
            }
        }
    });

    $.fn.bootstrapValidator.validators.choice = {
        html5Attributes: {
            message: 'message',
            min: 'min',
            max: 'max'
        },

        /**
         * Check if the number of checked boxes are less or more than a given number
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
            var numChoices = $field.is('select')
                            ? validator.getFieldElements($field.attr('data-bv-field')).find('option').filter(':selected').length
                            : validator.getFieldElements($field.attr('data-bv-field')).filter(':checked').length;
            if ((options.min && numChoices < options.min) || (options.max && numChoices > options.max)) {
                return false;
            }

            return true;
        }
    };
}(window.jQuery));
