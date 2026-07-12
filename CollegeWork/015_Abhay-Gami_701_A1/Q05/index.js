import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const publicDir = './public';
const extractDir = './extracted';

// Helper to ensure directory exists
const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

ensureDirectoryExists(publicDir);
ensureDirectoryExists(extractDir);

// Generate a sample .gz file if public dir is empty or has no .gz files
const gzFiles = fs.readdirSync(publicDir).filter(file => file.endsWith('.gz'));

if (gzFiles.length === 0) {
    console.log('No .gz files found in public directory. Creating a sample compressed file...');
    const sampleFilePath = path.join(publicDir, 'sample.txt');
    const sampleGzPath = `${sampleFilePath}.gz`;

    fs.writeFileSync(sampleFilePath, 'This is a sample text file compressed with zlib gzip.', 'utf8');

    const gzip = zlib.createGzip();
    const source = fs.createReadStream(sampleFilePath);
    const destination = fs.createWriteStream(sampleGzPath);

    source.pipe(gzip).pipe(destination);

    // Wait for the sample file compression to finish before running extraction
    await new Promise((resolve, reject) => {
        destination.on('finish', () => {
            console.log(`Sample file compressed to ${sampleGzPath}`);
            // Remove the temporary raw sample.txt so we only extract from the .gz file
            fs.unlinkSync(sampleFilePath);
            resolve();
        });
        destination.on('error', reject);
    });
}

// Read the public directory to find files to decompress
fs.readdir(publicDir, (err, files) => {
    if (err) {
        console.error("Error reading directory:", err);
        return;
    }

    const compressedFiles = files.filter(file => file.endsWith('.gz'));

    if (compressedFiles.length === 0) {
        console.log("No compressed (.gz) files found to decompress.");
        return;
    }

    console.log(`Found ${compressedFiles.length} file(s) to extract...`);

    compressedFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        
        // Output file path (removing .gz extension)
        const outputFileName = file.slice(0, -3);
        const outputFilePath = path.join(extractDir, outputFileName);

        const readStream = fs.createReadStream(filePath);
        const writeStream = fs.createWriteStream(outputFilePath);
        const gunzip = zlib.createGunzip();

        readStream.pipe(gunzip).pipe(writeStream);

        writeStream.on('finish', () => {
            console.log(`Successfully extracted: ${file} -> ${outputFilePath}`);
        });

        writeStream.on('error', (err) => {
            console.error(`Error extracting ${file}:`, err);
        });
    });
});
