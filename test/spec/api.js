describe('api', function() {
    // Override the options
    $.extend($.fn.bootstrapValidator.DEFAULT_OPTIONS, {
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    });

    beforeEach(function() {
        $([
            '<div class="container">',
                '<form class="form-horizontal" id="apiForm">',
                    '<div class="form-group">',
                        '<input type="text" name="username" data-bv-notempty />',
                    '</div>',
                    '<div class="form-group">',
                        '<input type="text" name="email" data-bv-emailaddress />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n')).appendTo('body');

        $('#apiForm').bootstrapValidator();

        this.bv     = $('#apiForm').data('bootstrapValidator');
        this.$email = this.bv.getFieldElements('email');
    });

    afterEach(function() {
        $('#apiForm').bootstrapValidator('destroy').parent().remove();
    });

    it('call revalidateField()', function() {
        this.$email.val('email@domain.com');
        this.bv.validate();
        expect(this.bv.isValidField('email')).toBeTruthy();

        this.$email.val('invalid#email.address');
        this.bv.revalidateField('email');
        expect(this.bv.isValidField(this.$email)).toEqual(false);
    });

    it('call destroy()', function() {
        this.bv.destroy();
        expect($('#apiForm').data('bootstrapValidator')).toBeUndefined();
        expect($('#apiForm').find('i[data-bv-icon-for]').length).toEqual(0);
        expect($('#apiForm').find('.help-block[data-bv-for]').length).toEqual(0);
        expect($('#apiForm').find('.has-feedback').length).toEqual(0);
        expect($('#apiForm').find('.has-success').length).toEqual(0);
        expect($('#apiForm').find('.has-error').length).toEqual(0);
        expect($('#apiForm').find('[data-bv-field]').length).toEqual(0);
    });
});
