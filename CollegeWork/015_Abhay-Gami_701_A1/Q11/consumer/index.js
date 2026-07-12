import { createBanner } from 'abhaygami-cli-banner';

console.log("Starting NPM package consumer demo...\n");

// Call package functions with different configurations
createBanner("Welcome", "This banner is generated using the custom abhaygami-cli-banner package!");

createBanner("Success Alert", "Operation completed successfully.", "#");

createBanner("", "Simple border message with default formatting.");
