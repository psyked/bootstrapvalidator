function onEmailValid(e, data) {
    $('#msg').html(data.field + ' is valid');
};

function onEmailInvalid(e, data) {
    $('#msg').html(data.field + ' is invalid');
};

describe('event field attribute callback global', function() {
    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="eventForm">',
                    '<div id="msg"></div>',
                    '<div class="form-group">',
                        '<input type="text" name="email" data-bv-emailaddress data-bv-onsuccess="onEmailValid" data-bv-onerror="onEmailInvalid" />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#eventForm').bootstrapValidator();

        this.bv     = $('#eventForm').data('bootstrapValidator');
        this.$email = this.bv.getFieldElements('email');
    });

    afterEach(function() {
        $('#eventForm').bootstrapValidator('destroy').parent().remove();
    });

    it('call data-bv-onsuccess', function() {
        this.$email.val('email@domain.com');
        this.bv.validate();
        expect($('#msg').html()).toEqual('email is valid');
    });

    it('call data-bv-onerror', function() {
        this.$email.val('email@domain');
        this.bv.validate();
        expect($('#msg').html()).toEqual('email is invalid');
    });
});

var My = {
    NameSpace: {
        onEmailValid: function(e, data) {
            $('#msg').html('My.NameSpace.onEmailValid() called, ' + data.field + ' is valid');
        },

        onEmailInvalid: function(e, data) {
            $('#msg').html('My.NameSpace.onEmailInvalid() called, ' + data.field + ' is invalid');
        }
    }
};

describe('event field attribute callback namespace', function() {
    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="eventForm">',
                    '<div id="msg"></div>',
                    '<div class="form-group">',
                        '<input type="text" name="email" data-bv-emailaddress data-bv-onsuccess="My.NameSpace.onEmailValid" data-bv-onerror="My.NameSpace.onEmailInvalid" />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#eventForm').bootstrapValidator();

        this.bv     = $('#eventForm').data('bootstrapValidator');
        this.$email = this.bv.getFieldElements('email');
    });

    afterEach(function() {
        $('#eventForm').bootstrapValidator('destroy').parent().remove();
    });

    it('call data-bv-onsuccess', function() {
        this.$email.val('email@domain.com');
        this.bv.validate();
        expect($('#msg').html()).toEqual('My.NameSpace.onEmailValid() called, email is valid');
    });

    it('call data-bv-onerror', function() {
        this.$email.val('email@domain');
        this.bv.validate();
        expect($('#msg').html()).toEqual('My.NameSpace.onEmailInvalid() called, email is invalid');
    });
});

describe('event field trigger', function() {
    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="eventForm">',
                    '<div id="msg"></div>',
                    '<div class="form-group">',
                        '<input type="text" name="email" data-bv-emailaddress />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#eventForm')
            .bootstrapValidator()
            .on('success.field.bv', '[name="email"]', function(e, data) {
                $('#msg').html('triggered success.field.bv on ' + data.field);
            })
            .on('error.field.bv', '[name="email"]', function(e, data) {
                $('#msg').html('triggered error.field.bv on ' + data.field);
            });

        this.bv     = $('#eventForm').data('bootstrapValidator');
        this.$email = this.bv.getFieldElements('email');
    });

    afterEach(function() {
        $('#eventForm').bootstrapValidator('destroy').parent().remove();
    });

    it('trigger success.field.bv', function() {
        this.$email.val('email@domain.com');
        this.bv.validate();
        expect($('#msg').html()).toEqual('triggered success.field.bv on email');
    });

    it('trigger error.field.bv', function() {
        this.$email.val('email@domain');
        this.bv.validate();
        expect($('#msg').html()).toEqual('triggered error.field.bv on email');
    });
});

