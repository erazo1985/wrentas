const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const { delay } = require('@whiskeysockets/baileys')
const path = require("path")
const fs = require("fs")

const menuPath =path.join(__dirname, "mensajes", "menu.txt")
const menu = fs.readFileSync(menuPath, "utf8")


/*
const flowSecundario = addKeyword(['2', 'siguiente'])
.addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)
*/
const flowPrincipal = addKeyword(['hola', 'hoa', 'ole', 'alo', 'buenas'])
    .addAnswer('🙌 Hola bienvenid@ al *Chatbot* de la Oficina de Rentas de la Secretaria de Hacienda del Departamento del Cauca',{
        delay: 1000,
    })
    .addAnswer('*RECUERDE* Cualquier tramite que solicite es unico y exclusivamente para el *Departamento del Cauca*, no se aceptan de otros departamentos',{
        delay: 1000,
    })
    .addAnswer('Para iniciar escriba la palabra *menu* y siga el tramite que requiere',{
        delay: 1000,
    })

// palabra desconocida
const flowWelcome = addKeyword(EVENTS.WELCOME)
    .addAnswer("Selección incorrecta puede escribir la palabra *menu* para iniciar otra vez",{
        delay: 1000,
    })

// menu

const menuFlow = addKeyword("Menu").addAnswer(
    menu,
    { capture: true },
    async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
        if (!["1", "2", "0"].includes(ctx.body)) {
            return fallBack(
                "Respuesta no válida, por favor selecciona una de las opciones."
            );
        }
        switch (ctx.body) {
            case "1":
                return gotoFlow(flowTramites);
            case "2":
                return gotoFlow(flowOH);
            case "0":
                return await flowDynamic(
                    "Saliendo... Puede volver a la seccion anterior escribiendo la palabra *Menu*"
                );
        }
    }
);

// menu fin

// Menu tramites
const flowTramites = addKeyword(['tramites'])
    .addAnswer(
        [
            'Por favor seleccione una opcion:',
            ' *(1)* - Impuesto sobre vehículos Automotores',
            ' *(2)* - Impuesto de Registro',
            ' *(3)* - Otros',
            ' *(4)* - Descargas',
            ' Puede escribir la palabra *menu* para la selección principal'
        ]
    )

    // Imp Vehículos
    const flowIV = addKeyword(['1', 'uno', 'vehiculos'])
        .addAnswer(
        [
            'Para los tramites como son:',
            '- Recibo de pago',
            '- Paz y salvo',
            'Debe enviar correo electronico a vehiculos@cauca.gov.co con el asunto del tramite a requerir y anexar como soporte en *PDF* tarjeta de propiedad por ambos lados.'
        ],{delay: 1000,})
        .addAnswer(
        [
            'Para el tramite como es:',
            '- Actualización de datos',
            '- Cambio Propietario',
            '- Error en el Nombre o Cedula',
            'Debe enviar correo electronico a vehiculos@cauca.gov.co con el asunto del tramite a requerir y anexar como soporte en *PDF* tarjeta de propiedad por ambos lados y diligenciar formato de Actualización de datos.', 
            'https://rentascauca.gov.co/wp-content/uploads/2024/04/FORMATO-DE-ACTUALIZACION-DE-DATOS-FINAL.pdf'
        ],{delay: 1000,})
        .addAnswer(
        [
            'Para el tramite como es:',
            '- Matricula inicial',
            'Debe enviar correo electronico a vehiculos@cauca.gov.co con el asunto: Matricula Inicial y anexar como soporte en *PDF* Factura de venta, esta debe contener.',
            '- Informacion personal del propietario (Nombre completo, Cedula, Direccion, Telefono, Correo electronico y la placa asignada'
        ],{delay: 1000,})
        .addAnswer(
        [
            'Para el tramite como es:',
            '- Persona Indeterminada',
            'Debe enviar correo electronico a vehiculos@cauca.gov.co con el asunto: Persona indeterminada y anexar como soporte en *PDF* resoluacion o documento entregado por la Secretaria de Transito.'
        ],{delay: 1000,})
        .addAnswer(
        [
            'Para el tramite como es:',
            '- Radicación de Cuenta',
            'Por traslado de otro municipio, debe enviar correo electronico a vehiculos@cauca.gov.co con el asunto: Radicacion de cuenta y anexar como soporte en *PDF*',
            '- Tarjeta de propiedad por ambos lados',
            '- Carta de nueva residencia, expedida por la Secretaria de transito donde se matriculo',
            '- Diligenciar formato de Actualización de datos.',
            'https://rentascauca.gov.co/wp-content/uploads/2024/04/FORMATO-DE-ACTUALIZACION-DE-DATOS-FINAL.pdf'
        ],{delay: 1000,})

