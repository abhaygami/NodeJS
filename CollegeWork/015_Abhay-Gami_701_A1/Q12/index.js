console.log("=== Chained Promises Dependent Tasks Demonstration ===\n");

// Task 1: Fetch User Profile
function fetchUserProfile(userId) {
    console.log(`[Task 1] Fetching profile for user ID: ${userId}...`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!userId) {
                reject(new Error("User ID is required"));
            } else {
                const profile = { id: userId, name: "Abhay Gami", email: "abhay@example.com" };
                resolve(profile);
            }
        }, 1000);
    });
}

// Task 2: Get Orders for User
function getOrdersForUser(userProfile) {
    console.log(`[Task 2] Profile retrieved for ${userProfile.name}. Fetching orders...`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userProfile.id !== 101) {
                reject(new Error(`No orders found for user ID: ${userProfile.id}`));
            } else {
                const orders = [
                    { orderId: 'ORD-9821', item: 'Mechanical Keyboard', price: 90 },
                    { orderId: 'ORD-4412', item: 'Ergonomic Mouse', price: 50 },
                    { orderId: 'ORD-0912', item: 'USB-C Hub', price: 30 }
                ];
                resolve({ user: userProfile, orders: orders });
            }
        }, 1200);
    });
}

// Task 3: Generate Invoice/Summary
function generateInvoice(orderData) {
    console.log(`[Task 3] Generating invoice for ${orderData.orders.length} items...`);
    return new Promise((resolve) => {
        setTimeout(() => {
            const total = orderData.orders.reduce((sum, item) => sum + item.price, 0);
            const invoice = {
                invoiceNumber: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
                billTo: orderData.user.name,
                email: orderData.user.email,
                items: orderData.orders.map(o => `${o.item} ($${o.price})`),
                totalAmount: `$${total}`
            };
            resolve(invoice);
        }, 800);
    });
}

// Executing the chained promises
console.log("Initiating promise chain with User ID: 101...");
fetchUserProfile(101)
    .then((profile) => {
        console.log("✔ [Task 1 Success] Profile details loaded.");
        // Return Task 2 promise
        return getOrdersForUser(profile);
    })
    .then((orderData) => {
        console.log("✔ [Task 2 Success] Orders successfully fetched.");
        // Return Task 3 promise
        return generateInvoice(orderData);
    })
    .then((invoice) => {
        console.log("✔ [Task 3 Success] Invoice generated successfully.");
        console.log("\n================ INVOICE DETAILS ================");
        console.log(`Invoice No:   ${invoice.invoiceNumber}`);
        console.log(`Customer:     ${invoice.billTo} (${invoice.email})`);
        console.log("Items:");
        invoice.items.forEach(item => console.log(`  - ${item}`));
        console.log(`Total:        ${invoice.totalAmount}`);
        console.log("=================================================\n");
        console.log("Promise chaining execution complete!");
    })
    .catch((error) => {
        console.error("✖ Promise Chain failed at some stage:", error.message);
    });
