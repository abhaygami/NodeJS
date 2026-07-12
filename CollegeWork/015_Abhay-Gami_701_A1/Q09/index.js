import fs from 'fs';
import path from 'path';

console.log("=== Node.js fs Module Functions Demonstration ===\n");

const testDir = './demo_dir';
const testFile = path.join(testDir, 'example.txt');
const renamedFile = path.join(testDir, 'renamed_example.txt');

// 1. fs.mkdirSync - Create directory
console.log("1. Calling fs.mkdirSync()...");
if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir);
    console.log(`✔ Created directory: ${testDir}`);
} else {
    console.log(`- Directory ${testDir} already exists`);
}

// 2. fs.existsSync - Verify existence
console.log("\n2. Calling fs.existsSync()...");
console.log(`Is directory present? ${fs.existsSync(testDir)}`);

// 3. fs.writeFileSync - Write file content
console.log("\n3. Calling fs.writeFileSync()...");
const initialContent = "Hello, this is the initial file content.\n";
fs.writeFileSync(testFile, initialContent, 'utf8');
console.log(`✔ Written data to file: ${testFile}`);

// 4. fs.readFileSync - Read file content
console.log("\n4. Calling fs.readFileSync()...");
const readContent1 = fs.readFileSync(testFile, 'utf8');
console.log(`✔ File Content:\n"""\n${readContent1}"""`);

// 5. fs.appendFileSync - Append data to file
console.log("\n5. Calling fs.appendFileSync()...");
const extraContent = "Adding this line to the file.\n";
fs.appendFileSync(testFile, extraContent, 'utf8');
console.log("✔ Content appended successfully.");
const readContent2 = fs.readFileSync(testFile, 'utf8');
console.log(`✔ Updated File Content:\n"""\n${readContent2}"""`);

// 6. fs.statSync - Get file stats
console.log("\n6. Calling fs.statSync()...");
const stats = fs.statSync(testFile);
console.log(`✔ File Stats for ${testFile}:`);
console.log(`   - Size: ${stats.size} bytes`);
console.log(`   - Is File: ${stats.isFile()}`);
console.log(`   - Is Directory: ${stats.isDirectory()}`);
console.log(`   - Last Modified: ${stats.mtime}`);

// 7. fs.readdirSync - Read directory contents
console.log("\n7. Calling fs.readdirSync()...");
const filesList = fs.readdirSync(testDir);
console.log(`✔ Directory '${testDir}' files list:`, filesList);

// 8. fs.renameSync - Rename file
console.log("\n8. Calling fs.renameSync()...");
fs.renameSync(testFile, renamedFile);
console.log(`✔ Renamed ${testFile} -> ${renamedFile}`);
console.log(`Files in directory after renaming:`, fs.readdirSync(testDir));

// 9. fs.unlinkSync - Delete file
console.log("\n9. Calling fs.unlinkSync()...");
fs.unlinkSync(renamedFile);
console.log(`✔ File deleted: ${renamedFile}`);
console.log(`Files in directory after deleting file:`, fs.readdirSync(testDir));

// 10. fs.rmdirSync - Delete directory
console.log("\n10. Calling fs.rmdirSync()...");
fs.rmdirSync(testDir);
console.log(`✔ Directory deleted: ${testDir}`);
console.log(`Is directory present now? ${fs.existsSync(testDir)}`);

console.log("\n=== Demonstration Completed Successfully ===");
