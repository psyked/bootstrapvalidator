describe('submit', function() {

    var submitted;

    // Override the options
    $.extend($.fn.bootstrapValidator.DEFAULT_OPTIONS, {
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    });

    $.fn.bootstrapValidator.validators.fake_remote = {
        validate: function(validator, $field, options) {
            var dfd   = new $.Deferred();
            setTimeout(function() {
                dfd.resolve($field, 'fake_remote', { valid: options.valid });
            }, 0);
            return dfd;
        }
    };
    
    beforeEach(function() {
        $([
            '<form id="submitForm" class="form-horizontal" role="form">',
                '<div class="form-group">',
                    '<input name="username" type="text" class="form-control" value="me" required />',
                '</div>',
                '<button id="sendButton" type="submit" class="btn btn-default">Send</button>',
            '</form>'
        ].join('\n')).appendTo('body');

        this.$form     = $('#submitForm');
        this.$form.bootstrapValidator()
            .on('success.form.bv', function(e) {
                e.preventDefault();
                ++submitted;
            });
        this.$form.submit(function(e) {
            e.preventDefault();
        });
            
        submitted      = 0;
        this.bv        = this.$form.data('bootstrapValidator');
        this.$username = this.bv.getFieldElements('username');
    });

    afterEach(function() {
        $('#submitForm').bootstrapValidator('destroy').remove();
    });

    // #481
    it('without callback nor remote', function(done) {
        $('#sendButton').click();
        setTimeout(function() {
            expect(submitted).toBe(1);
            done();
        }, 0);
    });
    
    // #481
    it('with callback returning true', function(done) {
        this.bv.addField('username', {
            validators: {
                callback: {
                    message: 'Please enter an username',
                    callback: function (value, validator, $field) {
                        return true;
                    }
                }
            }
        });
        $('#sendButton').click();
        setTimeout(function() {
            expect(submitted).toBe(1);
            done();
        }, 0);
    });

    // #481
    it('with fake remote returning true', function(done) {
        this.bv.addField('username', {
            validators: {
                fake_remote: {
                    message: 'Please enter an username',
                    valid: true
                }
            }
        });
        $('#sendButton').click();
        setTimeout(function() {
            expect(submitted).toBe(1);
            done();
        }, 100);
    });


    // #481
    it('with callback returning false', function(done) {
        this.bv.addField('username', {
            validators: {
                callback: {
                    message: 'Please enter an username',
                    callback: function (value, validator, $field) {
                        return false;
                    }
                }
            }
        });
        $('#sendButton').click();
        setTimeout(function() {
            expect(submitted).toBe(0);
            done();
        }, 0);
    });

    // #481
    it('with fake remote returning false', function(done) {
        this.bv.addField('username', {
            validators: {
                fake_remote: {
                    message: 'Please enter an username',
                    valid: false
                }
            }
        });
        $('#sendButton').click();
        setTimeout(function() {
            expect(submitted).toBe(0);
            done();
        }, 100);
    });

});