// Imp Registro
const flowir = addKeyword(['2', 'dos', 'registro'])
    .addAnswer(
        [
            '*Impuesto de Registro*',
            'Para realizar el tramite se debe enviar un correo electrónico a la siguiente dirección:',
            'imporegistro@cauca.gov.co',
            '*Asunto:* Expedición de recibo Impuesto de Registro.',
            'Después Anexar o Adjuntar la escritura escaneada en su totalidad en formato PDF',
            ' *menu* - *Volver al inicio*',
        ]
    )

// Otros
const flowot = addKeyword(['otros', 'tres', '3'])
    .addAnswer(
        [
            'Escriba puntualmente el tipo de tramite que desea y el cual no se encuentra en ninguno de los menús anteriores',
            'Y en un solo mensaje'
        ]
    )

// Descargas

const flowds = addKeyword(['4', 'cuatro', 'descargas'])
        .addAnswer(
        [
            'Documentos a descargar:',
            'https://rentascauca.gov.co/descargas/'
        ],{delay: 1000,})
        .addAnswer(
        [
            'Formato para devolución o compensación de pagos en exceso y pagos de los no debido de impuesto de vehículos',
            'http://rentascauca.gov.co/wp-content/uploads/2020/07/Devolucion-del-impuesto-de-vehiculos-2020.pdf'
        ],{delay: 1000,})
        .addAnswer(
        [
            'Formato para devolución del impuesto de registro',
            'http://rentascauca.gov.co/wp-content/uploads/2020/07/Devolucion-del-impuesto-de-registro-2020.pdf'
        ],{delay: 1000,})
        .addAnswer(
        [
            'Formato de Solicitud de Prescripción- Impuesto de Vehículos',
            'https://rentascauca.gov.co/wp-content/uploads/2024/04/FORMATO-DE-PRESCRIPCION-FINAL.pdf'
        ],{delay: 1000,})
        .addAnswer(
        [
            'Formato de actualización de datos- Impuesto de Vehículos',
            'https://rentascauca.gov.co/wp-content/uploads/2024/04/FORMATO-DE-ACTUALIZACION-DE-DATOS-FINAL.pdf'
        ],{delay: 1000,})

// Oficinas y Horarios
const flowOH = addKeyword(['tramites'])
.addAnswer(
    [
        'Oficina Grupo Rentas de la Secretaria de Hacienda, Gobernación del Cauca, Popayán',
        'Nos encontramos ubicados en la dirección',
        'Calle 3 # 4 - 70 Casa Caldas',
        'Horario de Atención',
        '*Lunes a Viernes*',
        '08:00 AM a 11:00 AM  y',
        '02:00 PM a 05:00 PM',
        '*Sábados y Domingos no hay atención al publico*',
        'Más información en la página Web:',
        'https://rentascauca.gov.co/',
        'O en la página de la Gobernación',
        'https://www.cauca.gov.co/Paginas/Default.aspx',
        ' *menu* - *Volver al inicio*',
    ],{delay: 1000,})
    .addAnswer(
    [
        'Oficina Grupo Rentas Casa Gobernación Santander de Quilichao',
        'Nos encontramos ubicados en la dirección',
        'Calle 7 # 6b - 60 Barrio Santa Anita',
        'Horario de Atención',
        '*Lunes a Viernes*',
        '08:00 AM a 12:00 AM  y',
        '02:00 PM a 05:00 PM',
        '*Sábados y Domingos no hay atención al publico*',
        'Más información en la página Web:',
        'https://rentascauca.gov.co/',
        'O en la página de la Gobernación',
        'https://www.cauca.gov.co/Paginas/Default.aspx',
        ' *menu* - *Volver al inicio*'
    ],{delay: 1000,})


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowWelcome, menuFlow, flowTramites, flowIV, flowir, flowot, flowds, flowOH])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
