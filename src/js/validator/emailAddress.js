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
         * - separatorRegex: Regex for character or characters expected as separator between addresses; default is comma /[,;]/, i.e. comma or semicolon.
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
                var separatorRegex = options.separatorRegex || /[,;]/;
                var areValid = true;
                var addresses = splitEmailAddresses(value, separatorRegex);

                for (var i = 0; i < addresses.length; i++) {
                    areValid = areValid && emailRegExp.test(addresses[i]);
                }

                return areValid;
            }
            else {
                return emailRegExp.test(value);
            }
        }
    };

    function splitEmailAddresses(emailAddresses, separatorRegex) {
        var quotedFragments = emailAddresses.split(/"/),
            quotedFragmentCount = quotedFragments.length,
            emailAddressArray = [],
            nextEmailAddress = "";

        for (var i = 0; i < quotedFragmentCount; i++) {
            if (i % 2 === 0) {
                var splitEmailAddressFragments = quotedFragments[i].split(separatorRegex);
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
                nextEmailAddress += '"' + quotedFragments[i];

                if (i < quotedFragmentCount - 1)
                    nextEmailAddress += '"';
            }
        }

        emailAddressArray.push(nextEmailAddress);

        return emailAddressArray;
    }
}(window.jQuery));
