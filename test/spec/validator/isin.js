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
