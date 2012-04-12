jcron = function (fn,seconds) {
    var scope = {
        stop: function () {    clearTimeout(this.timer); },
        timer: setInterval(function () { fn(scope);    } , seconds)
    };
};