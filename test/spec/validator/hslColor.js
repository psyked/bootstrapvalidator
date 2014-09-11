describe('hslColor', function() {

    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="rbgColorForm">',
                    '<div class="form-group">',
                        '<input type="text" name="hsl" data-bv-hslcolor />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#rbgColorForm').bootstrapValidator();

        this.bv          = $('#rbgColorForm').data('bootstrapValidator');
        this.$hslColor = this.bv.getFieldElements('hsl');
    });

    afterEach(function() {
        $('#rbgColorForm').bootstrapValidator('destroy').parent().remove();
    });

    it('accept hsl()', function() {
        this.$hslColor.val('hsl(120,50%,50%)');
        this.bv.validate();
        expect(this.bv.isValidField('hsl')).toBeTruthy();
    });

    it('accept spaces around values', function() {
        this.$hslColor.val('hsl( 120 , 50% , 50% )');
        this.bv.validate();
        expect(this.bv.isValidField('hsl')).toBeTruthy();
    });

    it('accept multiple spaces around values', function() {
        this.$hslColor.val('hsl(  120,  50%,       50%  )');
        this.bv.validate();
        expect(this.bv.isValidField('hsl')).toBeTruthy();
    });

    it('accept negative hue value', function() {
        this.$hslColor.val('hsl(-120,50%,50%)');
        this.bv.validate();
        expect(this.bv.isValidField('hsl')).toBeTruthy();
    });

    it('accept hue values larger than 360', function() {
        this.$hslColor.val('hsl(480,50%,50%)');
        this.bv.validate();
        expect(this.bv.isValidField('hsl')).toBeTruthy();
    });

    it('reject negative saturation value', function() {
        this.$hslColor.val('hsl(10,-50%,50%)');
        this.bv.validate();
        expect(this.bv.isValidField('hsl')).toEqual(false);
    });

    it('reject negative lightness', function() {
        this.$hslColor.val('hsl(10,50%,-50%)');
        this.bv.validate();
        expect(this.bv.isValidField('hsl')).toEqual(false);
    });

    it('require hsl()', function() {
        this.$hslColor.val('120,50%,50%');
        this.bv.validate();
        expect(this.bv.isValidField('hsl')).toEqual(false);
    });

    it('reject percentages above 100%', function() {
        this.$hslColor.val('hsl(120,100%,101%)');
        this.bv.validate();
        expect(this.bv.isValidField('hsl')).toEqual(false);
    });

    it('reject space between hsl and (', function() {
        this.$hslColor.val('hsl (120,50%,50%)');
        this.bv.validate();
        expect(this.bv.isValidField('hsl')).toEqual(false);
    });

    it('reject leading space', function() {
        this.$hslColor.val(' hsl(120,50%,50%)');
        this.bv.validate();
        expect(this.bv.isValidField('hsl')).toEqual(false);
    });

    it('reject trailing space', function() {
        this.$hslColor.val('hsl(120,50%,50%) ');
        this.bv.validate();
        expect(this.bv.isValidField('hsl')).toEqual(false);
    });

    it('reject percentages in hue value', function() {
        this.$hslColor.val('hsl(50%, 50%, 100%)');
        this.bv.validate();
        expect(this.bv.isValidField('hsl')).toEqual(false);
    });

    it('reject integers in saturation value', function() {
        this.$hslColor.val('hsl(120, 50, 100%)');
        this.bv.validate();
        expect(this.bv.isValidField('hsl')).toEqual(false);
    });

    it('reject integers in lightness value', function() {
        this.$hslColor.val('hsl(120, 50%, 100)');
        this.bv.validate();
        expect(this.bv.isValidField('hsl')).toEqual(false);
    });

});
