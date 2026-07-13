import path from 'path';
import AdmZip from 'adm-zip';

const zipFilePath = path.join(process.cwd(), 'public.zip');
const extractDir = path.join(process.cwd(), 'public');

try {
    const zip = new AdmZip(zipFilePath);

    // Extract everything to the target folder (true = overwrite existing files)
    zip.extractAllTo(extractDir, true);

    console.log(`Successfully extracted 'public.zip' to '${extractDir}'`);
} catch (err) {
    console.error('Error extracting zip file:', err);
}