# between Validator

This validator checks if the input value is between (strictly or not) two given numbers

## Usage

```javascript
$(document).ready(function() {
    $(<form Selector>).bootstrapValidate({
        fields: {
            <fieldName>: {
                validator: {
                    between: {
                        message: 'The input value is not between <min> and <max>',
                        min: <min>,
                        max: <max>,
                        inclusive: true
                    }
                }
            }
        }
    }
});
```

## Options

The ```between``` validator has the following options:

Option name | Type    | Required | Default | Description
------------|---------|----------|---------|------------
message     | string  | Yes      | n/a     | The error message
min         | int     | Yes      | n/a     | The lower value in the range
max         | int     | Yes      | n/a     | The upper value in the range
inclusive   | boolean | No       | false   | If true, the input value must be in the range strictly