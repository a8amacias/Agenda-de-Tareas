const auth = firebase.auth();

// Verificar si hay sesión activa
auth.onAuthStateChanged((user) => {
  if (!user) {
    // No hay sesión, se manda al login
    window.location.href = "login.html";
  } else {
    // Si hay sesión, carga solo las tareas de este usuario
    cargarTareas(user.uid);
  }
});

// Referencias a los elementos
const tareaInput = document.getElementById("tareaInput");
const agregarBtn = document.getElementById("agregarBtn");
const borrarTodoBtn = document.getElementById("borrarTodoBtn");
const listaTareas = document.getElementById("listaTareas");

//Crear tarea con botón eliminar
function crearTarea(texto, id) {
  const li = document.createElement("li");
  li.textContent = texto;

  const eliminarBtn = document.createElement("button");
  eliminarBtn.textContent = "Eliminar";
  eliminarBtn.classList.add("eliminarBtn");
  eliminarBtn.addEventListener("click", async () => {
    if (id) {
        await db.collection("tareas").doc(id).delete();
    }
  });

  li.appendChild(eliminarBtn);
  listaTareas.appendChild(li);
}

//Agregar tarea (guarda los datos en la nube)
agregarBtn.addEventListener("click", async() => {
  const texto = tareaInput.value.trim();
  if (texto !== "") {
    const user = auth.currentUser;
     await db.collection("tareas").add({
            titulo: texto,
            completada: false,
            creadaEn: firebase.firestore.FieldValue.serverTimestamp(),
       uid: user.uid
    });
  tareaInput.value = "";
  }
});

//Borrar toda la lista (borra todos los documentos)
borrarTodoBtn.addEventListener("click", async() => {
 const snapshot = await db.collection("tareas").get();
    snapshot.forEach(async (doc) => {
        await db.collection("tareas").doc(doc.id).delete();
       });
   });

  // Leer tareas en tiempo real desde Firestore
  function cargarTareas(uid){
    db.collection("tareas")
    .where("uid", "==", uid)
    .orderby("creadaEn", "desc")
    onSnapshot((snapshot) => {      
      listaTareas.innerHTML = "";
      snapshot.forEach((doc) => {
         const tarea = doc.data();
         crearTarea(tarea.titulo, doc.id);
       });
   });
}
document.getElementById("btnSalir").addEventListener("click", () => {
  auth.signOut();
  window.location.href = "login.html";
});
