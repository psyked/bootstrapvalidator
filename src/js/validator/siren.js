(function($) {
	$.fn.bootstrapValidator.validators.siret = {
		/**
		 * Check if a string is a siren number
		 *
		 * @param {BootstrapValidator} validator The validator plugin instance
		 * @param {jQuery} $field Field element
		 * @param {Object} options Consist of key:
         * - message: The invalid message
		 * @returns {Boolean}
		 */
		validate: function(validator, $field, options) {
			var value = $field.val();
			if (value == '') {
				return true;
			}

			var sum    = 0,
                length = value.length,
			    tmp;
			for (var i = 0; i < length; i++) {
				if ((i % 2) == 1) {
					tmp = value.charAt(i) * 2;
					if (tmp > 9) {
						tmp -= 9;
					}
				} else {
					tmp = value.charAt(i);
				}
				sum += parseInt(tmp);
			}
			return ((sum % 10) == 0);
		}
	};
}(window.jQuery));