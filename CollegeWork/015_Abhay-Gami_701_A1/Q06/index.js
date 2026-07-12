import fs from 'fs';
import { promisify } from 'util';

const tempFilePath = './temp_to_delete.txt';

// --- METHOD 1: Custom Promisification Wrapper ---
const customUnlink = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// --- METHOD 2: Using Node.js util.promisify ---
const promisifiedUnlink = promisify(fs.unlink);

async function runDemo() {
    console.log("=== Promisifying fs.unlink Demonstration ===");

    // 1. Create a dummy file for Method 1
    fs.writeFileSync(tempFilePath, "This file will be deleted via Custom Promisified fs.unlink.", "utf8");
    console.log(`\nCreated temporary file: ${tempFilePath}`);
    console.log(`Checking if file exists: ${fs.existsSync(tempFilePath)}`);

    try {
        console.log(`Calling customUnlink()...`);
        await customUnlink(tempFilePath);
        console.log(`Successfully deleted file using Custom Promisified fs.unlink!`);
        console.log(`Checking if file exists: ${fs.existsSync(tempFilePath)}`);
    } catch (error) {
        console.error(`Error deleting file using customUnlink:`, error.message);
    }

    // 2. Create a dummy file for Method 2
    fs.writeFileSync(tempFilePath, "This file will be deleted via Node's util.promisify(fs.unlink).", "utf8");
    console.log(`\nCreated temporary file again: ${tempFilePath}`);
    console.log(`Checking if file exists: ${fs.existsSync(tempFilePath)}`);

    try {
        console.log(`Calling promisifiedUnlink() from util.promisify...`);
        await promisifiedUnlink(tempFilePath);
        console.log(`Successfully deleted file using util.promisify!`);
        console.log(`Checking if file exists: ${fs.existsSync(tempFilePath)}`);
    } catch (error) {
        console.error(`Error deleting file using promisifiedUnlink:`, error.message);
    }
}

runDemo();
