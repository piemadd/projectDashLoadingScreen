var count = 0;
var thisCount = 0;
var volume = 0.1;
var player = document.getElementById("music");

player.volume = volume;


const handlers = {
    startInitFunctionOrder(data) {
        count = data.count;
    },

    initFunctionInvoking(data) {
        document.querySelector('.progress').style.left = '0%';
        document.querySelector('.progress').style.width = ((data.idx / count) * 100) + '%';
    },

    startDataFileEntries(data) {
        count = data.count;
    },

    performMapLoadFunction(data) {
        ++thisCount;
        document.querySelector('.progress').style.left = '0%';
        document.querySelector('.progress').style.width = ((thisCount / count) * 100) + '%';
    },
};

window.addEventListener('message', function (e) {
    (handlers[e.data.eventName] || function () { })(e.data);
});

document.onkeyup = function(e) {
    if(e.keyCode === 32) {
        if(player.paused) {
            player.play();
        } else {
            player.pause();
        }
    } else if(e.keyCode === 38) {
        if(volume >= 1.0) { return }
        volume += 0.1;
        player.volume = volume;
    } else if(e.keyCode === 40) {
        if(volume <= 0.1) { return }
        volume -= 0.1;
        player.volume = volume;
    }
}