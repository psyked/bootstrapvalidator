describe('vat', function() {
    beforeEach(function() {
        $([
            '<form class="form-horizontal" id="vatForm">',
                '<div class="form-group">',
                    '<select class="form-control" name="country">',
                        '<option value="AT">Austria</option>',
                        '<option value="BE">Belgium</option>',
                        '<option value="BG">Bulgaria</option>',
                        '<option value="HR">Croatia</option>',
                        '<option value="CY">Cyprus</option>',
                        '<option value="CZ">Czech Republic</option>',
                        '<option value="DK">Denmark</option>',
                        '<option value="EE">Estonia</option>',
                        '<option value="FI">Finland</option>',
                        '<option value="FR">France</option>',
                        '<option value="DE">Germany</option>',
                        '<option value="GR">Greece</option>',
                        '<option value="HU">Hungary</option>',
                        '<option value="IE">Ireland</option>',
                        '<option value="IT">Italy</option>',
                        '<option value="LV">Latvia</option>',
                        '<option value="LT">Lithuania</option>',
                        '<option value="LU">Luxembourg</option>',
                        '<option value="MT">Malta</option>',
                        '<option value="NL">Netherlands</option>',
                        '<option value="NO">Norway</option>',
                        '<option value="PL">Poland</option>',
                        '<option value="PT">Portugal</option>',
                        '<option value="RO">Romania</option>',
                        '<option value="RU">Russia</option>',
                        '<option value="RS">Serbia</option>',
                        '<option value="SK">Slovakia</option>',
                        '<option value="SI">Slovenia</option>',
                        '<option value="ES">Spain</option>',
                        '<option value="SE">Sweden</option>',
                        '<option value="CH">Switzerland</option>',
                        '<option value="GB">United Kingdom</option>',
                    '</select>',
                '</div>',
                '<div class="form-group">',
                    '<input type="text" name="vat" data-bv-vat />',
                '</div>',
            '</form>',
        ].join('\n')).appendTo('body');

        $('#vatForm').bootstrapValidator();

        /**
         * @type {BootstrapValidator}
         */
        this.bv       = $('#vatForm').data('bootstrapValidator');
        this.$country = this.bv.getFieldElements('country');
        this.$vat     = this.bv.getFieldElements('vat');
    });

    afterEach(function() {
        $('#vatForm').bootstrapValidator('destroy').remove();
    });

    it('dynamic country', function() {
        this.$vat.attr('data-bv-vat-country', 'country');
        this.bv.destroy();
        this.bv = $('#vatForm').bootstrapValidator().data('bootstrapValidator');

        this.$country.val('AT');
        this.$vat.val('ATU13585627');
        this.bv.validate();
        expect(this.bv.isValid()).toBeTruthy();

        this.bv.resetForm();
        this.$country.val('BG');
        this.$vat.val('BE0428759497');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$country.val('BE');
        this.$vat.val('BE431150351');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);
    });

    it('Austrian VAT number', function () {
        // Valid samples
        var validSamples = ['ATU13585627'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['ATU13585626'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Belgian VAT number', function () {
        // Valid samples
        var validSamples = ['BE0428759497'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['BE431150351'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Bulgarian VAT number', function () {
        // Valid samples
        var validSamples = ['BG175074752', 'BG7523169263', 'BG8032056031', 'BG7542011030', 'BG7111042925'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['BG175074753', 'BG7552A10004', 'BG7111042922'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Cypriot VAT number', function () {
        // Valid samples
        var validSamples = ['CY10259033P'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['CY10259033Z'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Czech Republic VAT number', function () {
        // Valid samples
        var validSamples = ['CZ25123891', 'CZ7103192745', 'CZ991231123', 'CZ640903926'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['CZ25123890', 'CZ1103492745', 'CZ590312123'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('German VAT number', function () {
        // Valid samples
        var validSamples = ['DE136695976'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['DE136695978'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Danish VAT number', function () {
        // Valid samples
        var validSamples = ['DK13585628'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['DK13585627'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Estonian VAT number', function () {
        // Valid samples
        var validSamples = ['EE100931558', 'EE100594102'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['EE100594103'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Spanish VAT number (NIF)', function () {
        // Valid samples
        var validSamples = ['ES54362315K', 'ESX2482300W', 'ESX5253868R', 'ESM1234567L', 'ESJ99216582', 'ESB58378431', 'ESB64717838'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['ES54362315Z', 'ESX2482300A', 'ESJ99216583'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Finnish VAT number', function () {
        // Valid samples
        var validSamples = ['FI20774740'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['FI20774741'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('French VAT number (TVA)', function () {
        // Valid samples
        var validSamples = ['FR40303265045', 'FR23334175221', 'FRK7399859412', 'FR4Z123456782'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['FR84323140391'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('United Kingdom VAT number', function () {
        // Valid samples
        var validSamples = ['GB980780684'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['GB802311781'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Greek VAT number', function () {
        // Valid samples
        var validSamples = ['GR023456780', 'EL094259216'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['EL123456781'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Hungarian VAT number', function () {
        // Valid samples
        var validSamples = ['HU12892312'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['HU12892313'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Croatian VAT number', function () {
        // Valid samples
        var validSamples = ['HR33392005961'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['HR33392005962'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Irish VAT number', function () {
        // Valid samples
        var validSamples = ['IE6433435F', 'IE6433435OA', 'IE8D79739I'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['IE8D79738J'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Italian VAT number', function () {
        // Valid samples
        var validSamples = ['IT00743110157'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['IT00743110158'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Lithuanian VAT number', function () {
        // Valid samples
        var validSamples = ['LT119511515', 'LT100001919017', 'LT100004801610'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['LT100001919018'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Luxembourg VAT number', function () {
        // Valid samples
        var validSamples = ['LU15027442'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['LU15027443'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Latvian VAT number', function () {
        // Valid samples
        var validSamples = ['LV40003521600', 'LV16117519997'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['LV40003521601', 'LV16137519997'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Maltese VAT number', function () {
        // Valid samples
        var validSamples = ['MT11679112'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['MT11679113'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Dutch VAT number', function () {
        // Valid samples
        var validSamples = ['NL004495445B01'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['NL123456789B90'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Polish VAT number', function () {
        // Valid samples
        var validSamples = ['PL8567346215'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['PL8567346216'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Portuguese VAT number', function () {
        // Valid samples
        var validSamples = ['PT501964843'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['PT501964842'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Romanian VAT number', function () {
        // Valid samples
        var validSamples = ['RO18547290'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['RO18547291'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Swedish VAT number', function () {
        // Valid samples
        var validSamples = ['SE123456789701'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['SE123456789101'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Slovenian VAT number', function () {
        // Valid samples
        var validSamples = ['SI50223054'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['SI50223055'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('Slovak VAT number', function () {
        // Valid samples
        var validSamples = ['SK2022749619'];
        for (var i in validSamples) {
            this.bv.resetForm();
            this.$vat.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }

        // Invalid samples
        var invalidSamples = ['SK2022749618'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$vat.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });
});
