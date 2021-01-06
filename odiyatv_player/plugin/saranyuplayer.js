function checkMobile() {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) || navigator.userAgent.match(/Mobile Safari/i)) {
        return true
    } else {
        return false
    }
}

function SupportedMSE() {
    window.MediaSource = window.MediaSource || window.WebKitMediaSource;
    return (window.MediaSource && typeof window.MediaSource.isTypeSupported === "function" && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'))
}

function checkHLS() {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        return true
    }
    try {
        var a = document.createElement("video");
        isSupp = a.canPlayType("application/vnd.apple.mpegURL");
        if ((isSupp == (("probably")) || (isSupp == ("maybe")))) {
            sarannyuhasFlash = false;
            try {
                sarannyuhasFlash = Boolean(new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))
            } catch (b) {
                sarannyuhasFlash = ("undefined" != typeof navigator.mimeTypes["application/x-shockwave-flash"])
            }
            if (!sarannyuhasFlash) {
                return true
            }
            return false
        }
        return false
    } catch (c) {
        return false
    }
}

function saranyuplayer(c, b, d) {
    var e = false;
    a(d);

    function a(f) {
        if (f.advertising) {
            f.advertising.forEach(function (g) {
                console.log(g.client);
                if ((g.client == "googleima") || (g.client == "openx")) {
                    e = true;
                    return
                }
            })
        }
    }
    saranyuplayertwo(c, b, d)
}
var html5js;

function saranyuplayertwo(m, a, c) {
    container1 = a;
    object1 = c;
    var l;
    var g;
    currentURLType = m;
    g = ["../external/saranyu.jquery.hammer.js", "../external/boostrap/bootstrap.min.js", "../external/saranyu.owl.carousel.js", "../external/hls.min.js"];
    if (checkMobile()) {
        l = ["../skins/spmobile.css", "../external/saranyu.owl.carousel.css"]
    } else {
        l = ["../skins/sphls.css", "../external/saranyu.owl.carousel.css"]
    }
    html5js = "../plugin/sphls.js";
    var e = true;
    var b = document.createElement("script");
    b.type = "text/javascript";
    b.src = g[0];
    document.body.appendChild(b);
    var k = document.createElement("script");
    k.type = "text/javascript";
    k.src = g[1];
    var j = document.createElement("script");
    j.type = "text/javascript";
    j.src = g[2];
    var h = document.createElement("script");
    h.type = "text/javascript";
    h.src = g[3];
    b.addEventListener("load", function () {
        jss = true;
        document.body.appendChild(k)
    });
    k.addEventListener("load", function () {
        if (jss) {
            document.body.appendChild(j)
        }
    });
    j.addEventListener("load", function () {
        document.body.appendChild(h)
    });
    h.addEventListener("load", function () {
        checkLicence(container1, object1)
    });
    for (var d = 0; d < l.length; d++) {
        var f = document.createElement("link");
        f.type = "text/css";
        f.href = l[d];
        f.rel = "stylesheet";
        document.body.appendChild(f)
    }
}

function checkBandwidth() {
    var a = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var a = window.navigator.connection;
    if (!a) {
        var b = a.type;
        var c = a.downlinkMax || a.bandwidth
    }
}

function checkMediaType(a) {
    if (a.file[0].content_url == "") {
        currentURLType = "hls";
        return "hls"
    }
    if (a.file[0].content_url.indexOf("m3u8") != -1) {
        currentURLType = "hls";
        return "hls"
    } else {
        currentURLType = "mp4";
        return "mp4"
    }
}

function checkMediaURL(a) {
    if (a.content_url == "") {
        return "hls"
    }
    if (a.content_url.indexOf("m3u8") != -1) {
        return "hls"
    } else {
        return "mp4"
    }
}


function checkLicence(a, b) {
    generatePlayer(a, b)
}

function generatePlayer(e, n) {
    var a = document.createElement("script");
    a.type = "text/javascript",
        a.src = html5js,
        document.body.appendChild(a),
        a.addEventListener("load", function () {
            hlsPlayer = checkMobile() && "mpd" == checkMediaType(n) ? new SaranyuHlsHTML5Player.MediaPlayer(e, n, "mpd") : checkMobile() && "hls" == checkMediaType(n) && SupportedMSE() ? new SaranyuHlsHTML5Player.MediaPlayer(e, n, "hls") : "mpd" == checkMediaType(n) ? new SaranyuHlsHTML5Player.MediaPlayer(e, n, "mpd") : checkMobile() || "mp4" == checkMediaType(n) ? new SaranyuHlsHTML5Player.MediaPlayer(e, n, "mp4") : new SaranyuHlsHTML5Player.MediaPlayer(e, n, "hls");

            try {
                createEventCallBacks();
            } catch (e) {}

        })
}

var html5js, hlsPlayer, htmlPlayer;