function test(resolve, reject) {
    setTimeout(resolve, 6000);
}

let { promise, abort } = handlerPromise(test);
setTimeout(() => {
    abort();
}, 5000);

promise
    .then((rsp) => {
        console.log("success", rsp);
    })
    .catch((err) => {
        console.log("error", err);
    });
console.log("finished");
