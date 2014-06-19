(function($) {
    /**
     * Default English package
     * It's included in the dist, so you do NOT need to include it to your head tag
     * The only reason I put it here is that you can clone it, and translate it into your language
     */
    $.fn.bootstrapValidator.i18n = $.extend(true, $.fn.bootstrapValidator.i18n, {
        base64: {
            'default': 'Bitte eine Base64 Kodierung eingeben'
        },
        between: {
            'default': 'Bitte einen Wert zwischen %s und %s eingeben',
            notInclusive: 'Bitte einen Wert zwischen %s und %s (strictly) eingeben'
        },
        callback: {
            'default': 'Bitte einen gültigen Wert eingeben'
        },
        choice: {
            'default': 'Bitte einen gültigen Wert eingeben',
            less: 'Bitte mindestens %s Werte eingeben',
            more: 'Bitte maximal %s Werte eingeben',
            between: 'Zwischen %s - %s Werten wählen'
        },
        creditCard: {
            'default': 'Bitte gültige Kreditkartennr. eingeben'
        },
        cusip: {
            'default': 'Bitte gültige CUSIP Nummer eingeben'
        },
        cvv: {
            'default': 'Bitte gültige CVV Nummer eingeben'
        },
        date: {
            'default': 'Bitte gültiges Datum eingeben'
        },
        different: {
            'default': 'Bitte anderen Wert eingeben'
        },
        digits: {
             'default': 'Bitte Zahlen eingeben'
        },
        ean: {
            'default': 'Bitte gültige EAN Nummer eingeben'
        },
        emailAddress: {
            'default': 'Bitte gültige Emailadresse eingeben'
        },
        file: {
            'default': 'Bitte gültiges File eingeben'
        },
        greaterThan: {
            'default': 'Bitte Wert größer gleich %s eingeben',
            notInclusive: 'Bitte Wert größer als %s eingeben'
        },
        grid: {
            'default': 'Bitte gültige GRId Nummer eingeben'
        },
        hex: {
            'default': 'Bitte gültigen Hexadezimalwert eingeben'
        },
        hexColor: {
            'default': 'Bitte gültige Hex-Farbe eingeben'
        },
        iban: {
            'default': 'Bitte eine gültige IBAN Nummer eingeben',
            countryNotSupported: 'Der Ländercode %s wird nicht unterstützt',
            country: 'Bitte eine gültige IBAN Nummer für %s eingeben',
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
                CZ: 'Czech Republic',
                DE: 'Germany',
                DK: 'Denmark',
                DO: 'Dominican Republic',
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
                PS: 'Palestinian',
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
            'default': 'Bitte gültige Identifikationsnnummer eingeben',
            countryNotSupported: 'Der Ländercode %s wird nicht unterstützt',
            country: 'Bitte für %s gültige Identifikationsnummer eingeben',
            countries: {
                BA: 'Bosnia and Herzegovina',
                BG: 'Bulgarian',
                BR: 'Brazilian',
                CH: 'Swiss',
                CL: 'Chilean',
                CZ: 'Czech',
                DK: 'Danish',
                EE: 'Estonian',
                ES: 'Spanish',
                FI: 'Finnish',
                HR: 'Croatian',
                IE: 'Irish',
                IS: 'Iceland',
                LT: 'Lithuanian',
                LV: 'Latvian',
                ME: 'Montenegro',
                MK: 'Macedonian',
                NL: 'Dutch',
                RO: 'Romanian',
                RS: 'Serbian',
                SE: 'Swedish',
                SI: 'Slovenian',
                SK: 'Slovak',
                SM: 'San Marino',
                ZA: 'South African'
            }
        },
        identical: {
            'default': 'Bitte gleichen Wert eingeben'
        },
        imei: {
            'default': 'Bitte gültige IMEI Nummer eingeben'
        },
        integer: {
            'default': 'Bitte Zahl eingeben'
        },
        ip: {
            'default': 'Bitte  gültige IP-Adresse eingeben'
        },
        isbn: {
            'default': 'Bitte gültige ISBN Nummer eingeben'
        },
        isin: {
            'default': 'Bitte gültige ISIN Nummer eingeben'
        },
        ismn: {
            'default': 'Bitte gültige ISMN Nummer eingeben'
        },
        issn: {
            'default': 'Bitte gültige ISSN Nummer eingeben'
        },
        lessThan: {
            'default': 'Bitte Wert kleiner gleich %s eingeben',
            notInclusive: 'Bitte Wert kleiner als %s eingeben'
        },
        mac: {
            'default': 'Bitte gültige MAC Adresse eingeben'
        },
        notEmpty: {
            'default': 'Bitte Wert eingeben'
        },
        numeric: {
            'default': 'Bitte Nummer eingeben'
        },
        phone: {
            'default': 'Bitte gültige Telefonnummer eingeben',
            countryNotSupported: 'Der Ländercode %s wird nicht unterstützt',
            country: 'Bitte valide Telefonnummer für %s eingeben',
            countries: {
                GB: 'United Kingdom',
                US: 'USA'
            }
        },
        regexp: {
            'default': 'Bitte Wert eingeben, der der Maske entspricht'
        },
        remote: {
            'default': 'Bitte einen gültigen Wert eingeben'
        },
        rtn: {
            'default': 'Bitte gültige RTN Nummer eingeben'
        },
        sedol: {
            'default': 'Bitte gültige SEDOL Nummer eingeben'
        },
        siren: {
            'default': 'Bitte gültige SIREN Nummer eingeben'
        },
        siret: {
            'default': 'Bitte gültige SIRET Nummer eingeben'
        },
        step: {
            'default': 'Bitte einen gültigen Schritt von %s eingeben',
        },
        stringCase: {
            'default': 'Bitte nur Kleinbuchstaben eingeben',
            upper: 'Bitte nur Großbuchstaben eingeben'
        },
        stringLength: {
            'default': 'Bitte Wert mit gültiger Länge eingeben',
            less: 'Bitte weniger als %s Zeichen eingeben',
            more: 'Bitte mehr als %s Zeichen eingeben',
            between: 'Bitte Wert zwischen %s und %s Zeichen eingeben'
        },
        uri: {
            'default': 'Bitte gültige URI eingeben'
        },
        uuid: {
            'default': 'Bitte gültige UUID Nummer eingeben',
            version: 'Bitte gültige UUID Version %s eingeben'
        },
        vat: {
            'default': 'Bitte gültige VAT Nummer eingeben',
            countryNotSupported: 'Der Ländercode %s wird nicht unterstützt',
            country: 'Bitte gültige %s VAT Nummer eingeben',
            countries: {
                AT: 'Austrian',
                BE: 'Belgian',
                BG: 'Bulgarian',
                CH: 'Swiss',
                CY: 'Cypriot',
                CZ: 'Czech',
                DE: 'German',
                DK: 'Danish',
                EE: 'Estonian',
                ES: 'Spanish',
                FI: 'Finnish',
                FR: 'French',
                GB: 'United Kingdom',
                GR: 'Greek',
                EL: 'Greek',
                HU: 'Hungarian',
                HR: 'Croatian',
                IE: 'Irish',
                IT: 'Italian',
                LT: 'Lithuanian',
                LU: 'Luxembourg',
                LV: 'Latvian',
                MT: 'Maltese',
                NL: 'Dutch',
                NO: 'Norwegian',
                PL: 'Polish',
                PT: 'Portuguese',
                RO: 'Romanian',
                RU: 'Russian',
                RS: 'Serbian',
                SE: 'Swedish',
                SI: 'Slovenian',
                SK: 'Slovak'
            }
        },
        vin: {
            'default': 'Bitte gültige VIN Nummer eingeben'
        },
        zipCode: {
            'default': 'Bitte gültige PLZ eingeben',
            countryNotSupported: 'Der Ländercode %s wird nicht unterstützt',
            country: 'Bitte gültigen Code %s eingeben',
            countries: {
                'CA': 'Canadian postal code',
                'DK': 'Danish postal code',
                'GB': 'United Kingdom postal code',
                'IT': 'Italian postal code',
                'NL': 'Dutch postal code',
                'SE': 'Swiss postal code',
                'SG': 'Singapore postal code',
                'US': 'US zip code'
            }
        }
    });
}(window.jQuery));
