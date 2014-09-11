describe('rgbColor', function() {

    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="rgbColorForm">',
                    '<div class="form-group">',
                        '<input type="text" name="rgb" data-bv-rgbcolor />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#rgbColorForm').bootstrapValidator();

        this.bv          = $('#rgbColorForm').data('bootstrapValidator');
        this.$rgbColor = this.bv.getFieldElements('rgb');
    });

    afterEach(function() {
        $('#rgbColorForm').bootstrapValidator('destroy').parent().remove();
    });

    it('accept rgb()', function() {
        this.$rgbColor.val('rgb(255,255,255)');
        this.bv.validate();
        expect(this.bv.isValidField('rgb')).toBeTruthy();
    });

    it('accept spaces around numeric values', function() {
        this.$rgbColor.val('rgb( 255 , 255 , 255 )');
        this.bv.validate();
        expect(this.bv.isValidField('rgb')).toBeTruthy();
    });

    it('accept multiple spaces around numeric values', function() {
        this.$rgbColor.val('rgb(  255,  255,       255  )');
        this.bv.validate();
        expect(this.bv.isValidField('rgb')).toBeTruthy();
    });

    it('accept interger values', function() {
        this.$rgbColor.val('rgb(255,255,255)');
        this.bv.validate();
        expect(this.bv.isValidField('rgb')).toBeTruthy();
    });

    it('accept percent values', function() {
        this.$rgbColor.val('rgb(100%,100%,100%)');
        this.bv.validate();
        expect(this.bv.isValidField('rgb')).toBeTruthy();
    });

    it('reject mixed intergers and percentile input', function() {
        this.$rgbColor.val('rgb(255,255,100%)');
        this.bv.validate();
        expect(this.bv.isValidField('rgb')).toEqual(false);
    });

    it('reject negative integers', function() {
        this.$rgbColor.val('rgb(-10,255,255)');
        this.bv.validate();
        expect(this.bv.isValidField('rgb')).toEqual(false);
    });

    it('reject negative percentages', function() {
        this.$rgbColor.val('rgb(-10%,100%,100%)');
        this.bv.validate();
        expect(this.bv.isValidField('rgb')).toEqual(false);
    });

    it('require rgb()', function() {
        this.$rgbColor.val('255,255,255');
        this.bv.validate();
        expect(this.bv.isValidField('rgb')).toEqual(false);
    });

    it('reject intergers above 255', function() {
        this.$rgbColor.val('rgb(255,255,256)');
        this.bv.validate();
        expect(this.bv.isValidField('rgb')).toEqual(false);
    });

    it('reject percentages above 100%', function() {
        this.$rgbColor.val('rgb(100%,100%,101%)');
        this.bv.validate();
        expect(this.bv.isValidField('rgb')).toEqual(false);
    });

    it('reject space between rgb and (', function() {
        this.$rgbColor.val('rgb (255,255,255)');
        this.bv.validate();
        expect(this.bv.isValidField('rgb')).toEqual(false);
    });

    it('reject leading space', function() {
        this.$rgbColor.val(' rgb(255,255,255)');
        this.bv.validate();
        expect(this.bv.isValidField('rgb')).toEqual(false);
    });

    it('reject trailing space', function() {
        this.$rgbColor.val('rgb(255,255,255) ');
        this.bv.validate();
        expect(this.bv.isValidField('rgb')).toEqual(false);
    });

});
