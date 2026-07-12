console.log("=== Node.js Global Objects Demonstration ===\n");

// 1. __filename and __dirname (available in CommonJS modules)
console.log("1. Directory and File Path Globals:");
console.log(`   - Current Directory (__dirname):  ${__dirname}`);
console.log(`   - Current File Path (__filename): ${__filename}`);

// 2. process (global object for current node process)
console.log("\n2. Process Global Object details:");
console.log(`   - Node Version:       ${process.version}`);
console.log(`   - Platform:           ${process.platform}`);
console.log(`   - Process ID (PID):   ${process.pid}`);
console.log(`   - Current Directory:  ${process.cwd()}`);

// 3. console (global object for standard stream logging)
console.log("\n3. Console Global Object:");
console.log("   - Logging via console.log() is done!");

// 4. global / globalThis
console.log("\n4. Global context properties check:");
console.log(`   - Does globalThis exist? ${typeof globalThis !== 'undefined'}`);
console.log(`   - Does global exist?     ${typeof global !== 'undefined'}`);

// 5. Reading and printing command line arguments (process.argv)
console.log("\n5. Command Line Arguments (process.argv):");
console.log(`   Total argument tokens: ${process.argv.length}`);
console.log("   List of arguments:");
process.argv.forEach((val, index) => {
    let type = "";
    if (index === 0) type = "(Node executable path)";
    else if (index === 1) type = "(JavaScript entry script path)";
    else type = `(User parameter #${index - 1})`;
    
    console.log(`     [${index}] ${val} ${type}`);
});

console.log("\n6. Demonstrating setTimeout (Global Async Function)...");
const timerId = setTimeout(() => {
    console.log("✔ Callback inside setTimeout executed after delay! (Global demo finished)");
}, 500);
