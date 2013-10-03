(function($) {
    $.extend($.bootstrapValidator.validator, {
        remote: {
            /**
             * Request a remote server to check the input value
             *
             * @param {bootstrapValidator} validateInstance Validate plugin instance
             * @param {HTMLElement} element
             * @param {Object} options Can consist of the following keys:
             * - url
             * - data [optional]: By default, it will take the value
             *  {
             *      <fieldName>: <fieldValue>
             *  }
             * - message: The invalid message
             * @returns {string}
             */
            validate: function(validateInstance, element, options) {
                var value = $(element).val(), name = $(element).attr('name');
                if (!options.data) {
                    options.data       = {};
                    options.data[name] = value;
                }
                var xhr = $.ajax({
                    type: 'POST',
                    url: options.url,
                    dataType: 'json',
                    data: options.data
                }).success(function(response) {
                    validateInstance.completeRequest(element, 'remote');
                    if (response.valid === true || response.valid === 'true') {
                        validateInstance.showError(element, 'remote');
                    }
                });
                validateInstance.startRequest(element, 'remote', xhr);

                return 'pending';
            }
        }
    });
}(window.jQuery));
