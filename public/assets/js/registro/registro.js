// Maneja el envío del formulario de registro
const form = document.getElementById('registro-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Detiene el envío por defecto del formulario

        const nombre = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const contrasena = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre,
                    email,
                    contrasena,
                })
            });

            const result = await response.json();

            if (response.ok) {
                // Si la respuesta es exitosa (código 201), muestra un mensaje
                alert('¡Registro exitoso! Ya puedes iniciar sesión.');
                // Opcionalmente, redirige al usuario a otra página
                window.location.href = 'home.html';
            } else {
                // Si hay un error, muestra el mensaje de error del servidor
                alert('Error en el registro: ' + result.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al intentar registrarse.');
        }
    });
