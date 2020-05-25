# VALIDATE DOCUMENT ECUADOR

Este paquete te permite validar un número de cédula o ruc de ecuador.

## Instalación

Usa el paquete [npm](https://www.npmjs.com/get-npm) para instalar.

```bash
npm i validate-document-ecuador --save
```

## Uso

```python
const validateDocument = require('validate-document-ecuador');

validateDocument.getValidateDocument( 'cedula', '1234567890' );    # retorna 'json'
validateDocument.getValidateDocument( 'ruc', '0987654321001' );    # retorna 'json'
```

## Contribuyendo
Las solicitudes de extracción son bienvenidas. Para cambios importantes, abra primero un problema para discutir qué le gustaría cambiar.

Asegúrese de actualizar las pruebas según corresponda.

## Licencia
[MIT](https://choosealicense.com/licenses/mit/)