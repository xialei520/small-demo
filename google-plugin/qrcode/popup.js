var qrcode = new QRCode("qrcode", {
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
});

function makeCode() {
    if (!window.location.href) {
        return;
    }
    document.getElementById('txt').value = window.location.href;
    qrcode.makeCode(window.location.href);
}
window.onload = function () {
    console.log('99', window.location.href)

    makeCode()
}
window.onhashchange = function (e) {
    console.log(e, 999999)
}

