// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const listOgPhoto = document.querySelector('.gallery');

const photo = galleryItems.map(el => {
    return `
            <a class="gallery__item" href="${el.original}">
                <img class="gallery__image" src="${el.preview}" alt="${el.description}" />
            </a>
           `;
}).join('');

listOgPhoto.innerHTML = photo;

const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250
    });
