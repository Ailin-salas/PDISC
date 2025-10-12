// Mostrar tabla de administración al comenzar torneo
    document.addEventListener('DOMContentLoaded', function() {
        const btnComenzar = document.getElementById('comenzarTorneo');
        const infoTorneo = document.getElementById('torneo-info');
        const adminPart = document.getElementById('admin-participantes');
        const nombreTorneoInput = document.getElementById('nombreTorneo');
        const nombreTorneoSpan = document.getElementById('nombreTorneoSpan');
        if(btnComenzar) {
            btnComenzar.addEventListener('click', function() {
                infoTorneo.style.display = 'none';
                adminPart.style.display = 'block';
                // Actualiza el nombre del torneo en la tabla de administración
                if(nombreTorneoSpan && nombreTorneoInput) {
                    nombreTorneoSpan.textContent = nombreTorneoInput.value;
                }
            });
        }
        // Guardar cambios 
        const btnGuardar = document.getElementById('guardarTorneo');
        if(btnGuardar) {
            btnGuardar.addEventListener('click', function() {
                alert('Cambios guardados');
            });
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formTorneo'); // Usa el id de tu formulario

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Recolecta los datos del formulario
        const datos = {
            nombre: form.elements['nombre'].value,
            fechaInicio: form.elements['fechaInicio'].value,
            descripcion: form.elements['descripcion'].value
        };

        enviarDatosTorneo(datos);
    });
});

// Función flecha para enviar datos JSON por POST
const enviarDatosTorneo = (datos) => {
    fetch('/api/torneo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => {
        if (!response.ok) throw new Error('Error en la petición');
        return response.json();
    })
    .then(data => {
        alert('Torneo enviado correctamente');
    })
    .catch(error => {
        alert('Hubo un error al enviar el torneo');
        console.error(error);
    });
};       
 
