(function($) {
    $.extend($.bootstrapValidator.validator, {
        remote: {
            /**
             * Request a remote server to check the input value
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {jQuery} $field Field element
             * @param {Object} options Can consist of the following keys:
             * - url
             * - data [optional]: By default, it will take the value
             *  {
             *      <fieldName>: <fieldValue>
             *  }
             * - message: The invalid message
             * @returns {string}
             */
            validate: function(validateInstance, $field, options) {
                var value = $field.val(), name = $field.attr('name');
                var data = options.data;
                if (data == null) {
                    data       = {};
                    data[name] = value;
                }
                var xhr = $.ajax({
                    type: 'POST',
                    url: options.url,
                    dataType: 'json',
                    data: data
                }).success(function(response) {
                    validateInstance.completeRequest($field, 'remote');
                    if (response.valid === false || response.valid === 'false') {
                        validateInstance.showError($field, 'remote');
                    }
                });
                validateInstance.startRequest($field, 'remote', xhr);

                return 'pending';
            }
        }
    });
}(window.jQuery));
