"use strict";

const { getValidateCedula, getValidateRuc } = require('./core/document');
const { getResponse } = require('./core/validate');


const getValidateDocument = ( type = "", document = "" ) => {

    let response = "";

    if( type.trim() == "" || document.trim() == "" ){
        response = getResponse("datos-vacios");
    }else{
        switch( type.toUpperCase() ) {
            case "CEDULA":
                response = getValidateCedula( document );
            break;
            case "RUC":
                response = getValidateRuc( document );
            break;
        }
    }
    // console.log(JSON.parse(response));
    return JSON.parse(response);
}


module.exports = {
    getValidateDocument
}