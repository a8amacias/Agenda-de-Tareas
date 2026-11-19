// Referencias a los elementos
const tareaInput = document.getElementById("tareaInput");
const agregarBtn = document.getElementById("agregarBtn");
const borrarTodoBtn = document.getElementById("borrarTodoBtn");
const listaTareas = document.getElementById("listaTareas");
const btnSalir = document.getElementById("btnSalir");

console.log("script.js cargado");

// Verificar si hay sesión activa
auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    cargarTareas(user.uid);
  }
});

// Crear tarea con botón eliminar
function crearTarea(texto, id) {
  const li = document.createElement("li");
  li.textContent = texto;

  const eliminarBtn = document.createElement("button");
  eliminarBtn.textContent = "Eliminar";
  eliminarBtn.classList.add("eliminarBtn");
  eliminarBtn.addEventListener("click", async () => {
    try {
      await db.collection("tareas").doc(id).delete();
    } catch (error) {
      alert("Error al eliminar: " + error.message);
    }
  });

  li.appendChild(eliminarBtn);
  listaTareas.appendChild(li);
}

// Agregar tarea
agregarBtn.addEventListener("click", async () => {
  const texto = tareaInput.value.trim();
  const user = auth.currentUser;

  if (!user) {
    alert("No hay sesión activa.");
    return;
  }
  if (texto === "") return;

  try {
    await db.collection("tareas").add({
      titulo: texto,
      completada: false,
      creadaEn: firebase.firestore.FieldValue.serverTimestamp(),
      uid: user.uid
    });
    tareaInput.value = "";
  } catch (error) {
    alert("Error al agregar: " + error.message);
  }
});

// Borrar toda la lista (solo las del usuario)
borrarTodoBtn.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const snapshot = await db.collection("tareas").where("uid", "==", user.uid).get();
    await Promise.all(snapshot.docs.map((doc) => doc.ref.delete()));
  } catch (error) {
    alert("Error al borrar: " + error.message);
  }
});

// Leer tareas en tiempo real
function cargarTareas(uid) {
  db.collection("tareas")
    .where("uid", "==", uid)
    .onSnapshot(
      (snapshot) => {
        const tareas = [];
        snapshot.forEach((doc) => {
          tareas.push({ id: doc.id, ...doc.data() });
        });

        tareas.sort((a, b) => {
          const fa = a.creadaEn ? a.creadaEn.seconds : 0;
          const fb = b.creadaEn ? b.creadaEn.seconds : 0;
          return fb - fa;
        });

        listaTareas.innerHTML = "";
        tareas.forEach((t) => crearTarea(t.titulo, t.id));
      },
      (error) => {
        console.error("Error al cargar tareas:", error);
        alert("Error al cargar tareas: " + error.message);
      }
    );
}

// Cerrar sesión
btnSalir.addEventListener("click", async () => {
  try {
    await auth.signOut();
    window.location.href = "login.html";
  } catch (error) {
    alert("Error al cerrar sesión: " + error.message);
  }
});

console.log("script.js terminó de cargar");
