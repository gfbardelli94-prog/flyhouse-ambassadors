const ambassadors = {
  jozef: { name: "Jozef Jauregui", code: "FLY-JOZEF-001", commission: "10%" },
  azure: { name: "Jozef Jauregui", code: "FLY-JOZEF-001", commission: "10%" }
};

const params = new URLSearchParams(window.location.search);
const key = (params.get("ref") || "jozef").trim().toLowerCase();
const ambassador = ambassadors[key] || { name: "FLYHOUSE", code: "FLY-DIRECTO", commission: "0%" };

document.getElementById("ambassadorName").textContent = ambassador.name;

const phone = "51994335396";
document.querySelectorAll(".whatsapp-link").forEach((link) => {
  const property = link.dataset.property;
  const message =
    `Hola FLYHOUSE 👋\n\n` +
    `Quiero consultar disponibilidad para ${property}.\n\n` +
    `Fui recomendado por: ${ambassador.name}\n` +
    `Código de referido: ${ambassador.code}`;
  link.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  link.target = "_blank";
  link.rel = "noopener";
});

const dialog = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
document.querySelectorAll(".gallery-item").forEach((button) => {
  button.addEventListener("click", () => {
    lightboxImage.src = button.dataset.full;
    dialog.showModal();
  });
});
document.getElementById("closeLightbox").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
