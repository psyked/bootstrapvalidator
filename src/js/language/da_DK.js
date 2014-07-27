(function($) {
    /**
     * Danish Language package (No, it ain't cake!)
     * Translated by @djarnis
     */
    $.fn.bootstrapValidator.i18n = $.extend(true, $.fn.bootstrapValidator.i18n, {
        base64: {
            'default': 'Indtast venligst en gyldig basen 64 kodet'
        },
        between: {
            'default': 'Indtast venligst en værdi mellem %s og %s',
            notInclusive: 'Venligst kun indtast en værdi mellem %s og %s'
        },
        callback: {
            'default': 'Indtast venligst en gyldig værdi'
        },
        choice: {
            'default': 'Indtast venligst en gyldig værdi',
            less: 'Venligst vælg %s valgmuligheder som minimum',
            more: 'Venligst vælg %s valgmuligheder som maximum',
            between: 'Venligst vælg %s - %s valgmuligheder'
        },
        creditCard: {
            'default': 'Indtast venligst et gyldigt kreditkort-nummer'
        },
        cusip: {
            'default': 'Indtast venligst et gyldigt CUSIP-nummer'
        },
        cvv: {
            'default': 'Indtast venligst et gyldigt CVV-nummer'
        },
        date: {
            'default': 'Indtast venligst en gyldig dato'
        },
        different: {
            'default': 'Indtast venligst en anden værdi'
        },
        digits: {
             'default': 'Venligst kun indtast cifre'
        },
        ean: {
            'default': 'Indtast venligst et gyldigt EAN-nummer'
        },
        emailAddress: {
            'default': 'Indtast venligst en gyldig e-mail-adresse'
        },
        file: {
            'default': 'Venligst vælg en gyldig fil'
        },
        greaterThan: {
            'default': 'Indtast venligst en værdi større eller lig med %s',
            notInclusive: 'Indtast venligst en værdi større end %s'
        },
        grid: {
            'default': 'Indtast venligst et gyldigt GRId-nummer'
        },
        hex: {
            'default': 'Indtast venligst et gyldigt hexadecimal-nummer'
        },
        hexColor: {
            'default': 'Indtast venligst en gyldig hex-farve'
        },
        iban: {
            'default': 'Indtast venligst et gyldigt IBAN-nummer',
            countryNotSupported: 'Lande koden %s understøttes ikke',
            country: 'Indtast venligst et gyldigt IBAN-nummer i in %s',
            countries: {
                AD: 'Andorra',
                AE: 'De Forenede Arabiske Emirater',
                AL: 'Albanien',
                AO: 'Angola',
                AT: 'Østrig',
                AZ: 'Aserbajdsjan',
                BA: 'Bosnien-Hercegovina',
                BE: 'Belgien',
                BF: 'Burkina Faso',
                BG: 'Bulgaria',
                BH: 'Bahrain',
                BI: 'Burundi',
                BJ: 'Benin',
                BR: 'Brasilien',
                CH: 'Schweiz',
                CI: 'Elfenbenskysten',
                CM: 'Cameroun',
                CR: 'Costa Rica',
                CV: 'Kap Verde',
                CY: 'Cypern',
                CZ: 'Tjekkiet',
                DE: 'Tyskland',
                DK: 'Danmark',
                DO: 'Den Dominikanske Republik',
                DZ: 'Algeriet',
                EE: 'Estland',
                ES: 'Spanien',
                FI: 'Finland',
                FO: 'Færøerne',
                FR: 'Frankrig',
                GB: 'Storbritannien',
                GE: 'Georgien',
                GI: 'Gibraltar',
                GL: 'Grønland',
                GR: 'Grækenland',
                GT: 'Guatemala',
                HR: 'Kroatien',
                HU: 'Ungarn',
                IE: 'Irland',
                IL: 'Israel',
                IR: 'Iran',
                IS: 'Island',
                IT: 'Italien',
                JO: 'Jordan',
                KW: 'Kuwait',
                KZ: 'Kasakhstan',
                LB: 'Libanon',
                LI: 'Liechtenstein',
                LT: 'Litauen',
                LU: 'Luxembourg',
                LV: 'Letland',
                MC: 'Monaco',
                MD: 'Moldova',
                ME: 'Montenegro',
                MG: 'Madagaskar',
                MK: 'Makedonien',
                ML: 'Mali',
                MR: 'Mauretanien',
                MT: 'Malta',
                MU: 'Mauritius',
                MZ: 'Mozambique',
                NL: 'Holland',
                NO: 'Norge',
                PK: 'Pakistan',
                PL: 'Polen',
                PS: 'Palestina',
                PT: 'Portugal',
                QA: 'Qatar',
                RO: 'Rumænien',
                RS: 'Serbien',
                SA: 'Saudi-Arabien',
                SE: 'Sverige',
                SI: 'Slovenien',
                SK: 'Slovakiet',
                SM: 'San Marino',
                SN: 'Senegal',
                TN: 'Tunesien',
                TR: 'Tyrkiet',
                VG: 'Britiske Jomfruøer'
            }
        },
        id: {
            'default': 'Indtast venligst et gyldigt identifikations-nummer',
            countryNotSupported: 'Landekoden %s understøttes ikke',
            country: 'Indtast venligst et gyldigt %s identifikations-nummer',
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
                ME: 'montenegroiansk',
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
            'default': 'Indtast venligst den samme værdi'
        },
        imei: {
            'default': 'Indtast venligst et gyldigt IMEI-nummer'
        },
        imo: {
            'default': 'Indtast venligst et gyldigt IMO-nummer'
        },
        integer: {
            'default': 'Indtast venligst et gyldigt tal'
        },
        ip: {
            'default': 'Indtast venligst en gyldig IP adresse',
            ipv4: 'Indtast venligst en gyldig IPv4 adresse',
            ipv6: 'Indtast venligst en gyldig IPv6 adresse'
        },
        isbn: {
            'default': 'Indtast venligst et gyldigt ISBN-nummer'
        },
        isin: {
            'default': 'Indtast venligst et gyldigt ISIN-nummer'
        },
        ismn: {
            'default': 'Indtast venligst et gyldigt ISMN-nummer'
        },
        issn: {
            'default': 'Indtast venligst et gyldigt ISSN-nummer'
        },
        lessThan: {
            'default': 'Indtast venligst en værdi mindre eller lig med %s',
            notInclusive: 'Indtast venligst en værdi mindre end %s'
        },
        mac: {
            'default': 'Indtast venligst en gyldig MAC adresse'
        },
        meid: {
            'default': 'Indtast venligst et gyldigt MEID-nummer'
        },
        notEmpty: {
            'default': 'Indtast venligst en værdi'
        },
        numeric: {
            'default': 'Indtast venligst et gyldigt float-nummer'
        },
        phone: {
            'default': 'Indtast venligst et gyldigt telefonnummer',
            countryNotSupported: 'Landekoden %s understøttes ikke',
            country: 'Indtast venligst et gyldigt telefonnummer i %s',
            countries: {
                ES: 'Spanien',
                FR: 'Frankrig',
                GB: 'England',
                US: 'USA'
            }
        },
        regexp: {
            'default': 'Indtast venligst en værdi der matcher mønsteret'
        },
        remote: {
            'default': 'Indtast venligst en gyldig værdi'
        },
        rtn: {
            'default': 'Indtast venligst et gyldigt RTN-nummer'
        },
        sedol: {
            'default': 'Indtast venligst et gyldigt SEDOL-nummer'
        },
        siren: {
            'default': 'Indtast venligst et gyldigt SIREN-nummer'
        },
        siret: {
            'default': 'Indtast venligst et gyldigt SIRET-nummer'
        },
        step: {
            'default': 'Indtast venligst et gyldigt trin af %s'
        },
        stringCase: {
            'default': 'Venligst kun indtast små bogstaver',
            upper: 'Venligst kun indtast store bogstaver'
        },
        stringLength: {
            'default': 'Indtast venligst en værdig af gyldig længde',
            less: 'Indtast venligst mindre end %s tegn',
            more: 'Indtast venligst mere end %s tegn',
            between: 'Indtast venligst en værdi mellem %s og %s tegn'
        },
        uri: {
            'default': 'Indtast venligst en gyldig URI'
        },
        uuid: {
            'default': 'Indtast venligst et gyldigt UUID-nummer',
            version: 'Indtast venligst en gyldig UUID version %s-nummer'
        },
        vat: {
            'default': 'Indtast venligst et gyldig moms-nummer',
            countryNotSupported: 'Landekoden %s understøttes ikke',
            country: 'Indtast venligst et gyldigt %s moms-nummer',
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
            'default': 'Indtast venligst et gyldigt VIN-nummer'
        },
        zipCode: {
            'default': 'Indtast venligst et gyldigt postnummer',
            countryNotSupported: 'Landekoden %s understøttes ikke',
            country: 'Indtast venligst et gyldigt %s',
            countries: {
                CA: 'canadisk postnummer',
                DK: 'dansk postnummer',
                GB: 'engelsk postnummer',
                IT: 'italiensk postnummer',
                NL: 'hollandsk postnummer',
                SE: 'svensk postnummer',
                SG: 'singaporeansk postnummer',
                US: 'amerikansk postnummer'
            }
        }
    });
}(window.jQuery));