describe('event field programmatically', function() {
    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="eventForm">',
                    '<div id="msg"></div>',
                    '<div class="form-group">',
                        '<input type="text" name="email" data-bv-emailaddress />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#eventForm').bootstrapValidator({
            fields: {
                email: {
                    onSuccess: function(e, data) {
                        $('#msg').html('onSuccess() called');
                    },
                    onError: function(e, data) {
                        $('#msg').html('onError() called');
                    },
                    validator: {
                        emailAddress: {}
                    }
                }
            }
        });

        this.bv     = $('#eventForm').data('bootstrapValidator');
        this.$email = this.bv.getFieldElements('email');
    });

    afterEach(function() {
        $('#eventForm').bootstrapValidator('destroy').parent().remove();
    });

    it('call onSuccess()', function() {
        this.$email.val('email@domain.com');
        this.bv.validate();
        expect($('#msg').html()).toEqual('onSuccess() called');
    });

    it('call onError()', function() {
        this.$email.val('email@domain');
        this.bv.validate();
        expect($('#msg').html()).toEqual('onError() called');
    });
});

describe('message', function() {
    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="messageForm">',
                    '<div class="form-group">',
                        '<input type="password" class="form-control" name="password" placeholder="Enter secure password" />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#messageForm').bootstrapValidator({
            fields: {
                password: {
                    validators: {
                        notEmpty: {
                            message: 'The password is required'
                        },
                        callback: {
                            callback: function(value, validator) {
                                // Check the password strength
                                if (value.length < 6) {
                                    return {
                                        valid: false,
                                        message: 'The password must be more than 6 characters'
                                    }
                                }

                                if (value === value.toLowerCase()) {
                                    return {
                                        valid: false,
                                        message: 'The password must contain at least one upper case character'
                                    }
                                }
                                if (value === value.toUpperCase()) {
                                    return {
                                        valid: false,
                                        message: 'The password must contain at least one lower case character'
                                    }
                                }
                                if (value.search(/[0-9]/) < 0) {
                                    return {
                                        valid: false,
                                        message: 'The password must contain at least one digit'
                                    }
                                }

                                return true;
                            }
                        }
                    }
                }
            }
        });

        this.bv        = $('#messageForm').data('bootstrapValidator');
        this.$password = this.bv.getFieldElements('password');
    });

    afterEach(function() {
        $('#messageForm').bootstrapValidator('destroy').parent().remove();
    });

    it('update message from callback', function() {
        this.bv.resetForm();
        this.$password.val('123');
        this.bv.validate();
        expect(this.bv.getMessages('password', 'callback')[0]).toEqual('The password must be more than 6 characters');

        this.bv.resetForm();
        this.$password.val('no_upper_case!@#');
        this.bv.validate();
        expect(this.bv.getMessages('password', 'callback')[0]).toEqual('The password must contain at least one upper case character');

        this.bv.resetForm();
        this.$password.val('NO_LOWER_CASE123');
        this.bv.validate();
        expect(this.bv.getMessages('password', 'callback')[0]).toEqual('The password must contain at least one lower case character');

        this.bv.resetForm();
        this.$password.val('NoDigits!@#');
        this.bv.validate();
        expect(this.bv.getMessages('password', 'callback')[0]).toEqual('The password must contain at least one digit');
    });

    it('call updateMessage()', function() {
        this.bv.updateStatus('password', this.bv.STATUS_INVALID, 'callback');

        this.bv.updateMessage('password', 'callback', 'The password is weak');
        expect(this.bv.getMessages('password', 'callback')[0]).toEqual('The password is weak');

        this.bv.updateMessage(this.$password, 'callback', 'The password is not strong');
        expect(this.bv.getMessages(this.$password, 'callback')[0]).toEqual('The password is not strong');
    });
});

