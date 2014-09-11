describe('rgbaColor', function() {

    beforeEach(function() {
        var html = [
            '<div class="container">',
<<<<<<< HEAD
                '<form class="form-horizontal" id="rgbaColorForm">',
=======
                '<form class="form-horizontal" id="rbgColorForm">',
>>>>>>> Add validator and test suite for rgba() color validation
                    '<div class="form-group">',
                        '<input type="text" name="rgba" data-bv-rgbacolor />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
<<<<<<< HEAD
        $('#rgbaColorForm').bootstrapValidator();

        this.bv          = $('#rgbaColorForm').data('bootstrapValidator');
=======
        $('#rbgColorForm').bootstrapValidator();

        this.bv          = $('#rbgColorForm').data('bootstrapValidator');
>>>>>>> Add validator and test suite for rgba() color validation
        this.$rgbaColor = this.bv.getFieldElements('rgba');
    });

    afterEach(function() {
<<<<<<< HEAD
        $('#rgbaColorForm').bootstrapValidator('destroy').parent().remove();
=======
        $('#rbgColorForm').bootstrapValidator('destroy').parent().remove();
>>>>>>> Add validator and test suite for rgba() color validation
    });

    it('accept rgba()', function() {
        this.$rgbaColor.val('rgba(255,255,255,1)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toBeTruthy();
    });

    it('accept spaces around numeric values', function() {
        this.$rgbaColor.val('rgba( 255 , 255 , 255 , 1 )');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toBeTruthy();
    });

    it('accept multiple spaces around numeric values', function() {
        this.$rgbaColor.val('rgba(  255  ,  255    ,       255 ,  1     )');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toBeTruthy();
    });

    it('accept interger values', function() {
        this.$rgbaColor.val('rgba(255,255,255,1)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toBeTruthy();
    });

    it('accept percent values', function() {
        this.$rgbaColor.val('rgba(100%,100%,100%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toBeTruthy();
    });

    it('accept integer alpha channel value of 0', function() {
        this.$rgbaColor.val('rgba(255,255,255,0)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toBeTruthy();
    });

    it('accept integer alpha channel value of 1', function() {
        this.$rgbaColor.val('rgba(255,255,255,1)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toBeTruthy();
    });

    it('accept floating alpha channel with leading 0', function() {
        this.$rgbaColor.val('rgba(255,255,255,0.5)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toBeTruthy();
    });

    it('accept floating alpha channel without leading 0', function() {
        this.$rgbaColor.val('rgba(255,255,255,.5)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toBeTruthy();
    });

    it('accept floating alpha channel with more than 1 decimal place', function() {
        this.$rgbaColor.val('rgba(255,255,255,.524141)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toBeTruthy();
    });

    it('accept integer alpha channel value of 0 with percentage rgb values', function() {
        this.$rgbaColor.val('rgba(100%,100%,100%,0)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toBeTruthy();
    });

    it('accept integer alpha channel value of 1 with percentage rgb values', function() {
        this.$rgbaColor.val('rgba(100%,100%,100%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toBeTruthy();
    });

    it('accept floating alpha channel with leading 0 with percentage rgb values', function() {
        this.$rgbaColor.val('rgba(100%,100%,100%,0.5)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toBeTruthy();
    });

    it('accept floating alpha channel without leading 0 with percentage rgb values', function() {
        this.$rgbaColor.val('rgba(100%,100%,100%,.5)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toBeTruthy();
    });

    it('accept floating alpha channel with more than 1 decimal place with percentage rgb values', function() {
        this.$rgbaColor.val('rgba(100%,100%,100%,.524141)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toBeTruthy();
    });

    it('reject percentage value for alpha channel', function() {
        this.$rgbaColor.val('rgba(100%,100%,100%,50%)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toEqual(false);
    });

    it('reject integers larger than 1 for alpha channel', function() {
        this.$rgbaColor.val('rgba(255,255,255,2)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toEqual(false);
    });

    it('reject negative integers for alpha channel', function() {
        this.$rgbaColor.val('rgba(255,255,255,-1)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toEqual(false);
    });

    it('reject floats larger than 1 for alpha channel', function() {
        this.$rgbaColor.val('rgba(255,255,255,1.000000000001)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toEqual(false);
    });

    it('reject negative floats for alpha channel', function() {
        this.$rgbaColor.val('rgba(255,255,255,-0.5)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toEqual(false);
    });

    it('reject more floats larger than 1 for alpha channel', function() {
        this.$rgbaColor.val('rgba(255,255,255,2.3)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toEqual(false);
    });

    it('reject mixed intergers and percentile input', function() {
        this.$rgbaColor.val('rgba(255,255,100%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toEqual(false);
    });

    it('reject negative integers', function() {
        this.$rgbaColor.val('rgba(-10,255,255,1)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toEqual(false);
    });

    it('reject negative percentages', function() {
        this.$rgbaColor.val('rgba(-10%,100%,100%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toEqual(false);
    });

    it('require rgba()', function() {
        this.$rgbaColor.val('255,255,255,1');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toEqual(false);
    });

    it('reject intergers above 255', function() {
        this.$rgbaColor.val('rgba(255,255,256),1');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toEqual(false);
    });

    it('reject percentages above 100%', function() {
        this.$rgbaColor.val('rgba(100%,100%,101%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toEqual(false);
    });

    it('reject space between rgba and (', function() {
        this.$rgbaColor.val('rgba (255,255,255,1)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toEqual(false);
    });

    it('reject leading space', function() {
        this.$rgbaColor.val(' rgba(255,255,255,1)');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toEqual(false);
    });

    it('reject trailing space', function() {
        this.$rgbaColor.val('rgba(255,255,255,1) ');
        this.bv.validate();
        expect(this.bv.isValidField('rgba')).toEqual(false);
    });

});
