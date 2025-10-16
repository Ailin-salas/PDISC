document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form.form-container');
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const uploadText = document.getElementById('uploadText');
    const crearBtn = document.querySelector('a.btn-success');

    // Lógica para previsualizar la imagen (se mantiene igual)
    imageUpload.addEventListener('change', function() {
        const file = this.files[0]; //this.files es una lista de archivos, tomamos el primero
        if (file) {
            const reader = new FileReader();//filderader es una API que permite leer archivos
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
                uploadText.style.display = 'none';
            };
            reader.readAsDataURL(file); //lee el archivo y lo convierte a una URL de datos
        } else {
            imagePreview.src = '#';
            imagePreview.style.display = 'none';
            uploadText.style.display = 'block';
        }
    });

    // Envío de datos como JSON al presionar el botón Crear
    if (crearBtn) {
        crearBtn.addEventListener('click', function(event) {
            event.preventDefault(); //preventDefault evita que el enlace navegue
            // Validación básica
            const nombreTorneo = document.getElementById('nombreTorneo').value;
            const juego = document.getElementById('juego').value;
            if (nombreTorneo.trim() === '' || juego.trim() === '') { //trim elimina espacios en blanco
                alert('Por favor, completa los campos obligatorios (Nombre del torneo y Juego).');
                return;
            }
            // Recolecta los valores de los campos
            const data = {
                creador: document.getElementById('creador').value,
                nombreTorneo,
                descripcion: document.getElementById('descripcion').value,
                juego,
                fechaInicio: document.getElementById('fechaInicio').value,
                reglas: document.getElementById('reglas').value,
                premios: document.getElementById('premios').value
            };
            // Envía los datos como JSON a la API
            fetch('../../../Routes/torneo.routes.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => { //then maneja la respuesta de la promesa
                if (!response.ok) throw new Error('Error en la petición'); //throw lanza un error y new Error crea un objeto de error 
                return response.json();
            })
            .then(result => { 
                alert('Torneo creado correctamente');
                // Aquí puedes redirigir o limpiar el formulario
            })
            .catch(error => { //catch maneja errores en la promesa
                alert('Hubo un error al crear el torneo');
                console.error(error);
            });
        });
    }
});
