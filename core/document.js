"use strict";
const { validateNumbersLength,
        getValidateExpediteProvince,
        getValidateTercerDigito,
        getValidateDigitoVerificador,
        getValidateTipoContribuyente,
        getResponse } = require('./validate');


const getValidateCedula =  ( document ) => {

    let response = "";

    let respDigitos             = validateNumbersLength( document, 10 );   // verificamos que tenga los 10 dígitos
    let respExpediteProvince    = getValidateExpediteProvince( document );
    let respTercerDigito        = getValidateTercerDigito( document );
    let respDigitoVerificador   = getValidateDigitoVerificador( document );

    let totalResponse           = respDigitos*1 + respExpediteProvince*1 + respTercerDigito*1 + respDigitoVerificador*1;


    if( totalResponse == 4 ){
        response = getResponse('cedula-valida');
    }else{
        response = getResponse('cedula-no-valida');
    }

    return response;

}

const getValidateRuc = ( document ) => {

    //validaciones de cedula
    let respDigitos             = validateNumbersLength( document, 13 );   // verificamos que tenga los 10 dígitos
    let respExpediteProvince    = getValidateExpediteProvince( document );
    let respDigitoVerificador   = getValidateDigitoVerificador( document );
    let response                = "";

    let resTotal                = respDigitos*1+respExpediteProvince*1+respDigitoVerificador*1;
    if( resTotal == 3 ){
        let respTipoContribuyente   = getValidateTipoContribuyente( document );

        if(respTipoContribuyente == "ERROR"){
            response = getResponse('ruc-no-valido');
        }else{
            response = getResponse('ruc-valido', respTipoContribuyente );
        }
    }else{
        response = getResponse('ruc-no-valido');
    }

    return response;

}

module.exports = {
    getValidateCedula,
    getValidateRuc
}