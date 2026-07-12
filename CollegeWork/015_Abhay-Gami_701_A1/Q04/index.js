import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const publicDir = "./public";

fs.readdir(publicDir, (err, files) => {
    if (err) {
        console.error("Error reading directory:", err);
        return;
    }

    files.forEach(file => {
        const filePath = path.join(publicDir, file);
        const gzipFilePath = `${filePath}.gz`;

        const readStream = fs.createReadStream(filePath);
        const writeStream = fs.createWriteStream(gzipFilePath);
        const gzip = zlib.createGzip();

        readStream.pipe(gzip).pipe(writeStream);

        writeStream.on('finish', () => {
            console.log(`Compressed ${file} to ${gzipFilePath}`);
        });

        writeStream.on('error', (err) => {
            console.error(`Error compressing ${file}:`, err);
        });
    });
});