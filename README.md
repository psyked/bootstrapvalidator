# BootstrapValidator

A jQuery plugin to validate form fields. Use with Bootstrap 3

## Features

* Built from scratch. The code is solid and clean
* Many built-in [validators](#validators)
* It is easy to [write new validator](#write-new-validator)

## Required

* [jQuery](http://jquery.com/)
* [Bootstrap 3](http://getbootstrap.com/)

## Demo

You can see the live demo here:

* [Sample demo](https://rawgithub.com/nghuuphuoc/bootstrapvalidator/master/demo/index.html)
* [Validator examples](https://rawgithub.com/nghuuphuoc/bootstrapvalidator/master/demo/validators.html)
* [Custom submit handler](https://rawgithub.com/nghuuphuoc/bootstrapvalidator/master/demo/submitHandler.html)

## Usage

Since the bootstrapValidator plugin requires jQuery and Bootstrap 3, you have to include the required CSS and JS files to your page:

```html
<link rel="stylesheet" href="/path/to/bootstrap/css/bootstrap.css"/>
<link rel="stylesheet" href="/path/to/bootstrapValidator.min.css"/>

<script type="text/javascript" src="/path/to/jquery/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/path/to/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/path/to/bootstrapValidator.min.js"></script>
```

Call the plugin to validate the form as following:

```javascript
$(document).ready(function() {
    $(<form Selector>).bootstrapValidator({
        // The default error message for all fields
        // You can specify the error message for any fields
        message: ...,

        // The submit buttons selector
        // These buttons will be disabled when the form input are invalid
        submitButtons: ...,

        // Custom submit handler
        // The handler has two arguments
        // - validator is the instance of BootstrapValidator
        // - form is jQuery object representing the current form
        // By default, submitHandler is null
        submitHandler: function(validator, form) {
        },

        // Live validating. Can be one of 3 values:
        // - enabled: The plugin validates fields as soon as they are changed
        // - disabled: Disable the live validating.
        // The error messages are only shown after the form is submitted
        // - submitted: The live validating is enabled after the form is submitted
        live: 'enabled',

        // The fields which need to be validated
        fields: {
            ...
            // The field name
            // It is value of the name attribute
            <fieldName>: {
                // The default error message for this field
                message: ...,

                // Array of validators
                validators: {
                    ...
                    <validatorName>: <validatorOptions>
                    ...
                }
            }
            ...
        }
    });
});
```

The ```<validatorName>``` can be the name of the built-in validator which are described in the [Validators](#validators) section

## Validators

Below is the list of built-in validators sorted in alphabetical order:

Validator name                          | Description
----------------------------------------|------------
[between](#between-validator)           | Check if the input value is between (strictly or not) two given numbers
[callback](#callback-validator)         | Return the validity from a callback method
creditCard                              | Validate a credit card number
[different](#different-validator)       | Return true if the input value is different with given field's value
digits                                  | Return true if the value contains only digits
emailAddress                            | Validate an email address
[greaterThan](#greaterthan-validator)   | Return true if the value is greater than or equals to given number
hexColor                                | Validate a hex color
[identical](#identical-validator)       | Check if the value is the same as one of particular field
[lessThan](#lessthan-validator)         | Return true if the value is less than or equals to given number
notEmpty                                | Check if the value is empty
[regexp](#regexp-validator)             | Check if the value matches given Javascript regular expression
[remote](#remote-validator)             | Perform remote checking via Ajax request
[stringLength](#stringlength-validator) | Validate the length of a string
uri                                     | Validate an URL address
usZipCode                               | Validate a US zip code

The validator options are described in the following section:

(**The options masked with * are required**)

### Between Validator

Option name | Default | Description
------------|---------|------------
message     | n/a     | The error message
min (*)     | n/a     | The lower value in the range
max (*)     | n/a     | The upper value in the range
inclusive   | true    | Can be true or false. If true, the input value must be in the range strictly

### Callback Validator

Option name  | Default | Description
-------------|---------|------------
message      | n/a     | The error message
callback (*) | n/a     | The callback method

The callback method must follow the format below:

```javascript
function(fieldValue, validator) {
    // fieldValue is the value of field
    // validator is instance of BootstrapValidator

    // Check the field validity
    // return true or false
}
```

### Different Validator

Option name | Default | Description
------------|---------|------------
message     | n/a     | The error message
field (*)   | n/a     | The name of field that will be used to compare with current one

### GreaterThan Validator

| Option name | Default | Description
|-------------|---------|------------
| message     | n/a     | The error message
| value (*)   | n/a     | The number to make a comparison to
| inclusive   | false   | Can be true or false
|             |         | If true, the input value must be greater than the comparison one
|             |         | If false, the input value must be greater than or equal to the comparison one

### Identical Validator

Option name | Default | Description
------------|---------|------------
message     | n/a     | The error message
field (*)   | n/a     | The name of field that will be used to compare with current one

### LessThan Validator

| Option name | Default | Description
| ------------|---------|------------
| message     | n/a     | The error message
| value (*)   | n/a     | The number to make a comparison to
| inclusive   | false   | Can be true or false
|             |         | If true, the input value must be less than the comparison one
|             |         | If false, the input value must be less than or equal to the comparison one

### Regexp Validator

Option name | Default | Description
------------|---------|------------
message     | n/a     | The error message
regexp (*)  | n/a     | The Javascript regular expression

### Remote Validator

Option name | Default | Description
------------|---------|------------
message     | n/a     | The error message
url (*)     | n/a     | The remote URL that responses an encoded JSON of array containing the ```valid``` key

### StringLength Validator

Option name | Default | Description
------------|---------|------------
message     | n/a     | The error message
min         | n/a     | The minimum length
max         | n/a     | The maximum length. One of ```min```, ```max``` options is required

## Install

You can download the [latest version](https://github.com/nghuuphuoc/bootstrapvalidator/releases) or use [bower](http://bower.io) to install BootstrapValidator:

```bash
$ bower install bootstrapValidator
```

## Write new validator

A validator has to follow the syntax:

```javascript
(function($) {
    $.fn.bootstrapValidator.validators.<validatorName> = {
        /**
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field The jQuery object represents the field element
         * @param {Object} options The validator options
         * @returns {boolean}
         */
        validate: function(validator, $field, options) {
            // You can get the field value
            // var value = $field.val();
            //
            // Perform validating
            // ...
            //
            // return true if the field value is valid
            // otherwise return false
        }
    };
}(window.jQuery));
```

```<validatorName>``` is the validator name.
Since the validators are distinct by the names, ```<validatorName>``` has to be different with [built-in validators](#validators).

To apply the validator to particular field:

```javascript
$(form).bootstrapValidator({
    fields: {
        <fieldName>: {
            // Replace <validatorName> with the name of validator
            // <validatorOptions> will be passed as third parameter of the
            // validate(validator, $field, options) method
            <validatorName>: <validatorOptions>
        }
    }
});
```

To see how built-in validators are developed, you can look at their sources located at the [```src/js/validator```](src/js/validator) directory.

## Build

BootstrapValidator uses [grunt](http://gruntjs.com) to simplify building process.

From the BootstrapValidator root directory, execute the following commands to install the dependent packages (the administrator permission might be required):

```bash
$ npm install grunt --save-dev
$ npm install grunt-contrib-concat --save-dev
$ npm install grunt-contrib-copy --save-dev
$ npm install grunt-contrib-cssmin --save-dev
$ npm install grunt-contrib-uglify --save-dev
$ npm install grunt-contrib-watch --save-dev
```

Then, uses grunt to build:

```bash
$ grunt
```

If you want grunt to generate scripts whenever the original scripts (located in ```src```) change, use the following command:

```bash
$ grunt watch
```

The generated scripts (including source and compressed versions) are placed inside the ```dist``` directory.

## Release History

Look at the [Change Log](CHANGELOG.md)

## Author

This software is written by Nguyen Huu Phuoc, aka @nghuuphuoc

* [http://twitter.com/nghuuphuoc](http://twitter.com/nghuuphuoc)
* [http://github.com/nghuuphuoc](http://github.com/nghuuphuoc)

Big thanks to the contributor:

* Vu Minh Khang, aka [@khangvm53](https://github.com/khangvm53)

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