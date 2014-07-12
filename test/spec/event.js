TestSuite = $.extend({}, TestSuite, {
    Event: {
        onEmailValid: function(e, data) {
            $('#msg').html('TestSuite.Event.onEmailValid() called, ' + data.field + ' is valid');
        },

        onEmailInvalid: function(e, data) {
            $('#msg').html('TestSuite.Event.onEmailInvalid() called, ' + data.field + ' is invalid');
        },

        onEmailStatus: function(e, data) {
            $('#status').html('TestSuite.Event.onEmailStatus() called; status = ' + data.status);
        },

        onFormValid: function(e) {
            $('#msg').html('TestSuite.Event.onFormValid() called, form ' + $(e.target).attr('id') + ' is valid');
        },

        onFormInvalid: function(e) {
            $('#msg').html('TestSuite.Event.onFormInvalid() called, form ' + $(e.target).attr('id') + ' is invalid');
        }
    }
});

// ---
// Form events
// ---

function onFormValid(e) {
    $('#msg').html('form ' + $(e.target).attr('id') + ' is valid');
};

function onFormInvalid(e) {
    $('#msg').html('form ' + $(e.target).attr('id') + ' is invalid');
};

describe('event form attribute callback global', function() {
    beforeEach(function() {
        $([
            '<form class="form-horizontal" id="eventForm" data-bv-onsuccess="onFormValid" data-bv-onerror="onFormInvalid" >',
                '<div id="msg"></div>',
                '<div class="form-group">',
                    '<input type="text" name="email" required data-bv-emailaddress />',
                '</div>',
            '</form>'
        ].join('\n')).appendTo('body');

        $('#eventForm').bootstrapValidator();

        this.bv     = $('#eventForm').data('bootstrapValidator');
        this.$email = this.bv.getFieldElements('email');
    });

    afterEach(function() {
        $('#eventForm').bootstrapValidator('destroy').remove();
    });

    it('call data-bv-onsuccess', function() {
        this.$email.val('email@domain.com');
        this.bv.validate();
        expect($('#msg').html()).toEqual('form eventForm is valid');
    });

    it('call data-bv-onerror', function() {
        this.$email.val('email@domain');
        this.bv.validate();
        expect($('#msg').html()).toEqual('form eventForm is invalid');
    });
});

describe('event form attribute callback namespace', function() {
    beforeEach(function() {
        $([
            '<form class="form-horizontal" id="eventForm" data-bv-onsuccess="TestSuite.Event.onFormValid" data-bv-onerror="TestSuite.Event.onFormInvalid" >',
                '<div id="msg"></div>',
                '<div class="form-group">',
                    '<input type="text" name="email" required data-bv-emailaddress />',
                '</div>',
            '</form>'
        ].join('\n')).appendTo('body');

        $('#eventForm').bootstrapValidator();

        this.bv     = $('#eventForm').data('bootstrapValidator');
        this.$email = this.bv.getFieldElements('email');
    });

    afterEach(function() {
        $('#eventForm').bootstrapValidator('destroy').remove();
    });

    it('call data-bv-onsuccess', function() {
        this.$email.val('email@domain.com');
        this.bv.validate();
        expect($('#msg').html()).toEqual('TestSuite.Event.onFormValid() called, form eventForm is valid');
    });

    it('call data-bv-onerror', function() {
        this.$email.val('email@domain');
        this.bv.validate();
        expect($('#msg').html()).toEqual('TestSuite.Event.onFormInvalid() called, form eventForm is invalid');
    });
});

describe('event form trigger', function() {
    beforeEach(function() {
        $([
            '<form class="form-horizontal" id="eventForm">',
                '<div id="msg"></div>',
                '<div class="form-group">',
                    '<input type="text" name="email" data-bv-emailaddress />',
                '</div>',
            '</form>'
        ].join('\n')).appendTo('body');

        $('#eventForm')
            .bootstrapValidator()
            .on('success.form.bv', function(e) {
                $('#msg').html('form ' + $(e.target).attr('id') + ' triggered success.form.bv event');
            })
            .on('error.form.bv', function(e) {
                $('#msg').html('form ' + $(e.target).attr('id') + ' triggered error.form.bv event');
            });

        this.bv     = $('#eventForm').data('bootstrapValidator');
        this.$email = this.bv.getFieldElements('email');
    });

    afterEach(function() {
        $('#eventForm').bootstrapValidator('destroy').remove();
    });

    it('trigger success.form.bv', function() {
        this.$email.val('email@domain.com');
        this.bv.validate();
        expect($('#msg').html()).toEqual('form eventForm triggered success.form.bv event');
    });

    it('trigger error.form.bv', function() {
        this.$email.val('email@domain');
        this.bv.validate();
        expect($('#msg').html()).toEqual('form eventForm triggered error.form.bv event');
    });
});

