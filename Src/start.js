import './assets/scss/fonts.scss';
import './assets/fonticon/css/all.css';
import './assets/scss/app.scss';
import './assets/scss/core.scss';

window.addEventListener("dragover", function (e) {
    e = e || event;
    e.preventDefault();
    e.stopPropagation();
}, false);
window.addEventListener("drop", function (e) {
    e = e || event;
    e.preventDefault();
    e.stopPropagation();
}, false);