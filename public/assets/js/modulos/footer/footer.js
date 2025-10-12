export async function pie_pagina(){
    const res = await fetch('/Public/assets/js/modulos/footer/JSON_footer/footer.json'); // Ruta al archivo JSON
    const links = await res.json(); // Obtener los enlaces del menú desde el archivo JSON, await es para esperar la respuesta de la promesa

    const footer = document.querySelector("footer");
      footer.classList.add("d-flex","justify-content-around","align-items-center","flex-wrap","p-3");
  
    for(let i=0; i < links.enlace.length; i++){
     const a = document.createElement("a");
        a.textContent = links.enlace[i].nombre;
        a.href = links.enlace[i].url ; // Asignar la URL del enlace
        a.classList.add("items"); // Clase CSS para los ítems 
     footer.append(a);
    }
    
    const span = document.createElement("span");
     span.classList.add("logo");
     span.textContent = "© MAPTV";
    footer.append(span);
}
