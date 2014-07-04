# BootstrapValidator - [v0.4.5](https://github.com/nghuuphuoc/bootstrapvalidator/releases/download/v0.4.5/bootstrapvalidator-dist-0.4.5.zip)

[http://bootstrapvalidator.com](http://bootstrapvalidator.com) - The best jQuery plugin to validate form fields. Designed to use with [Bootstrap 3](http://getbootstrap.com)

![Screenshot](screenshots/screenshot.png)

## [Help the project](https://pledgie.com/campaigns/24885)

I've been spending a lot of time to work on this plugin. If it is useful to you, please consider to help the project by making a small donation:

<a href="https://pledgie.com/campaigns/24885"><img alt="Click here to lend your support to: BootstrapValidator and make a donation at pledgie.com!" src="https://pledgie.com/campaigns/24885.png?skin_name=chrome" border="0" /></a>

Also, you can make me feel happy by [tweeting](https://twitter.com/intent/tweet?hashtags=javascript,jquery,twbootstrap&original_referer=http://github.com/nghuuphuoc/bootstrapvalidator&text=BootstrapValidator%20is%20the%20best%20jQuery%20plugin%20to%20validate%20form%20fields&url=http://bootstrapvalidator.com) about it and [staring](https://github.com/nghuuphuoc/bootstrapvalidator/stargazers) the project on Github.

## Live demo

http://bootstrapvalidator.com/examples/

There are also many examples located in the [demo](demo) directory.

## Next v0.5.0

v0.5.0 is coming soon with the following highlights ([all v0.5.0 features](CHANGELOG.md), if you care about)

* Add events for form ([#121](https://github.com/nghuuphuoc/bootstrapvalidator/issues/121)), field ([#195](https://github.com/nghuuphuoc/bootstrapvalidator/issues/195)), and given validator ([#324](https://github.com/nghuuphuoc/bootstrapvalidator/issues/324))
* [#125](https://github.com/nghuuphuoc/bootstrapvalidator/issues/125): Support dynamic fields
* [#175](https://github.com/nghuuphuoc/bootstrapvalidator/issues/175): Possible to show errors in tooltip or popover
* [#385](https://github.com/nghuuphuoc/bootstrapvalidator/issues/385): Support translating error messages in other languages
* [#387](https://github.com/nghuuphuoc/bootstrapvalidator/issues/387): Provide the default error messages

Please help me by downloading the [latest code](https://github.com/nghuuphuoc/bootstrapvalidator/archive/master.zip) and testing the [v0.5.0 issues](https://github.com/nghuuphuoc/bootstrapvalidator/issues?labels=&milestone=7&page=1&state=open).

## Features

__Code__
- [x] Written from scratch
- [x] Very solid and clean
- [x] The core plugin and validators code are separated

__Bootstrap__
- [x] Designed to use with [Bootstrap 3](http://getbootstrap.com)
- [x] Support almost all [Bootstrap forms](http://getbootstrap.com/css/#forms)
- [x] Support Bootstrap form [validation states](http://getbootstrap.com/css/#forms-control-validation)

__HTML 5__
- [x] Support setting the plugin, validator options via [HTML 5 attributes](http://bootstrapvalidator.com/examples#attribute) prefixed with ```data-bv-```
- [x] Support HTML 5 attributes such as ```min```, ```max```, ```pattern```, ```required```
- [x] Support [HTML 5 input types](http://bootstrapvalidator.com/examples#html5) such as ```color```, ```email```, ```range``` and ```url```

__Validator__
- [x] [46 built-in validators](http://bootstrapvalidator.com/validators/) and counting!
- [x] Easy to [write a new validator](http://bootstrapvalidator.com/developing/)
 
__Friendly__
- [x] Show [feedback icons](http://bootstrapvalidator.com/settings/#feedback-icons) based on field validity
- [x] Support [Glyphicons](http://getbootstrap.com/components/#glyphicons) and [FontAwesome](http://fontawesome.io/icons) icons
- [x] Focus on the first invalid field
- [x] Don't validate the field if the field length is less than given number using [threshold](http://bootstrapvalidator.com/settings/#threshold) option

__Ajax__
- [x] Support [validating via Ajax](http://bootstrapvalidator.com/validators/remote/)
- [x] Support using Ajax for form submission

__Flexible__
- [x] The elements can be defined by either ```name``` or [CSS selector](http://bootstrapvalidator.com/settings/#selector-example)
- [x] Support multiple elements with the [same name](http://bootstrapvalidator.com/examples/#fields-with-same-name)
- [x] Possible to indicate [excluded](http://bootstrapvalidator.com/settings/#excluded) fields
- [x] Field validators can be enabled/disabled on the fly

__Compatibility__
- [x] We [play nice](http://bootstrapvalidator.com/examples/#compatibility) with popular plugins such as
    - [x] [Bootstrap Button](http://getbootstrap.com/javascript/#buttons)
    - [x] [Bootstrap Color Picker](http://mjolnic.github.io/bootstrap-colorpicker/) as seen in [```hexColor``` validator example](http://bootstrapvalidator.com/validators/hexColor/#color-picker-example)
    - [x] [Bootstrap Datetime Picker](http://eonasdan.github.io/bootstrap-datetimepicker/) as seen in [```date``` validator example](http://bootstrapvalidator.com/validators/date/#date-picker-example)
    - [x] [Bootstrap Multiselect](http://davidstutz.github.io/bootstrap-multiselect/)
    - [x] [Chosen](http://harvesthq.github.io/chosen/)
    - [x] [iCheck](https://github.com/fronteed/iCheck/)
    - [x] [Mask](http://igorescobar.github.io/jQuery-Mask-Plugin/)
    - [x] [Raty](http://wbotelhos.com/raty)

## Required

* [jQuery](http://jquery.com/)
* [Bootstrap 3](http://getbootstrap.com/)
 
## Download

Latest version: [v0.4.5](https://github.com/nghuuphuoc/bootstrapvalidator/releases/download/v0.4.5/bootstrapvalidator-dist-0.4.5.zip), released on 2014-05-15.

For older versions, look at the [Releases](https://github.com/nghuuphuoc/bootstrapvalidator/releases) page.

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

* [@aca02djr](https://github.com/aca02djr)
* [@adgrafik](https://github.com/adgrafik)
* [@AlaskanShade](https://github.com/AlaskanShade)
* [@alavers](https://github.com/alavers)
* [@easonhan007](https://github.com/easonhan007)
* [@emilchristensen](https://github.com/emilchristensen)
* [@ericnakagawa](https://github.com/ericnakagawa)
* [@evilchili](https://github.com/evilchili)
* [@Francismori7](https://github.com/Francismori7)
* [@gercheq](https://github.com/gercheq)
* [@henningda](https://github.com/henningda)
* [@ikanedo](https://github.com/ikanedo)
* [@iplus](https://github.com/iplus)
* [@jcnmulio](https://github.com/jcnmulio)
* [@jjshoe](https://github.com/jjshoe)
* [@johanronn77](https://github.com/johanronn77)
* [@jswale](https://github.com/jswale)
* [@jzhang6](https://github.com/jzhang6)
* [@khangvm53](https://github.com/khangvm53)
* [@kristian-puccio](https://github.com/kristian-puccio)
* [@lloydde](https://github.com/lloydde)
* [@manish-in-java](https://github.com/manish-in-java)
* [@MartinDevillers](https://github.com/MartinDevillers)
* [@mike1e](https://github.com/mike1e)
* [@MrC0mm0n](https://github.com/MrC0mm0n)
* [@mrpollo](https://github.com/mrpollo)
* [@narutosanjiv](https://github.com/narutosanjiv)
* [@patmoore](https://github.com/patmoore)
* [@smeagol74](https://github.com/smeagol74)
* [@thisisclement](https://github.com/thisisclement)
* [@tiagofontella](https://github.com/tiagofontella)
* [@tomByrer](https://github.com/tomByrer)
* [@vaz](https://github.com/vaz)
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
