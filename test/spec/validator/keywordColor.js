describe('keywordColor', function() {

    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="keywordColorForm">',
                    '<div class="form-group">',
                        '<input type="text" name="keyword" data-bv-keywordcolor />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#keywordColorForm').bootstrapValidator();

        this.bv          = $('#keywordColorForm').data('bootstrapValidator');
        this.$keywordColor = this.bv.getFieldElements('keyword');
    });

    afterEach(function() {
        $('#keywordColorForm').bootstrapValidator('destroy').parent().remove();
    });

    it('accept transparent', function() {
        this.$keywordColor.val('transparent');
        this.bv.validate();
        expect(this.bv.isValidField('keyword')).toBeTruthy();
    });

    it('accept blueviolet', function() {
        this.$keywordColor.val('transparent');
        this.bv.validate();
        expect(this.bv.isValidField('keyword')).toBeTruthy();
    });

    it('reject combined keywords', function() {
        this.$keywordColor.val('blueviolet red');
        this.bv.validate();
        expect(this.bv.isValidField('keyword')).toEqual(false);
    });

   it('reject shady', function() {
        this.$keywordColor.val('shady');
        this.bv.validate();
        expect(this.bv.isValidField('keyword')).toEqual(false);
    });

    it('reject blueish', function() {
        this.$keywordColor.val('blueish');
        this.bv.validate();
        expect(this.bv.isValidField('keyword')).toEqual(false);
    });
});
