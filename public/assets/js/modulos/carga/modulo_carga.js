document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content-to-show');
    const duration = 10000; // 10 segundos en milisegundos

    // Inicialmente, oculta el contenido principal
    content.classList.add('hidden');

    setTimeout(() => {
        // Al finalizar el tiempo, oculta la pantalla de carga
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';

        // Muestra el contenido principal de la página con un retraso para la transición
        setTimeout(() => {
            content.classList.remove('hidden');
            content.classList.add('visible');
            document.body.style.overflow = 'auto'; // Habilita el scroll de la página
        }, 1000); // Espera 1 segundo para que la transición de fade-out de la pantalla de carga termine
    }, duration);
});