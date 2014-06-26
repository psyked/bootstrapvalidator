describe('issn', function() {
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
                        '<input type="text" name="issn" data-bv-issn />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#form').bootstrapValidator();

        this._bs     = $('#form').data('bootstrapValidator');
        this._$field = this._bs.getFieldElements('issn');
    });

    afterEach(function() {
        $('#form').bootstrapValidator('destroy').remove();
    });

    it('valid', function() {
        var samples = ['0378-5955', '0024-9319', '0032-1478'];

        for (var i in samples) {
            this._$field.val(samples[i]);
            this._bs.validate();
            expect(this._bs.isValidField('issn')).toBeTruthy();
        }
    });

    it('not contains hyphen', function() {
        this._$field.val('03785955');
        this._bs.validate();
        expect(this._bs.isValidField('issn')).toEqual(false);
    });

    it('contains only digits, X', function() {
        this._$field.val('1234-566A');
        this._bs.validate();
        expect(this._bs.isValidField('issn')).toEqual(false);
    });

    it('invalid check sum', function() {
        this._$field.val('0032-147X');
        this._bs.validate();
        expect(this._bs.isValidField('issn')).toEqual(false);
    });
});
