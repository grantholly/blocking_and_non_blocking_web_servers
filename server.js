const express = require("express");
const app = express();

function randInt(max) {
    return Math.floor(Math.random() * max);
}

function lazy(seconds) {
    return setTimeout(function () {
        console.log(`I waited for ${seconds}`);
    }, seconds * 1000);
};

app.get("/json", function(req, res) {
    let number = randInt(10);
    lazy(number)
    res.json({
        "number": number,
    });
});

app.listen(3000, function() {
    console.log("web server listening on port 3000");
})
