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
                '<form class="form-horizontal" id="form">',
                    '<div id="msg"></div>',
                    '<div class="form-group">',
                        '<input type="text" name="email" data-bv-emailaddress data-bv-onsuccess="onEmailValid" data-bv-onerror="onEmailInvalid" />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#form').bootstrapValidator();

        this._bs     = $('#form').data('bootstrapValidator');
        this._$field = this._bs.getFieldElements('email');
    });

    afterEach(function() {
        $('#form').bootstrapValidator('destroy').remove();
    });

    it('call data-bv-onsuccess', function() {
        this._$field.val('email@domain.com');
        this._bs.validate();
        expect($('#msg').html()).toEqual('email is valid');
    });

    it('call data-bv-onerror', function() {
        this._$field.val('email@domain');
        this._bs.validate();
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
                '<form class="form-horizontal" id="form">',
                    '<div id="msg"></div>',
                    '<div class="form-group">',
                        '<input type="text" name="email" data-bv-emailaddress data-bv-onsuccess="My.NameSpace.onEmailValid" data-bv-onerror="My.NameSpace.onEmailInvalid" />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#form').bootstrapValidator();

        this._bs     = $('#form').data('bootstrapValidator');
        this._$field = this._bs.getFieldElements('email');
    });

    afterEach(function() {
        $('#form').bootstrapValidator('destroy').remove();
    });

    it('call data-bv-onsuccess', function() {
        this._$field.val('email@domain.com');
        this._bs.validate();
        expect($('#msg').html()).toEqual('My.NameSpace.onEmailValid() called, email is valid');
    });

    it('call data-bv-onerror', function() {
        this._$field.val('email@domain');
        this._bs.validate();
        expect($('#msg').html()).toEqual('My.NameSpace.onEmailInvalid() called, email is invalid');
    });
});

describe('event field trigger', function() {
    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="form">',
                    '<div id="msg"></div>',
                    '<div class="form-group">',
                        '<input type="text" name="email" data-bv-emailaddress />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#form')
            .bootstrapValidator()
            .on('success.field.bv', '[name="email"]', function(e, data) {
                $('#msg').html('triggered success.field.bv on ' + data.field);
            })
            .on('error.field.bv', '[name="email"]', function(e, data) {
                $('#msg').html('triggered error.field.bv on ' + data.field);
            });

        this._bs     = $('#form').data('bootstrapValidator');
        this._$field = this._bs.getFieldElements('email');
    });

    afterEach(function() {
        $('#form').bootstrapValidator('destroy').remove();
    });

    it('trigger success.field.bv', function() {
        this._$field.val('email@domain.com');
        this._bs.validate();
        expect($('#msg').html()).toEqual('triggered success.field.bv on email');
    });

    it('trigger error.field.bv', function() {
        this._$field.val('email@domain');
        this._bs.validate();
        expect($('#msg').html()).toEqual('triggered error.field.bv on email');
    });
});

describe('event field programmatically', function() {
    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="form">',
                    '<div id="msg"></div>',
                    '<div class="form-group">',
                        '<input type="text" name="email" data-bv-emailaddress />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#form').bootstrapValidator({
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

        this._bs     = $('#form').data('bootstrapValidator');
        this._$field = this._bs.getFieldElements('email');
    });

    afterEach(function() {
        $('#form').bootstrapValidator('destroy').remove();
    });

    it('call onSuccess()', function() {
        this._$field.val('email@domain.com');
        this._bs.validate();
        expect($('#msg').html()).toEqual('onSuccess() called');
    });

    it('call onError()', function() {
        this._$field.val('email@domain');
        this._bs.validate();
        expect($('#msg').html()).toEqual('onError() called');
    });
});
