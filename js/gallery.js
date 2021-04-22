import itemsArr from "./data/gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  overlay: document.querySelector(".lightbox__overlay"),
  image: document.querySelector(".lightbox__image"),
  btnClose: document.querySelector('button[data-action="close-lightbox"]'),
  btnPrev: document.querySelector('button[data-action="previous"]'),
  btnNext: document.querySelector('button[data-action="next"]'),
};

const galleryItems = createGalleryMarkup(itemsArr);
refs.gallery.insertAdjacentHTML("beforeend", galleryItems);

refs.gallery.addEventListener("click", onGalleryImageClick);
refs.btnClose.addEventListener("click", onBtnCloseClick);
refs.overlay.addEventListener("click", onLightboxOverlayClick);
refs.btnPrev.addEventListener("click", onBtnPrevClick);
refs.btnNext.addEventListener("click", onBtnNextClick);

if ("loading" in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach((img) => {
    img.src = img.dataset.src;
  });
} else {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  script.integrity =
    "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
  script.crossorigin = "anonymous";
  document.body.appendChild(script);
}

function createGalleryMarkup(items) {
  return items
    .map(
      ({ preview, original, description }) =>
        `
      <li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            loading = "lazy"
            class="gallery__image lazyload"
            data-src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
      `
    )
    .join("");
}

function onGalleryImageClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  refs.lightbox.classList.add("is-open");
  refs.image.src = event.target.dataset.source;
  window.addEventListener("keydown", onKeyPress);
}

function onBtnCloseClick() {
  refs.lightbox.classList.remove("is-open");
  refs.image.src = "";
  window.removeEventListener("keydown", onKeyPress);
}

function onLightboxOverlayClick(event) {
  if (event.currentTarget === event.target) {
    onBtnCloseClick();
  }
}

function onKeyPress(event) {
  if (event.code === "Escape") {
    onBtnCloseClick();
  }
  if (event.code === "ArrowRight") {
    onBtnNextClick();
  }
  if (event.code === "ArrowLeft") {
    onBtnPrevClick();
  }
}

function onBtnPrevClick() {
  const galleryImages = document.querySelectorAll(".gallery__image");
  for (let i = 0; i < galleryImages.length; i++) {
    const galleryImage = galleryImages[i];
    const firstGalleryImage = galleryImages[0];
    const lastGalleryImage = galleryImages[galleryImages.length - 1];
    const preGalleryImage = galleryImages[i - 1];

    if (
      refs.image.src === galleryImage.dataset.source &&
      refs.image.src !== firstGalleryImage.dataset.source
    ) {
      return (refs.image.src = preGalleryImage.dataset.source);
    } else if (refs.image.src === firstGalleryImage.dataset.source) {
      return (refs.image.src = lastGalleryImage.dataset.source);
    }
  }
}

function onBtnNextClick() {
  const galleryImages = document.querySelectorAll(".gallery__image");
  for (let i = 0; i < galleryImages.length; i++) {
    const galleryImage = galleryImages[i];
    const firstGalleryImage = galleryImages[0];
    const lastGalleryImage = galleryImages[galleryImages.length - 1];
    const nextGalleryImage = galleryImages[i + 1];

    if (refs.image.src === galleryImage.dataset.source) {
      return (refs.image.src = nextGalleryImage.dataset.source);
    } else if (refs.image.src === lastGalleryImage.dataset.source) {
      return (refs.image.src = firstGalleryImage.dataset.source);
    }
  }
}

window.addEventListener("beforeunload", (evt) => {
  evt.preventDefault();
  evt.returnValue = " ";
});
