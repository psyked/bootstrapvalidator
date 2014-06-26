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
