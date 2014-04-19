# Change Log

## v0.4.2 (2014-04-19)

* [#168](https://github.com/nghuuphuoc/bootstrapvalidator/pull/168): Add siren and siret validators, thanks to [@jswale](https://github.com/jswale)
* [#177](https://github.com/nghuuphuoc/bootstrapvalidator/issues/177): Add Vehicle Identification Number (VIN) validator
* [#184](https://github.com/nghuuphuoc/bootstrapvalidator/issues/184): Add ```excluded``` option
* [#171](https://github.com/nghuuphuoc/bootstrapvalidator/pull/171): The [```phone``` validator](http://bootstrapvalidator.com/validators/phone/) now supports +1 country code and area code for US phone number, thanks to [@tomByrer](https://github.com/tomByrer)
* [#173](https://github.com/nghuuphuoc/bootstrapvalidator/pull/173): The [```remote``` validator](http://bootstrapvalidator.com/validators/remote/) allows to override ```name``` option, thanks to [@jswale](https://github.com/jswale)
* [#178](https://github.com/nghuuphuoc/bootstrapvalidator/pull/178): Do not validate fields that ```enabled``` is set to ```false```, thanks to [@henningda](https://github.com/henningda)
* [#182](https://github.com/nghuuphuoc/bootstrapvalidator/pull/182): Improve [```zipCode``` validator](http://bootstrapvalidator.com/validators/zip-code/), thanks to [@gercheq](https://github.com/gercheq)

## v0.4.1 (2014-04-12)

* [#144](https://github.com/nghuuphuoc/bootstrapvalidator/issues/144), [#158](https://github.com/nghuuphuoc/bootstrapvalidator/issues/158): Fixed an issue that the custom submit handler is not fired from the second time
* [#106](https://github.com/nghuuphuoc/bootstrapvalidator/issues/106): Prevent the ```validate()``` method from submit the form automatically. So we can call ```validate()``` to validate the form
* [#131](https://github.com/nghuuphuoc/bootstrapvalidator/issues/131): Doesn't trigger validation on the first focus
* [#145](https://github.com/nghuuphuoc/bootstrapvalidator/issues/145): The row state is now only marked as success if all fields on it are valid
* [#157](https://github.com/nghuuphuoc/bootstrapvalidator/issues/157): Added support for element outside of form using the ```selector``` option
* [#159](https://github.com/nghuuphuoc/bootstrapvalidator/issues/159), [#163](https://github.com/nghuuphuoc/bootstrapvalidator/pull/163): User doesn't need to submit the form twice when remote validator complete, thanks to [@jswale](https://github.com/jswale)
* [#162](https://github.com/nghuuphuoc/bootstrapvalidator/pull/162): Fix errors in IE 8, thanks to [@adgrafik](https://github.com/adgrafik)
* [#166](https://github.com/nghuuphuoc/bootstrapvalidator/issues/166), [#167](https://github.com/nghuuphuoc/bootstrapvalidator/pull/167): The [```phone``` validator](http://bootstrapvalidator.com/validators/phone/) now also checks the length of US phone number, thanks to [@gercheq](https://github.com/gercheq)

## v0.4.0 (2014-04-03)

* [#14](https://github.com/nghuuphuoc/bootstrapvalidator/issues/14), [#57](https://github.com/nghuuphuoc/bootstrapvalidator/issues/57): Set validator option by using [HTML 5 attributes](http://bootstrapvalidator.com/examples/#attribute)

Form attributes:

```html
<form
    data-bv-message="This value is not valid"
    data-bv-feedbackicons-valid="glyphicon glyphicon-ok"
    data-bv-feedbackicons-invalid="glyphicon glyphicon-remove"
    data-bv-feedbackicons-validating="glyphicon glyphicon-refresh"
    >
```

Field attributes:

```html
<input type="text" class="form-control" name="username"
    data-bv-message="The username is not valid"
    data-bv-notempty data-bv-notempty-message="The username is required and cannot be empty"
    data-bv-stringlength="true" data-bv-stringlength-min="6" data-bv-stringlength-max="30" data-bv-stringlength-message="The username must be more than 6 and less than 30 characters long"
    data-bv-different="true" data-bv-different-field="password" data-bv-different-message="The username and password cannot be the same as each other"
    data-bv-remote="true" data-bv-remote-url="remote.php" data-bv-remote-message="The username is not available"
    />
```

* Support [HTML 5 input types](http://bootstrapvalidator.com/examples/#html5):

HTML 5 attribute      | Validator
----------------------|----------
```min="..."```       | [```greaterThan``` validator](http://bootstrapvalidator.com/validators/greater-than/)
```max="..."```       | [```lessThan``` validator](http://bootstrapvalidator.com/validators/less-than/)
```maxlength="..."``` | [```stringLength``` validator](http://bootstrapvalidator.com/validators/string-length/)
```pattern="..."```   | [```regexp``` validator](http://bootstrapvalidator.com/validators/regexp/)
```required```        | [```notEmpty``` validator](http://bootstrapvalidator.com/validators/not-empty/)
```type="color"```    | [```hexColor``` validator](http://bootstrapvalidator.com/validators/hex-color/)
```type="email"```    | [```emailAddress``` validator](http://bootstrapvalidator.com/validators/email-address/)
```type="range"```    | [```between``` validator](http://bootstrapvalidator.com/validators/between/)
```type="url"```      | [```uri``` validator](http://bootstrapvalidator.com/validators/uri/)

* [#74](https://github.com/nghuuphuoc/bootstrapvalidator/issues/74), [#103](https://github.com/nghuuphuoc/bootstrapvalidator/issues/103), [#122](https://github.com/nghuuphuoc/bootstrapvalidator/issues/122): Set the custom [trigger event](http://bootstrapvalidator.com/settings/#trigger)

It's possible to use ```data-bv-trigger``` attribute:

```html
<form data-bv-trigger="keyup">
    <input type="text" class="form-control" name="firstName" placeholder="First name"
           data-bv-trigger="keyup" />
    ...
    <input type="text" class="form-control" name="lastName" placeholder="First name"
           data-bv-trigger="blur" />
</form>
```

or ```trigger``` option:

```javascript
$(form).bootstrapValidator({
    trigger: 'blur',            // Set for all fields
    fields: {
        firstName: {
            trigger: 'keyup',   // Custom for each field. Can be 'event1 event2 event3'
            validators: {
                ...
            }
        },
        lastName: {
            trigger: 'blur',
            validators: {
                ...
            }
        }
    }
});
```

* [#136](https://github.com/nghuuphuoc/bootstrapvalidator/issues/136): Support multiple elements with the [same name](http://bootstrapvalidator.com/examples/#fields-with-same-name)

```html
<div class="form-group">
    <input class="form-control" type="text" name="surveyAnswer[]" />
</div>
<div class="form-group">
    <input class="form-control" type="text" name="surveyAnswer[]" />
</div>
<div class="form-group">
    <input class="form-control" type="text" name="surveyAnswer[]" />
</div>
```

* [#109](https://github.com/nghuuphuoc/bootstrapvalidator/issues/109): Add [```setLiveMode()``` method](http://bootstrapvalidator.com/api/#set-live-mode) to turn on/off the live validating mode
* [#114](https://github.com/nghuuphuoc/bootstrapvalidator/issues/114): Add [```iban``` validator](http://bootstrapvalidator.com/validators/iban/) for validating IBAN (International Bank Account Number)
* [#116](https://github.com/nghuuphuoc/bootstrapvalidator/issues/116): Add [```uuid``` validator](http://bootstrapvalidator.com/validators/uuid/), support UUID v3, v4, v5
* [#128](https://github.com/nghuuphuoc/bootstrapvalidator/issues/128): Add [```numeric``` validator](http://bootstrapvalidator.com/validators/numeric/)
* [#135](https://github.com/nghuuphuoc/bootstrapvalidator/issues/135): Add [```integer``` validator](http://bootstrapvalidator.com/validators/integer/)
* [#138](https://github.com/nghuuphuoc/bootstrapvalidator/issues/138): Add [```hex``` validator](http://bootstrapvalidator.com/validators/hex/)
* [#139](https://github.com/nghuuphuoc/bootstrapvalidator/issues/139): Add [```stringCase``` validator](http://bootstrapvalidator.com/validators/string-case/) to check a string is lower or upper case
* [#137](https://github.com/nghuuphuoc/bootstrapvalidator/issues/137): Register the plugin with [jQuery plugins site](http://plugins.jquery.com/)
* [#133](https://github.com/nghuuphuoc/bootstrapvalidator/issues/133): The [```regexp``` validator](http://bootstrapvalidator.com/validators/regexp/) allows to pass a string
* [#140](https://github.com/nghuuphuoc/bootstrapvalidator/pull/140): Do not validate hidden (```type="hidden"```) and invisible element, thanks to [@easonhan007](https://github.com/easonhan007)
* [```disableSubmitButtons()```](http://bootstrapvalidator.com/api/#disable-submit-buttons) is now marked as a public API
* The first parameter of [```updateStatus()``` method](http://bootstrapvalidator.com/api/#update-status) now accepts the field name only
* [#126](https://github.com/nghuuphuoc/bootstrapvalidator/issues/126): Submit button remains disabled after calling custom ```submitHandler``` and the form is valid
* [#132](https://github.com/nghuuphuoc/bootstrapvalidator/issues/132): The ```fields.[fieldName].message``` option is not used when showing the error message

## v0.3.3 (2014-03-27)

* [#50](https://github.com/nghuuphuoc/bootstrapvalidator/issues/50): Don't validate disabled element
* [#34](https://github.com/nghuuphuoc/bootstrapvalidator/issues/34), [#105](https://github.com/nghuuphuoc/bootstrapvalidator/issues/105): Cannot call ```form.submit()``` inside [```submitHandler```](http://bootstrapvalidator.com/settings/#submit-handler)
* [#77](https://github.com/nghuuphuoc/bootstrapvalidator/issues/77), [#117](https://github.com/nghuuphuoc/bootstrapvalidator/issues/117): The [```notEmpty``` validator](http://bootstrapvalidator.com/validators/not-empty/) doesn't work on file input
* [#120](https://github.com/nghuuphuoc/bootstrapvalidator/pull/120): Handle case where a field is removed after the bootstrap validation, thanks to [@patmoore](https://github.com/patmoore)

## v0.3.2 (2014-03-21)

* [#56](https://github.com/nghuuphuoc/bootstrapvalidator/issues/56): Add [```selector``` option](http://bootstrapvalidator.com/settings/#fields) for each field. The field can be defined by CSS validator instead of the ```name``` attribute
* [#107](https://github.com/nghuuphuoc/bootstrapvalidator/issues/107): Add [```container``` option](http://bootstrapvalidator.com/settings/#fields) for each field to indicate where the error messages are shown
* [#5](https://github.com/nghuuphuoc/bootstrapvalidator/issues/5): Add [```ip``` validator](http://bootstrapvalidator.com/validators/ip/). Support both IPv4 and IPv6
* [#6](https://github.com/nghuuphuoc/bootstrapvalidator/issues/6): Add [```isbn``` validator](http://bootstrapvalidator.com/validators/isbn/), support both ISBN 10 and ISBN 13
* [#7](https://github.com/nghuuphuoc/bootstrapvalidator/issues/7): Add [```step``` validator](http://bootstrapvalidator.com/validators/step/)
* [#95](https://github.com/nghuuphuoc/bootstrapvalidator/issues/95): Add [```mac``` validator](http://bootstrapvalidator.com/validators/mac/)
* [#96](https://github.com/nghuuphuoc/bootstrapvalidator/issues/96): Add [```base64``` validator](http://bootstrapvalidator.com/validators/base64/)
* [#97](https://github.com/nghuuphuoc/bootstrapvalidator/issues/97): Add [```cvv``` validator](http://bootstrapvalidator.com/validators/cvv/)
* [#99](https://github.com/nghuuphuoc/bootstrapvalidator/issues/99), [#100](https://github.com/nghuuphuoc/bootstrapvalidator/pull/100): Add [```phone``` validator](http://bootstrapvalidator.com/validators/phone/). Support US phone number only, thanks to [@gercheq](https://github.com/gercheq)
* [#112](https://github.com/nghuuphuoc/bootstrapvalidator/issues/112): [```creditCard``` validator](http://bootstrapvalidator.com/validators/credit-card/) now validates both IIN ranges and length

## v0.3.1 (2014-03-17)

* [#4](https://github.com/nghuuphuoc/bootstrapvalidator/issues/4): Add [```date``` validator](http://bootstrapvalidator.com/validators/date/)
* [#72](https://github.com/nghuuphuoc/bootstrapvalidator/issues/72), [#79](https://github.com/nghuuphuoc/bootstrapvalidator/issues/79): Improve [```updateStatus()``` method](http://bootstrapvalidator.com/api/#update-status) to make the plugin play well with another
* [#80](https://github.com/nghuuphuoc/bootstrapvalidator/issues/80): Add [```enabled``` option](http://bootstrapvalidator.com/settings/#fields) and [```enableFieldValidators()``` method](http://bootstrapvalidator.com/api/#enable-field-validators) to enable/disable all validators to given field
* [#90](https://github.com/nghuuphuoc/bootstrapvalidator/pull/90): Add ```bower.json``` file, thanks to [@ikanedo](https://github.com/ikanedo)
* [#3](https://github.com/nghuuphuoc/bootstrapvalidator/issues/3), [#92](https://github.com/nghuuphuoc/bootstrapvalidator/issues/92): Support more form controls on the same row
* Remove the ```columns``` option. Now the plugin works normally no matter how many columns the form uses
* [#102](https://github.com/nghuuphuoc/bootstrapvalidator/issues/102): The [```resetForm``` method](http://bootstrapvalidator.com/api/#reset-form) now only resets fields with validator rules
* [#82](https://github.com/nghuuphuoc/bootstrapvalidator/issues/82), [#84](https://github.com/nghuuphuoc/bootstrapvalidator/issues/84): The error messages aren't shown if the form field doesn't have label
* [#89](https://github.com/nghuuphuoc/bootstrapvalidator/issues/89): [```submitHandler```](http://bootstrapvalidator.com/settings/#submit-handler) or default submission isn't called after [```remote``` validation](http://bootstrapvalidator.com/validators/remote/) completes

## v0.3.0 (2014-03-10)

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
* [#50](https://github.com/nghuuphuoc/bootstrapvalidator/issues/50): Don't validate disabled element
* [#51](https://github.com/nghuuphuoc/bootstrapvalidator/issues/51): Submit after submit doesn't work
* [#53](https://github.com/nghuuphuoc/bootstrapvalidator/issues/53), [#54](https://github.com/nghuuphuoc/bootstrapvalidator/pull/54): Fix [```notEmpty``` validator](http://bootstrapvalidator.com/validators/not-empty/) for radios and checkboxes, thanks to [@kristian-puccio](https://github.com/kristian-puccio)
* [#55](https://github.com/nghuuphuoc/bootstrapvalidator/issues/55): The plugin doesn't validate other fields if the [```remote``` validator](http://bootstrapvalidator.com/validators/remote/) returns ```true```
* [#62](https://github.com/nghuuphuoc/bootstrapvalidator/pull/62): The [```callback``` validator](http://bootstrapvalidator.com/validators/callback/) passes wrong parameter, thanks to [@iplus](https://github.com/iplus)
* [#59](https://github.com/nghuuphuoc/bootstrapvalidator/pull/59): Add example for Rail field convention, thanks to [@narutosanjiv](https://github.com/narutosanjiv)
* [#60](https://github.com/nghuuphuoc/bootstrapvalidator/pull/60): Update the installation guide, thanks to [@vaz](https://github.com/vaz)
* [#73](https://github.com/nghuuphuoc/bootstrapvalidator/issues/73): Describe which version should be [included](http://bootstrapvalidator.com/getting-started/#including-library) in the Usage section

## v0.2.2 (2014-01-07)

* [#15](https://github.com/nghuuphuoc/bootstrapvalidator/issues/15): Focus to the first invalid element
* [#31](https://github.com/nghuuphuoc/bootstrapvalidator/issues/31): [```remote``` validator](http://bootstrapvalidator.com/validators/remote/): Allow to set additional data to remote URL
* [#32](https://github.com/nghuuphuoc/bootstrapvalidator/issues/32), [#43](https://github.com/nghuuphuoc/bootstrapvalidator/issues/43), [#47](https://github.com/nghuuphuoc/bootstrapvalidator/issues/47): Only validate not empty field
* [#39](https://github.com/nghuuphuoc/bootstrapvalidator/issues/39): Validate existing fields only
* [#34](https://github.com/nghuuphuoc/bootstrapvalidator/issues/34): Avoid from calling form submit recursively
* [#40](https://github.com/nghuuphuoc/bootstrapvalidator/issues/40): Fix the issue when the form label doesn't have class

## v0.2.1 (2013-11-08)

* [#29](https://github.com/nghuuphuoc/bootstrapvalidator/issues/29): Upgrade Bootstrap to v3.0.2
* [#30](https://github.com/nghuuphuoc/bootstrapvalidator/issues/30): Hide the error block containers before validating

## v0.2.0 (2013-10-21)

* [#24](https://github.com/nghuuphuoc/bootstrapvalidator/issues/24): Add [```live``` option](http://bootstrapvalidator.com/settings/#live)
* [#20](https://github.com/nghuuphuoc/bootstrapvalidator/issues/20): Add custom submit handler using [```submitHandler``` option](http://bootstrapvalidator.com/settings/#submit-handler)
* [#9](https://github.com/nghuuphuoc/bootstrapvalidator/issues/9): Add [```creditCard``` validator](http://bootstrapvalidator.com/validators/credit-card/)
* [#18](https://github.com/nghuuphuoc/bootstrapvalidator/issues/18): Add [```different``` validator](http://bootstrapvalidator.com/validators/different/)
* [#21](https://github.com/nghuuphuoc/bootstrapvalidator/issues/21): Add [```callback``` validator](http://bootstrapvalidator.com/validators/callback/)
* [#22](https://github.com/nghuuphuoc/bootstrapvalidator/issues/22): Support form that labels are placed in extra small (```col-xs-```), small (```col-sm-```), medium (```col-md-```) elements
* [#25](https://github.com/nghuuphuoc/bootstrapvalidator/issues/25): The [```regexp``` validator](http://bootstrapvalidator.com/validators/regexp/) does not work

## v0.1.1 (2013-10-17)

* Added [```submitButtons``` option](http://bootstrapvalidator.com/settings/#submit-buttons)
* [#16](https://github.com/nghuuphuoc/bootstrapvalidator/issues/16): Added disabling client side validation in HTML 5
* [#17](https://github.com/nghuuphuoc/bootstrapvalidator/issues/17): Added support for default Bootstrap form without labels
* [#19](https://github.com/nghuuphuoc/bootstrapvalidator/issues/19): Added support for select box validator

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