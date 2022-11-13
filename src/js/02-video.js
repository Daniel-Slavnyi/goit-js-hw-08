import Player from '@vimeo/player';
import lodash from "lodash.throttle";

const iframeEl = document.querySelector('iframe');
const player = new Player(iframeEl);
const TIME = 'currentTime';

const lodashOn = lodash(onPlayerTimeUpdate, 1000);

player.on('timeupdate', lodashOn);
function onPlayerTimeUpdate(e) {
    localStorage.setItem(TIME, e.seconds);
}

const currentTime = Number(localStorage.getItem(TIME));
console.log(currentTime);

player.setCurrentTime(currentTime).then(function() {
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
