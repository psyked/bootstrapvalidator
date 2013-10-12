# bootstrapValidator

A jQuery plugin to validate form fields. Use with Bootstrap 3

## Features

* Many built-in [validators](#validators)

## Required

* [jQuery](http://jquery.com/)
* [Bootstrap 3](http://getbootstrap.com/)

## Demo

You can see the live demo here:

* [Sample demo](https://rawgithub.com/nghuuphuoc/bootstrapvalidate/master/demo/index.html)
* [Validator examples](https://rawgithub.com/nghuuphuoc/bootstrapvalidate/master/demo/validators.html)

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
        message: <The default error message for all fields>,
        fields: {
            ...
            <fieldName>: {
                message: <The default error message for this field>,
                validators: {
                    ...
                    <validatorName>: <validatorOptions>
                    ...
                }
            }
            ...
        }
    }
});
```

The ```<validatorName>``` can be the name of the built-in validator which are described in the [Validators](#validators) section

## Validators

Below is the list of built-in validators sorted in alphabetical order:

Validator name                          | Description
----------------------------------------|------------
[between](#between-validator)           | Check if the input value is between (strictly or not) two given numbers
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

### Between Validator

```javascript
$(document).ready(function() {
    $(<form Selector>).bootstrapValidator({
        fields: {
            <fieldName>: {
                validators: {
                    between: {
                        message: ...,   // [required] The error message
                        min: ...        // [required] The lower value in the range
                        max: ...,       // [required] The upper value in the range
                        inclusive: ...  // [optional] Can be true or false. If true, the input value must be in the range strictly
                    }
                }
            }
        }
    }
});
```

### GreaterThan Validator

```javascript
$(document).ready(function() {
    $(<form Selector>).bootstrapValidator({
        fields: {
            <fieldName>: {
                validators: {
                    greaterThan: {
                        message: ...,   // [required] The error message
                        value: ...,     // [required] The number used to compare to
                        inclusive: ...  // [optional] Can be true or false
                                        // If true, the input value must be greater than the comparison one
                                        // If false, the input value must be greater than or equal to the comparison one
                    }
                }
            }
        }
    }
});
```

### Identical Validator

```javascript
$(document).ready(function() {
    $(<form Selector>).bootstrapValidator({
        fields: {
            <fieldName>: {
                validators: {
                    identical: {
                        message: ...,   // [required] The error message
                        field: ...      // [required] The name of field that will be used to compare with current one
                    }
                }
            }
        }
    }
});
```

### LessThan Validator

```javascript
$(document).ready(function() {
    $(<form Selector>).bootstrapValidator({
        fields: {
            <fieldName>: {
                validators: {
                    lessThan: {
                        message: ...,   // [required] The error message
                        value: ...,     // [required] The number used to compare to
                        inclusive: ...  // [optional] Can be true or false
                    }
                }
            }
        }
    }
});
```

### Regexp Validator

```javascript
$(document).ready(function() {
    $(<form Selector>).bootstrapValidator({
        fields: {
            <fieldName>: {
                validators: {
                    regexp: {
                        message: ...,   // [required] The error message
                        regexp: ...     // [required] The regular expression
                    }
                }
            }
        }
    }
});
```

### Remote Validator

```javascript
$(document).ready(function() {
    $(<form Selector>).bootstrapValidator({
        fields: {
            <fieldName>: {
                validators: {
                    remote: {
                        message: ...,   // [required] The error message
                        url: ...,       // [required] The remote URL
                                        // The remote URL must response an encoded JSON of array containing the 'valid' key
                    }
                }
            }
        }
    }
});
```

### StringLength Validator

```javascript
$(document).ready(function() {
    $(<form Selector>).bootstrapValidator({
        fields: {
            <fieldName>: {
                validators: {
                    stringLength: {
                        message: ...,   // [required] The error message
                        // One of two min/max options must be defined
                        min: ...,       // The minimum length
                        max: ...        // The maximum length
                    }
                }
            }
        }
    }
});
```

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

Nguyen Huu Phuoc ([Email](mailto: phuoc@huuphuoc.me) / [Twitter](http://twitter.com/nghuuphuoc) / [Github](http://github.com/nghuuphuoc))

Vu Minh Khang ([Github](https://github.com/khangvm53))

## License

Copyright (c) 2013 Nguyen Huu Phuoc

bootstrapValidator is licensed under the MIT license.