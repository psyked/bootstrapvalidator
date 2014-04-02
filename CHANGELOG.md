# Change Log

## v0.3.3 (2014-03-27)

__Fixes__:

* [#50](https://github.com/nghuuphuoc/bootstrapvalidator/issues/50): Don't validate disabled element
* [#34](https://github.com/nghuuphuoc/bootstrapvalidator/issues/34), [#105](https://github.com/nghuuphuoc/bootstrapvalidator/issues/105): Cannot call ```form.submit()``` inside [```submitHandler```](http://bootstrapvalidator.com/settings/#submit-handler)
* [#77](https://github.com/nghuuphuoc/bootstrapvalidator/issues/77), [#117](https://github.com/nghuuphuoc/bootstrapvalidator/issues/117): The [```notEmpty``` validator](http://bootstrapvalidator.com/validators/not-empty/) doesn't work on file input
* [#120](https://github.com/nghuuphuoc/bootstrapvalidator/pull/120): Handle case where a field is removed after the bootstrap validation, thanks to [@patmoore](https://github.com/patmoore)

## v0.3.2 (2014-03-21)

__New features__:

* [#56](https://github.com/nghuuphuoc/bootstrapvalidator/issues/56): Add [```selector``` option](http://bootstrapvalidator.com/settings/#fields) for each field. The field can be defined by CSS validator instead of the ```name``` attribute
* [#107](https://github.com/nghuuphuoc/bootstrapvalidator/issues/107): Add [```container``` option](http://bootstrapvalidator.com/settings/#fields) for each field to indicate where the error messages are shown
* [#5](https://github.com/nghuuphuoc/bootstrapvalidator/issues/5): Add [```ip``` validator](http://bootstrapvalidator.com/validators/ip/). Support both IPv4 and IPv6
* [#6](https://github.com/nghuuphuoc/bootstrapvalidator/issues/6): Add [```isbn``` validator](http://bootstrapvalidator.com/validators/isbn/), support both ISBN 10 and ISBN 13
* [#7](https://github.com/nghuuphuoc/bootstrapvalidator/issues/7): Add [```step``` validator](http://bootstrapvalidator.com/validators/step/)
* [#95](https://github.com/nghuuphuoc/bootstrapvalidator/issues/95): Add [```mac``` validator](http://bootstrapvalidator.com/validators/mac/)
* [#96](https://github.com/nghuuphuoc/bootstrapvalidator/issues/96): Add [```base64``` validator](http://bootstrapvalidator.com/validators/base64/)
* [#97](https://github.com/nghuuphuoc/bootstrapvalidator/issues/97): Add [```cvv``` validator](http://bootstrapvalidator.com/validators/cvv/)
* [#99](https://github.com/nghuuphuoc/bootstrapvalidator/issues/99), [#100](https://github.com/nghuuphuoc/bootstrapvalidator/pull/100): Add [```phone``` validator](http://bootstrapvalidator.com/validators/phone/). Support US phone number only, thanks to [@gercheq](https://github.com/gercheq)

__Improvements__:

* [#112](https://github.com/nghuuphuoc/bootstrapvalidator/issues/112): [```creditCard``` validator](http://bootstrapvalidator.com/validators/credit-card/) now validates both IIN ranges and length

## v0.3.1 (2014-03-17)

__New features__:

* [#4](https://github.com/nghuuphuoc/bootstrapvalidator/issues/4): Add [```date``` validator](http://bootstrapvalidator.com/validators/date/)
* [#72](https://github.com/nghuuphuoc/bootstrapvalidator/issues/72), [#79](https://github.com/nghuuphuoc/bootstrapvalidator/issues/79): Improve [```updateStatus()``` method](http://bootstrapvalidator.com/api/#update-status) to make the plugin play well with another
* [#80](https://github.com/nghuuphuoc/bootstrapvalidator/issues/80): Add [```enabled``` option](http://bootstrapvalidator.com/settings/#fields) and [```enableFieldValidators()``` method](http://bootstrapvalidator.com/api/#enable-field-validators) to enable/disable all validators to given field
* [#90](https://github.com/nghuuphuoc/bootstrapvalidator/pull/90): Add ```bower.json``` file, thanks to [@ikanedo](https://github.com/ikanedo)
* [#3](https://github.com/nghuuphuoc/bootstrapvalidator/issues/3), [#92](https://github.com/nghuuphuoc/bootstrapvalidator/issues/92): Support more form controls on the same row

__Changes__:

* Remove the ```columns``` option. Now the plugin works normally no matter how many columns the form uses
* [#102](https://github.com/nghuuphuoc/bootstrapvalidator/issues/102): The [```resetForm``` method](http://bootstrapvalidator.com/api/#reset-form) now only resets fields with validator rules

__Fixes__:

* [#82](https://github.com/nghuuphuoc/bootstrapvalidator/issues/82), [#84](https://github.com/nghuuphuoc/bootstrapvalidator/issues/84): The error messages aren't shown if the form field doesn't have label
* [#89](https://github.com/nghuuphuoc/bootstrapvalidator/issues/89): [```submitHandler```](http://bootstrapvalidator.com/settings/#submit-handler) or default submission isn't called after [```remote``` validation](http://bootstrapvalidator.com/validators/remote/) completes

## v0.3.0 (2014-03-10)

__New features__:

* [#44](https://github.com/nghuuphuoc/bootstrapvalidator/issues/44): Rewrite entirely using Deferred
* [#26](https://github.com/nghuuphuoc/bootstrapvalidator/issues/26), [#27](https://github.com/nghuuphuoc/bootstrapvalidator/issues/27), [#67](https://github.com/nghuuphuoc/bootstrapvalidator/pull/67): Add [```choice``` validator](http://bootstrapvalidator.com/validators/choice/), thanks to [@emilchristensen](https://github.com/emilchristensen)
* [#31](https://github.com/nghuuphuoc/bootstrapvalidator/issues/31): The [```remote``` validator](http://bootstrapvalidator.com/validators/remote/) supports dynamic data
* [#36](https://github.com/nghuuphuoc/bootstrapvalidator/issues/36), [#58](https://github.com/nghuuphuoc/bootstrapvalidator/issues/58): Add method to [validate form](http://bootstrapvalidator.com/api/#validate) manually
* [#41](https://github.com/nghuuphuoc/bootstrapvalidator/issues/41): Disable submit button on successful form submit
* [#42](https://github.com/nghuuphuoc/bootstrapvalidator/issues/42): Add submit button to [```submitHandler()```](http://bootstrapvalidator.com/settings/#submit-handler) parameter
* [#48](https://github.com/nghuuphuoc/bootstrapvalidator/issues/48): Add optional [feedback icons](http://bootstrapvalidator.com/settings/#feedback-icons)
* [#64](https://github.com/nghuuphuoc/bootstrapvalidator/pull/64): Support [Danish zip code](http://bootstrapvalidator.com/validators/zip-code/), thanks to [@emilchristensen](https://github.com/emilchristensen)
* [#65](https://github.com/nghuuphuoc/bootstrapvalidator/pull/65): Support [Sweden zip code](http://bootstrapvalidator.com/validators/zip-code/), thanks to [@emilchristensen](https://github.com/emilchristensen)
* [#70](https://github.com/nghuuphuoc/bootstrapvalidator/issues/70): Support custom grid columns
* [#71](https://github.com/nghuuphuoc/bootstrapvalidator/issues/71): Show all errors
* [#76](https://github.com/nghuuphuoc/bootstrapvalidator/issues/76): Add [```resetForm()``` method](http://bootstrapvalidator.com/api/#reset-form)

__Fixes__:

* [#50](https://github.com/nghuuphuoc/bootstrapvalidator/issues/50): Don't validate disabled element
* [#51](https://github.com/nghuuphuoc/bootstrapvalidator/issues/51): Submit after submit doesn't work
* [#53](https://github.com/nghuuphuoc/bootstrapvalidator/issues/53), [#54](https://github.com/nghuuphuoc/bootstrapvalidator/pull/54): Fix [```notEmpty``` validator](http://bootstrapvalidator.com/validators/not-empty/) for radios and checkboxes, thanks to [@kristian-puccio](https://github.com/kristian-puccio)
* [#55](https://github.com/nghuuphuoc/bootstrapvalidator/issues/55): The plugin doesn't validate other fields if the [```remote``` validator](http://bootstrapvalidator.com/validators/remote/) returns ```true```
* [#62](https://github.com/nghuuphuoc/bootstrapvalidator/pull/62): The [```callback``` validator](http://bootstrapvalidator.com/validators/callback/) passes wrong parameter, thanks to [@iplus](https://github.com/iplus)

__Document__:

* [#59](https://github.com/nghuuphuoc/bootstrapvalidator/pull/59): Add example for Rail field convention, thanks to [@narutosanjiv](https://github.com/narutosanjiv)
* [#60](https://github.com/nghuuphuoc/bootstrapvalidator/pull/60): Update the installation guide, thanks to [@vaz](https://github.com/vaz)
* [#73](https://github.com/nghuuphuoc/bootstrapvalidator/issues/73): Describe which version should be [included](http://bootstrapvalidator.com/getting-started/#including-library) in the Usage section

## v0.2.2 (2014-01-07)

__Improvements__:

* [#15](https://github.com/nghuuphuoc/bootstrapvalidator/issues/15): Focus to the first invalid element
* [#31](https://github.com/nghuuphuoc/bootstrapvalidator/issues/31): [```remote``` validator](http://bootstrapvalidator.com/validators/remote/): Allow to set additional data to remote URL
* [#32](https://github.com/nghuuphuoc/bootstrapvalidator/issues/32), [#43](https://github.com/nghuuphuoc/bootstrapvalidator/issues/43), [#47](https://github.com/nghuuphuoc/bootstrapvalidator/issues/47): Only validate not empty field
* [#39](https://github.com/nghuuphuoc/bootstrapvalidator/issues/39): Validate existing fields only

__Fixes__:

* [#34](https://github.com/nghuuphuoc/bootstrapvalidator/issues/34): Avoid from calling form submit recursively
* [#40](https://github.com/nghuuphuoc/bootstrapvalidator/issues/40): Fix the issue when the form label doesn't have class

## v0.2.1 (2013-11-08)

__Improvements__:

* [#29](https://github.com/nghuuphuoc/bootstrapvalidator/issues/29): Upgrade Bootstrap to v3.0.2
* [#30](https://github.com/nghuuphuoc/bootstrapvalidator/issues/30): Hide the error block containers before validating

## v0.2.0 (2013-10-21)

__New features__:

* [#24](https://github.com/nghuuphuoc/bootstrapvalidator/issues/24): Add [```live``` option](http://bootstrapvalidator.com/settings/#live)
* [#20](https://github.com/nghuuphuoc/bootstrapvalidator/issues/20): Add custom submit handler using [```submitHandler``` option](http://bootstrapvalidator.com/settings/#submit-handler)
* [#9](https://github.com/nghuuphuoc/bootstrapvalidator/issues/9): Add [```creditCard``` validator](http://bootstrapvalidator.com/validators/credit-card/)
* [#18](https://github.com/nghuuphuoc/bootstrapvalidator/issues/18): Add [```different``` validator](http://bootstrapvalidator.com/validators/different/)
* [#21](https://github.com/nghuuphuoc/bootstrapvalidator/issues/21): Add [```callback``` validator](http://bootstrapvalidator.com/validators/callback/)

__Improvements__:

* [#22](https://github.com/nghuuphuoc/bootstrapvalidator/issues/22): Support form that labels are placed in extra small (```col-xs-```), small (```col-sm-```), medium (```col-md-```) elements

__Fixes__:

* [#25](https://github.com/nghuuphuoc/bootstrapvalidator/issues/25): The [```regexp``` validator](http://bootstrapvalidator.com/validators/regexp/) does not work

## v0.1.1 (2013-10-17)

__News features__:

* Add [```submitButtons``` option](http://bootstrapvalidator.com/settings/#submit-buttons)

__Improvements__:

* [#16](https://github.com/nghuuphuoc/bootstrapvalidator/issues/16): Disable client side validation in HTML 5
* [#17](https://github.com/nghuuphuoc/bootstrapvalidator/issues/17): Support default Bootstrap form without labels
* [#19](https://github.com/nghuuphuoc/bootstrapvalidator/issues/19): Support select box validator

## v0.1.0 (2013-10-14)

* First release
* Provide various validators:
    - [```between``` validator](http://bootstrapvalidator.com/validators/between/)
    - [```digits``` validator](http://bootstrapvalidator.com/validators/digits/)
    - [```emailAddress``` validator](http://bootstrapvalidator.com/validators/email-address/)
    - [```greaterThan``` validator](http://bootstrapvalidator.com/validators/greater-than/)
    - [```hexColor``` validator](http://bootstrapvalidator.com/validators/hex-color/)
    - [```identical``` validator](http://bootstrapvalidator.com/validators/identical/)
    - [```lessThan``` validator](http://bootstrapvalidator.com/validators/less-than/)
    - [```notEmpty``` validator](http://bootstrapvalidator.com/validators/not-empty/)
    - [```regexp``` validator](http://bootstrapvalidator.com/validators/regexp/)
    - [```remote``` validator](http://bootstrapvalidator.com/validators/remote/)
    - [```stringLength``` validator](http://bootstrapvalidator.com/validators/string-length/)
    - [```uri``` validator](http://bootstrapvalidator.com/validators/uri/)
    - [```usZipCode``` validator](http://bootstrapvalidator.com/validators/zip-code/)