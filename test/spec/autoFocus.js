describe('autoFocus', function() {
    beforeEach(function() {
        $([
            '<form class="form-horizontal" id="autoFocusForm">',
                '<div class="form-group">',
                    '<input type="text" name="username" required />',
                '</div>',
                '<div class="form-group">',
                    '<input type="text" name="email" required data-bv-emailaddress />',
                '</div>',
                '<div class="form-group">',
                    '<button type="submit" id="submitButton">Submit</button>',
                '</div>',
            '</form>'
        ].join('')).appendTo('body');

        this.bv        = $('#autoFocusForm')
                            .bootstrapValidator()
                            .submit(function(e) {
                                e.preventDefault();
                            })
                            .data('bootstrapValidator');
        this.$username = this.bv.getFieldElements('username');
        this.$email    = this.bv.getFieldElements('email');
    });

    afterEach(function() {
        $('#autoFocusForm').bootstrapValidator('destroy').remove();
    });

    it('default option (autoFocus=true)', function() {
        $('#submitButton').click();
        expect(this.$username.is(':focus')).toBeTruthy();
        expect($(document.activeElement).attr('name')).toEqual('username');

        this.bv.resetForm();
        this.$username.val('user_name');
        this.$email.val('');
        $('#submitButton').click();
        expect(this.$email.is(':focus')).toBeTruthy();
        expect($(document.activeElement).attr('name')).toEqual('email');
    });

    it('set autoFocus=false for form', function() {
        $('#autoFocusForm')
                .bootstrapValidator('destroy')
                .bootstrapValidator({
                    autoFocus: false
                });
        this.$username.val('');
        this.$email.val('invalid#email');
        $('#submitButton').click();

        expect(this.$username.is(':focus')).toBeFalsy();
        expect(this.$email.is(':focus')).toBeFalsy();
    });

    it('set autoFocus=false for all fields', function() {
        this.bv
            .addField('username', {
                autoFocus: false
            })
            .addField('email', {
                autoFocus: false
            });
        this.$username.val('user_name');
        this.$email.val('invalid#email');
        $('#submitButton').click();

        expect(this.$username.is(':focus')).toBeFalsy();
        expect(this.$email.is(':focus')).toBeFalsy();
    });

    it('set different autoFocus value for fields', function() {
        this.bv
            .addField('username', {
                autoFocus: false
            })
            .addField('email', {
                autoFocus: true
            });
        this.$username.val('');
        this.$email.val('invalid_email');
        $('#submitButton').click();

        expect(this.$username.is(':focus')).toBeFalsy();
        expect(this.$email.is(':focus')).toBeTruthy();
        expect($(document.activeElement).attr('name')).toEqual('email');
    });
});
