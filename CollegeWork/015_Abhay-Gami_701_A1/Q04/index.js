import fs from 'fs';
import path from 'path';
import { ZipArchive } from 'archiver';

const publicDir = './public';
const outputPath = path.join(process.cwd(), 'public.zip');

// Create a file stream to write the final zip file to
const output = fs.createWriteStream(outputPath);

// Instantiate ZipArchive 
const archive = new ZipArchive({
    zlib: { level: 9 } // Maximum compression level
});

// Listen for completion
output.on('close', () => {
    console.log(`Successfully compressed '${publicDir}' into '${outputPath}' (${archive.pointer()} total bytes)`);
});

// Catch errors
archive.on('error', (err) => {
    console.error('Error compressing folder:', err);
});

// Pipe archive data to the file
archive.pipe(output);

// Append directory contents to the root of the zip archive
archive.directory(publicDir, false);

// Finalize and save the zip file
archive.finalize();