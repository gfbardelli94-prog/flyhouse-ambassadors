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

const gallery = [
  ["assets/naplo/naplo-01.webp", "Piscina y zona exterior"],
  ["assets/naplo/naplo-02.webp", "Sala principal"],
  ["assets/naplo/naplo-03.webp", "Dormitorios"],
  ["assets/naplo/naplo-04.webp", "Zona BBQ"],
  ["assets/naplo/naplo-05.webp", "Terraza y jardines"],
  ["assets/naplo/naplo-06.webp", "Ambientes interiores"],
  ["assets/naplo/naplo-07.webp", "Espacios para compartir"],
  ["assets/naplo/naplo-08.webp", "Piscina privada"],
  ["assets/naplo/naplo-09.webp", "Habitación"],
  ["assets/naplo/naplo-10.webp", "Zona social"],
  ["assets/naplo/naplo-11.webp", "Detalles de la propiedad"],
  ["assets/naplo/naplo-12.webp", "Espacio de descanso"],
  ["assets/naplo/naplo-13.webp", "Las Terrazas · Naplo"]
];

const dialog = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const counter = document.getElementById("lightboxCounter");
const caption = document.getElementById("lightboxCaption");
let currentIndex = 0;

function showImage(index) {
  currentIndex = (index + gallery.length) % gallery.length;
  lightboxImage.src = gallery[currentIndex][0];
  caption.textContent = gallery[currentIndex][1];
  counter.textContent = `${currentIndex + 1} / ${gallery.length}`;
}

function openGallery(index = 0) {
  showImage(index);
  dialog.showModal();
}

document.querySelectorAll(".gallery-tile").forEach((button) => {
  button.addEventListener("click", () => openGallery(Number(button.dataset.index)));
});
document.getElementById("openGallery").addEventListener("click", () => openGallery(0));
document.getElementById("closeLightbox").addEventListener("click", () => dialog.close());
document.getElementById("prevImage").addEventListener("click", () => showImage(currentIndex - 1));
document.getElementById("nextImage").addEventListener("click", () => showImage(currentIndex + 1));
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
document.addEventListener("keydown", (event) => {
  if (!dialog.open) return;
  if (event.key === "ArrowLeft") showImage(currentIndex - 1);
  if (event.key === "ArrowRight") showImage(currentIndex + 1);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
