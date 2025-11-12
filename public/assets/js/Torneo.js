document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form.form-container');
  const imageUpload = document.getElementById('imageUpload');
  const imagePreview = document.getElementById('imagePreview');
  const uploadText = document.getElementById('uploadText');
  const crearBtn = document.querySelector('button.btn-success');

  // Previsualización de imagen
  imageUpload.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
        uploadText.style.display = 'none';
      };
      reader.readAsDataURL(file);
    } else {
      imagePreview.src = '#';
      imagePreview.style.display = 'none';
      uploadText.style.display = 'block';
    }
  });

  // Envío de datos
  if (crearBtn) {
    crearBtn.addEventListener('click', async (event) => {
      event.preventDefault();

      const data = {
        nombre: document.getElementById('nombreTorneo').value,
        fecha_inicio: document.getElementById('fechaInicio').value,
        reglas: document.getElementById('reglas').value,
        premios: document.getElementById('premios').value,
        tipo_torneo: document.getElementById('juego').value,
        creadorId: 1 // ⚠️ reemplazar con el ID real del usuario autenticado
      };

      try {
        const res = await fetch('/api/torneo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer TU_TOKEN' // si usas verifyToken
          },
          body: JSON.stringify(data)
        });

        if (!res.ok) throw new Error('Error en la petición');
        const result = await res.json();
        alert('Torneo creado correctamente');
        console.log(result);
      } catch (error) {
        alert('Hubo un error al crear el torneo');
        console.error(error);
      }
    });
  }
});
