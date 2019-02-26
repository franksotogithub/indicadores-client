#DashBoard Resultados

Frontend del sistema online de publicación de resultados del Censo2017 incluye indicadores y cuadros estadistico

##Modulos

* Indicadores
* Cuadros estadisticos


##Implementación

### Requerimientos

Se automatiza las tareas del proyecto utilizando gulp-cli para lo cual es obligatorio tener instalado:

* nodejs y npm.
* gulp-cli a nivel global.

```bash
npm install gulp-cli -g
```

### Clonando el proyecto
```bash
git clone git@gitlab.inei.gob.pe:DWTEAM/dashboard-indicadores.git
```

* para desarrollo ir a la rama dev.
```bash
git checkout dev
```

* para produccion permanecer en master.

### configuración y puesta en marcha
Uicarnos en la raiz del proyecto a nivel del package.json y realizar.
* instalar dependencias necesarias
```bash
npm install 
```

* Configurar el proyecto
    * Crear el archivo de configuracion, copiar config_example.js a config.js
    ```bash
    cd ./src/js
    cp -a config_example.js config.js
    ```
    * Cambiar el urlServer (servicios) dependiendo del ambiente que te encuentras
    ```bash
    urlServer: "http://192.168.34.14:8001/",
    ```

