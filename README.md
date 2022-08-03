## Sobre el proyecto

Para este proyecto quisiera destacar algunos puntos fuertes y otros débiles en los que incidir:

* Puntos fuertes
1. Uso de una arquitectura escalable
2. Al tener un formulario sencillo, creación de un custom hook para manejarlo, en lugar de utilizar Formik u otra librería
3. Uso del useContext para el manejo de datos junto con un Servicio para su gestión

* Puntos débiles
1. Podría haber complicado más el testing
2. Podría refactorizar más el uso de useContext y el servicio, especialmente en en lo respectivo al endpoint del post

## Para instalar las dependencias
```sh
   npm install
 ```

## Para iniciar el proyecto
```sh
   npm run dev
 ```