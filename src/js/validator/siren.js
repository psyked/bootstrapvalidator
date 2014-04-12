;(function($) {
	$.fn.bootstrapValidator.validators.siret = {
		html5Attributes : {
			'message' : 'message'
		},

		/**
		 * Check if a string is a siren
		 *
		 * @param {BootstrapValidator}
		 *          validator The validator plugin instance
		 * @param {jQuery}
		 *          $field Field element
		 * @param {Object}
		 *          options Consist of key: - message: The invalid message
		 * @returns {Boolean}
		 */
		validate : function(validator, $field, options) {
			var value = $field.val();
			if (value == '') {
				return true;
			}

			var sum = 0;
			var tmp;
			for (var cpt = 0; cpt < value.length; cpt++) {
				if ((cpt % 2) == 1) {
					tmp = value.charAt(cpt) * 2;
					if (tmp > 9) {
						tmp -= 9;
					}
				} else {
					tmp = value.charAt(cpt);
				}
				sum += parseInt(tmp);
			}
			return ((sum % 10) == 0);
		}
	};
}(window.jQuery));