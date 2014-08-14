describe('emailAddress', function() {
    beforeEach(function () {
        $([
            '<form class="form-horizontal" id="emailAddressForm">',
                '<div id="msg"></div>',
                '<div class="form-group">',
                    '<input type="text" name="email-address" data-bv-emailaddress />',
                '</div>',
            '</form>'
        ].join('\n')).appendTo('body');

        $('#emailAddressForm').bootstrapValidator();

        this.bv = $('#emailAddressForm').data('bootstrapValidator');
        this.$emailAddress = this.bv.getFieldElements('email-address');
    });

    afterEach(function () {
        $('#emailAddressForm').bootstrapValidator('destroy').remove();
    });

    var validEmailAddresses = [
        'niceandsimple@example.com',
        'very.common@example.com',
        'a.little.lengthy.but.fine@dept.example.com',
        'disposable.style.email.with+symbol@example.com',
        'other.email-with-dash@example.com',
        '"much.more unusual"@example.com',
        '"very.unusual.@.unusual.com"@example.com',
        '"very.(),:;<>[]\".VERY.\"very@\\ \"very\".unusual"@strange.example.com',
        '" "@example.org',
        'üñîçøðé@example.com'
    ];

    var invalidEmailAddresses = [
        'admin@mailserver1',
        // "!#$%&'*+-/=?^_`{}|~@example.org",   // This is actually passing validation; see https://github.com/nghuuphuoc/bootstrapvalidator/issues/673
        'üñîçøðé@üñîçøðé.com',
        'Abc.example.com',
        'A@b@c@example.com',
        'a"b(c)d,e:f;gi[j\k]l@example.com',
        'just"not"right@example.com',
        'this is"not\allowed@example.com',
        'this\ still\"not\\allowed@example.com'
    ];

    it('Valid email addresses', function() {
        var me = this;
        $.each(validEmailAddresses, function(index, emailAddress) {
            me.bv.resetForm();
            me.$emailAddress.val(emailAddress);
            me.bv.validate();
            expect(me.bv.isValid()).toBeTruthy();
        });
    });

    it('Invalid email addresses', function() {
        var me = this;
        $.each(invalidEmailAddresses, function(index, emailAddress) {
            me.bv.resetForm();
            me.$emailAddress.val(emailAddress);
            me.bv.validate();
            expect(me.bv.isValid()).toEqual(false);
        });
    });
});
