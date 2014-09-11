describe('hslaColor', function() {

    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="hslaColorForm">',
                    '<div class="form-group">',
                        '<input type="text" name="hsla" data-bv-hslacolor />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#hslaColorForm').bootstrapValidator();

        this.bv          = $('#hslaColorForm').data('bootstrapValidator');
        this.$hslaColor = this.bv.getFieldElements('hsla');
    });

    afterEach(function() {
        $('#hslaColorForm').bootstrapValidator('destroy').parent().remove();
    });

    it('accept hsla()', function() {
        this.$hslaColor.val('hsla(120,50%,50%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toBeTruthy();
    });

    it('accept spaces around values', function() {
        this.$hslaColor.val('hsla( 120 , 50% , 50%, 1 )');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toBeTruthy();
    });

    it('accept multiple spaces around values', function() {
        this.$hslaColor.val('hsla(  120,  50%,       50% ,   1  )');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toBeTruthy();
    });

    it('accept negative hue value', function() {
        this.$hslaColor.val('hsla(-120,50%,50%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toBeTruthy();
    });

    it('accept hue values larger than 360', function() {
        this.$hslaColor.val('hsla(480,50%,50%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toBeTruthy();
    });

    it('accept integer alpha channel value of 0', function() {
        this.$hslaColor.val('hsla(120,50%,100%,0)');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toBeTruthy();
    });

    it('accept integer alpha channel value of 1', function() {
        this.$hslaColor.val('hsla(120,50%,100%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toBeTruthy();
    });

    it('accept floating alpha channel with leading 0', function() {
        this.$hslaColor.val('hsla(120,50%,100%,0.5)');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toBeTruthy();
    });

    it('accept floating alpha channel without leading 0', function() {
        this.$hslaColor.val('hsla(120,50%,100%,.5)');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toBeTruthy();
    });

    it('accept floating alpha channel with more than 1 decimal place', function() {
        this.$hslaColor.val('hsla(120,50%,100%,.524141)');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toBeTruthy();
    });

    it('reject percentage value for alpha channel', function() {
        this.$hslaColor.val('hsla(120,50%,100%,50%)');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toEqual(false);
    });

    it('reject integers larger than 1 for alpha channel', function() {
        this.$hslaColor.val('hsla(120,50%,100%,2)');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toEqual(false);
    });

    it('reject negative integers for alpha channel', function() {
        this.$hslaColor.val('hsla(120,50%,100%,-1)');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toEqual(false);
    });

    it('reject floats larger than 1 for alpha channel', function() {
        this.$hslaColor.val('hsla(120,50%,100%,1.000000000001)');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toEqual(false);
    });

    it('reject negative floats for alpha channel', function() {
        this.$hslaColor.val('hsla(120,50%,100%,-0.5)');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toEqual(false);
    });

    it('reject more floats larger than 1 for alpha channel', function() {
        this.$hslaColor.val('hsla(120,50%,100%,2.3)');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toEqual(false);
    });

    it('reject negative saturation value', function() {
        this.$hslaColor.val('hsla(10,-50%,50%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toEqual(false);
    });

    it('reject negative lightness', function() {
        this.$hslaColor.val('hsla(10,50%,-50%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toEqual(false);
    });

    it('require hsla()', function() {
        this.$hslaColor.val('120,50%,50%,1');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toEqual(false);
    });

    it('reject percentages above 100%', function() {
        this.$hslaColor.val('hsla(120,100%,101%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toEqual(false);
    });

    it('reject space between hsla and (', function() {
        this.$hslaColor.val('hsla (120,50%,50%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toEqual(false);
    });

    it('reject leading space', function() {
        this.$hslaColor.val(' hsla(120,50%,50%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toEqual(false);
    });

    it('reject trailing space', function() {
        this.$hslaColor.val('hsla(120,50%,50%,1) ');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toEqual(false);
    });

    it('reject percentages in hue value', function() {
        this.$hslaColor.val('hsla(50%, 50%, 100%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toEqual(false);
    });

    it('reject integers in saturation value', function() {
        this.$hslaColor.val('hsla(120, 50, 100%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toEqual(false);
    });

    it('reject integers in lightness value', function() {
        this.$hslaColor.val('hsla(120, 50%, 100,1)');
        this.bv.validate();
        expect(this.bv.isValidField('hsla')).toEqual(false);
    });
});
