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
