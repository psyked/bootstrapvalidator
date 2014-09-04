(function($) {
    /**
     * Default English package. It's included in the dist, so you do NOT need to include it to your head tag
     * The only reason I put it here is that you can clone it, and translate it into your language
     */
    $.fn.bootstrapValidator.i18n = $.extend(true, $.fn.bootstrapValidator.i18n, {
        base64: {
            'default': 'Te rog introdu un base64 valid'
        },
        between: {
            'default': 'Te rog introdu o valoare intre %s si %s',
            notInclusive: 'Te rog introdu o valoare doar intre %s si %s'
        },
        callback: {
            'default': 'Te rog introdu o valoare valida'
        },
        choice: {
            'default': 'Te rog introdu o valoare valida',
            less: 'Te rog alege minim %s optiuni',
            more: 'Te rog alege maxim %s optiuni',
            between: 'Te rog alege %s - %s optiuni'
        },
        creditCard: {
            'default': 'Te rog introdu un numar de card valid'
        },
        cusip: {
            'default': 'Te rog introdu un numar CUSIP valid'
        },
        cvv: {
            'default': 'Te rog introdu un numar CVV valid'
        },
        date: {
            'default': 'Te rog introdu o data valida'
        },
        different: {
            'default': 'Te rog sa introduci o valoare diferita'
        },
        digits: {
             'default': 'Te rog sa introduci doar cifre'
        },
        ean: {
            'default': 'Te rog sa introduci un numar EAN valid'
        },
        emailAddress: {
            'default': 'Te rog sa introduci o adresa de email valide'
        },
        file: {
            'default': 'Te rog sa introduci un fisier valid'
        },
        greaterThan: {
            'default': 'Te rog sa introduci o valoare mai mare sau egala cu %s',
            notInclusive: 'Te rog sa introduci  o valoare mai mare ca %s'
        },
        grid: {
            'default': 'Te rog sa introduci un numar GRId valid'
        },
        hex: {
            'default': 'Te rog sa introduci un numar hexadecimal valid'
        },
        hexColor: {
            'default': 'Te rog sa introduci o culoare hex valida'
        },
        iban: {
            'default': 'Te rog sa introduci un IBAN valid',
            countryNotSupported: 'Tara %s nu este acceptata',
            country: 'Te rog sa introduci un IBAN din %s',
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
            'default': 'Te rog sa introduci un numar de identificare valid',
            countryNotSupported: 'Codul %s nu este suportat',
            country: 'Te rog sa introduci un numar de identificare corect %s',
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
            'default': 'Te rog sa introduci aceeasi valoare'
        },
        imei: {
            'default': 'Te rog sa introduci un numar IMEI valid'
        },
        imo: {
            'default': 'Te rog sa introduci un numar IMO valid'
        },
        integer: {
            'default': 'Te rog sa introduci un numar valid'
        },
        ip: {
            'default': 'Te rog sa introduci o adresa IP valida',
            ipv4: 'Te rog sa introduci o adresa IPv4 valida',
            ipv6: 'Te rog sa introduci o adresa IPv6 valida'
        },
        isbn: {
            'default': 'Te rog sa introduci un numar ISBN valid'
        },
        isin: {
            'default': 'Te rog sa introduci un numar ISIN valid'
        },
        ismn: {
            'default': 'Te rog sa introduci un numar ISMN valid'
        },
        issn: {
            'default': 'Te rog sa introduci un numar ISSN valid'
        },
        lessThan: {
            'default': 'Te rog sa introduci o valoare mai mica sau egala cu %s',
            notInclusive: 'Te rog sa introduci o valoare mai mica decat %s'
        },
        mac: {
            'default': 'Te rog sa introduci o adresa MAC valida'
        },
        meid: {
            'default': 'Te rog sa introduci un numar MEID valid'
        },
        notEmpty: {
            'default': 'Te rog sa introduci o valoare'
        },
        numeric: {
            'default': 'Te rog sa introduci un numar'
        },
        phone: {
            'default': 'Te rog sa introduci un numar de telefon valid',
            countryNotSupported: 'Prefixul %s nu este suportat',
            country: 'Te rog sa introduci un numar de telefon din %s',
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
            'default': 'Te rog sa introduci o valoare in formatul'
        },
        remote: {
            'default': 'Te rog sa introduci o valoare valida'
        },
        rtn: {
            'default': 'Te rog sa introduci un numar RTN valid'
        },
        sedol: {
            'default': 'Te rog sa introduci un numar SEDOL valid'
        },
        siren: {
            'default': 'Te rog sa introduci un numar SIREN valid'
        },
        siret: {
            'default': 'Te rog sa introduci un numar SIRET valid'
        },
        step: {
            'default': 'Te rog introdu un pas de %s'
        },
        stringCase: {
            'default': 'Te rog sa introduci doar litere mici',
            upper: 'Te rog sa introduci doar litere mari'
        },
        stringLength: {
            'default': 'Te rog sa introduci o valoare cu lungimea valida',
            less: 'Te rog sa introduci mai putin de %s caractere',
            more: 'Te rog sa introduci mai mult de %s caractere',
            between: 'Te rog sa introduci o valoare cu lungimea intre %s si %s caractere'
        },
        uri: {
            'default': 'Te rog sa introduci un URI valid'
        },
        uuid: {
            'default': 'Te rog sa introduci un numar UUID valid',
            version: 'Te rog sa introduci un numar UUID versiunea %s valid'
        },
        vat: {
            'default': 'Te rog sa introduci un numar TVA',
            countryNotSupported: 'Tara %s nu este acceptata',
            country: 'Te rog sa introduci un numar TVA din %s',
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
            'default': 'Te rog sa introduci un numar VIN valid'
        },
        zipCode: {
            'default': 'Te rog sa introduci un cod postal valid',
            countryNotSupported: 'Tara %s nu este acceptata',
            country: 'Te rog sa introduci un cod postal din %s',
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
