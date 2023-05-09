export function handlerPromise(callback) {
    let _resolve, _reject;
    const promise = new Promise((resolve, reject) => {
        _reject = reject;
        _resolve = resolve;
        callback?.(resolve, reject);
    });
    return {
        promise,
        abort() {
            _reject({ message: "promise aborted" });
        }
    };
}
