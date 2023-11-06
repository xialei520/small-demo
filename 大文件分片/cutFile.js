import { createChunk } from "./createChunk.js";
const CHUNK_SIZE = 1024 * 1024 * 5; // 5M
export async function cutFile(file) {
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE);
    console.log(chunkCount);
    let result = [];
    for (let i = 0; i < chunkCount; i++) {
        let chunk = await createChunk(file, i, CHUNK_SIZE);
        result.push(chunk);
    }
    return result;
}
