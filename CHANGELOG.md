# Change Log

## v0.3.3

Released on 2014-03-27

__Fixes__:

* [#50](https://github.com/nghuuphuoc/bootstrapvalidator/issues/50): Don't validate disabled element
* [#34](https://github.com/nghuuphuoc/bootstrapvalidator/issues/34), [#105](https://github.com/nghuuphuoc/bootstrapvalidator/issues/105): Cannot call ```form.submit()``` inside ```submitHandler```
* [#77](https://github.com/nghuuphuoc/bootstrapvalidator/issues/77), [#117](https://github.com/nghuuphuoc/bootstrapvalidator/issues/117): ```notEmpty``` validator doesn't work on file input
* [#120](https://github.com/nghuuphuoc/bootstrapvalidator/pull/120): Handle case where a field is removed after the bootstrap validation, thanks to [@patmoore](https://github.com/patmoore)

## v0.3.2

Released on 2014-03-21

__New features__:

* [#56](https://github.com/nghuuphuoc/bootstrapvalidator/issues/56): Add ```selector``` option for each field. The field can be defined by CSS validator instead of the ```name``` attribute
* [#107](https://github.com/nghuuphuoc/bootstrapvalidator/issues/107): Add ```container``` option for each field to indicate where the error messages are shown

__New validators__:

* [#5](https://github.com/nghuuphuoc/bootstrapvalidator/issues/5): Add ```ip``` validator. Support both IPv4 and IPv6
* [#6](https://github.com/nghuuphuoc/bootstrapvalidator/issues/6): Add ```isbn``` validator, support both ISBN 10 and ISBN 13
* [#7](https://github.com/nghuuphuoc/bootstrapvalidator/issues/7): Add ```step``` validator
* [#95](https://github.com/nghuuphuoc/bootstrapvalidator/issues/95): Add ```mac``` validator
* [#96](https://github.com/nghuuphuoc/bootstrapvalidator/issues/96): Add ```base64``` validator
* [#97](https://github.com/nghuuphuoc/bootstrapvalidator/issues/97): Add ```cvv``` validator
* [#99](https://github.com/nghuuphuoc/bootstrapvalidator/issues/99), [#100](https://github.com/nghuuphuoc/bootstrapvalidator/pull/100): Add ```phone``` validator. Support US phone number only, thanks to [@gercheq](https://github.com/gercheq)

__Improvements__:

* [#112](https://github.com/nghuuphuoc/bootstrapvalidator/issues/112): ```creditCard``` validator now validates both IIN ranges and length

## v0.3.1

Released on 2014-03-17

__New features__:

* [#4](https://github.com/nghuuphuoc/bootstrapvalidator/issues/4): Add ```date``` validator
* [#72](https://github.com/nghuuphuoc/bootstrapvalidator/issues/72), [#79](https://github.com/nghuuphuoc/bootstrapvalidator/issues/79): Improve ```updateStatus()``` method to make the plugin play well with another
* [#80](https://github.com/nghuuphuoc/bootstrapvalidator/issues/80): Add ```enabled``` option and  ```enableFieldValidators()``` method to enable/disable all validators to given field
* [#90](https://github.com/nghuuphuoc/bootstrapvalidator/pull/90): Add ```bower.json``` file, thanks to [@ikanedo](https://github.com/ikanedo)
* [#3](https://github.com/nghuuphuoc/bootstrapvalidator/issues/3), [#92](https://github.com/nghuuphuoc/bootstrapvalidator/issues/92): Support more form controls on the same row

__Changes__:

* Remove the ```columns``` option. Now the plugin works normally no matter how many columns the form uses
* [#102](https://github.com/nghuuphuoc/bootstrapvalidator/issues/102): The ```resetForm``` method now only resets fields with validator rules

__Fixes__:

* [#82](https://github.com/nghuuphuoc/bootstrapvalidator/issues/82), [#84](https://github.com/nghuuphuoc/bootstrapvalidator/issues/84): The error messages aren't shown if the form field doesn't have label
* [#89](https://github.com/nghuuphuoc/bootstrapvalidator/issues/89): ```submitHandler``` or default submission isn't called after ```remote``` validation completes

## v0.3.0

Released on 2014-03-10

__New features__:

* [#44](https://github.com/nghuuphuoc/bootstrapvalidator/issues/44): Rewrite entirely using Deferred
* [#26](https://github.com/nghuuphuoc/bootstrapvalidator/issues/26), [#27](https://github.com/nghuuphuoc/bootstrapvalidator/issues/27), [#67](https://github.com/nghuuphuoc/bootstrapvalidator/pull/67): Add ```choice``` validator, thanks to [@emilchristensen](https://github.com/emilchristensen)
* [#31](https://github.com/nghuuphuoc/bootstrapvalidator/issues/31): The ```remote``` validator supports dynamic data
* [#36](https://github.com/nghuuphuoc/bootstrapvalidator/issues/36), [#58](https://github.com/nghuuphuoc/bootstrapvalidator/issues/58): Add method to validate form manually
* [#41](https://github.com/nghuuphuoc/bootstrapvalidator/issues/41): Disable submit button on successful form submit
* [#42](https://github.com/nghuuphuoc/bootstrapvalidator/issues/42): Add submit button to ```submitHandler()``` parameter
* [#48](https://github.com/nghuuphuoc/bootstrapvalidator/issues/48): Add optional feedback icons
* [#64](https://github.com/nghuuphuoc/bootstrapvalidator/pull/64): Support Danish zip code, thanks to [@emilchristensen](https://github.com/emilchristensen)
* [#65](https://github.com/nghuuphuoc/bootstrapvalidator/pull/65): Support Sweden zip code, thanks to [@emilchristensen](https://github.com/emilchristensen)
* [#70](https://github.com/nghuuphuoc/bootstrapvalidator/issues/70): Support custom grid columns
* [#71](https://github.com/nghuuphuoc/bootstrapvalidator/issues/71): Show all errors
* [#76](https://github.com/nghuuphuoc/bootstrapvalidator/issues/76): Add ```resetForm()``` method

__Fixes__:

* [#50](https://github.com/nghuuphuoc/bootstrapvalidator/issues/50): Don't validate disabled element
* [#51](https://github.com/nghuuphuoc/bootstrapvalidator/issues/51): Submit after submit doesn't work
* [#53](https://github.com/nghuuphuoc/bootstrapvalidator/issues/53), [#54](https://github.com/nghuuphuoc/bootstrapvalidator/pull/54): Fix ```notEmpty``` validator for radios and checkboxes, thanks to [@kristian-puccio](https://github.com/kristian-puccio)
* [#55](https://github.com/nghuuphuoc/bootstrapvalidator/issues/55): The plugin doesn't validate other fields if the ```remote``` validator returns true
* [#62](https://github.com/nghuuphuoc/bootstrapvalidator/pull/62): The callback validator passes wrong parameter, thanks to [@iplus](https://github.com/iplus)

__Document__:

* [#59](https://github.com/nghuuphuoc/bootstrapvalidator/pull/59): Add example for Rail field convention, thanks to [@narutosanjiv](https://github.com/narutosanjiv)
* [#60](https://github.com/nghuuphuoc/bootstrapvalidator/pull/60): Update the installation guide, thanks to [@vaz](https://github.com/vaz)
* [#73](https://github.com/nghuuphuoc/bootstrapvalidator/issues/73): Describe which version should be included in the Usage section

## v0.2.2

Released on 2014-01-07

* [#15](https://github.com/nghuuphuoc/bootstrapvalidator/issues/15): Focus to the first invalid element
* [#31](https://github.com/nghuuphuoc/bootstrapvalidator/issues/31): ```remote``` validator: Allow to set additional data to remote URL
* [#34](https://github.com/nghuuphuoc/bootstrapvalidator/issues/34): Avoid from calling form submit recursively
* [#39](https://github.com/nghuuphuoc/bootstrapvalidator/issues/39): Validate existing fields only
* [#40](https://github.com/nghuuphuoc/bootstrapvalidator/issues/40): Fix the issue when the form label doesn't have class
* [#32](https://github.com/nghuuphuoc/bootstrapvalidator/issues/32), [#43](https://github.com/nghuuphuoc/bootstrapvalidator/issues/43), [#47](https://github.com/nghuuphuoc/bootstrapvalidator/issues/47): Only validate not empty field

## v0.2.1

Released on 2013-11-08

* [#29](https://github.com/nghuuphuoc/bootstrapvalidator/issues/29): Upgrade Bootstrap to v3.0.2
* [#30](https://github.com/nghuuphuoc/bootstrapvalidator/issues/30): Hide the error block containers before validating

## v0.2.0

Released on 2013-10-21

* [#9](https://github.com/nghuuphuoc/bootstrapvalidator/issues/9): Add ```creditCard``` validator
* [#18](https://github.com/nghuuphuoc/bootstrapvalidator/issues/18): Add ```different``` validator
* [#20](https://github.com/nghuuphuoc/bootstrapvalidator/issues/20): Add custom submit handler using ```submitHandler``` option
* [#21](https://github.com/nghuuphuoc/bootstrapvalidator/issues/21): Add ```callback``` validator
* [#22](https://github.com/nghuuphuoc/bootstrapvalidator/issues/22): Support form that labels are placed in extra small (```col-xs-```), small (```col-sm-```), medium (```col-md-```) elements
* [#24](https://github.com/nghuuphuoc/bootstrapvalidator/issues/24): Add ```live``` option
* [#25](https://github.com/nghuuphuoc/bootstrapvalidator/issues/25): The ```regexp``` validator does not work

## v0.1.1

Released on 2013-10-17

* Add ```submitButtons``` option
* [#16](https://github.com/nghuuphuoc/bootstrapvalidator/issues/16): Disable client side validation in HTML 5
* [#17](https://github.com/nghuuphuoc/bootstrapvalidator/issues/17): Support default Bootstrap form without labels
* [#19](https://github.com/nghuuphuoc/bootstrapvalidator/issues/19): Support select box validator

## v0.1.0

Released on 2013-10-14

* First release
* Provide various validators
    - between
    - digits
    - emailAddress
    - greaterThan
    - hexColor
    - identical
    - lessThan
    - notEmpty
    - regexp
    - remote
    - stringLength
    - uri
    - usZipCode