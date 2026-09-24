const firebaseConfig = {
  apiKey: "AIzaSyD_ZFW_XtDmRidIt4Q_GEhT2OsMUR_UtSA",
  authDomain: "agenda-de-tareas-f6d01.firebaseapp.com",
  projectId: "agenda-de-tareas-f6d01",
  storageBucket: "agenda-de-tareas-f6d01.firebasestorage.app",
  messagingSenderId: "795424230539",
  appId: "1:795424230539:web:e1ec344db3a9697632d88e"

};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

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
     await db.collection("tareas").add({
            titulo: texto,
            completada: false,
            creadaEn: firebase.firestore.FieldValue.serverTimestamp()
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
db.collection("tareas").onSnapshot((snapshot) => {
    listaTareas.innerHTML = "";
    snapshot.forEach((doc) => {
        const tarea = doc.data();
        crearTarea(tarea.titulo, doc.id);
    });
});
