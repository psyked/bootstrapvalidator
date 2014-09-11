describe('color', function() {

    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="colorForm">',
                    '<div class="form-group">',
                        '<input type="text" name="color" data-bv-color />',
                        '<input type="text" name="colorMultiple" data-bv-color />',
                        '<input type="text" name="colorHex" data-bv-color />',
                        '<input type="text" name="colorRgb" data-bv-color />',
                        '<input type="text" name="colorRgba" data-bv-color />',
                        '<input type="text" name="colorHsl" data-bv-color />',
                        '<input type="text" name="colorHsla" data-bv-color />',
                        '<input type="text" name="colorKeyword" data-bv-color />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#colorForm').bootstrapValidator({
            colorMultiple: {
                validators: {
                    color: {
                        type: [
                            "hex",
                            "rgb"
                        ]
                    }
                }
            },
            colorHex: {
                validators: {
                    color: {
                        type: ["hex"]
                    }
                }
            },
            colorRgb: {
                validators: {
                    color: {
                        type: ["rgb"]
                    }
                }
            },
            colorRgba: {
                validators: {
                    color: {
                        type: ["rgba"]
                    }
                }
            },
            colorHsl: {
                validators: {
                    color: {
                        type: ["hsl"]
                    }
                }
            },
            colorHsla: {
                validators: {
                    color: {
                        type: ["hsla"]
                    }
                }
            },
            colorKeyword: {
                validators: {
                    color: {
                        type: ["keyword"]
                    }
                }
            }
        });

        this.bv          = $('#colorForm').data('bootstrapValidator');
        this.$color = this.bv.getFieldElements('color');
        this.$colorHex = this.bv.getFieldElements('colorHex');
        this.$colorRgb = this.bv.getFieldElements('colorRgb');
        this.$colorRgba = this.bv.getFieldElements('colorRgba');
        this.$colorHsl = this.bv.getFieldElements('colorHsl');
        this.$colorHsla = this.bv.getFieldElements('colorHsla');
        this.$colorKeyword = this.bv.getFieldElements('colorKeyword');
    });

    afterEach(function() {
        $('#colorForm').bootstrapValidator('destroy').parent().remove();
    });

