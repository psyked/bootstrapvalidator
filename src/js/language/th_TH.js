(function($) {
    /**
     * Default English package. It's included in the dist, so you do NOT need to include it to your head tag
     * The only reason I put it here is that you can clone it, and translate it into your language
     */
    $.fn.bootstrapValidator.i18n = $.extend(true, $.fn.bootstrapValidator.i18n, {
        base64: {
            'default': 'กรุณาระบุ base 64 encoded ให้ถูกต้อง'
        },
        between: {
            'default': 'กรุณาระบุค่าระหว่าง %s และ %s',
            notInclusive: 'กรุณาระบุค่าระหว่าง %s และ %s เท่านั้น'
        },
        callback: {
            'default': 'กรุณาระบุค่าให้ถูก'
        },
        choice: {
            'default': 'กรุณาระบุค่าให้ถูกต้อง',
            less: 'Please choose %s options at minimum',
            more: 'Please choose %s options at maximum',
            between: 'กรุณาเลือก %s - %s ที่มีอยู่'
        },
        creditCard: {
            'default': 'กรุณาระบุเลขที่บัตรเครดิตให้ถูกต้อง'
        },
        cusip: {
            'default': 'กรุณาระบุหมายเลข CUSIP ให้ถูกต้อง'
        },
        cvv: {
            'default': 'กรุณาระบุ CVV ให้ถูกต้อง'
        },
        date: {
            'default': 'กรุณาระบุวันที่ให้ถูกต้อง'
        },
        different: {
            'default': 'กรุณาระบุค่าอื่นที่แตกต่าง'
        },
        digits: {
             'default': 'กรุณาระบุตัวเลขเท่านั้น'
        },
        ean: {
            'default': 'กรุณาระบุหมายเลข EAN ให้ถูกต้อง'
        },
        emailAddress: {
            'default': 'กรุณาระบุอีเมล์ให้ถูกต้อง'
        },
        file: {
            'default': 'กรุณาเลือกไฟล์'
        },
        greaterThan: {
            'default': 'กรุณาระบุค่ามากกว่าหรือเท่ากับ %s',
            notInclusive: 'กรุณาระบุค่ามากกว่า %s'
        },
        grid: {
            'default': 'กรุณาระบุหมายลข GRId ให้ถูกต้อง'
        },
        hex: {
            'default': 'กรุณาระบุเลขฐานสิบหกให้ถูกต้อง'
        },
        hexColor: {
            'default': 'กรุณาระบุค่าสี hex color ให้ถูกต้อง'
        },
        iban: {
            'default': 'กรุณาระบุหมายเลข IBAN ให้ถูกต้อง',
            countryNotSupported: 'ไม่รองรับค่า %s รหัสประเทศที่ระบุ',
            country: 'กรุณาระบุหมายเลข IBAN ใน %s',
            countries: {
                AD: 'Andorra',
                AE: 'United Arab Emirates',
                AL: 'Albania',
                AO: 'Angola',
                AT: 'Austria',
                AZ: 'Azerbaijan',
                BA: 'Bosnia and Herzegovina',
                BE: 'Belgium',
                BF: 'Burkina Faso',
                BG: 'Bulgaria',
                BH: 'Bahrain',
                BI: 'Burundi',
                BJ: 'Benin',
                BR: 'Brazil',
                CH: 'Switzerland',
                CI: 'Ivory Coast',
                CM: 'Cameroon',
                CR: 'Costa Rica',
                CV: 'Cape Verde',
                CY: 'Cyprus',
                CZ: 'Czech',
                DE: 'Germany',
                DK: 'Denmark',
                DO: 'Dominica',
                DZ: 'Algeria',
                EE: 'Estonia',
                ES: 'Spain',
                FI: 'Finland',
                FO: 'Faroe Islands',
                FR: 'France',
                GB: 'United Kingdom',
                GE: 'Georgia',
                GI: 'Gibraltar',
                GL: 'Greenland',
                GR: 'Greece',
                GT: 'Guatemala',
                HR: 'Croatia',
                HU: 'Hungary',
                IE: 'Ireland',
                IL: 'Israel',
                IR: 'Iran',
                IS: 'Iceland',
                IT: 'Italy',
                JO: 'Jordan',
                KW: 'Kuwait',
                KZ: 'Kazakhstan',
                LB: 'Lebanon',
                LI: 'Liechtenstein',
                LT: 'Lithuania',
                LU: 'Luxembourg',
                LV: 'Latvia',
                MC: 'Monaco',
                MD: 'Moldova',
                ME: 'Montenegro',
                MG: 'Madagascar',
                MK: 'Macedonia',
                ML: 'Mali',
                MR: 'Mauritania',
                MT: 'Malta',
                MU: 'Mauritius',
                MZ: 'Mozambique',
                NL: 'Netherlands',
                NO: 'Norway',
                PK: 'Pakistan',
                PL: 'Poland',
                PS: 'Palestine',
                PT: 'Portugal',
                QA: 'Qatar',
                RO: 'Romania',
                RS: 'Serbia',
                SA: 'Saudi Arabia',
                SE: 'Sweden',
                SI: 'Slovenia',
                SK: 'Slovakia',
                SM: 'San Marino',
                SN: 'Senegal',
                TN: 'Tunisia',
                TR: 'Turkey',
                VG: 'Virgin Islands, British'
            }
        },
        id: {
            'default': 'Please enter a valid identification number',
            countryNotSupported: 'The country code %s is not supported',
            country: 'Please enter a valid identification number in %s',
            countries: {
                BA: 'Bosnia and Herzegovina',
                BG: 'Bulgaria',
                BR: 'Brazil',
                CH: 'Switzerland',
                CL: 'Chile',
                CZ: 'Czech',
                DK: 'Denmark',
                EE: 'Estonia',
                ES: 'Spain',
                FI: 'Finland',
                HR: 'Croatia',
                IE: 'Ireland',
                IS: 'Iceland',
                LT: 'Lithuania',
                LV: 'Latvia',
                ME: 'Montenegro',
                MK: 'Macedonia',
                NL: 'Netherlands',
                RO: 'Romania',
                RS: 'Serbia',
                SE: 'Sweden',
                SI: 'Slovenia',
                SK: 'Slovakia',
                SM: 'San Marino',
                ZA: 'South Africa'
            }
        },
        identical: {
            'default': 'Please enter the same value'
        },
        imei: {
            'default': 'Please enter a valid IMEI number'
        },
        imo: {
            'default': 'Please enter a valid IMO number'
        },
        integer: {
            'default': 'Please enter a valid number'
        },
        ip: {
            'default': 'Please enter a valid IP address',
            ipv4: 'Please enter a valid IPv4 address',
            ipv6: 'Please enter a valid IPv6 address'
        },
        isbn: {
            'default': 'Please enter a valid ISBN number'
        },
        isin: {
            'default': 'Please enter a valid ISIN number'
        },
        ismn: {
            'default': 'Please enter a valid ISMN number'
        },
        issn: {
            'default': 'Please enter a valid ISSN number'
        },
        lessThan: {
            'default': 'Please enter a value less than or equal to %s',
            notInclusive: 'Please enter a value less than %s'
        },
        mac: {
            'default': 'Please enter a valid MAC address'
        },
        meid: {
            'default': 'Please enter a valid MEID number'
        },
        notEmpty: {
            'default': 'Please enter a value'
        },
        numeric: {
            'default': 'Please enter a valid float number'
        },
        phone: {
            'default': 'Please enter a valid phone number',
            countryNotSupported: 'The country code %s is not supported',
            country: 'Please enter a valid phone number in %s',
            countries: {
                BR: 'Brazil',
                CN: 'China',
                ES: 'Spain',
                FR: 'France',
                GB: 'United Kingdom',
                MA: 'Morocco',
                PK: 'Pakistan',
                RO: 'Romania',
                US: 'USA'
            }
        },
        regexp: {
            'default': 'Please enter a value matching the pattern'
        },
        remote: {
            'default': 'Please enter a valid value'
        },
        rtn: {
            'default': 'Please enter a valid RTN number'
        },
        sedol: {
            'default': 'Please enter a valid SEDOL number'
        },
        siren: {
            'default': 'Please enter a valid SIREN number'
        },
        siret: {
            'default': 'Please enter a valid SIRET number'
        },
        step: {
            'default': 'Please enter a valid step of %s'
        },
        stringCase: {
            'default': 'Please enter only lowercase characters',
            upper: 'Please enter only uppercase characters'
        },
        stringLength: {
            'default': 'Please enter a value with valid length',
            less: 'Please enter less than %s characters',
            more: 'Please enter more than %s characters',
            between: 'Please enter value between %s and %s characters long'
        },
        uri: {
            'default': 'Please enter a valid URI'
        },
        uuid: {
            'default': 'Please enter a valid UUID number',
            version: 'Please enter a valid UUID version %s number'
        },
        vat: {
            'default': 'Please enter a valid VAT number',
            countryNotSupported: 'The country code %s is not supported',
            country: 'Please enter a valid VAT number in %s',
            countries: {
                AT: 'Austria',
                BE: 'Belgium',
                BG: 'Bulgaria',
                BR: 'Brazil',
                CH: 'Switzerland',
                CY: 'Cyprus',
                CZ: 'Czech',
                DE: 'Germany',
                DK: 'Denmark',
                EE: 'Estonia',
                ES: 'Spain',
                FI: 'Finland',
                FR: 'French',
                GB: 'United Kingdom',
                GR: 'Greece',
                EL: 'Greece',
                HU: 'Hungary',
                HR: 'Croatia',
                IE: 'Ireland',
                IS: 'Iceland',
                IT: 'Italy',
                LT: 'Lithuania',
                LU: 'Luxembourg',
                LV: 'Latvia',
                MT: 'Malta',
                NL: 'Netherlands',
                NO: 'Norway',
                PL: 'Poland',
                PT: 'Portugal',
                RO: 'Romania',
                RU: 'Russia',
                RS: 'Serbia',
                SE: 'Sweden',
                SI: 'Slovenia',
                SK: 'Slovakia',
                VE: 'Venezuela',
                ZA: 'South Africa'
            }
        },
        vin: {
            'default': 'Please enter a valid VIN number'
        },
        zipCode: {
            'default': 'Please enter a valid postal code',
            countryNotSupported: 'The country code %s is not supported',
            country: 'Please enter a valid postal code in %s',
            countries: {
                BR: 'Brazil',
                CA: 'Canada',
                DK: 'Denmark',
                GB: 'United Kingdom',
                IT: 'Italy',
                MA: 'Morocco',
                NL: 'Netherlands',
                RO: 'Romania',
                SE: 'Sweden',
                SG: 'Singapore',
                US: 'USA'
            }
        }
    });
}(window.jQuery));