describe('creditCard', function() {
    // Get the fake credit card number at http://www.getcreditcardnumbers.com/

    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="ccForm">',
                    '<div class="form-group">',
                        '<input type="text" name="cc" data-bv-creditcard />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#ccForm').bootstrapValidator();

        this.bv          = $('#ccForm').data('bootstrapValidator');
        this.$creditCard = this.bv.getFieldElements('cc');
    });

    afterEach(function() {
        $('#ccForm').bootstrapValidator('destroy').parent().remove();
    });

    it('accept spaces', function() {
        this.$creditCard.val('5267 9789 9451 9654');
        this.bv.validate();
        expect(this.bv.isValidField('cc')).toBeTruthy();
    });

    it('accept dashes', function() {
        this.$creditCard.val('6011-2649-6840-4521');
        this.bv.validate();
        expect(this.bv.isValidField('cc')).toBeTruthy();
    });

    it('invalid format', function() {
        this.$creditCard.val('4539.1870.2954.3862');
        this.bv.validate();
        expect(this.bv.isValidField('cc')).toEqual(false);
    });

    it('American Express', function() {
        this.$creditCard.val('340653705597107');
        this.bv.validate();
        expect(this.bv.isValidField('cc')).toBeTruthy();
    });

    it('American Express invalid length', function() {
        this.$creditCard.val('3744148309166730');
        this.bv.validate();
        expect(this.bv.isValidField('cc')).toEqual(false);
    });

    it('American Express invalid prefix', function() {
        this.$creditCard.val('356120148436654');
        this.bv.validate();
        expect(this.bv.isValidField('cc')).toEqual(false);
    });

    it('Diners Club', function() {
        this.$creditCard.val('30130708434187');
        this.bv.validate();
        expect(this.bv.isValidField('cc')).toBeTruthy();
    });

    it('Diners Club (US)', function() {
        this.$creditCard.val('5517479515603901');
        this.bv.validate();
        expect(this.bv.isValidField('cc')).toBeTruthy();
    });

    it('Discover', function() {
        this.$creditCard.val('6011734674929094');
        this.bv.validate();
        expect(this.bv.isValidField('cc')).toBeTruthy();
    });

    it('JCB', function() {
        this.$creditCard.val('3566002020360505');
        this.bv.validate();
        expect(this.bv.isValidField('cc')).toBeTruthy();
    });

    it('Laser', function() {
        this.$creditCard.val('6304 9000 1774 0292 441');
        this.bv.validate();
        expect(this.bv.isValidField('cc')).toBeTruthy();
    });

    it('Maestro', function() {
        this.$creditCard.val('6762835098779303');
        this.bv.validate();
        expect(this.bv.isValidField('cc')).toBeTruthy();
    });

    it('Mastercard', function() {
        this.$creditCard.val('5303765013600904');
        this.bv.validate();
        expect(this.bv.isValidField('cc')).toBeTruthy();
    });

    it('Solo', function() {
        this.$creditCard.val('6334580500000000');
        this.bv.validate();
        expect(this.bv.isValidField('cc')).toBeTruthy();
    });

    it('Visa', function() {
        this.$creditCard.val('4929248980295542');
        this.bv.validate();
        expect(this.bv.isValidField('cc')).toBeTruthy();
    });

    it('Visa invalid check digit', function() {
        this.$creditCard.val('4532599916257826');
        this.bv.validate();
        expect(this.bv.isValidField('cc')).toEqual(false);
    });
});

describe('ean', function() {
    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="eanForm">',
                    '<div class="form-group">',
                        '<input type="text" name="ean" data-bv-ean />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#eanForm').bootstrapValidator();

        this.bv   = $('#eanForm').data('bootstrapValidator');
        this.$ean = this.bv.getFieldElements('ean');
    });

    afterEach(function() {
        $('#eanForm').bootstrapValidator('destroy').parent().remove();
    });

    it('valid', function() {
        var samples = ['73513537', '9780471117094', '4006381333931'];

        for (var i in samples) {
            this.$ean.val(samples[i]);
            this.bv.validate();
            expect(this.bv.isValidField('ean')).toBeTruthy();
        }
    });

    it('contains only digits', function() {
        this.$ean.val('123abcDEF!@#');
        this.bv.validate();
        expect(this.bv.isValidField('ean')).toEqual(false);
    });

    it('invalid length', function() {
        this.$ean.val('1234567');
        this.bv.validate();
        expect(this.bv.isValidField('ean')).toEqual(false);
    });

    it('invalid check digit', function() {
        this.$ean.val('73513536');
        this.bv.validate();
        expect(this.bv.isValidField('ean')).toEqual(false);
    });
});