describe('event form programmatically', function() {
    beforeEach(function() {
        $([
            '<form class="form-horizontal" id="eventForm">',
                '<div id="msg"></div>',
                '<div class="form-group">',
                    '<input type="text" name="email" data-bv-emailaddress />',
                '</div>',
            '</form>'
        ].join('\n')).appendTo('body');

        $('#eventForm').bootstrapValidator({
            onSuccess: function(e) {
                $('#msg').html('onSuccess() called');
            },
            onError: function(e) {
                $('#msg').html('onError() called');
            }
        });

        this.bv     = $('#eventForm').data('bootstrapValidator');
        this.$email = this.bv.getFieldElements('email');
    });

    afterEach(function() {
        $('#eventForm').bootstrapValidator('destroy').remove();
    });

    it('call onSuccess()', function() {
        this.$email.val('email@domain.com');
        this.bv.validate();
        expect($('#msg').html()).toEqual('onSuccess() called');
    });

    it('call onError()', function() {
        this.$email.val('email@domain');
        this.bv.validate();
        expect($('#msg').html()).toEqual('onError() called');
    });
});

// ---
// Field events
// ---

function onEmailValid(e, data) {
    $('#msg').html(data.field + ' is valid');
};

function onEmailInvalid(e, data) {
    $('#msg').html(data.field + ' is invalid');
};

function onEmailStatus(e, data) {
    $('#status').html(data.status);
};

describe('event field attribute callback global', function() {
    beforeEach(function() {
        $([
            '<form class="form-horizontal" id="eventForm">',
                '<div id="msg"></div>',
                '<div id="status"></div>',
                '<div class="form-group">',
                    '<input type="text" name="email" data-bv-emailaddress data-bv-onsuccess="onEmailValid" data-bv-onerror="onEmailInvalid" data-bv-onstatus="onEmailStatus" />',
                '</div>',
            '</form>'
        ].join('\n')).appendTo('body');

        $('#eventForm').bootstrapValidator();

        this.bv     = $('#eventForm').data('bootstrapValidator');
        this.$email = this.bv.getFieldElements('email');
    });

    afterEach(function() {
        $('#eventForm').bootstrapValidator('destroy').remove();
    });

    it('call data-bv-onsuccess', function() {
        this.$email.val('email@domain.com');
        this.bv.validate();
        expect($('#msg').html()).toEqual('email is valid');
        expect($('#status').html()).toEqual(this.bv.STATUS_VALID);
    });

    it('call data-bv-onerror', function() {
        this.$email.val('email@domain');
        this.bv.validate();
        expect($('#msg').html()).toEqual('email is invalid');
        expect($('#status').html()).toEqual(this.bv.STATUS_INVALID);
    });
});

describe('event field attribute callback namespace', function() {
    beforeEach(function() {
        $([
            '<form class="form-horizontal" id="eventForm">',
                '<div id="msg"></div>',
                '<div id="status"></div>',
                '<div class="form-group">',
                    '<input type="text" name="email" data-bv-emailaddress data-bv-onsuccess="TestSuite.Event.onEmailValid" data-bv-onerror="TestSuite.Event.onEmailInvalid" data-bv-onstatus="TestSuite.Event.onEmailStatus" />',
                '</div>',
            '</form>'
        ].join('\n')).appendTo('body');

        $('#eventForm').bootstrapValidator();

        this.bv     = $('#eventForm').data('bootstrapValidator');
        this.$email = this.bv.getFieldElements('email');
    });

    afterEach(function() {
        $('#eventForm').bootstrapValidator('destroy').remove();
    });

    it('call data-bv-onsuccess', function() {
        this.$email.val('email@domain.com');
        this.bv.validate();
        expect($('#msg').html()).toEqual('TestSuite.Event.onEmailValid() called, email is valid');
        expect($('#status').html()).toEqual('TestSuite.Event.onEmailStatus() called; status = ' + this.bv.STATUS_VALID);
    });

    it('call data-bv-onerror', function() {
        this.$email.val('email@domain');
        this.bv.validate();
        expect($('#msg').html()).toEqual('TestSuite.Event.onEmailInvalid() called, email is invalid');
        expect($('#status').html()).toEqual('TestSuite.Event.onEmailStatus() called; status = ' + this.bv.STATUS_INVALID);
    });
});

