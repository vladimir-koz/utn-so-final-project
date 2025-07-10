document.getElementById("loadButton").addEventListener("click", async () => {
  const response = await fetch("/api/students");
  const students = await response.json();
  const tbody = document.querySelector("#studentsTable tbody");
  tbody.innerHTML = "";
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${student.id}</td><td>${student.name}</td>`;
    tbody.appendChild(row);
  });
});
/* Tarea 02 Escucha el evento clic del botón de saludo*/
  
document.getElementById("greetButton").addEventListener("click", async () => {
  /*Toma el valor del input, consulta al backend y muestra el mensaje*/
  const name = document.getElementById("nameInput").value || "Mundo";

  try {
    const response = await fetch(`/greet?name=${encodeURIComponent(name)}`);
    if (!response.ok) throw new Error("Error en la respuesta");

    const data = await response.json();
    document.getElementById("greetMessage").textContent = data.message;
  } catch (error) {
    document.getElementById("greetMessage").textContent = "Error al obtener el saludo";
    console.error(error);
  }
});
//Tarea 04 Evento para agregar un nuevo estudiante
document.getElementById("botonAgregarEstudiante").addEventListener("click", async () => {
  // Tomo el valor del input y me aseguro que no esté vacío
  const nombre = document.getElementById("nombreEstudiante").value.trim();
  const mensaje = document.getElementById("mensajeAgregarEstudiante");

  if (!nombre) {
    mensaje.textContent = "Por favor escribí un nombre.";
    return;
  }

  try {
  // Envío una solicitud POST al backend con el nombre en formato JSON
    const respuesta = await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: nombre }),
    });

    if (!respuesta.ok) throw new Error("Error al agregar");

    const estudiante = await respuesta.json();
     // Muestro un mensaje con el estudiante agregado
    mensaje.textContent = `Estudiante agregado: ${estudiante.name} (ID: ${estudiante.id})`;

    // Actualizo la tabla automáticamente para que aparezca el nuevo
    document.getElementById("loadButton").click();
  } catch (error) {
    console.error(error);
    mensaje.textContent = "Error al agregar estudiante.";
  }
});