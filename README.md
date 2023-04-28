# Portafolio con React
Este proyecto es un portafolio personal hecho con React que consume la API de Contentful para mostrar los textos e imágenes en la página. Además, se utiliza Telegram para enviar la información proporcionada en la sección de contacto.

## Requerimientos
Para poder ejecutar este proyecto, necesitarás definir las siguientes variables de entorno:

- REACT_APP_SPACE : el ID del espacio de Contentful donde se alojan los contenidos.
- REACT_APP_ENVIRONMENT : el ambiente de Contentful que se utilizará.
- REACT_APP_ACCESS_TOKEN : el token de acceso para Contentful.
- REACT_APP_TELEGRAM_BOT_TOKEN : el token del bot de Telegram que se utilizará para enviar la información.
- REACT_APP_CHAT_TELEGRAM : el ID del chat de Telegram al que se enviará la información.


## Instalación
Para instalar este proyecto, debes seguir los siguientes pasos:

1. Clona este repositorio en tu máquina local.
2. Ejecuta ```bash npm install ```  en la carpeta del proyecto para instalar las dependencias.
3. Define las variables de entorno en un archivo .env.
4. Ejecuta ```bash  npm start  ``` para iniciar la aplicación.
5. Abre tu navegador con [http://localhost:3000](http://localhost:3000)  para verlo en su navegador. 
