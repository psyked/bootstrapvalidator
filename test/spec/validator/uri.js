describe('uri', function() {
	beforeEach(function () {
		$([
			'<form class="form-horizontal" id="uriForm">',
			'<div id="msg"></div>',
			'<div class="form-group">',
			'<input type="text" name="uri" data-bv-uri />',
			'</div>',
			'</form>'
		].join('\n')).appendTo('body');

		$('#uriForm').bootstrapValidator();

		this.bv    = $('#uriForm').data('bootstrapValidator');
		this.$uri = this.bv.getFieldElements('uri');
	});

	afterEach(function () {
		$('#uriForm').bootstrapValidator('destroy').remove();
	});

	it('Valid URIs', function() {
		this.$uri.val('http://foo.com/blah_blah');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://foo.com/blah_blah');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://foo.com/blah_blah/');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://foo.com/blah_blah_(wikipedia)');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://foo.com/blah_blah_(wikipedia)_(again)');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://www.example.com/wpstyle/?p=364');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('https://www.example.com/foo/?bar=baz&inga=42&quux');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://✪df.ws/123');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://userid:password@example.com:8080');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://userid:password@example.com:8080/');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://userid@example.com');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://userid@example.com/');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://userid@example.com:8080');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://userid@example.com:8080/');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://userid:password@example.com');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://userid:password@example.com/');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://142.42.1.1/');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://142.42.1.1:8080/');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://➡.ws/䨹');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://⌘.ws');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://⌘.ws/');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://foo.com/blah_(wikipedia)#cite-1');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://foo.com/blah_(wikipedia)_blah#cite-1');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://foo.com/unicode_(✪)_in_parens');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://foo.com/(something)?after=parens');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://☺.damowmow.com/');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://code.google.com/events/#&product=browser');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://j.mp');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('ftp://foo.bar/baz');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://foo.bar/?q=Test%20URL-encoded%20stuff');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://مثال.إختبار');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://例子.测试');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://उदाहरण.परीक्षा');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val("http://-.~_!$&'()*+,;=:%40:80%2f::::::@example.com");
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://1337.net');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://a.b-c.de');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://223.255.255.254');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://intranetsite');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://intranetsite/test');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://intranetsite:80');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://intranetsite:80/test');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://user:pass@intranetsite');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://user:pass@intranetsite/test');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://user:pass@intranetsite:80');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();

		this.$uri.val('http://user:pass@intranetsite:80/test');
		this.bv.validate();
		expect(this.bv.isValid()).toBeTruthy();
	});

	it('Invalid URIs', function() {
		this.$uri.val('http://');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://.');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://..');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://../');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://?');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://??');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://??/');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://#');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://##');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://##/');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://foo.bar?q=Spaces should be encoded');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('//');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('//a');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('///a');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('///');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http:///a');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('foo.com');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('rdar://1234');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('h://test');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http:// shouldfail.com');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val(':// should fail');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://foo.bar/foo(bar)baz quux');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('ftps://foo.bar/');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://-error-.invalid/');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://a.b--c.de/');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://-a.b.co');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://a.b-.co');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://0.0.0.0');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://10.1.1.0');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://10.1.1.255');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://224.1.1.1');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://1.1.1.1.1');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://123.123.123');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://3628126748');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://.www.foo.bar/');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://www.foo.bar./');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://.www.foo.bar./');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://10.1.1.1');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);

		this.$uri.val('http://10.1.1.254');
		this.bv.validate();
		expect(this.bv.isValid()).toEqual(false);
	});
});
