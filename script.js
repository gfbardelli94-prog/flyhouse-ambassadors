const params = new URLSearchParams(window.location.search);
const rawRef = (params.get("ref") || "azure").trim();
const ambassador = rawRef
  .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ_-]/g, "")
  .slice(0, 30)
  .toUpperCase() || "AZURE";

document.getElementById("ambassadorName").textContent = ambassador;

const phone = "51994335396";

document.querySelectorAll(".whatsapp-link").forEach((link) => {
  const property = link.dataset.property;
  const message =
    `Hola FLYHOUSE 👋\n\n` +
    `Quiero información sobre ${property}.\n\n` +
    `Código de referido: FLY-${ambassador}`;
  link.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  link.target = "_blank";
  link.rel = "noopener";
});
