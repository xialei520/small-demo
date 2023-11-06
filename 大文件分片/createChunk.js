// import SparkMD5 from "./spark-md5.js";
export function createChunk(file, index, chunkSize) {
    return new Promise((resolve) => {
        let start = index * chunkSize;
        let end = start + chunkSize;
        console.log(start, end);
        let spark = new SparkMD5.ArrayBuffer();
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            spark.append(e.target.result);
            resolve({
                start,
                end,
                index,
                hash: spark.end()
            });
        };
        fileReader.readAsArrayBuffer(file.slice(start, end));
    });
}
