describe('submit', function() {
    var submitted, originalTimeout;

    $.fn.bootstrapValidator.validators.fake_remote = {
        validate: function(validator, $field, options) {
            var dfd = new $.Deferred();
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

        this.$form = $('#submitForm');
        this.$form
            .bootstrapValidator()
            .on('success.form.bv', function(e) {
                e.preventDefault();
                ++submitted;
            })
            .submit(function(e) {
                e.preventDefault();
            });
            
        submitted      = 0;
        this.bv        = this.$form.data('bootstrapValidator');
        this.$username = this.bv.getFieldElements('username');

        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    afterEach(function() {
        $('#submitForm').bootstrapValidator('destroy').remove();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
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
                    callback: function(value, validator, $field) {
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
    it('with callback returning false', function(done) {
        this.bv.addField('username', {
            validators: {
                callback: {
                    message: 'Please enter an username',
                    callback: function(value, validator, $field) {
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
    it('with remote returning true', function(done) {
        this.bv.addField('username', {
            validators: {
                remote: {
                    url: 'http://echo.jsontest.com/valid/true',
                    message: 'The username is not available'
                }
            }
        });
        $('#sendButton').click();
        setTimeout(function() {
            expect(submitted).toBe(1);
            done();
        }, 3000);
    });

    // #481
    it('with remote returning false', function(done) {
        this.bv.addField('username', {
            validators: {
                remote: {
                    url: 'http://echo.jsontest.com/valid/false',
                    message: 'The username is not available'
                }
            }
        });
        $('#sendButton').click();
        setTimeout(function() {
            expect(submitted).toBe(0);
            done();
        }, 3000);
    });

    // #481
    it('with fake remote returning true', function(done) {
        this.bv.addField('username', {
            validators: {
                fake_remote: {
                    message: 'The username is not available',
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
    it('with fake remote returning false', function(done) {
        this.bv.addField('username', {
            validators: {
                fake_remote: {
                    message: 'The username is not available',
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
