function getDate(value, validator, $field) {
    return validator.getFieldElements('date').val();
};

TestSuite = $.extend({}, TestSuite, {
    Date: {
        getDate: function(value, validator, $field) {
            return validator.getFieldElements('date').val();
        }
    }
});

describe('date', function() {
    beforeEach(function() {
        $([
            '<form class="form-horizontal" id="dateForm">',
                '<div id="msg"></div>',
                '<div class="form-group">',
                    '<input type="text" name="date" data-bv-date />',
                '</div>',
                '<div class="form-group">',
                    '<input type="text" name="minDate" data-bv-date data-bv-date-min="" />',
                '</div>',
                '<div class="form-group">',
                    '<input type="text" name="maxDate" data-bv-date data-bv-date-max="" />',
                '</div>',
                '<div class="form-group">',
                    '<input type="text" name="range" data-bv-date data-bv-date-min="" data-bv-date-max="" />',
                '</div>',
            '</form>'
        ].join('\n')).appendTo('body');

        $('#dateForm').bootstrapValidator();

        this.bv       = $('#dateForm').data('bootstrapValidator');
        this.$date    = this.bv.getFieldElements('date');
        this.$minDate = this.bv.getFieldElements('minDate');
        this.$maxDate = this.bv.getFieldElements('maxDate');
        this.$range   = this.bv.getFieldElements('range');
    });

    afterEach(function() {
        $('#dateForm').bootstrapValidator('destroy').remove();
    });

    it('YYYY/MM/DD', function() {
        this.bv.updateOption('date', 'date', 'format', 'YYYY/MM/DD');

        this.$date.val('2000/01/30');
        this.bv.validate();
        expect(this.bv.isValid()).toBeTruthy();

        // Invalid year
        this.bv.resetForm();
        this.$date.val('100/10/20');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        // Invalid month
        this.bv.resetForm();
        this.$date.val('2000/00/10');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$date.val('2000/15/10');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        // Invalid day
        this.bv.resetForm();
        this.$date.val('2000/03/00');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$date.val('2000/10/32');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        // Negative number
        this.bv.resetForm();
        this.$date.val('-2000/10/20');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$date.val('2000/-10/20');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$date.val('2000/10/-20');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        // Consist invalid characters
        // Issue #310
        this.bv.resetForm();
        this.$date.val('aaaa/');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$date.val('2004df/1dd1/5ffg');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        // Issue #475
        this.bv.resetForm();
        this.$date.val('2014/09');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$date.val('2014/09/');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$date.val('2014//15');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$date.val('/09/15');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);
    });

    it('MM/DD/YYYY', function() {
        this.bv.updateOption('date', 'date', 'format', 'MM/DD/YYYY');

        this.$date.val('09/15/2020');
        this.bv.validate();
        expect(this.bv.isValid()).toBeTruthy();

        this.bv.resetForm();
        this.$date.val('09/15');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$date.val('09/15/');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);
    });

    it('number of days in February', function() {
        this.bv.updateOption('date', 'date', 'format', 'YYYY/MM/DD');

        this.$date.val('2000/02/28');
        this.bv.validate();
        expect(this.bv.isValid()).toBeTruthy();

        this.bv.resetForm();
        this.$date.val('2000/02/29');
        this.bv.validate();
        expect(this.bv.isValid()).toBeTruthy();

        this.bv.resetForm();
        this.$date.val('2001/02/29');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);
    });

    // Issue #681
    it('date, month, year are prefixed by zero', function() {
        this.bv.updateOption('date', 'date', 'format', 'MM/DD/YYYY');

        this.$date.val('0012/08/2014');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$date.val('12/0008/2014');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$date.val('12/08/002014');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$date.val('12/08/2014');
        this.bv.validate();
        expect(this.bv.isValid()).toBeTruthy();
    });

    it('hours, minutes, seconds are prefixed by zero', function() {
        this.bv.updateOption('date', 'date', 'format', 'YYYY/MM/DD h:m:s');

        this.$date.val('2014/08/17 0007:30:00');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$date.val('2014/08/17 07:030:00');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$date.val('2014/08/17 07:30:0000');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$date.val('2014/08/17 07:30:00');
        this.bv.validate();
        expect(this.bv.isValid()).toBeTruthy();
    });

    // min test suite
    it('min date format YYYY/MM/DD', function() {
        this.bv.updateOption('minDate', 'date', 'format', 'YYYY/MM/DD');
        this.bv.updateOption('minDate', 'date', 'min', '2010/01/01');

        this.$minDate.val('2010/01/02');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toBeTruthy();

        this.bv.resetForm();
        this.$minDate.val('2010/01/002'); // day prefexid by 0 not allowed
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toEqual(false);

        this.bv.resetForm();
        this.$minDate.val('2014/08/17');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toBeTruthy();

        this.bv.resetForm();
        this.$minDate.val('2009/12/31');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toEqual(false);

        this.bv.resetForm();
        this.$minDate.val('2000/01/01');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toEqual(false);
    });

    it('min date format YYYY-MM-DD', function() {
        this.bv.updateOption('minDate', 'date', 'format', 'YYYY-MM-DD');
        this.bv.updateOption('minDate', 'date', 'min', '2010-01-01');

        this.$minDate.val('2010-01-02');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toBeTruthy();

        this.bv.resetForm();
        this.$minDate.val('2010-001-02'); // month prefexid by 0 not allowed
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toEqual(false);

        this.bv.resetForm();
        this.$minDate.val('2014-08-17');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toBeTruthy();

        this.bv.resetForm();
        this.$minDate.val('2009-12-31');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toEqual(false);

        this.bv.resetForm();
        this.$minDate.val('2000-01-01');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toEqual(false);
    });

    it('min date format DD/MM/YYYY', function() {
        this.bv.updateOption('minDate', 'date', 'format', 'DD/MM/YYYY');
        this.bv.updateOption('minDate', 'date', 'min', '01/01/2010');

        this.$minDate.val('02/01/2010');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toBeTruthy();

        this.bv.resetForm();
        this.$minDate.val('17/08/2014');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toBeTruthy();

        this.bv.resetForm();
        this.$minDate.val('02/01/02010'); // year prefixed by 0 not allowed
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toEqual(false);

        this.bv.resetForm();
        this.$minDate.val('31/12/2009');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toEqual(false);

        this.bv.resetForm();
        this.$minDate.val('01/01/2000');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toEqual(false);
    });

    it('min date format YYYY-MM-DD h:m:s', function() {
        this.bv.updateOption('minDate', 'date', 'format', 'YYYY-MM-DD h:m:s');
        this.bv.updateOption('minDate', 'date', 'min', '2010-01-01 01:00:00');

        this.bv.resetForm();
        this.$minDate.val('2010-01-01 01:00:01');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toBeTruthy();

        this.$minDate.val('2010-01-02 01:00:01');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toBeTruthy();

        this.bv.resetForm();
        this.$minDate.val('2014-08-17 12:00:00');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toBeTruthy();

        this.bv.resetForm();
        this.$minDate.val('2009-12-31 00:00:00');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toEqual(false);

        this.bv.resetForm();
        this.$minDate.val('2009-12-31 010:00:00'); // hours prefixed by 0 not allowed
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toEqual(false);

        this.bv.resetForm();
        this.$minDate.val('2009-12-31 10:001:00'); // minutes prefixed by 0 not allowed
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toEqual(false);

        this.bv.resetForm();
        this.$minDate.val('2009-12-31 10:01:012'); // seconds prefixed by 0 not allowed
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toEqual(false);

        this.bv.resetForm();
        this.$minDate.val('2009-12-31 00:00:00');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toEqual(false);

        this.bv.resetForm();
        this.$minDate.val('2000-01-01 23:00:12');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toEqual(false);
    });

    // max test suite
    it('max date format YYYY/MM/DD', function() {
        this.bv.updateOption('maxDate', 'date', 'format', 'YYYY/MM/DD');
        this.bv.updateOption('maxDate', 'date', 'max', '2014/09/10');

        this.$maxDate.val('2014/09/09');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toBeTruthy();

        this.bv.resetForm();
        this.$maxDate.val('2014/08/17');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toBeTruthy();

        this.bv.resetForm();
        this.$maxDate.val('02014/012/031'); // year, month or day prefixed by 0 not allowed
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toEqual(false);

        this.bv.resetForm();
        this.$maxDate.val('2014/12/31');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toEqual(false);

        this.bv.resetForm();
        this.$maxDate.val('2015/01/01');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toEqual(false);
    });

    it('max date format YYYY-MM-DD', function() {
        this.bv.updateOption('maxDate', 'date', 'format', 'YYYY-MM-DD');
        this.bv.updateOption('maxDate', 'date', 'max', '2014-09-10');

        this.$maxDate.val('2014-09-09');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toBeTruthy();

        this.bv.resetForm();
        this.$maxDate.val('2014-08-17');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toBeTruthy();

        this.bv.resetForm();
        this.$maxDate.val('02014-012-031');  // year, month or day prefixed by 0 not allowed
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toEqual(false);

        this.bv.resetForm();
        this.$maxDate.val('2014-12-31');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toEqual(false);

        this.bv.resetForm();
        this.$maxDate.val('2015-01-01');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toEqual(false);
    });

    it('max date format DD/MM/YYYY', function() {
        this.bv.updateOption('maxDate', 'date', 'format', 'DD/MM/YYYY');
        this.bv.updateOption('maxDate', 'date', 'max', '10/09/2014');

        this.$maxDate.val('09/09/2014');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toBeTruthy();

        this.bv.resetForm();
        this.$maxDate.val('17/08/2014');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toBeTruthy();

        this.bv.resetForm();
        this.$maxDate.val('031/012/02014'); // year, month or day prefixed by 0 not allowed
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toEqual(false);

        this.bv.resetForm();
        this.$maxDate.val('31/12/2014');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toEqual(false);

        this.bv.resetForm();
        this.$maxDate.val('01/01/2015');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toEqual(false);
    });

    it('max date format YYYY-MM-DD h:m:s', function() {
        this.bv.updateOption('maxDate', 'date', 'format', 'YYYY-MM-DD h:m:s');
        this.bv.updateOption('maxDate', 'date', 'max', '2014-09-10 01:00:00');

        this.$maxDate.val('2014-09-09 01:00:01');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toBeTruthy();

        this.bv.resetForm();
        this.$maxDate.val('2014-08-17 12:00:00');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toBeTruthy();

        this.bv.resetForm();
        this.$maxDate.val('2014-09-09 001:001:001'); // hours, minutes or seconds prefixed by 0 not allowed
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toEqual(false);

        this.bv.resetForm();
        this.$maxDate.val('2014-12-31 00:00:00');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toEqual(false);

        this.bv.resetForm();
        this.$maxDate.val('2015-01-01 23:00:12');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toEqual(false);
    });

    // range test suite
    it('range format YYYY/MM/DD', function() {
        this.bv.updateOption('range', 'date', 'format', 'YYYY/MM/DD');
        this.bv.updateOption('range', 'date', 'min', '2010/09/10');
        this.bv.updateOption('range', 'date', 'max', '2014/09/10');

        this.$range.val('2011/01/01');
        this.bv.validate();
        expect(this.bv.isValidField('range')).toBeTruthy();

        this.bv.resetForm();
        this.$range.val('2014/09/09');
        this.bv.validate();
        expect(this.bv.isValidField('range')).toBeTruthy();

        this.bv.resetForm();
        this.$range.val('02014/001/031'); // year, month or day prefixed by 0 not allowed
        this.bv.validate();
        expect(this.bv.isValidField('range')).toEqual(false);

        this.bv.resetForm();
        this.$range.val('2010/09/09');
        this.bv.validate();
        expect(this.bv.isValidField('range')).toEqual(false);

        this.bv.resetForm();
        this.$range.val('2014/09/11');
        this.bv.validate();
        expect(this.bv.isValidField('range')).toEqual(false);
    });

    it('range format YYYY-MM-DD', function() {
        this.bv.updateOption('range', 'date', 'format', 'YYYY-MM-DD');
        this.bv.updateOption('range', 'date', 'min', '2010-09-10');
        this.bv.updateOption('range', 'date', 'max', '2014-09-10');

        this.$range.val('2012-01-12');
        this.bv.validate();
        expect(this.bv.isValidField('range')).toBeTruthy();

        this.bv.resetForm();
        this.$range.val('2014-09-09');
        this.bv.validate();
        expect(this.bv.isValidField('range')).toBeTruthy();

        this.bv.resetForm();
        this.$range.val('02014-003-031');  // year, month or day prefixed by 0 not allowed
        this.bv.validate();
        expect(this.bv.isValidField('range')).toEqual(false);

        this.bv.resetForm();
        this.$range.val('2009-12-31');
        this.bv.validate();
        expect(this.bv.isValidField('range')).toEqual(false);

        this.bv.resetForm();
        this.$range.val('2015-01-01');
        this.bv.validate();
        expect(this.bv.isValidField('range')).toEqual(false);
    });

    it('range format DD/MM/YYYY', function() {
        this.bv.updateOption('range', 'date', 'format', 'DD/MM/YYYY');
        this.bv.updateOption('range', 'date', 'min', '10/09/2010');
        this.bv.updateOption('range', 'date', 'max', '10/09/2014');

        this.$range.val('11/11/2011');
        this.bv.validate();
        expect(this.bv.isValidField('range')).toBeTruthy();

        this.bv.resetForm();
        this.$range.val('17/08/2014');
        this.bv.validate();
        expect(this.bv.isValidField('range')).toBeTruthy();

        this.bv.resetForm();
        this.$range.val('031/012/02013'); // year, month or day prefixed by 0 not allowed
        this.bv.validate();
        expect(this.bv.isValidField('range')).toEqual(false);

        this.bv.resetForm();
        this.$range.val('31/01/2010');
        this.bv.validate();
        expect(this.bv.isValidField('range')).toEqual(false);

        this.bv.resetForm();
        this.$range.val('25/03/2015');
        this.bv.validate();
        expect(this.bv.isValidField('range')).toEqual(false);
    });

    it('range format YYYY-MM-DD h:m:s', function() {
        this.bv.updateOption('range', 'date', 'format', 'YYYY-MM-DD h:m:s');
        this.bv.updateOption('range', 'date', 'min', '2010-05-15 22:00:00');
        this.bv.updateOption('range', 'date', 'max', '2015-05-15 22:00:00');

        this.$range.val('2012-07-17 01:00:01');
        this.bv.validate();
        expect(this.bv.isValidField('range')).toBeTruthy();

        this.bv.resetForm();
        this.$range.val('2013-08-17 12:00:00');
        this.bv.validate();
        expect(this.bv.isValidField('range')).toBeTruthy();

        this.bv.resetForm();
        this.$range.val('2011-06-19 001:001:001'); // hours, minutes or seconds prefixed by 0 not allowed
        this.bv.validate();
        expect(this.bv.isValidField('range')).toEqual(false);

        this.bv.resetForm();
        this.$range.val('2008-11-27 23:15:00');
        this.bv.validate();
        expect(this.bv.isValidField('range')).toEqual(false);

        this.bv.resetForm();
        this.$range.val('2015-05-15 22:00:01');
        this.bv.validate();
        expect(this.bv.isValidField('range')).toEqual(false);
    });

    // dynamic min option
    it('dynamic min: name of field', function() {
        this.$minDate.attr('data-bv-date-min', 'date');
        this.bv.destroy();
        this.bv = $('#dateForm').bootstrapValidator().data('bootstrapValidator');
        this.bv.updateOption('minDate', 'date', 'format', 'YYYY/MM/DD');

        this.$date.val('2014/09/08');
        this.$minDate.val('2014/09/09');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toBeTruthy();

        this.bv.resetForm();
        this.$date.val('2014/09/08');
        this.$minDate.val('2014/08/17');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toBeFalsy();
    });

    it('dynamic min: callback declarative function', function() {
        this.$minDate.attr('data-bv-date-min', 'getDate');
        this.bv.destroy();
        this.bv = $('#dateForm').bootstrapValidator().data('bootstrapValidator');
        this.bv.updateOption('minDate', 'date', 'format', 'YYYY/MM/DD');

        this.$date.val('2014/09/08');
        this.$minDate.val('2014/09/09');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toBeTruthy();

        this.bv.resetForm();
        this.$date.val('2014/10/01');
        this.$minDate.val('2014/08/17');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toBeFalsy();
    });

    it('dynamic min: callback declarative function()', function() {
        this.$minDate.attr('data-bv-date-min', 'getDate()');
        this.bv.destroy();
        this.bv = $('#dateForm').bootstrapValidator().data('bootstrapValidator');
        this.bv.updateOption('minDate', 'date', 'format', 'YYYY/MM/DD');

        this.$date.val('2014/09/08');
        this.$minDate.val('2014/09/09');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toBeTruthy();

        this.bv.resetForm();
        this.$date.val('2014/10/01');
        this.$minDate.val('2014/08/17');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toBeFalsy();
    });

    it('dynamic min: callback declarative A.B.C', function() {
        this.$minDate.attr('data-bv-date-min', 'TestSuite.Date.getDate');
        this.bv.destroy();
        this.bv = $('#dateForm').bootstrapValidator().data('bootstrapValidator');
        this.bv.updateOption('minDate', 'date', 'format', 'YYYY/MM/DD');

        this.$date.val('2014/09/08');
        this.$minDate.val('2014/09/09');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toBeTruthy();

        this.bv.resetForm();
        this.$date.val('2014/10/01');
        this.$minDate.val('2014/08/17');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toBeFalsy();
    });

    it('dynamic min: callback declarative A.B.C()', function() {
        this.$minDate.attr('data-bv-date-min', 'TestSuite.Date.getDate()');
        this.bv.destroy();
        this.bv = $('#dateForm').bootstrapValidator().data('bootstrapValidator');
        this.bv.updateOption('minDate', 'date', 'format', 'YYYY/MM/DD');

        this.$date.val('2014/09/08');
        this.$minDate.val('2014/09/09');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toBeTruthy();

        this.bv.resetForm();
        this.$date.val('2014/10/01');
        this.$minDate.val('2014/08/17');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toBeFalsy();
    });

    it('dynamic min: callback programmatically', function() {
        this.$minDate.removeAttr('data-bv-date-min');
        this.bv.destroy();
        this.bv = $('#dateForm')
                        .bootstrapValidator({
                            fields: {
                                minDate: {
                                    validators: {
                                        date: {
                                            min: function(value, validator, $field) {
                                                return getDate(value, validator, $field);
                                            }
                                        }
                                    }
                                }
                            }
                        })
                        .data('bootstrapValidator');
        this.bv.updateOption('minDate', 'date', 'format', 'YYYY/MM/DD');

        this.$date.val('2014/09/08');
        this.$minDate.val('2014/09/09');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toBeTruthy();

        this.bv.resetForm();
        this.$date.val('2014/10/01');
        this.$minDate.val('2014/08/17');
        this.bv.validate();
        expect(this.bv.isValidField('minDate')).toBeFalsy();
    });

    // dynamic max option
    it('dynamic max: name of field', function() {
        this.$maxDate.attr('data-bv-date-max', 'date');
        this.bv.destroy();
        this.bv = $('#dateForm').bootstrapValidator().data('bootstrapValidator');
        this.bv.updateOption('maxDate', 'date', 'format', 'YYYY/MM/DD');

        this.$date.val('2015/01/01');
        this.$maxDate.val('2014/09/09');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toBeTruthy();

        this.bv.resetForm();
        this.$date.val('2014/01/01');
        this.$maxDate.val('2014/08/17');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toBeFalsy();
    });

    it('dynamic max: callback declarative function', function() {
        this.$maxDate.attr('data-bv-date-max', 'getDate');
        this.bv.destroy();
        this.bv = $('#dateForm').bootstrapValidator().data('bootstrapValidator');
        this.bv.updateOption('maxDate', 'date', 'format', 'YYYY/MM/DD');

        this.$date.val('2015/01/01');
        this.$maxDate.val('2014/09/09');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toBeTruthy();

        this.bv.resetForm();
        this.$date.val('2014/01/01');
        this.$maxDate.val('2014/08/17');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toBeFalsy();
    });

    it('dynamic max: callback declarative function()', function() {
        this.$maxDate.attr('data-bv-date-max', 'getDate()');
        this.bv.destroy();
        this.bv = $('#dateForm').bootstrapValidator().data('bootstrapValidator');
        this.bv.updateOption('maxDate', 'date', 'format', 'YYYY/MM/DD');

        this.$date.val('2015/01/01');
        this.$maxDate.val('2014/09/09');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toBeTruthy();

        this.bv.resetForm();
        this.$date.val('2014/01/01');
        this.$maxDate.val('2014/08/17');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toBeFalsy();
    });

    it('dynamic max: callback declarative A.B.C', function() {
        this.$maxDate.attr('data-bv-date-max', 'TestSuite.Date.getDate');
        this.bv.destroy();
        this.bv = $('#dateForm').bootstrapValidator().data('bootstrapValidator');
        this.bv.updateOption('maxDate', 'date', 'format', 'YYYY/MM/DD');

        this.$date.val('2015/01/01');
        this.$maxDate.val('2014/09/09');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toBeTruthy();

        this.bv.resetForm();
        this.$date.val('2014/01/01');
        this.$maxDate.val('2014/08/17');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toBeFalsy();
    });

    it('dynamic max: callback declarative A.B.C()', function() {
        this.$maxDate.attr('data-bv-date-max', 'TestSuite.Date.getDate()');
        this.bv.destroy();
        this.bv = $('#dateForm').bootstrapValidator().data('bootstrapValidator');
        this.bv.updateOption('maxDate', 'date', 'format', 'YYYY/MM/DD');

        this.$date.val('2015/01/01');
        this.$maxDate.val('2014/09/09');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toBeTruthy();

        this.bv.resetForm();
        this.$date.val('2014/01/01');
        this.$maxDate.val('2014/08/17');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toBeFalsy();
    });

    it('dynamic max: callback programmatically', function() {
        this.$maxDate.removeAttr('data-bv-date-max');
        this.bv.destroy();
        this.bv = $('#dateForm')
                        .bootstrapValidator({
                            fields: {
                                maxDate: {
                                    validators: {
                                        date: {
                                            max: function(value, validator, $field) {
                                                return getDate(value, validator, $field);
                                            }
                                        }
                                    }
                                }
                            }
                        })
                        .data('bootstrapValidator');
        this.bv.updateOption('maxDate', 'date', 'format', 'YYYY/MM/DD');

        this.$date.val('2015/01/01');
        this.$maxDate.val('2014/09/09');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toBeTruthy();

        this.bv.resetForm();
        this.$date.val('2014/01/01');
        this.$maxDate.val('2014/08/17');
        this.bv.validate();
        expect(this.bv.isValidField('maxDate')).toBeFalsy();
    });
});
