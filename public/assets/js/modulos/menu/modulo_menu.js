export async function MenuDespegable() {
  // Cargar fuente desde Google Fonts
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Amarante&family=Staatliches&display=swap';
  document.head.appendChild(link);

  try {
    const res = await fetch('/assets/js/modulos/menu/JSON_menu/menu.json');
    const links = await res.json();

    const header = document.querySelector("header");
    header.classList.add("d-flex", "justify-content-between", "align-items-center");

    const token = localStorage.getItem("token");
    const logueado = token !== null;

    // Contenedor del botón de menú
    const div1 = document.createElement("div");
    div1.classList.add("menu-despegable");
    header.append(div1);

    // Botón de menú
    const buttonmenu = document.createElement("button");
    buttonmenu.classList.add("button-menu");
    buttonmenu.textContent = "☰";
    div1.append(buttonmenu);

    // Logo MAPTV
    const span = document.createElement("span");
    span.className = "text-center";
    span.textContent = "MAPTV";
    span.style.fontFamily = "amarante";
    span.style.fontWeight = 400;
    span.style.fontSize = "24px";
    span.style.color = "#ffff";
    header.append(span);

    // Menú desplegable
    const nav = document.createElement("nav");
    nav.classList.add("menu-ul");
    nav.style.display = "none";

    for (let i = 0; i < links.menu.length; i++) {
      const li = document.createElement("li");
      const a = document.createElement("a");

      a.textContent = links.menu[i].nombre;
      a.href = links.menu[i].enlace;
      a.classList.add("menu-item");
      li.classList.add("li-menu");
      li.append(a);
      nav.append(li);
    }

    buttonmenu.append(nav);

    // Función para abrir/cerrar menú
    function toggleMenu() {
      buttonmenu.classList.toggle("open");
      if (nav.style.display === "none") {
        nav.style.display = "flex";

        // Si es invitado, mostrar alerta
        if (!logueado) {
          alert("Debes estar registrado para acceder al contenido completo.");
        }
      } else {
        nav.style.display = "none";
      }
    }

    buttonmenu.addEventListener("click", toggleMenu);

    // Mostrar botón según estado
    if (!logueado) {
      const btnRegistro = document.createElement("button");
      btnRegistro.classList.add("btn-registro");
      btnRegistro.textContent = "Registro";
      btnRegistro.onclick = () => {
        window.location.href = "/pages/usuarios/sesion/Registro.html";
      };
      header.append(btnRegistro);
    } else {
      const btnLupa = document.createElement("button");
      btnLupa.classList.add("btn", "btn-outline-light");
      btnLupa.innerHTML = "🔍";
      btnLupa.title = "Buscar contenido";
      btnLupa.onclick = () => {
        alert("Función de búsqueda activa (conectada al backend)");
      };
      header.append(btnLupa);
    }

  } catch (error) {
    console.error("Error al cargar el menú:", error);
  }
}