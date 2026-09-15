// Referencias a los elementos
const tareaInput = document.getElementById("tareaInput");
const agregarBtn = document.getElementById("agregarBtn");
const borrarTodoBtn = document.getElementById("borrarTodoBtn");
const listaTareas = document.getElementById("listaTareas");

//Guardar tareas en localStorage
function guardarTareas() {
  const tareas = [];
  listaTareas.querySelectorAll("li").forEach(li => {
    const texto = li.firstChild.textContent.trim(); // solo el texto de la tarea
    tareas.push(texto);
  });
  localStorage.setItem("misTareas", JSON.stringify(tareas));
}

//Cargar tareas al iniciar
function cargarTareas() {
  const tareasGuardadas = JSON.parse(localStorage.getItem("misTareas")) || [];
  tareasGuardadas.forEach(tarea => {
    crearTarea(tarea);
  });
}

//Crear tarea con botón eliminar
function crearTarea(texto) {
  const li = document.createElement("li");
  li.textContent = texto;

  const eliminarBtn = document.createElement("button");
  eliminarBtn.textContent = "Eliminar";
  eliminarBtn.classList.add("eliminarBtn");
  eliminarBtn.addEventListener("click", () => {
    listaTareas.removeChild(li);
    guardarTareas(); // actualizar almacenamiento
  });

  li.appendChild(eliminarBtn);
  listaTareas.appendChild(li);
}

//Agregar tarea
agregarBtn.addEventListener("click", () => {
  const texto = tareaInput.value.trim();
  if (texto !== "") {
    crearTarea(texto);
    guardarTareas();
    tareaInput.value = "";
  }
});

//Borrar toda la lista
borrarTodoBtn.addEventListener("click", () => {
  listaTareas.innerHTML = "";
  localStorage.removeItem("misTareas"); // limpiar almacenamiento
});

//Al cargar la página
window.onload = cargarTareas;
