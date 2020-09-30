const http = require("http")
const fetch = require("node-fetch")
const blockingserver = "http://127.0.0.1:9090/"
const nonblockingserver = "http://127.0.0.1:3000/json"

function asyncGet() {
    return new Promise(function(resolve, reject) {
        var req = http.get(nonblockingserver, function(res) {
            if (res.statusCode != 200) {
                reject(new Error(`didn't work, got ${res.statusCode}`))
            }
            var body = []
            res.on("data", function(chunk) {
                body.push(chunk)
            })
            res.on("end", function() {
                resolve(body.join(""))
            })
        })
        req.on("error", function(err) {
            reject(err)
        })
    })
}

function asyncGetJson() {
    return new Promise(function(resolve, reject) {
        var req = http.get(nonblockingserver, function(res) {
            if (res.statusCode != 200) {
                reject(new Error(`didn't work, got ${res.statusCode}`))
            }
            var body = []
            res.on("data", function(chunk) {
                body.push(chunk)
            })
            res.on("end", function() {
                return new Promise(function (resolve, reject) {
                    resolve(JSON.parse(body.join("")))
                })
            })
        })
        req.on("error", function(err) {
            reject(err)
        })
    })
}

fetch(nonblockingserver)
    .then(function(res) {
        return res.json()
    })
    .then(function(data) {
        console.log(`${data.nap} times 2 is ${data.nap + data.nap}`)
    })
    .catch(function(err) {
        console.error(err)
    })

console.log("main thread starting HTTP calls")
for (let i = 0; i < 3; i++) {
    console.log("running HTTP get")
    asyncGet()
        .then(function(response) {
            console.log(JSON.parse(response))
        })
        .catch(function(err) {
            console.error(err)
        })
}
console.log("returning to main thread")
