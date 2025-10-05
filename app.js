if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

if ("Notification" in window) {
  Notification.requestPermission();
}

const form = document.getElementById("eventoForm");
const listaEventos = document.getElementById("listaEventos");

let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

function mostrarEventos() {
  listaEventos.innerHTML = "";
  eventos.forEach((e, i) => {
    let li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.textContent = `${e.fecha} - ${e.materia}: ${e.descripcion}`;
    listaEventos.appendChild(li);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const materia = document.getElementById("materia").value;
  const descripcion = document.getElementById("descripcion").value;
  const fecha = document.getElementById("fecha").value;

  const nuevoEvento = { materia, descripcion, fecha };
  eventos.push(nuevoEvento);
  localStorage.setItem("eventos", JSON.stringify(eventos));
  mostrarEventos();

  if (Notification.permission === "granted") {
    new Notification("📌 Nuevo evento agregado", {
      body: `${materia}: ${descripcion} (${fecha})`,
      icon: "icons/icon-192.png"
    });
  }

  form.reset();
});

mostrarEventos();
