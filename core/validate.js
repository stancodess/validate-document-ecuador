"use strict";

const validateNumbersLength = ( document = "", lengthDocument ) => {
    let response = 0;

    ( document.toString().length == lengthDocument ) ? response = 1: response = 0;

    return response;
}


/**
 *
 * @author stancodes<stalin.caiche@gmail.com>
 *
 * La cédula ecuatoriana está formada por los dos primeros dígitos que corresponden a la provincia
 * donde fue expedida, por lo cual, los dos primeros dígitos no serán mayores a 24 ni menores a 0.
 */
const getValidateExpediteProvince = ( document = "" )  => {
    let prov = document.substring(0,2);

    if ( prov >= 1 && prov <= 24 ){
        return 1;
    }else{
        return 0;
    }
}

/**
 * El tercer dígito es un número menor a 6 (0,1,2,3,4,5).
 */
const getValidateTercerDigito = ( document = "", maxDigito ) => {

    let tercer      = document.substring(2,3);
    let response    = 0;
    ( tercer >= 0 || tercer <= 5 )? response = 1: response = 0;

    return response;
}

const getValidateDigitoVerificador = ( document = "" ) => {
    // obtenemos el último dígito con substring
    let ultimo_digito   = document.substring(9,10);
    let response        = 0;

    // sumamos todos los dígitos pares
    let digitos_pares = parseInt(document.substring(1,2)) +
    parseInt(document.substring(3,4)) +
    parseInt(document.substring(5,6)) +
    parseInt(document.substring(7,8)) ;

    let digitos_impares = 0;
    // sumamos los dígitos imapares
    // a cada dígito impar lo multiplicamos por 2, si el resultado es mayor a 9, se le resta 9 al resultado.
    let digito_uno      = parseInt(document.substring(0,1)) * 2;
    digitos_impares = (digito_uno > 9)?(digito_uno-9):digito_uno;
    let digito_tres      = parseInt(document.substring(2,3)) * 2;
    digitos_impares  = digitos_impares + ((digito_tres > 9)?(digito_tres-9):digito_tres);
    let digito_cinco      = parseInt(document.substring(4,5)) * 2;
    digitos_impares  = digitos_impares + ((digito_cinco > 9)?(digito_cinco-9):digito_cinco)  ;
    let digito_siete      = parseInt(document.substring(6,7)) * 2;
    digitos_impares  = digitos_impares + ((digito_siete > 9)?(digito_siete-9):digito_siete);
    let digito_nueve      = parseInt(document.substring(8,9)) * 2;
    digitos_impares  = digitos_impares + ((digito_nueve > 9)?(digito_nueve-9):digito_nueve);

    // sumamos los digitos pares e impares
    let suma_digitos = digitos_pares + digitos_impares;

    // obtenemos el primer dígito de la suma
    let primer_digito_suma = String(suma_digitos).substring(0,1);

    // obtenemos la decena
    let decena = (parseInt(primer_digito_suma) + 1) * 10;

    // restamos la decena menos la suma total es igual al dígito validador
    // digito validador = decena - suma digitos.
    let digito_validador = decena - suma_digitos;

    // Si el dígito validador es igual a 10
    // le asignamos 0 al digito validador.
    digito_validador = (digito_validador == 10)?0:digito_validador;

    ( digito_validador == ultimo_digito )? response = 1: response = 0;


    return response;

}


const getResponse = ( typeMsn, contribuyente = "" ) => {

    let response = {};


    switch( typeMsn ){
        case 'datos-vacios':
            response = { 
                "status":   "ERROR",
                "message":  "Ingrese el tipo del documento y el documento por favor."
            };
        break;
        case 'cedula-no-valida':
            response = { 
                "status":   "ERROR",
                "message":  "Número de cédula no válida."
            };
        break;
        case 'cedula-valida':
            response = {
                "status":   "SUCCESS",
                "message":  "Número de cédula válida."
            };
        break;
        case 'ruc-no-valido':
            response = {
                "status":   "ERROR",
                "message":  "Número de ruc no válido."
            };
        break;
        case 'ruc-valido':
            response = {
                "status":   "SUCCESS",
                "message":  `Número de ruc ${contribuyente} válido`
            };
        break;
    }

    return JSON.stringify(response);
}


const getValidateTipoContribuyente = ( document = "" ) => {

    let ultimos_digitos = document.substring(10,13);
    let tercer          = document.substring(2,3);
    let response        = 0;
    let respFinal       = "";

    ( ultimos_digitos != '000' ) ? response = 1: response = 0;

    if( response == 1 ) {
        let porcion1 = document.substring(2,3);

        if( porcion1 < 6 ) {
            respFinal = "NATURAL";
        }
        else{
            if(porcion1==6){
                respFinal = "PUBLICO";
            }
            else{
                if(porcion1==9){
                    respFinal = "PRIVADO";
                }
            }
        }
    }else{
        respFinal = "ERROR";
    }



    return respFinal;
}


module.exports = {
    validateNumbersLength,
    getValidateExpediteProvince,
    getValidateTercerDigito,
    getValidateDigitoVerificador,
    getValidateTipoContribuyente,
    getResponse
}