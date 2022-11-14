'use strict';
import Player from '@vimeo/player';
import throttle from "lodash.throttle";

const iframeEl = document.querySelector('iframe');
const player = new Player(iframeEl);
const TIME = 'currentTime';

const lodashOn = throttle(onPlayerTimeUpdate, 1000, { 'trailing': false });

player.on('timeupdate', lodashOn);
function onPlayerTimeUpdate(e) {
    localStorage.setItem(TIME, e.seconds);
}

const currentTime = Number(localStorage.getItem(TIME));

player.setCurrentTime(currentTime).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});

player.on('ended', onEndedPlayer);

function onEndedPlayer() {
    player.off('timeupdate', lodashOn);
    localStorage.removeItem(TIME);
}

const rusnya = document.querySelectorAll('img[src="/images/custom/enemy.png"]');

window.addEventListener("click", (e) => {
    rusnya.forEach(el => {
        console.log(e.clientX, e.clientY);
        el.style.transition = 'all 2s ease-out';
        el.style.left = `${e.clientX}px`;
        el.style.top = `${e.clientY}px`;
        el.style.transform = '';
    });
});