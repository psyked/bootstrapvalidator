describe('ismn', function() {
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
                        '<input type="text" name="ismn" data-bv-ismn />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#form').bootstrapValidator();

        this._bs     = $('#form').data('bootstrapValidator');
        this._$field = this._bs.getFieldElements('ismn');
    });

    afterEach(function() {
        $('#form').bootstrapValidator('destroy').remove();
    });

    it('valid start with M', function() {
        this._$field.val('M230671187');
        this._bs.validate();
        expect(this._bs.isValidField('ismn')).toBeTruthy();
    });

    it('valid start with 979', function() {
        this._$field.val('9790060115615');
        this._bs.validate();
        expect(this._bs.isValidField('ismn')).toBeTruthy();
    });

    it('valid contains spaces', function() {
        this._$field.val('979 0 3452 4680 5');
        this._bs.validate();
        expect(this._bs.isValidField('ismn')).toBeTruthy();
    });

    it('valid contains dashes', function() {
        this._$field.val('979-0-0601-1561-5');
        this._bs.validate();
        expect(this._bs.isValidField('ismn')).toBeTruthy();
    });

    it('invalid format', function() {
        this._$field.val('N123456789');
        this._bs.validate();
        expect(this._bs.isValidField('ismn')).toEqual(false);
    });

    it('invalid check digit', function() {
        this._$field.val('9790060115614');
        this._bs.validate();
        expect(this._bs.isValidField('ismn')).toEqual(false);
    });
});
