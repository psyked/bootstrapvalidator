# BootstrapValidate

A jQuery plugin to validate form fields. Use with Bootstrap 3

The plugin uses [Bootstrap Tooltip](http://getbootstrap.com/javascript/#tooltips) to show the error message as following screenshot:

![Bootstrap Validate screenshot](img/screenshot.png)

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

Since the BootstrapValidate plugin requires jQuery and Bootstrap 3, you have to include the required CSS and JS files to your page:

```html
<link rel="stylesheet" href="/path/to/bootstrap/css/bootstrap.css"/>
<script type="text/javascript" src="/path/to/jquery/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/path/to/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/path/to/js/bootstrapvalidate.min.js"></script>
```

Call the plugin to validate the form as following:

```javascript
$(document).ready(function() {
    $(<form Selector>).bootstrapValidate({
        message: <The default error message for all fields>,
        iconClass: {
            valid: <The icon class indicates a valid value>,
            invalid: <The icon class indicates an invalid value>
        },
        fields: {
            ...
            <fieldName>: {
                message: <The default error message for this field>,
                validator: {
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

Validator name                            | Description
------------------------------------------|------------
[between](docs/between)                   | Checks if the input value is between (strictly or not) two given numbers
digits                                    | Return true if the value contains only digits
emailAddress                              | Validate an email address
greaterThan                               | Return true if the value is greater than or equals to given number
identical                                 | Check if the value is the same as one of particular field
lessThan                                  | Return true if the value is less than or equals to given number
notEmpty                                  | Check if the value is empty
regexp                                    | Check if the value matches given Javascript regular expression
stringLength                              | Validate the length of a string
uri                                       | Validate an URL address

## Build

BootstrapValidate uses [grunt](http://gruntjs.com) to simplify building process.

From the BootstrapValidate root directory, execute the following commands to install the dependent packages (the administrator permission might be required):

```bash
$ npm install grunt --save-dev
$ npm install grunt-contrib-concat --save-dev
$ npm install grunt-contrib-uglify --save-dev
```

Then, uses grunt to build:

```bash
$ grunt
```

The generated scripts (including source and compressed versions) are placed inside the ```dist``` directory.

## Author

Nguyen Huu Phuoc ([Email](mailto: phuoc@huuphuoc.me) / [Twitter](http://twitter.com/nghuuphuoc) / [Github](http://github.com/nghuuphuoc))

## License

Copyright (c) 2013 Nguyen Huu Phuoc

BootstrapValidate is licensed under the MIT license.