describe('iban', function() {
    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="ibanForm">',
                    '<div class="form-group">',
                        '<input type="text" name="iban" data-bv-iban />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#ibanForm').bootstrapValidator();

        this.bv    = $('#ibanForm').data('bootstrapValidator');
        this.$iban = this.bv.getFieldElements('iban');
    });

    afterEach(function() {
        $('#ibanForm').bootstrapValidator('destroy').parent().remove();
    });

    it('not supported country', function() {
        this.$iban.val('US123456789');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toEqual(false);
    });

    it('Albania', function() {
        this.$iban.val('AL47212110090000000235698741');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Algeria', function() {
        this.$iban.val('DZ4000400174401001050486');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Andorra', function() {
        this.$iban.val('AD1200012030200359100100');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Angola', function() {
        this.$iban.val('AO06000600000100037131174');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Austria', function() {
        this.$iban.val('AT611904300234573201');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Azerbaijan', function() {
        this.$iban.val('AZ21NABZ00000000137010001944');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Bahrain', function() {
        this.$iban.val('BH29BMAG1299123456BH00');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Belgium', function() {
        this.$iban.val('BE68539007547034');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Benin', function() {
        this.$iban.val('BJ11B00610100400271101192591');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Brazil', function() {
        this.$iban.val('BR9700360305000010009795493P1');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Bulgaria', function() {
        this.$iban.val('BG80BNBG96611020345678');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Burkina Faso', function() {
        this.$iban.val('BF1030134020015400945000643');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });
    it('Burundi', function() {
        this.$iban.val('BI43201011067444');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Cameroon', function() {
        this.$iban.val('CM2110003001000500000605306');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Cape Verde', function() {
        this.$iban.val('CV64000300004547069110176');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Costa Rica', function() {
        this.$iban.val('CR0515202001026284066');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Croatia', function() {
        this.$iban.val('HR1210010051863000160');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });
    it('Cyprus', function() {
        this.$iban.val('CY17002001280000001200527600');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Czech Republic', function() {
        this.$iban.val('CZ6508000000192000145399');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Denmark', function() {
        this.$iban.val('DK5000400440116243');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Dominican Republic', function() {
        this.$iban.val('DO28BAGR00000001212453611324');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Estonia', function() {
        this.$iban.val('EE382200221020145685');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });
    it('Faroe Islands', function() {
        this.$iban.val('FO1464600009692713');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Finland', function() {
        this.$iban.val('FI2112345600000785');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('France', function() {
        this.$iban.val('FR1420041010050500013M02606');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Guatemala', function() {
        this.$iban.val('GT82TRAJ01020000001210029690');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Georgia', function() {
        this.$iban.val('GE29NB0000000101904917');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Germany', function() {
        this.$iban.val('DE89370400440532013000');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Gibraltar', function() {
        this.$iban.val('GI75NWBK000000007099453');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Greece', function() {
        this.$iban.val('GR1601101250000000012300695');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Greenland', function() {
        this.$iban.val('GL8964710001000206');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Hungary', function() {
        this.$iban.val('HU42117730161111101800000000');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Iceland', function() {
        this.$iban.val('IS140159260076545510730339');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Iran', function() {
        this.$iban.val('IR580540105180021273113007');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Ireland', function() {
        this.$iban.val('IE29AIBK93115212345678');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Israel', function() {
        this.$iban.val('IL620108000000099999999');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Italy', function() {
        this.$iban.val('IT60X0542811101000000123456');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Ivory Coast', function() {
        this.$iban.val('CI05A00060174100178530011852');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Jordan', function() {
        this.$iban.val('JO94CBJO0010000000000131000302');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Kazakhstan', function() {
        this.$iban.val('KZ176010251000042993');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Kuwait', function() {
        this.$iban.val('KW74NBOK0000000000001000372151');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Latvia', function() {
        this.$iban.val('LV80BANK0000435195001');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Lebanon', function() {
        this.$iban.val('LB30099900000001001925579115');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Liechtenstein', function() {
        this.$iban.val('LI21088100002324013AA');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Lithuania', function() {
        this.$iban.val('LT121000011101001000');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Luxembourg', function() {
        this.$iban.val('LU280019400644750000');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Macedonia', function() {
        this.$iban.val('MK07300000000042425');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Madagascar', function() {
        this.$iban.val('MG4600005030010101914016056');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Malta', function() {
        this.$iban.val('MT84MALT011000012345MTLCAST001S');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Mauritania', function() {
        this.$iban.val('MR1300012000010000002037372');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Mauritius', function() {
        this.$iban.val('MU17BOMM0101101030300200000MUR');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Mali', function() {
        this.$iban.val('ML03D00890170001002120000447');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Moldova', function() {
        this.$iban.val('MD24AG000225100013104168');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Monaco', function() {
        this.$iban.val('MC5813488000010051108001292');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Montenegro', function() {
        this.$iban.val('ME25505000012345678951');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Mozambique', function() {
        this.$iban.val('MZ59000100000011834194157');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Netherlands', function() {
        this.$iban.val('NL91ABNA0417164300');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Norway', function() {
        this.$iban.val('NO9386011117947');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Pakistan', function() {
        this.$iban.val('PK24SCBL0000001171495101');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Palestine', function() {
        this.$iban.val('PS92PALS000000000400123456702');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Poland', function() {
        this.$iban.val('PL27114020040000300201355387');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Portugal', function() {
        this.$iban.val('PT50000201231234567890154');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Qatar', function() {
        this.$iban.val('QA58DOHB00001234567890ABCDEFG');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Romania', function() {
        this.$iban.val('RO49AAAA1B31007593840000');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('San Marino', function() {
        this.$iban.val('SM86U0322509800000000270100');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Saudi Arabia', function() {
        this.$iban.val('SA0380000000608010167519');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Senegal', function() {
        this.$iban.val('SN12K00100152000025690007542');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Serbia', function() {
        this.$iban.val('RS35260005601001611379');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Slovakia', function() {
        this.$iban.val('SK3112000000198742637541');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Slovenia', function() {
        this.$iban.val('SI56191000000123438');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Spain', function() {
        this.$iban.val('ES9121000418450200051332');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Sweden', function() {
        this.$iban.val('SE3550000000054910000003');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Switzerland', function() {
        this.$iban.val('CH9300762011623852957');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Tunisia', function() {
        this.$iban.val('TN5914207207100707129648');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Turkey', function() {
        this.$iban.val('TR330006100519786457841326');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('United Arab Emirates', function() {
        this.$iban.val('AE260211000000230064016');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('United Kingdom', function() {
        this.$iban.val('GB29NWBK60161331926819');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('Virgin Islands, British', function() {
        this.$iban.val('VG96VPVG0000012345678901');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toBeTruthy();
    });

    it('invalid checksum', function() {
        this.$iban.val('TR330006100519786457841325');
        this.bv.validate();
        expect(this.bv.isValidField('iban')).toEqual(false);
    });
});

describe('isbn', function() {
    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="isbnForm">',
                    '<div class="form-group">',
                        '<input type="text" name="isbn" data-bv-isbn />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#isbnForm').bootstrapValidator();

        this.bv    = $('#isbnForm').data('bootstrapValidator');
        this.$isbn = this.bv.getFieldElements('isbn');
    });

    afterEach(function() {
        $('#isbnForm').bootstrapValidator('destroy').parent().remove();
    });

    it('isbn10 hyphen', function() {
        var samples = ['99921-58-10-7', '9971-5-0210-0', '960-425-059-0', '80-902734-1-6'];

        for (var i in samples) {
            this.$isbn.val(samples[i]);
            this.bv.validate();
            expect(this.bv.isValidField('isbn')).toBeTruthy();
        }
    });

    it('isbn10 space', function() {
        var samples = ['85 359 0277 5', '1 84356 028 3', '0 684 84328 5', '0 85131 041 9', '0 943396 04 2'];

        for (var i in samples) {
            this.$isbn.val(samples[i]);
            this.bv.validate();
            expect(this.bv.isValidField('isbn')).toBeTruthy();
        }
    });

    it('isbn10 hyphen with X', function() {
        var samples = ['0-8044-2957-X', '0-9752298-0-X'];
        for (var i in samples) {
            this.$isbn.val(samples[i]);
            this.bv.validate();
            expect(this.bv.isValidField('isbn')).toBeTruthy();
        }
    });

    it('isbn10 invalid check digit', function() {
        this.$isbn.val('99921-58-10-6');
        this.bv.validate();
        expect(this.bv.isValidField('isbn')).toEqual(false);
    });

    it('isbn13', function() {
        this.$isbn.val('978-0-306-40615-7');
        this.bv.validate();
        expect(this.bv.isValidField('isbn')).toBeTruthy();
    });

    it('isbn13 invalid check digit', function() {
        this.$isbn.val('978-0-306-40615-6');
        this.bv.validate();
        expect(this.bv.isValidField('isbn')).toEqual(false);
    });
});

describe('isin', function() {
    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="isinForm">',
                    '<div class="form-group">',
                        '<input type="text" name="isin" data-bv-isin />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#isinForm').bootstrapValidator();

        this.bv    = $('#isinForm').data('bootstrapValidator');
        this.$isin = this.bv.getFieldElements('isin');
    });

    afterEach(function() {
        $('#isinForm').bootstrapValidator('destroy').parent().remove();
    });

    it('valid', function() {
        var samples = ['US0378331005', 'AU0000XVGZA3', 'GB0002634946'];

        for (var i in samples) {
            this.$isin.val(samples[i]);
            this.bv.validate();
            expect(this.bv.isValidField('isin')).toBeTruthy();
        }
    });

    it('invalid country code', function() {
        this.$isin.val('AA0000XVGZA3');
        this.bv.validate();
        expect(this.bv.isValidField('isin')).toEqual(false);
    });

    it('contains only digits and alphabet', function() {
        this.$isin.val('US12345ABC@#$');
        this.bv.validate();
        expect(this.bv.isValidField('isin')).toEqual(false);
    });

    it('invalid length', function() {
        this.$isin.val('US1234567');
        this.bv.validate();
        expect(this.bv.isValidField('isin')).toEqual(false);
    });

    it('invalid check digit', function() {
        this.$isin.val('US0378331004');
        this.bv.validate();
        expect(this.bv.isValidField('isin')).toEqual(false);
    });
});

describe('ismn', function() {
    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="ismnForm">',
                    '<div class="form-group">',
                        '<input type="text" name="ismn" data-bv-ismn />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#ismnForm').bootstrapValidator();

        this.bv    = $('#ismnForm').data('bootstrapValidator');
        this.$ismn = this.bv.getFieldElements('ismn');
    });

    afterEach(function() {
        $('#ismnForm').bootstrapValidator('destroy').parent().remove();
    });

    it('valid start with M', function() {
        this.$ismn.val('M230671187');
        this.bv.validate();
        expect(this.bv.isValidField('ismn')).toBeTruthy();
    });

    it('valid start with 979', function() {
        this.$ismn.val('9790060115615');
        this.bv.validate();
        expect(this.bv.isValidField('ismn')).toBeTruthy();
    });

    it('valid contains spaces', function() {
        this.$ismn.val('979 0 3452 4680 5');
        this.bv.validate();
        expect(this.bv.isValidField('ismn')).toBeTruthy();
    });

    it('valid contains dashes', function() {
        this.$ismn.val('979-0-0601-1561-5');
        this.bv.validate();
        expect(this.bv.isValidField('ismn')).toBeTruthy();
    });

    it('invalid format', function() {
        this.$ismn.val('N123456789');
        this.bv.validate();
        expect(this.bv.isValidField('ismn')).toEqual(false);
    });

    it('invalid check digit', function() {
        this.$ismn.val('9790060115614');
        this.bv.validate();
        expect(this.bv.isValidField('ismn')).toEqual(false);
    });
});

describe('issn', function() {
    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="issnForm">',
                    '<div class="form-group">',
                        '<input type="text" name="issn" data-bv-issn />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#issnForm').bootstrapValidator();

        this.bv    = $('#issnForm').data('bootstrapValidator');
        this.$issn = this.bv.getFieldElements('issn');
    });

    afterEach(function() {
        $('#issnForm').bootstrapValidator('destroy').parent().remove();
    });

    it('valid', function() {
        var samples = ['0378-5955', '0024-9319', '0032-1478'];

        for (var i in samples) {
            this.$issn.val(samples[i]);
            this.bv.validate();
            expect(this.bv.isValidField('issn')).toBeTruthy();
        }
    });

    it('not contains hyphen', function() {
        this.$issn.val('03785955');
        this.bv.validate();
        expect(this.bv.isValidField('issn')).toEqual(false);
    });

    it('contains only digits, X', function() {
        this.$issn.val('1234-566A');
        this.bv.validate();
        expect(this.bv.isValidField('issn')).toEqual(false);
    });

    it('invalid check sum', function() {
        this.$issn.val('0032-147X');
        this.bv.validate();
        expect(this.bv.isValidField('issn')).toEqual(false);
    });
});