/* First run all color tests in the color field*/
    // Start hsla() tests
    it('hsla(): accept hsla()', function() {
        this.$color.val('hsla(120,50%,50%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('hsla(): accept spaces around values', function() {
        this.$color.val('hsla( 120 , 50% , 50%, 1 )');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('hsla(): accept multiple spaces around values', function() {
        this.$color.val('hsla(  120,  50%,       50% ,   1  )');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('hsla(): accept negative hue value', function() {
        this.$color.val('hsla(-120,50%,50%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('hsla(): accept hue values larger than 360', function() {
        this.$color.val('hsla(480,50%,50%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('hsla(): accept integer alpha channel value of 0', function() {
        this.$color.val('hsla(120,50%,100%,0)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('hsla(): accept integer alpha channel value of 1', function() {
        this.$color.val('hsla(120,50%,100%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('hsla(): accept floating alpha channel with leading 0', function() {
        this.$color.val('hsla(120,50%,100%,0.5)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('hsla(): accept floating alpha channel without leading 0', function() {
        this.$color.val('hsla(120,50%,100%,.5)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('hsla(): accept floating alpha channel with more than 1 decimal place', function() {
        this.$color.val('hsla(120,50%,100%,.524141)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('hsla(): reject percentage value for alpha channel', function() {
        this.$color.val('hsla(120,50%,100%,50%)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsla(): reject integers larger than 1 for alpha channel', function() {
        this.$color.val('hsla(120,50%,100%,2)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsla(): reject negative integers for alpha channel', function() {
        this.$color.val('hsla(120,50%,100%,-1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsla(): reject floats larger than 1 for alpha channel', function() {
        this.$color.val('hsla(120,50%,100%,1.000000000001)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsla(): reject negative floats for alpha channel', function() {
        this.$color.val('hsla(120,50%,100%,-0.5)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsla(): reject more floats larger than 1 for alpha channel', function() {
        this.$color.val('hsla(120,50%,100%,2.3)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsla(): reject negative saturation value', function() {
        this.$color.val('hsla(10,-50%,50%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsla(): reject negative lightness', function() {
        this.$color.val('hsla(10,50%,-50%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsla(): require hsla()', function() {
        this.$color.val('120,50%,50%,1');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsla(): reject percentages above 100%', function() {
        this.$color.val('hsla(120,100%,101%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsla(): reject space between hsla and (', function() {
        this.$color.val('hsla (120,50%,50%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsla(): reject leading space', function() {
        this.$color.val(' hsla(120,50%,50%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsla(): reject trailing space', function() {
        this.$color.val('hsla(120,50%,50%,1) ');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsla(): reject percentages in hue value', function() {
        this.$color.val('hsla(50%, 50%, 100%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsla(): reject integers in saturation value', function() {
        this.$color.val('hsla(120, 50, 100%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsla(): reject integers in lightness value', function() {
        this.$color.val('hsla(120, 50%, 100,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });


    // Start hsl() tests
    it('hsl(): accept hsl()', function() {
        this.$color.val('hsl(120,50%,50%)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('hsl(): accept spaces around values', function() {
        this.$color.val('hsl( 120 , 50% , 50% )');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('hsl(): accept multiple spaces around values', function() {
        this.$color.val('hsl(  120,  50%,       50%  )');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('hsl(): accept negative hue value', function() {
        this.$color.val('hsl(-120,50%,50%)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('hsl(): accept hue values larger than 360', function() {
        this.$color.val('hsl(480,50%,50%)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('hsl(): reject negative saturation value', function() {
        this.$color.val('hsl(10,-50%,50%)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsl(): reject negative lightness', function() {
        this.$color.val('hsl(10,50%,-50%)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsl(): require hsl()', function() {
        this.$color.val('120,50%,50%');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsl(): reject percentages above 100%', function() {
        this.$color.val('hsl(120,100%,101%)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsl(): reject space between hsl and (', function() {
        this.$color.val('hsl (120,50%,50%)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsl(): reject leading space', function() {
        this.$color.val(' hsl(120,50%,50%)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsl(): reject trailing space', function() {
        this.$color.val('hsl(120,50%,50%) ');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsl(): reject percentages in hue value', function() {
        this.$color.val('hsl(50%, 50%, 100%)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsl(): reject integers in saturation value', function() {
        this.$color.val('hsl(120, 50, 100%)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('hsl(): reject integers in lightness value', function() {
        this.$color.val('hsl(120, 50%, 100)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    // Start keyword test
    it('keyword: accept transparent', function() {
        this.$color.val('transparent');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('keyword: accept blueviolet', function() {
        this.$color.val('transparent');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('keyword: reject combined keywords', function() {
        this.$color.val('blueviolet red');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

   it('keyword: reject shady', function() {
        this.$color.val('shady');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('keyword: reject blueish', function() {
        this.$color.val('blueish');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });


    // Start rgba() test
    it('rgba(): accept rgba()', function() {
        this.$color.val('rgba(255,255,255,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('rgba(): accept spaces around numeric values', function() {
        this.$color.val('rgba( 255 , 255 , 255 , 1 )');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('rgba(): accept multiple spaces around numeric values', function() {
        this.$color.val('rgba(  255  ,  255    ,       255 ,  1     )');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('rgba(): accept interger values', function() {
        this.$color.val('rgba(255,255,255,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('rgba(): accept percent values', function() {
        this.$color.val('rgba(100%,100%,100%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('rgba(): accept integer alpha channel value of 0', function() {
        this.$color.val('rgba(255,255,255,0)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('rgba(): accept integer alpha channel value of 1', function() {
        this.$color.val('rgba(255,255,255,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('rgba(): accept floating alpha channel with leading 0', function() {
        this.$color.val('rgba(255,255,255,0.5)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('rgba(): accept floating alpha channel without leading 0', function() {
        this.$color.val('rgba(255,255,255,.5)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('rgba(): accept floating alpha channel with more than 1 decimal place', function() {
        this.$color.val('rgba(255,255,255,.524141)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('rgba(): accept integer alpha channel value of 0 with percentage rgb values', function() {
        this.$color.val('rgba(100%,100%,100%,0)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('rgba(): accept integer alpha channel value of 1 with percentage rgb values', function() {
        this.$color.val('rgba(100%,100%,100%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('rgba(): accept floating alpha channel with leading 0 with percentage rgb values', function() {
        this.$color.val('rgba(100%,100%,100%,0.5)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('rgba(): accept floating alpha channel without leading 0 with percentage rgb values', function() {
        this.$color.val('rgba(100%,100%,100%,.5)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('rgba(): accept floating alpha channel with more than 1 decimal place with percentage rgb values', function() {
        this.$color.val('rgba(100%,100%,100%,.524141)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('rgba(): reject percentage value for alpha channel', function() {
        this.$color.val('rgba(100%,100%,100%,50%)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('rgba(): reject integers larger than 1 for alpha channel', function() {
        this.$color.val('rgba(255,255,255,2)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('rgba(): reject negative integers for alpha channel', function() {
        this.$color.val('rgba(255,255,255,-1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('rgba(): reject floats larger than 1 for alpha channel', function() {
        this.$color.val('rgba(255,255,255,1.000000000001)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('rgba(): reject negative floats for alpha channel', function() {
        this.$color.val('rgba(255,255,255,-0.5)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('rgba(): reject more floats larger than 1 for alpha channel', function() {
        this.$color.val('rgba(255,255,255,2.3)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('rgba(): reject mixed intergers and percentile input', function() {
        this.$color.val('rgba(255,255,100%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('rgba(): reject negative integers', function() {
        this.$color.val('rgba(-10,255,255,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('rgba(): reject negative percentages', function() {
        this.$color.val('rgba(-10%,100%,100%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('rgba(): require rgba()', function() {
        this.$color.val('255,255,255,1');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('rgba(): reject intergers above 255', function() {
        this.$color.val('rgba(255,255,256),1');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('rgba(): reject percentages above 100%', function() {
        this.$color.val('rgba(100%,100%,101%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('rgba(): reject space between rgba and (', function() {
        this.$color.val('rgba (255,255,255,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('rgba(): reject leading space', function() {
        this.$color.val(' rgba(255,255,255,1)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('rgba(): reject trailing space', function() {
        this.$color.val('rgba(255,255,255,1) ');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    // Start rgb() test
    it('rgb(): accept rgb()', function() {
        this.$color.val('rgb(255,255,255)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('rgb(): accept spaces around numeric values', function() {
        this.$color.val('rgb( 255 , 255 , 255 )');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('rgb(): accept multiple spaces around numeric values', function() {
        this.$color.val('rgb(  255,  255,       255  )');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('rgb(): accept interger values', function() {
        this.$color.val('rgb(255,255,255)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('rgb(): accept percent values', function() {
        this.$color.val('rgb(100%,100%,100%)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toBeTruthy();
    });

    it('rgb(): reject mixed intergers and percentile input', function() {
        this.$color.val('rgb(255,255,100%)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('rgb(): reject negative integers', function() {
        this.$color.val('rgb(-10,255,255)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('rgb(): reject negative percentages', function() {
        this.$color.val('rgb(-10%,100%,100%)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('rgb(): require rgb()', function() {
        this.$color.val('255,255,255');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('rgb(): reject intergers above 255', function() {
        this.$color.val('rgb(255,255,256)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('rgb(): reject percentages above 100%', function() {
        this.$color.val('rgb(100%,100%,101%)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('rgb(): reject space between rgb and (', function() {
        this.$color.val('rgb (255,255,255)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('rgb(): reject leading space', function() {
        this.$color.val(' rgb(255,255,255)');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

    it('rgb(): reject trailing space', function() {
        this.$color.val('rgb(255,255,255) ');
        this.bv.validate();
        expect(this.bv.isValidField('color')).toEqual(false);
    });

/* Run individual tests */
    it('Individual field keyword: accept keyword', function() {
        this.$colorKeyword.val('blue');
        this.bv.validate();
        expect(this.bv.isValidField('colorKeyword')).toBeTruthy();
    });
    it('Individual field keyword: reject rgb', function() {
        this.$colorKeyword.val('rgb(255,255,255)');
        this.bv.validate();
        expect(this.bv.isValidField('colorKeyword')).toBeTruthy();
    });

    it('Individual field hex: accept 6 char hex', function() {
        this.$colorHex.val('#0000FF');
        this.bv.validate();
        expect(this.bv.isValidField('colorHex')).toBeTruthy();
    });
    it('Individual field hex: reject keyword', function() {
        this.$colorHex.val('blue');
        this.bv.validate();
        expect(this.bv.isValidField('colorHex')).toBeTruthy();
    });

    it('Individual field rgb(): accept rgb()', function() {
        this.$colorRgb.val('rgb(255,255,255)');
        this.bv.validate();
        expect(this.bv.isValidField('colorRgb')).toBeTruthy();
    });
    it('Individual field rgb(): reject hex', function() {
        this.$colorRgb.val('#0000FF');
        this.bv.validate();
        expect(this.bv.isValidField('colorRgb')).toBeTruthy();
    });

    it('Individual field rgba(): accept rgba()', function() {
        this.$colorRgba.val('rgba(255,255,255,1)');
        this.bv.validate();
        expect(this.bv.isValidField('colorRgba')).toBeTruthy();
    });
    it('Individual field rgba(): reject rgb()', function() {
        this.$colorRgba.val('rgb(255,255,255)');
        this.bv.validate();
        expect(this.bv.isValidField('colorRgba')).toBeTruthy();
    });

    it('Individual field hsl(): accept hsl()', function() {
        this.$colorHsl.val('hsl(120,50%,50%)');
        this.bv.validate();
        expect(this.bv.isValidField('colorHsl')).toBeTruthy();
    });
    it('Individual field hsl(): reject rgba()', function() {
        this.$colorHsl.val('rgba(255,255,255,1)');
        this.bv.validate();
        expect(this.bv.isValidField('colorHsl')).toBeTruthy();
    });

    it('Individual field hsla(): accept hsla()', function() {
        this.$colorHsla.val('hsla(120,50%,50%,1)');
        this.bv.validate();
        expect(this.bv.isValidField('colorHsla')).toBeTruthy();
    });
    it('Individual field hsla(): reject hsl()', function() {
        this.$colorHsla.val('hsl(120,50%,50%)');
        this.bv.validate();
        expect(this.bv.isValidField('colorHsla')).toBeTruthy();
    });

});
