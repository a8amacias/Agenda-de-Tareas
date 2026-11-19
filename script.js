document.getElementById("loginBtn").addEventListener("click", async () => {
  const correo = document.getElementById("correoInput").value;
  const pass = document.getElementById("passInput").value;

  if (!correo || !pass) {
    alert("Escribe tu correo y contraseña");
    return;
  }

  try {
    await auth.signInWithEmailAndPassword(correo, pass);
    window.location.href = "index.html";
  } catch (error) {
    alert("Error al iniciar sesión: " + error.message);
  }
});

document.getElementById("registroLink").addEventListener("click", async (e) => {
  e.preventDefault();
  const correo = document.getElementById("correoInput").value;
  const pass = document.getElementById("passInput").value;

  if (!correo || !pass) {
    alert("Escribe tu correo y contraseña");
    return;
  }

  try {
    await auth.createUserWithEmailAndPassword(correo, pass);
    window.location.href = "index.html";
  } catch (error) {
    alert("Error al registrarte: " + error.message);
  }
});
