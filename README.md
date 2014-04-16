# BootstrapValidator

[http://bootstrapvalidator.com](http://bootstrapvalidator.com) - A jQuery plugin to validate form fields. Use with [Bootstrap 3](http://getbootstrap.com)

![Screenshot](screenshots/screenshot.png)

## Features

__Code__
* Written from scratch
* Very solid and clean
* The core plugin and validators code are separated

__Bootstrap__
* Designed to use with [Bootstrap 3](http://getbootstrap.com)
* Support almost [Bootstrap forms](http://getbootstrap.com/css/#forms)
* Support Bootstrap form [validation states](http://getbootstrap.com/css/#forms-control-validation)

__HTML 5__
* Support setting the plugin, validator options via [HTML 5 attributes](http://bootstrapvalidator.com/examples#attribute) prefixed with ```data-bv-```
* Support HTML 5 attributes such as ```min```, ```max```, ```pattern```, ```required```
* Support [HTML 5 input types](http://bootstrapvalidator.com/examples#html5) such as ```color```, ```email```, ```range``` and ```url```

__Validator__
* [31 built-in validators](http://bootstrapvalidator.com/validators/) and counting!
* Easy to [write a new validator](http://bootstrapvalidator.com/developing/)
 
__Friendly__
* Show [feedback icons](http://bootstrapvalidator.com/settings/#feedback-icons) based on field validity
* Support [Glyphicons](http://getbootstrap.com/components/#glyphicons) and [FontAwesome](http://fontawesome.io/icons) icons
* Focus on the first invalid field
 
__Ajax__
* Support [validating via Ajax](http://bootstrapvalidator.com/validators/remote/)
* Support using Ajax for form submission
 
__Flexible__
* The elements can be defined by either ```name``` or [CSS selector](http://bootstrapvalidator.com/settings/#selector-example)
* Support multiple elements with the [same name](http://bootstrapvalidator.com/examples/#fields-with-same-name)
* Field validators can be enabled/disabled on the fly
 
__Compatibility__
* [Color Picker](http://mjolnic.github.io/bootstrap-colorpicker/)
* [Date Picker](http://eternicode.github.io/bootstrap-datepicker/), [Datetime Picker](http://eonasdan.github.io/bootstrap-datetimepicker/)
* [Select2](http://ivaynberg.github.io/select2/)
* [Raty](http://wbotelhos.com/raty)
* ... We play nice with all of them!

## Required

* [jQuery](http://jquery.com/)
* [Bootstrap 3](http://getbootstrap.com/)

## Live Demo

You can see the live demo here:

* [Sample demo](https://rawgithub.com/nghuuphuoc/bootstrapvalidator/master/demo/index.html)
* [Validator examples](https://rawgithub.com/nghuuphuoc/bootstrapvalidator/master/demo/validators.html)
* [Custom submit handler](https://rawgithub.com/nghuuphuoc/bootstrapvalidator/master/demo/submitHandler.html)
* [Enable/disable validators on the fly](https://rawgithub.com/nghuuphuoc/bootstrapvalidator/master/demo/enable.html)
* [Use with a datetime picker plugin](https://rawgithub.com/nghuuphuoc/bootstrapvalidator/master/demo/date.html)

## Documentation

* [Official website](http://bootstrapvalidator.com)
* [Official website source](https://github.com/nghuuphuoc/bootstrapvalidator/tree/gh-pages)

## Release History

Look at the [Change Log](CHANGELOG.md)

## Author

The __BootstrapValidator__ plugin is written by Nguyen Huu Phuoc, aka @nghuuphuoc

* [http://twitter.com/nghuuphuoc](http://twitter.com/nghuuphuoc)
* [http://github.com/nghuuphuoc](http://github.com/nghuuphuoc)

Big thanks to the contributors:

* [@adgrafik](https://github.com/adgrafik)
* [@easonhan007](https://github.com/easonhan007)
* [@emilchristensen](https://github.com/emilchristensen)
* [@gercheq](https://github.com/gercheq)
* [@khangvm53](https://github.com/khangvm53)
* [@kristian-puccio](https://github.com/kristian-puccio)
* [@ikanedo](https://github.com/ikanedo)
* [@iplus](https://github.com/iplus)
* [@jswale](https://github.com/jswale)
* [@narutosanjiv](https://github.com/narutosanjiv)
* [@patmoore](https://github.com/patmoore)
* [@vaz](https://github.com/vaz)
* [@tomByrer](https://github.com/tomByrer)
* ... might be you! Let's [fork](https://github.com/nghuuphuoc/bootstrapvalidator/fork) and pull a request!

> If you submit new RegEx, please build it using [RegExr.com](http://regexr.com/), add several tests that pass and fail there,
> and include the "share" link in your JS as a ```// ``` comment.
> For example: ```// Test: http://regexr.com/38mqi```

## License

```
The MIT License (MIT)

Copyright (c) 2013 - 2014 Nguyen Huu Phuoc

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
