/**
 * BootstrapValidate v0.1.0 (https://github.com/nghuuphuoc/bootstrapvalidate)
 *
 * A jQuery plugin to validate form fields. Use with Bootstrap 3
 *
 * @author      Nguyen Huu Phuoc <phuoc@huuphuoc.me>
 * @copyright   (c) 2013 Nguyen Huu Phuoc
 * @license     MIT
 */

(function($) {
    $.fn.bootstrapValidate = function(options) {
        return this.each(function() {
            var $this = $(this), data = $this.data('bootstrapValidate');
            if (!data) {
                $this.data('bootstrapValidate', (data = new $.bootstrapValidator(this, options)));
            }
        });
    };

    $.bootstrapValidator = function(form, options) {
        this.$form   = $(form);
        this.options = $.extend({}, $.bootstrapValidator.DEFAULT_OPTIONS, options);
        this.validate();
    };
    $.extend($.bootstrapValidator, {
        /**
         * The default options
         */
        DEFAULT_OPTIONS: {
            // Default invalid message
            message: 'This value is not valid',

            // Map the field name with validator rules
            fields: null,

            // CSS class of icons indicating that the field value is valid or not
            iconClass: {
                valid: 'icon-ok',
                invalid: 'icon-remove'
            }
        },

        // Available validators
        validator: {},

        prototype: {
            /**
             * Validate form
             */
            validate: function() {
                if (this.options.fields == null) {
                    return;
                }
                for (var field in this.options.fields) {
                    this.validateField(field);
                }
            },

            // PRIVATE METHODS

            validateField: function(field) {
                if (this.options.fields[field] == null || this.options.fields[field].validator == null) {
                    return;
                }
                var foundFields = this.$form.find('[name="' + field + '"]');
                if (foundFields.length == 0) {
                    // Return if cannot find the field with given name
                    return;
                }

                var that = this, fieldElement = $(foundFields[0]);

                $(fieldElement)
                    .on('keyup', function() {
                        var validators = that.options.fields[field].validator;
                        for (var validatorName in validators) {
                            if (!$.bootstrapValidator.validator[validatorName]) {
                                continue;
                            }
                            var options = validators[validatorName];
                            if (!$.bootstrapValidator.validator[validatorName].validate(fieldElement, options)) {
                                that.showError(fieldElement, validatorName);
                                break;
                            } else {
                                that.removeError(fieldElement);
                            }
                        }
                    })
                    .blur(function() {
                        that.hideError(fieldElement);
                    });
            },

            showError: function(fieldElement, validatorName) {
                var $fieldElement = $(fieldElement),
                    field         = $fieldElement.attr('name'),
                    validator     = this.options.fields[field].validator[validatorName],
                    message       = validator.message || this.options.message;

                if (!$fieldElement.data('bootstrapValidator.tooltip')) {
                    var $a = $('<a/>').attr('href', '#')
                                      .attr('title', message)
                                      // Bootstrap tooltip options
                                      // see http://getbootstrap.com/javascript/#tooltips
                                      .attr('data-toggle', 'tooltip').attr('data-placement', 'right')
                                      .css('text-decoration', 'none')
                                      .insertAfter(fieldElement);
                    $('<i/>').addClass(this.options.iconClass.invalid).appendTo($a);
                    $fieldElement.data('bootstrapValidator.tooltip', $a);

                    $a.on('shown.bs.tooltip', function() {
                        if (!$(this).data('bootstrapValidator.tooltip.calculated')) {
                            $(this).data('bootstrapValidator.tooltip.calculated', true);
                            var $parent   = $(this).parent(),
                                $tip      = $(this).data('bs.tooltip').$tip,
                                w         = $parent.width(),
                                tipWidth  = parseInt($tip.width()),
                                tipLeft   = parseInt($tip.css('left'));
                            $tip.css('left', tipLeft + w + 10)
                                .css('top', -4)
                                .width(tipWidth);
                            $(this).css('position', 'absolute')
                                   .css('left', tipLeft + w)
                                   .css('top', 5);
                        }
                    });
                }

                // Add has-error class to parent element
                $fieldElement.parents('.form-group').removeClass('has-success').addClass('has-error');

                var $tip = $fieldElement.data('bootstrapValidator.tooltip');
                $tip.find('i').attr('class', this.options.iconClass.invalid).end()
                    .attr('title', message)
                    .attr('data-original-title', message)
                    .tooltip('show');
            },

            hideError: function(fieldElement) {
                if (tip = $(fieldElement).data('bootstrapValidator.tooltip')) {
                    $(tip).tooltip('hide');
                }
            },

            removeError: function(fieldElement) {
                var $fieldElement = $(fieldElement);
                $fieldElement.parents('.form-group').removeClass('has-error').addClass('has-success');
                if (tip = $fieldElement.data('bootstrapValidator.tooltip')) {
                    $(tip).find('i').attr('class', this.options.iconClass.valid);
                    $(tip).tooltip('destroy');

                    $(tip).remove();
                    $fieldElement.removeData('bootstrapValidator.tooltip');
                }
            }
        }
    });
}(window.jQuery));
