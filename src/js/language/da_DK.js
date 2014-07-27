(function($) {
    /**
     * Danish Language package
     */
    $.fn.bootstrapValidator.i18n = $.extend(true, $.fn.bootstrapValidator.i18n, {
        base64: {
            'default': 'Venligst indtast en gyldig base 64 kodet'
        },
        between: {
            'default': 'Venligst indtast en værdi mellem %s og %s',
            notInclusive: 'Venligst indtast en værdi mellem %s and %s (strictly ?!)'
        },
        callback: {
            'default': 'Venligst indtast en gyldig værdi'
        },
        choice: {
            'default': 'Venligst indtast en gyldig værdi',
            less: 'Venligst vælg %s valgmuligheder som minimum',
            more: 'Venligst vælg %s valgmuligheder som maximum',
            between: 'Venligst vælg %s - %s valgmuligheder'
        },
        creditCard: {
            'default': 'Venligst indtast et gyldigt kreditkort nummer'
        },
        cusip: {
            'default': 'Venligst indtast et gyldigt CUSIP nummer'
        },
        cvv: {
            'default': 'Venligst indtast et gyldigt CVV nummer'
        },
        date: {
            'default': 'Venligst indtast en gyldig dato'
        },
        different: {
            'default': 'Venligst indtast en anden værdi'
        },
        digits: {
             'default': 'Venligst kun indtast cifre'
        },
        ean: {
            'default': 'Venligst indtast er gyldigt EAN nummer'
        },
        emailAddress: {
            'default': 'Venligst indtast en gyldig e-mail adresse'
        },
        file: {
            'default': 'Venligst vælg en gyldig fil'
        },
        greaterThan: {
            'default': 'Venligst indtast en værdi større eller lig med %s',
            notInclusive: 'Venligst indtast en værdi større end %s'
        },
        grid: {
            'default': 'Venlig indtast et gyldigt GRId nummer'
        },
        hex: {
            'default': 'Venlig indtast et gyldigt hexadecimal nummer'
        },
        hexColor: {
            'default': 'Venlig indtast en gyldig hex farve'
        },
        iban: {
            'default': 'Venlig indtast et gyldigt IBAN nummer',
            countryNotSupported: 'Lande koden %s understøttes ikke',
            country: 'Venlig indtast et gyldigt IBAN nummer i in %s',
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
            'default': 'Venlig indtast et gyldigt identifikations nummer',
            countryNotSupported: 'Landekoden %s understøttes ikke',
            country: 'Venlig indtast et gyldigt %s identifikations nummer',
            countries: {
                BA: 'Bosnien-Hercegovinask',
                BG: 'bulgarsk',
                BR: 'brasiliansk',
                CH: 'schweizisk',
                CL: 'chilliensk',
                CZ: 'tjekkisk',
                DK: 'dansk',
                EE: 'estisk',
                ES: 'spansk',
                FI: 'finsk',
                HR: 'kroatisk',
                IE: 'irsk',
                IS: 'islandsk',
                LT: 'litauisk',
                LV: 'lettisk',
                ME: 'montenegro',
                MK: 'makedonsk',
                NL: 'hollandsk',
                RO: 'romænsk',
                RS: 'serbisk',
                SE: 'svensk',
                SI: 'slovensk',
                SK: 'slovakisk',
                SM: 'San Marinosk',
                ZA: 'sydafrikansk'
            }
        },
        identical: {
            'default': 'Venligst indtast den samme værdi'
        },
        imei: {
            'default': 'Venlig indtast et gyldigt IMEI nummer'
        },
        imo: {
            'default': 'Venlig indtast et gyldigt IMO nummer'
        },
        integer: {
            'default': 'Venlig indtast et gyldigt tal'
        },
        ip: {
            'default': 'Venlig indtast en gyldig IP adresse',
            ipv4: 'Venligst indtast en gyldig IPv4 adresse',
            ipv6: 'Venlig indtast en gyldig IPv6 adresse'
        },
        isbn: {
            'default': 'Venlig indtast et gyldigt ISBN nummer'
        },
        isin: {
            'default': 'Venlig indtast et gyldigt ISIN nummer'
        },
        ismn: {
            'default': 'Venlig indtast et gyldigt ISMN nummer'
        },
        issn: {
            'default': 'Venlig indtast et gyldigt ISSN nummer'
        },
        lessThan: {
            'default': 'Venligst indtast en værdi mindre eller lig med %s',
            notInclusive: 'Venligst indtast en værdi mindre end %s'
        },
        mac: {
            'default': 'Venlig indtast en gyldig MAC adresse'
        },
        meid: {
            'default': 'Venlig indtast et gyldigt MEID nummer'
        },
        notEmpty: {
            'default': 'Venligst indtast en værdi'
        },
        numeric: {
            'default': 'Venligst indtast et gyldigt float nummer'
        },
        phone: {
            'default': 'Venlig indtast et gyldigt telefonnummer',
            countryNotSupported: 'Landekoden %s understøttes ikke',
            country: 'Venlig indtast et gyldigt telefonnummer i %s',
            countries: {
                ES: 'Spanien',
                FR: 'Frankrig',
                GB: 'England',
                US: 'USA'
            }
        },
        regexp: {
            'default': 'Venlig indtast en værdi der matcher mønsteret'
        },
        remote: {
            'default': 'Venlig indtast en gyldig værdi'
        },
        rtn: {
            'default': 'Venlig indtast et gyldigt RTN nummer'
        },
        sedol: {
            'default': 'Venlig indtast et gyldigt SEDOL nummer'
        },
        siren: {
            'default': 'Venlig indtast et gyldigt SIREN nummer'
        },
        siret: {
            'default': 'Venlig indtast et gyldigt SIRET nummer'
        },
        step: {
            'default': 'Venlig indtast et gyldigt trin af %s'
        },
        stringCase: {
            'default': 'Venligst kun indtast små bogstaver',
            upper: 'Venligst kun indtast store bogstaver'
        },
        stringLength: {
            'default': 'Venlig indtast en værdig af gyldig længde',
            less: 'Venligst indtast mindre end %s tegn',
            more: 'Venligst indtast mere end %s tegn',
            between: 'Venligst indtast en værdi mellem %s og %s tegn'
        },
        uri: {
            'default': 'Venligst indtast en gyldig URI'
        },
        uuid: {
            'default': 'Venligst indtast et gyldigt UUID nummer',
            version: 'Venligst indtast en gyldig UUID version %s nummer'
        },
        vat: {
            'default': 'Venligst indtast et gyldig moms nummer',
            countryNotSupported: 'Landekoden %s understøttes ikke',
            country: 'Venligst indtast et gyldigt %s moms nummer',
            countries: {
                AT: 'østrisk',
                BE: 'belgisk',
                BG: 'bulgarsk',
                CH: 'schweizisk',
                CY: 'cypriotisk',
                CZ: 'tjekkisk',
                DE: 'tysk',
                DK: 'dansk',
                EE: 'estisk',
                ES: 'spansk',
                FI: 'finsk',
                FR: 'fransk',
                GB: 'engelsk',
                GR: 'græsk',
                EL: 'græsk',
                HU: 'ungarnsk',
                HR: 'kroatisk',
                IE: 'irsk',
                IT: 'italiensk',
                LT: 'litauisk',
                LU: 'luxembourgsk',
                LV: 'lettisk',
                MT: 'maltesisk',
                NL: 'hollandsk',
                NO: 'norsk',
                PL: 'polsk',
                PT: 'portogisisk',
                RO: 'romænsk',
                RU: 'russisk',
                RS: 'serbisk',
                SE: 'svensk',
                SI: 'slovensk',
                SK: 'slovakisk'
            }
        },
        vin: {
            'default': 'Venlig indtast et gyldigt VIN nummer'
        },
        zipCode: {
            'default': 'Venlig indtast et gyldigt postnummer',
            countryNotSupported: 'Landekoden %s understøttes ikke',
            country: 'Venlig indtast et gyldigt %s',
            countries: {
                CA: 'canadisk postnummer',
                DK: 'dansk postnummer',
                GB: 'engelsk postnummer',
                IT: 'italiensk postnummer',
                NL: 'hollandsk postnummer',
                SE: 'svensk postnummer',
                SG: 'singaporiansk postnummer',
                US: 'amerikansk postnummer'
            }
        }
    });
}(window.jQuery));
