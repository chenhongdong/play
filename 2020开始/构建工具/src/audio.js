const MP3_URL = 'https://music.163.com/song/media/outer/url?id=1382794914.mp3';

function getSong(id) {
    return MP3_URL;
}

function addAudio(song) {
    return `<audio src=${song}></audio>`
}



export default {
    getSong,
    addAudio
};