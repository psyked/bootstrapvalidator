(function($) {
    $.fn.bootstrapValidator.i18n.rif = $.extend($.fn.bootstrapValidator.i18n.rif || {}, {
        'default': 'Please enter a valid RIF'
    });

    $.fn.bootstrapValidator.validators.rif = {
        html5Attributes: {
            message: 'message',
            type: 'type'
        },
        /**
         * Return true if the input value is a valid RIF.
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * - type: The type of RIF field. It can be V, E, J, P or G or the name of element which its value is the type
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field;

            if (value === '') {
                return true;
            }

            var $rif = value.val();
            var $rif_type = validator.getFieldElements(options.type).val().toUpperCase();
            var $last_number = $rif.substr($rif.length - 1);
            var $number = $rif.substr(0, 8);

            $valid = /^([VEJPG]{1})([0-9]{9}$)/.test($rif_type + $rif);

            if ($valid) {
                if ($rif_type == "V") {
                    $sum = 1 * 4;
                } else if ($rif_type == "E") {
                    $sum = 2 * 4;
                } else if ($rif_type == "J") {
                    $sum = 3 * 4;
                } else if ($rif_type == "P") {
                    $sum = 4 * 4;
                } else if ($rif_type == "G") {
                    $sum = 5 * 4;
                }

                $n0 = $number.charAt(0) * 3;
                $n1 = $number.charAt(1) * 2;
                $n2 = $number.charAt(2) * 7;
                $n3 = $number.charAt(3) * 6;
                $n4 = $number.charAt(4) * 5;
                $n5 = $number.charAt(5) * 4;
                $n6 = $number.charAt(6) * 3;
                $n7 = $number.charAt(7) * 2;

                $sum += $n0 + $n1 + $n2 + $n3 + $n4 + $n5 + $n6 + $n7;

                $mod = $sum % 11;
                $last_val = 11 - $mod;

                if ($last_val == 11 || $last_val == 10) {
                    $last_val = 0;
                }

                if ($last_number == $last_val) {
                    return true;
                } else {
                    return false;
                }
            }

            return false;
        }
    };
}(window.jQuery));