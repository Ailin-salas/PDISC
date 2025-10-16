// Maneja el envío del formulario de creación de torneo
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const uploadText = document.getElementById('uploadText');

    form.addEventListener('submit', (event) => {
        // Evita que el formulario se envíe de forma predeterminada
        event.preventDefault(); 

        // Puedes agregar lógica de validación aquí
        const nombreTorneo = document.getElementById('nombreTorneo').value;
        const juego = document.getElementById('juego').value;

        if (nombreTorneo.trim() === '' || juego.trim() === '') {
            alert('Por favor, completa los campos obligatorios (Nombre del torneo y Juego).');
            return;
        }

        // Si la validación es exitosa, podrías enviar los datos al servidor.
        console.log('Formulario enviado con éxito.');
        
        // Obtener el archivo de imagen si existe
        const uploadedFile = imageUpload.files[0];
        if (uploadedFile) {
            console.log('Imagen subida:', uploadedFile.name);
            // Aquí enviarías el archivo al servidor junto con los demás datos
            // Usar FormData para manejar archivos
            const formData = new FormData(form);
            formData.append('tournamentImage', uploadedFile); // 'tournamentImage' sería el nombre del campo en el backend

            // Ejemplo de envío con Fetch API:
            // fetch('/api/crear-torneo', {
            //     method: 'POST',
            //     body: formData
            // }).then(response => response.json())
            //   .then(data => console.log(data))
            //   .catch(error => console.error('Error:', error));
        } else {
            console.log('No se subió ninguna imagen.');
        }
    });

    // Lógica para previsualizar la imagen
    imageUpload.addEventListener('change', function() {
        const file = this.files[0]; // Obtiene el primer archivo seleccionado

        if (file) {
            const reader = new FileReader(); // Crea un nuevo lector de archivos

            reader.onload = function(e) {
                imagePreview.src = e.target.result; // Establece la fuente de la imagen
                imagePreview.style.display = 'block'; // Muestra la imagen
                uploadText.style.display = 'none'; // Oculta el texto "Sube Archivo"
            };

            reader.readAsDataURL(file); // Lee el contenido del archivo como una URL de datos
        } else {
            imagePreview.src = '#'; // Limpia la fuente de la imagen
            imagePreview.style.display = 'none'; // Oculta la imagen
            uploadText.style.display = 'block'; // Muestra el texto "Sube Archivo"
        }
    });
});