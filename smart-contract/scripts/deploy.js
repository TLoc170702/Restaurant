// async function main() {
//     const RoomBooking = await ethers.getContractFactory("RoomBooking");
//     console.log("Deploying RoomBooking contract...");

//     const roomBooking = await RoomBooking.deploy();
//     await roomBooking.deployed();

//     console.log("RoomBooking deployed to:", roomBooking.address);
// }

// main().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });

async function main() {
    console.log("Starting deployment...");
    const RoomBooking = await ethers.getContractFactory("RoomBooking");
    console.log("Deploying RoomBooking contract...");
    
    const roomBooking = await RoomBooking.deploy();
    console.log("Transaction hash:", roomBooking.deployTransaction.hash);
    
    await roomBooking.deployed();
    console.log("RoomBooking deployed to:", roomBooking.address);
}

main().catch((error) => {
    console.error("Deployment failed:", error);
    process.exitCode = 1;
});
