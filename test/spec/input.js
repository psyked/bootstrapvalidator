describe('input', function() {
    beforeEach(function(done) {
        $([
            '<form class="form-horizontal" id="inputForm">',
                '<div class="form-group">',
                    '<textarea name="text" data-bv-notempty placeholder="Text" />',
                '</div>',
                '<div class="form-group">',
                    '<input type="text" name="input1" data-bv-notempty placeholder="Text" />',
                '</div>',
                '<div class="form-group">',
                    '<input type="text" name="input2" data-bv-notempty placeholder="Text" />',
                '</div>',
            '</form>'
        ].join('\n')).appendTo('body');

        $('#inputForm').bootstrapValidator();

        this.bv      = $('#inputForm').data('bootstrapValidator');
        this.$text   = this.bv.getFieldElements('text');
        this.$input1 = this.bv.getFieldElements('input1');
        this.$input2 = this.bv.getFieldElements('input2');
        setTimeout(done, 0);
    });

    afterEach(function() {
        $('#inputForm').bootstrapValidator('destroy').remove();
    });

    // #1040, #1041
    it('Fields should not be validated on init', function() {
        expect(this.bv.getMessages(this.$text)).toEqual([]);
        expect(this.bv.getMessages(this.$input1)).toEqual([]);
        expect(this.bv.getMessages(this.$input2)).toEqual([]);
    });
});
