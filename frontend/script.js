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