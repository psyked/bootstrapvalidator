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
                    return this._hexColor(validator, $field, options);
                }
                if ($.inArray('rgb', options.type)) {
                    return this._rgbColor(validator, $field, options);
                }
                if ($.inArray('rgba', options.type)) {
                    return this._rgbaColor(validator, $field, options);
                }
                if ($.inArray('hsl', options.type)) {
                    return this._hslColor(validator, $field, options);
                }
                if ($.inArray('hsla', options.type)) {
                    return this._hslaColor(validator, $field, options);
                }
                if ($.inArray('keyword', options.type)) {
                    return this._keywordColor(validator, $field, options);
                }
            } else {
                return this._hexColor(validator, $field, options)
                    || this._rgbColor(validator, $field, options)
                    || this._rgbaColor(validator, $field, options)
                    || this._hslColor(validator, $field, options)
                    || this._hslaColor(validator, $field, options)
                    || this._keywordColor(validator, $field, options);
            }

            return false;
        },

        _hexColor: function(validator, $field, options) {
            var value = $field.val();
            if (value === '') {
                return true;
            }
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(value);
        },

        _hslColor: function(validator, $field, options) {
            var value = $field.val();
            if (value === '') {
                return true;
            }
            return /^hsl\((\s*(-?\d+)\s*,)(\s*(\b(0?\d{1,2}|100)\b%)\s*,)(\s*(\b(0?\d{1,2}|100)\b%)\s*)\)$/.test(value);
        },

        _hslaColor: function(validator, $field, options) {
            var value = $field.val();
            if (value === '') {
                return true;
            }
            return /^hsla\((\s*(-?\d+)\s*,)(\s*(\b(0?\d{1,2}|100)\b%)\s*,){2}(\s*(0?(\.\d+)?|1(\.0+)?)\s*)\)$/.test(value);
        },

        _keywordColor: function(validator, $field, options) {
            var value = $field.val();
            var colorKeywords = ["transparent", "aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkgrey","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","green","greenyellow","grey","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"];
            if (value === '') {
                return true;
            }
            return $.inArray(value, colorKeywords) >= 0;
        },

        _rgbColor: function(validator, $field, options) {
            var value = $field.val();
            var regexInteger = /^rgb\((\s*(\b([01]?\d{1,2}|2[0-4]\d|25[0-5])\b)\s*,){2}(\s*(\b([01]?\d{1,2}|2[0-4]\d|25[0-5])\b)\s*)\)$/;
            var regexPercent = /^rgb\((\s*(\b(0?\d{1,2}|100)\b%)\s*,){2}(\s*(\b(0?\d{1,2}|100)\b%)\s*)\)$/;
            if (value === '') {
                return true;
            }
            return regexInteger.test(value) || regexPercent.test(value);
        },

        _rgbaColor: function(validator, $field, options) {
            var value = $field.val();
            var regexInteger = /^rgba\((\s*(\b([01]?\d{1,2}|2[0-4]\d|25[0-5])\b)\s*,){3}(\s*(0?(\.\d+)?|1(\.0+)?)\s*)\)$/;
            var regexPercent = /^rgba\((\s*(\b(0?\d{1,2}|100)\b%)\s*,){3}(\s*(0?(\.\d+)?|1(\.0+)?)\s*)\)$/;
            if (value === '') {
                return true;
            }
            return regexInteger.test(value) || regexPercent.test(value);
        }
    };
}(window.jQuery));
