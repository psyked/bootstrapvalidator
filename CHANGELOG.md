# Change Log

## v0.3.1

Not released yet

__New features__:

* [#4: Add ```date``` validator](https://github.com/nghuuphuoc/bootstrapvalidator/issues/4)
* [#72, #79: Add ```setNotValidated()``` method to make the plugin play well with another](https://github.com/nghuuphuoc/bootstrapvalidator/issues/72)
* [#80: Add ```enableFieldValidators()``` method to enable/disable all validators to given field](https://github.com/nghuuphuoc/bootstrapvalidator/issues/80)
* Add ```bower.json``` file

__Fixes__:

* [#82, #84: The error/success messages aren't shown if the form field doesn't have label](https://github.com/nghuuphuoc/bootstrapvalidator/issues/82)

## v0.3.0

Released on 2014-03-10

__New features__:

* [#44: Rewrite entirely using Deferred](https://github.com/nghuuphuoc/bootstrapvalidator/issues/44)
* #26, #27, #67: Add choice validator
* [#31: The ```remote``` validator supports dynamic data](https://github.com/nghuuphuoc/bootstrapvalidator/issues/31)
* [#36, #58: Add method to validate form manually](https://github.com/nghuuphuoc/bootstrapvalidator/issues/58)
* [#41: Disable submit button on successful form submit](https://github.com/nghuuphuoc/bootstrapvalidator/issues/41)
* [#42: Add submit button to ```submitHandler()``` parameter](https://github.com/nghuuphuoc/bootstrapvalidator/issues/42)
* [#48: Add optional feedback icons](https://github.com/nghuuphuoc/bootstrapvalidator/issues/48)
* [#64: Support Danish zip code](https://github.com/nghuuphuoc/bootstrapvalidator/issues/64)
* [#65: Support Sweden zip code](https://github.com/nghuuphuoc/bootstrapvalidator/issues/64)
* [#70: Support custom grid columns](https://github.com/nghuuphuoc/bootstrapvalidator/issues/70)
* [#71: Show all errors](https://github.com/nghuuphuoc/bootstrapvalidator/issues/71)
* [#76: Add ```resetForm()``` method](https://github.com/nghuuphuoc/bootstrapvalidator/issues/76)

__Fixes__:

* [#50: Don't validate disabled element](https://github.com/nghuuphuoc/bootstrapvalidator/issues/50)
* [#51: Submit after submit doesn't work](https://github.com/nghuuphuoc/bootstrapvalidator/issues/51)
* [#53: Fix notEmpty validator for radios and checkboxes](https://github.com/nghuuphuoc/bootstrapvalidator/issues/53)
* [#55: The plugin doesn't validate other fields if the ```remote``` validator returns true](https://github.com/nghuuphuoc/bootstrapvalidator/issues/55)
* [#62: The callback validator passes wrong parameter](https://github.com/nghuuphuoc/bootstrapvalidator/issues/62)

__Document__:

* [#60: Update the installation guide](https://github.com/nghuuphuoc/bootstrapvalidator/pull/60)
* [#73: Describe which version should be included in the Usage section](https://github.com/nghuuphuoc/bootstrapvalidator/issues/73)

## v0.2.2

Released on 2014-01-07

* [#15: Focus to the first invalid element](https://github.com/nghuuphuoc/bootstrapvalidator/issues/15)
* [#31: ```remote``` validator: Allow to set additional data to remote URL](https://github.com/nghuuphuoc/bootstrapvalidator/issues/31)
* [#34: Avoid from calling form submit recursively](https://github.com/nghuuphuoc/bootstrapvalidator/issues/34)
* [#39: Validate existing fields only](https://github.com/nghuuphuoc/bootstrapvalidator/issues/39)
* [#40: Fix the issue when the form label doesn't have class](https://github.com/nghuuphuoc/bootstrapvalidator/issues/40)
* [#32, #43, #47: Only validate not empty field](https://github.com/nghuuphuoc/bootstrapvalidator/issues/43)

## v0.2.1

Released on 2013-11-08

* [#29: Upgrade Bootstrap to v3.0.2](https://github.com/nghuuphuoc/bootstrapvalidator/issues/29)
* [#30: Hide the error block containers before validating](https://github.com/nghuuphuoc/bootstrapvalidator/issues/30)

## v0.2.0

Released on 2013-10-21

* [#9: Add ```creditCard``` validator](https://github.com/nghuuphuoc/bootstrapvalidator/issues/9)
* [#18: Add ```different``` validator](https://github.com/nghuuphuoc/bootstrapvalidator/issues/18)
* [#20: Add custom submit handler using ```submitHandler``` option](https://github.com/nghuuphuoc/bootstrapvalidator/issues/20)
* [#21: Add ```callback``` validator](https://github.com/nghuuphuoc/bootstrapvalidator/issues/21)
* [#22: Support form that labels are placed in extra small (```col-xs-```), small (```col-sm-```), medium (```col-md-```) elements](https://github.com/nghuuphuoc/bootstrapvalidator/issues/22)
* [#24: Add ```live``` option](https://github.com/nghuuphuoc/bootstrapvalidator/issues/24)
* [#25: The ```regexp``` validator does not work](https://github.com/nghuuphuoc/bootstrapvalidator/issues/25)

## v0.1.1

Released on 2013-10-17

* Add ```submitButtons``` option
* [#16: Disable client side validation in HTML 5](https://github.com/nghuuphuoc/bootstrapvalidator/issues/16)
* [#17: Support default Bootstrap form without labels](https://github.com/nghuuphuoc/bootstrapvalidator/issues/17)
* [#19: Support select box validator](https://github.com/nghuuphuoc/bootstrapvalidator/issues/19)

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