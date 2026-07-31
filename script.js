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

const galleries = {
naplo: [
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
],
gema: [
  ["assets/gema/gema-01.webp", "Piscina, jardín y bar exterior"],
  ["assets/gema/gema-02.webp", "Vista panorámica del área exterior"],
  ["assets/gema/gema-03.webp", "Piscina iluminada con identidad GEMA"],
  ["assets/gema/gema-04.webp", "Caídas de agua y acabados premium"],
  ["assets/gema/gema-05.webp", "Terraza integrada al salón principal"],
  ["assets/gema/gema-06.webp", "Salón principal para eventos"],
  ["assets/gema/gema-07.webp", "Escalera y ambientes interiores"],
  ["assets/gema/gema-08.webp", "Acceso exterior GEMA"],
  ["assets/gema/gema-09.webp", "Ingreso y recepción"],
  ["assets/gema/gema-10.webp", "Oficina y atención personalizada"]
]};

const dialog = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const counter = document.getElementById("lightboxCounter");
const caption = document.getElementById("lightboxCaption");
let currentIndex = 0;
let currentGallery = "naplo";

function showImage(index) {
  const gallery = galleries[currentGallery];
  currentIndex = (index + gallery.length) % gallery.length;
  lightboxImage.src = gallery[currentIndex][0];
  caption.textContent = gallery[currentIndex][1];
  counter.textContent = `${currentIndex + 1} / ${gallery.length}`;
}

function openGallery(index = 0, galleryName = "naplo") {
  currentGallery = galleryName;
  showImage(index);
  dialog.showModal();
}

document.querySelectorAll(".gallery-tile").forEach((button) => {
  button.addEventListener("click", () => openGallery(Number(button.dataset.index), button.dataset.gallery || "naplo"));
});
document.getElementById("openGallery").addEventListener("click", () => openGallery(0, "naplo"));
document.querySelectorAll(".open-property-gallery").forEach((button) => {
  button.addEventListener("click", () => openGallery(0, button.dataset.gallery));
});
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
