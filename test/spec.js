describe('creditCard', function() {
    // Get the fake credit card number at http://www.getcreditcardnumbers.com/

    // Override the default options
    $.extend($.fn.bootstrapValidator.DEFAULT_OPTIONS, {
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    });

    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="form">',
                    '<div class="form-group">',
                        '<input type="text" name="cc" data-bv-creditcard />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#form').bootstrapValidator();

        this._bs     = $('#form').data('bootstrapValidator');
        this._$field = this._bs.getFieldElements('cc');
    });

    afterEach(function() {
        $('#form').bootstrapValidator('destroy').remove();
    });

    it('accept spaces', function() {
        this._$field.val('5267 9789 9451 9654');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('accept dashes', function() {
        this._$field.val('6011-2649-6840-4521');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('invalid format', function() {
        this._$field.val('4539.1870.2954.3862');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toEqual(false);
    });

    it('American Express', function() {
        this._$field.val('340653705597107');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('American Express invalid length', function() {
        this._$field.val('3744148309166730');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toEqual(false);
    });

    it('American Express invalid prefix', function() {
        this._$field.val('356120148436654');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toEqual(false);
    });

    it('Diners Club', function() {
        this._$field.val('30130708434187');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('Diners Club (US)', function() {
        this._$field.val('5517479515603901');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('Discover', function() {
        this._$field.val('6011734674929094');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('JCB', function() {
        this._$field.val('3566002020360505');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('Laser', function() {
        this._$field.val('6304 9000 1774 0292 441');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('Maestro', function() {
        this._$field.val('6762835098779303');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('Mastercard', function() {
        this._$field.val('5303765013600904');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('Solo', function() {
        this._$field.val('6334580500000000');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('Visa', function() {
        this._$field.val('4929248980295542');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('Visa invalid check digit', function() {
        this._$field.val('4532599916257826');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toEqual(false);
    });
});

describe('ean', function() {
    // Override the default options
    $.extend($.fn.bootstrapValidator.DEFAULT_OPTIONS, {
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    });

    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="form">',
                    '<div class="form-group">',
                        '<input type="text" name="ean" data-bv-ean />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#form').bootstrapValidator();

        this._bs     = $('#form').data('bootstrapValidator');
        this._$field = this._bs.getFieldElements('ean');
    });

    afterEach(function() {
        $('#form').bootstrapValidator('destroy').remove();
    });

    it('valid', function() {
        var samples = ['73513537', '9780471117094', '4006381333931'];

        for (var i in samples) {
            this._$field.val(samples[i]);
            this._bs.validate();
            expect(this._bs.isValidField('ean')).toBeTruthy();
        }
    });

    it('contains only digits', function() {
        this._$field.val('123abcDEF!@#');
        this._bs.validate();
        expect(this._bs.isValidField('ean')).toEqual(false);
    });

    it('invalid length', function() {
        this._$field.val('1234567');
        this._bs.validate();
        expect(this._bs.isValidField('ean')).toEqual(false);
    });

    it('invalid check digit', function() {
        this._$field.val('73513536');
        this._bs.validate();
        expect(this._bs.isValidField('ean')).toEqual(false);
    });
});

describe('iban', function() {
    // Override the default options
    $.extend($.fn.bootstrapValidator.DEFAULT_OPTIONS, {
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    });

    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="form">',
                    '<div class="form-group">',
                        '<input type="text" name="iban" data-bv-iban />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#form').bootstrapValidator();

        this._bs     = $('#form').data('bootstrapValidator');
        this._$field = this._bs.getFieldElements('iban');
    });

    afterEach(function() {
        $('#form').bootstrapValidator('destroy').remove();
    });

    it('not supported country', function() {
        this._$field.val('US123456789');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toEqual(false);
    });

    it('Albania', function() {
        this._$field.val('AL47212110090000000235698741');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Algeria', function() {
        this._$field.val('DZ4000400174401001050486');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Andorra', function() {
        this._$field.val('AD1200012030200359100100');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Angola', function() {
        this._$field.val('AO06000600000100037131174');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Austria', function() {
        this._$field.val('AT611904300234573201');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Azerbaijan', function() {
        this._$field.val('AZ21NABZ00000000137010001944');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Bahrain', function() {
        this._$field.val('BH29BMAG1299123456BH00');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Belgium', function() {
        this._$field.val('BE68539007547034');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Benin', function() {
        this._$field.val('BJ11B00610100400271101192591');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Brazil', function() {
        this._$field.val('BR9700360305000010009795493P1');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Bulgaria', function() {
        this._$field.val('BG80BNBG96611020345678');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Burkina Faso', function() {
        this._$field.val('BF1030134020015400945000643');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });
    it('Burundi', function() {
        this._$field.val('BI43201011067444');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Cameroon', function() {
        this._$field.val('CM2110003001000500000605306');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Cape Verde', function() {
        this._$field.val('CV64000300004547069110176');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Costa Rica', function() {
        this._$field.val('CR0515202001026284066');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Croatia', function() {
        this._$field.val('HR1210010051863000160');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });
    it('Cyprus', function() {
        this._$field.val('CY17002001280000001200527600');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Czech Republic', function() {
        this._$field.val('CZ6508000000192000145399');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Denmark', function() {
        this._$field.val('DK5000400440116243');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Dominican Republic', function() {
        this._$field.val('DO28BAGR00000001212453611324');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Estonia', function() {
        this._$field.val('EE382200221020145685');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });
    it('Faroe Islands', function() {
        this._$field.val('FO1464600009692713');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Finland', function() {
        this._$field.val('FI2112345600000785');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('France', function() {
        this._$field.val('FR1420041010050500013M02606');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Guatemala', function() {
        this._$field.val('GT82TRAJ01020000001210029690');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Georgia', function() {
        this._$field.val('GE29NB0000000101904917');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Germany', function() {
        this._$field.val('DE89370400440532013000');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Gibraltar', function() {
        this._$field.val('GI75NWBK000000007099453');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Greece', function() {
        this._$field.val('GR1601101250000000012300695');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Greenland', function() {
        this._$field.val('GL8964710001000206');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Hungary', function() {
        this._$field.val('HU42117730161111101800000000');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Iceland', function() {
        this._$field.val('IS140159260076545510730339');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Iran', function() {
        this._$field.val('IR580540105180021273113007');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Ireland', function() {
        this._$field.val('IE29AIBK93115212345678');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Israel', function() {
        this._$field.val('IL620108000000099999999');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Italy', function() {
        this._$field.val('IT60X0542811101000000123456');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Ivory Coast', function() {
        this._$field.val('CI05A00060174100178530011852');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Jordan', function() {
        this._$field.val('JO94CBJO0010000000000131000302');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Kazakhstan', function() {
        this._$field.val('KZ176010251000042993');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Kuwait', function() {
        this._$field.val('KW74NBOK0000000000001000372151');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Latvia', function() {
        this._$field.val('LV80BANK0000435195001');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Lebanon', function() {
        this._$field.val('LB30099900000001001925579115');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Liechtenstein', function() {
        this._$field.val('LI21088100002324013AA');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Lithuania', function() {
        this._$field.val('LT121000011101001000');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Luxembourg', function() {
        this._$field.val('LU280019400644750000');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Macedonia', function() {
        this._$field.val('MK07300000000042425');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Madagascar', function() {
        this._$field.val('MG4600005030010101914016056');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Malta', function() {
        this._$field.val('MT84MALT011000012345MTLCAST001S');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Mauritania', function() {
        this._$field.val('MR1300012000010000002037372');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Mauritius', function() {
        this._$field.val('MU17BOMM0101101030300200000MUR');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Mali', function() {
        this._$field.val('ML03D00890170001002120000447');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Moldova', function() {
        this._$field.val('MD24AG000225100013104168');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Monaco', function() {
        this._$field.val('MC5813488000010051108001292');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Montenegro', function() {
        this._$field.val('ME25505000012345678951');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Mozambique', function() {
        this._$field.val('MZ59000100000011834194157');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Netherlands', function() {
        this._$field.val('NL91ABNA0417164300');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Norway', function() {
        this._$field.val('NO9386011117947');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Pakistan', function() {
        this._$field.val('PK24SCBL0000001171495101');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Palestine', function() {
        this._$field.val('PS92PALS000000000400123456702');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Poland', function() {
        this._$field.val('PL27114020040000300201355387');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Portugal', function() {
        this._$field.val('PT50000201231234567890154');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Qatar', function() {
        this._$field.val('QA58DOHB00001234567890ABCDEFG');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Romania', function() {
        this._$field.val('RO49AAAA1B31007593840000');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('San Marino', function() {
        this._$field.val('SM86U0322509800000000270100');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Saudi Arabia', function() {
        this._$field.val('SA0380000000608010167519');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Senegal', function() {
        this._$field.val('SN12K00100152000025690007542');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Serbia', function() {
        this._$field.val('RS35260005601001611379');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Slovakia', function() {
        this._$field.val('SK3112000000198742637541');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Slovenia', function() {
        this._$field.val('SI56191000000123438');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Spain', function() {
        this._$field.val('ES9121000418450200051332');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Sweden', function() {
        this._$field.val('SE3550000000054910000003');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Switzerland', function() {
        this._$field.val('CH9300762011623852957');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Tunisia', function() {
        this._$field.val('TN5914207207100707129648');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Turkey', function() {
        this._$field.val('TR330006100519786457841326');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('United Arab Emirates', function() {
        this._$field.val('AE260211000000230064016');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('United Kingdom', function() {
        this._$field.val('GB29NWBK60161331926819');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('Virgin Islands, British', function() {
        this._$field.val('VG96VPVG0000012345678901');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toBeTruthy();
    });

    it('invalid checksum', function() {
        this._$field.val('TR330006100519786457841325');
        this._bs.validate();
        expect(this._bs.isValidField('iban')).toEqual(false);
    });
});

describe('isbn', function() {
    // Override the default options
    $.extend($.fn.bootstrapValidator.DEFAULT_OPTIONS, {
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    });

    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="form">',
                    '<div class="form-group">',
                        '<input type="text" name="isbn" data-bv-isbn />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#form').bootstrapValidator();

        this._bs     = $('#form').data('bootstrapValidator');
        this._$field = this._bs.getFieldElements('isbn');
    });

    afterEach(function() {
        $('#form').bootstrapValidator('destroy').remove();
    });

    it('isbn10 hyphen', function() {
        var samples = ['99921-58-10-7', '9971-5-0210-0', '960-425-059-0', '80-902734-1-6'];

        for (var i in samples) {
            this._$field.val(samples[i]);
            this._bs.validate();
            expect(this._bs.isValidField('isbn')).toBeTruthy();
        }
    });

    it('isbn10 space', function() {
        var samples = ['85 359 0277 5', '1 84356 028 3', '0 684 84328 5', '0 85131 041 9', '0 943396 04 2'];

        for (var i in samples) {
            this._$field.val(samples[i]);
            this._bs.validate();
            expect(this._bs.isValidField('isbn')).toBeTruthy();
        }
    });

    it('isbn10 hyphen with X', function() {
        var samples = ['0-8044-2957-X', '0-9752298-0-X'];
        for (var i in samples) {
            this._$field.val(samples[i]);
            this._bs.validate();
            expect(this._bs.isValidField('isbn')).toBeTruthy();
        }
    });

    it('isbn10 invalid check digit', function() {
        this._$field.val('99921-58-10-6');
        this._bs.validate();
        expect(this._bs.isValidField('isbn')).toEqual(false);
    });

    it('isbn13', function() {
        this._$field.val('978-0-306-40615-7');
        this._bs.validate();
        expect(this._bs.isValidField('isbn')).toBeTruthy();
    });

    it('isbn13 invalid check digit', function() {
        this._$field.val('978-0-306-40615-6');
        this._bs.validate();
        expect(this._bs.isValidField('isbn')).toEqual(false);
    });
});

describe('isin', function() {
    // Override the default options
    $.extend($.fn.bootstrapValidator.DEFAULT_OPTIONS, {
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    });

    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="form">',
                    '<div class="form-group">',
                        '<input type="text" name="isin" data-bv-isin />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#form').bootstrapValidator();

        this._bs     = $('#form').data('bootstrapValidator');
        this._$field = this._bs.getFieldElements('isin');
    });

    afterEach(function() {
        $('#form').bootstrapValidator('destroy').remove();
    });

    it('valid', function() {
        var samples = ['US0378331005', 'AU0000XVGZA3', 'GB0002634946'];

        for (var i in samples) {
            this._$field.val(samples[i]);
            this._bs.validate();
            expect(this._bs.isValidField('isin')).toBeTruthy();
        }
    });

    it('invalid country code', function() {
        this._$field.val('AA0000XVGZA3');
        this._bs.validate();
        expect(this._bs.isValidField('isin')).toEqual(false);
    });

    it('contains only digits and alphabet', function() {
        this._$field.val('US12345ABC@#$');
        this._bs.validate();
        expect(this._bs.isValidField('isin')).toEqual(false);
    });

    it('invalid length', function() {
        this._$field.val('US1234567');
        this._bs.validate();
        expect(this._bs.isValidField('isin')).toEqual(false);
    });

    it('invalid check digit', function() {
        this._$field.val('US0378331004');
        this._bs.validate();
        expect(this._bs.isValidField('isin')).toEqual(false);
    });
});
