(function($) {
    $.fn.bootstrapValidator.i18n.emailAddress = $.extend($.fn.bootstrapValidator.i18n.emailAddress || {}, {
        'default': 'Please enter a valid email address'
    });

    $.fn.bootstrapValidator.validators.emailAddress = {
        enableByHtml5: function($field) {
            return ('email' === $field.attr('type'));
        },

        /**
         * Return true if and only if the input value is a valid email address
         *
         * @param {BootstrapValidator} validator Validate plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} [options]
         * - allowMultiple: Allow multiple email addresses, separated by a comma or semicolon; default is false.
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value === '') {
                return true;
            }

            // Email address regular expression
            // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
            var emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            var allowMultiple = options.allowMultiple === true || options.allowMultiple === 'true';

            if (allowMultiple) {
                return splitEmailAddresses(value).reduce( function(previousValue, currentValue, index, array) {
                    return previousValue && emailRegExp.test(currentValue);
                },
                true);
            }
            else {
                return emailRegExp.test(value);
            }
        }
    };

    function splitEmailAddresses(emailAddresses) {
        var quotedFragments = emailAddresses.split(/"/),
            quotedFragmentCount = quotedFragments.length,
            emailAddressArray = [],
            nextEmailAddress = "";

        for (var i = 0; i < quotedFragmentCount; i++) {
            if (i % 2 === 0) {
                var splitEmailAddressFragments = quotedFragments[i].split(/[,;]/);
                var splitEmailAddressFragmentCount = splitEmailAddressFragments.length;

                if (splitEmailAddressFragmentCount === 1){
                    nextEmailAddress += splitEmailAddressFragments[0];
                }
                else {
                    emailAddressArray.push(nextEmailAddress + splitEmailAddressFragments[0]);

                    for (var j = 1; j < splitEmailAddressFragmentCount - 1; j++) {
                        emailAddressArray.push(splitEmailAddressFragments[j]);
                    }

                    nextEmailAddress = splitEmailAddressFragments[splitEmailAddressFragmentCount - 1];
                }
            }
            else {
                nextEmailAddress += '"' + quotedFragments[i] + '"';
            }
        }

        emailAddressArray.push(nextEmailAddress);

        return emailAddressArray;
    }
}(window.jQuery));
