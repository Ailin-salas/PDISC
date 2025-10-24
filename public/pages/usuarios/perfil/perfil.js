document.addEventListener('DOMContentLoaded', () => {
    const gifBox = document.getElementById('gif-sequence-box');
    const gifFiles = [
        'gif/gif2.gif', // Asegúrate de que esta ruta sea correcta
        'gif/gif3.gif',
        'gif/gif4.gif'
        // Agrega aquí todas las rutas a tus archivos GIF
        // Puedes tener tantas imágenes como quieras
    ];
    let currentIndex = 0;

    function changeGif() {
        gifBox.style.backgroundImage = `url('${gifFiles[currentIndex]}')`;
        currentIndex = (currentIndex + 1) % gifFiles.length; // Avanza al siguiente GIF, vuelve al inicio si llega al final
    }

    // Cambia el GIF cada 2 segundos (2000 milisegundos)
    // Ajusta este valor para controlar la velocidad de la secuencia
    setInterval(changeGif, 2000);

    // Muestra el primer GIF inmediatamente al cargar
    changeGif();
});