# Change Log

## v0.2.2

* Fixed #34: Avoid from calling form submit recursively
* Improved #31: remote validator: Allow to set additional data to remote URL

##v0.2.1 (2013-11-08)

* Fixed #29: Upgrade Bootstrap to v3.0.2
* Fixed #30: Hide the error block containers before validating

## v0.2.0 (2013-10-21)

* Added #9: Add ```creditCard``` validator
* Added #18: Add ```different``` validator
* Added #20: Add custom submit handler (using ```submitHandler``` option)
* Added #21: Add ```callback``` validator
* Added #24: Add ```live``` option
* Fixed #25: The ```regexp``` validator does not work
* Improved #22: Support form that labels are placed in extra small (```col-xs-```), small (```col-sm-```), medium (```col-md-```) elements

## v0.1.1 (2013-10-17)

* Add ```submitButtons``` option
* Added #17: Support default Bootstrap form without labels
* Added #19: Support select box validator
* Fixed #16: Disable client side validation in HTML 5

## v0.1.0 (2013-10-14)

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