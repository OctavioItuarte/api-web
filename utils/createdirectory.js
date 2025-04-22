const fs = require('fs');

// Ruta del directorio a crear

var mkdir = function(directorio){
    const directorioExiste = fs.existsSync(directorio);

    if (!directorioExiste)
        fs.mkdir(directorio, (err) => {
        if (err) {
            console.error('Error al crear el directorio:', err);
            return;
        }
        console.log('Directorio creado exitosamente:', directorio);
        });
}

module.exports = mkdir;