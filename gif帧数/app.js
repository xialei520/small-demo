var getPixels = require("get-pixels")

getPixels("123.gif", function (err, pixels) {
    if (err) {
        console.log("Bad image path")
        return
    }
    console.log("got pixels", pixels.shape.slice())
})