(function($) {
    $.fn.bootstrapValidator.i18n.color = $.extend($.fn.bootstrapValidator.i18n.color || {}, {
        'default': 'Please enter a valid color'
    });

    $.fn.bootstrapValidator.validators.color = {

        /**
         * Return true if the input value is a valid color
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * - type: The Array of valid color types.fn
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value === '') {
                return true;
            }

            if (options.hasOwnProperty('type') && options.type instanceof Array) { // If no options.type are set, run all of them
                if ($.inArray('hex', options.type)) {
                    return $.fn.bootstrapValidator.validators.hexColor.validate(validator, $field, options);
                }
                if ($.inArray('rgb', options.type)) {
                    return $.fn.bootstrapValidator.validators.rgbColor.validate(validator, $field, options);
                }
                if ($.inArray('rgba', options.type)) {
                    return $.fn.bootstrapValidator.validators.rgbaColor.validate(validator, $field, options);
                }
                if ($.inArray('hsl', options.type)) {
                    return $.fn.bootstrapValidator.validators.hslColor.validate(validator, $field, options);
                }
                if ($.inArray('hsla', options.type)) {
                    return $.fn.bootstrapValidator.validators.hslaColor.validate(validator, $field, options);
                }
                if ($.inArray('keyword', options.type)) {
                    return $.fn.bootstrapValidator.validators.keywordColor.validate(validator, $field, options);
                }
            } else {
                return $.fn.bootstrapValidator.validators.hexColor.validate(validator, $field, options)
                    || $.fn.bootstrapValidator.validators.rgbColor.validate(validator, $field, options)
                    || $.fn.bootstrapValidator.validators.rgbaColor.validate(validator, $field, options)
                    || $.fn.bootstrapValidator.validators.hslColor.validate(validator, $field, options)
                    || $.fn.bootstrapValidator.validators.hslaColor.validate(validator, $field, options)
                    || $.fn.bootstrapValidator.validators.keywordColor.validate(validator, $field, options);
            }

            return false;
        }
    };
}(window.jQuery));