describe('event field trigger', function() {
    beforeEach(function() {
        $([
            '<form class="form-horizontal" id="eventForm">',
                '<div id="msg"></div>',
                '<div class="form-group">',
                    '<input type="text" name="email" data-bv-emailaddress />',
                '</div>',
            '</form>'
        ].join('\n')).appendTo('body');

        $('#eventForm')
            .bootstrapValidator()
            .on('success.field.bv', '[name="email"]', function(e, data) {
                $('#msg').html('triggered success.field.bv on ' + data.field);
            })
            .on('error.field.bv', '[name="email"]', function(e, data) {
                $('#msg').html('triggered error.field.bv on ' + data.field);
            });

        this.bv     = $('#eventForm').data('bootstrapValidator');
        this.$email = this.bv.getFieldElements('email');
    });

    afterEach(function() {
        $('#eventForm').bootstrapValidator('destroy').remove();
    });

    it('trigger success.field.bv', function() {
        this.$email.val('email@domain.com');
        this.bv.validate();
        expect($('#msg').html()).toEqual('triggered success.field.bv on email');
    });

    it('trigger error.field.bv', function() {
        this.$email.val('email@domain');
        this.bv.validate();
        expect($('#msg').html()).toEqual('triggered error.field.bv on email');
    });
});

describe('event field programmatically', function() {
    beforeEach(function() {
        $([
            '<form class="form-horizontal" id="eventForm">',
                '<div id="msg"></div>',
                '<div class="form-group">',
                    '<input type="text" name="email" data-bv-emailaddress />',
                '</div>',
            '</form>'
        ].join('\n')).appendTo('body');

        $('#eventForm').bootstrapValidator({
            fields: {
                email: {
                    onSuccess: function(e, data) {
                        $('#msg').html('onSuccess() called');
                    },
                    onError: function(e, data) {
                        $('#msg').html('onError() called');
                    }
                }
            }
        });

        this.bv     = $('#eventForm').data('bootstrapValidator');
        this.$email = this.bv.getFieldElements('email');
    });

    afterEach(function() {
        $('#eventForm').bootstrapValidator('destroy').remove();
    });

    it('call onSuccess()', function() {
        this.$email.val('email@domain.com');
        this.bv.validate();
        expect($('#msg').html()).toEqual('onSuccess() called');
    });

    it('call onError()', function() {
        this.$email.val('email@domain');
        this.bv.validate();
        expect($('#msg').html()).toEqual('onError() called');
    });
});

// ---
// Validator events
// ---
function onEmailAddressValidatorSuccess(e, data) {
    $('#msg').html(data.validator + ' validator passed');
};

function onEmailAddressValidatorError(e, data) {
    $('#msg').html(data.validator + ' validator did not pass');
};

describe('event validator declarative', function() {
    beforeEach(function() {
        $([
            '<form class="form-horizontal" id="eventForm">',
                '<div id="msg"></div>',
                '<div class="form-group">',
                    '<input type="text" name="email" data-bv-emailaddress data-bv-emailaddress-onsuccess="onEmailAddressValidatorSuccess" data-bv-emailaddress-onerror="onEmailAddressValidatorError" />',
                '</div>',
            '</form>'
        ].join('\n')).appendTo('body');

        $('#eventForm').bootstrapValidator();

        this.bv     = $('#eventForm').data('bootstrapValidator');
        this.$email = this.bv.getFieldElements('email');
    });

    afterEach(function() {
        $('#eventForm').bootstrapValidator('destroy').remove();
    });

    it('trigger data-bv-emailaddress-onsuccess', function() {
        this.$email.val('email@domain.com');
        this.bv.validate();
        expect($('#msg').html()).toEqual('emailAddress validator passed');
    });

    it('trigger data-bv-emailaddress-onerror', function() {
        this.$email.val('email@domain');
        this.bv.validate();
        expect($('#msg').html()).toEqual('emailAddress validator did not pass');
    });
});

describe('event validator programmatically', function() {
    beforeEach(function() {
        $([
            '<form class="form-horizontal" id="eventForm">',
                '<div id="msg"></div>',
                '<div class="form-group">',
                    '<input type="text" name="email" data-bv-emailaddress />',
                '</div>',
            '</form>'
        ].join('\n')).appendTo('body');

        $('#eventForm').bootstrapValidator({
            fields: {
                email: {
                    validators: {
                        emailAddress: {
                            onSuccess: function(e, data) {
                                $('#msg').html('emailAddress validator: onSuccess() called');
                            },
                            onError: function(e, data) {
                                $('#msg').html('emailAddress validator: onError() called');
                            },
                            message: 'The email address is not valid'
                        }
                    }
                }
            }
        });

        this.bv     = $('#eventForm').data('bootstrapValidator');
        this.$email = this.bv.getFieldElements('email');
    });

    afterEach(function() {
        $('#eventForm').bootstrapValidator('destroy').remove();
    });

    it('call onSuccess()', function() {
        this.$email.val('email@domain.com');
        this.bv.validate();
        expect($('#msg').html()).toEqual('emailAddress validator: onSuccess() called');
    });

    it('call onError()', function() {
        this.$email.val('email@domain');
        this.bv.validate();
        expect($('#msg').html()).toEqual('emailAddress validator: onError() called');
    });
});
