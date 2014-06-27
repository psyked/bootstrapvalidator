function onEmailValid(e, data) {
    $('#msg').html(data.field + ' is valid');
};

function onEmailInvalid(e, data) {
    $('#msg').html(data.field + ' is invalid');
};

describe('event field attribute callback global', function() {
    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="eventForm">',
                    '<div id="msg"></div>',
                    '<div class="form-group">',
                        '<input type="text" name="email" data-bv-emailaddress data-bv-onsuccess="onEmailValid" data-bv-onerror="onEmailInvalid" />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#eventForm').bootstrapValidator();

        this.bv     = $('#eventForm').data('bootstrapValidator');
        this.$email = this.bv.getFieldElements('email');
    });

    afterEach(function() {
        $('#eventForm').bootstrapValidator('destroy').parent().remove();
    });

    it('call data-bv-onsuccess', function() {
        this.$email.val('email@domain.com');
        this.bv.validate();
        expect($('#msg').html()).toEqual('email is valid');
    });

    it('call data-bv-onerror', function() {
        this.$email.val('email@domain');
        this.bv.validate();
        expect($('#msg').html()).toEqual('email is invalid');
    });
});

var My = {
    NameSpace: {
        onEmailValid: function(e, data) {
            $('#msg').html('My.NameSpace.onEmailValid() called, ' + data.field + ' is valid');
        },

        onEmailInvalid: function(e, data) {
            $('#msg').html('My.NameSpace.onEmailInvalid() called, ' + data.field + ' is invalid');
        }
    }
};

describe('event field attribute callback namespace', function() {
    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="eventForm">',
                    '<div id="msg"></div>',
                    '<div class="form-group">',
                        '<input type="text" name="email" data-bv-emailaddress data-bv-onsuccess="My.NameSpace.onEmailValid" data-bv-onerror="My.NameSpace.onEmailInvalid" />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#eventForm').bootstrapValidator();

        this.bv     = $('#eventForm').data('bootstrapValidator');
        this.$email = this.bv.getFieldElements('email');
    });

    afterEach(function() {
        $('#eventForm').bootstrapValidator('destroy').parent().remove();
    });

    it('call data-bv-onsuccess', function() {
        this.$email.val('email@domain.com');
        this.bv.validate();
        expect($('#msg').html()).toEqual('My.NameSpace.onEmailValid() called, email is valid');
    });

    it('call data-bv-onerror', function() {
        this.$email.val('email@domain');
        this.bv.validate();
        expect($('#msg').html()).toEqual('My.NameSpace.onEmailInvalid() called, email is invalid');
    });
});

describe('event field trigger', function() {
    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="eventForm">',
                    '<div id="msg"></div>',
                    '<div class="form-group">',
                        '<input type="text" name="email" data-bv-emailaddress />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
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
        $('#eventForm').bootstrapValidator('destroy').parent().remove();
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
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="eventForm">',
                    '<div id="msg"></div>',
                    '<div class="form-group">',
                        '<input type="text" name="email" data-bv-emailaddress />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#eventForm').bootstrapValidator({
            fields: {
                email: {
                    onSuccess: function(e, data) {
                        $('#msg').html('onSuccess() called');
                    },
                    onError: function(e, data) {
                        $('#msg').html('onError() called');
                    },
                    validator: {
                        emailAddress: {}
                    }
                }
            }
        });

        this.bv     = $('#eventForm').data('bootstrapValidator');
        this.$email = this.bv.getFieldElements('email');
    });

    afterEach(function() {
        $('#eventForm').bootstrapValidator('destroy').parent().remove();
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
