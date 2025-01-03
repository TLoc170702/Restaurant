<<<<<<< HEAD

Restaurant Management System

# A complete restaurant management solution with frontend, backend, and smart contract integration for blockchain-based functionalities.

Project Structure
# The project is organized into three main directories:
1. Frontend: React-based UI for the restaurant system.
2. Backend: Node.js and Express API for handling business logic and database interactions.
3. Smart_Contract: Solidity smart contracts for blockchain-based operations.

# Features
1. Frontend:
- User-friendly interface.
- Responsive design.
- Integration with blockchain for secure payments.
2. Backend:
- REST API for user and order management.
- Database integration with MongoDB.
- Authentication and authorization.
3. Smart Contracts:
- Written in Solidity.
- Deployment on the Sepolia testnet using Hardhat.
- Secure payment handling.
# Technologies Used
1. Frontend: React.js, Material-UI
2. Backend: Node.js, Express.js, MongoDB
3. Blockchain: Solidity, Hardhat, MetaMask
4. Other Tools: Git, Alchemy, Ethers.js
# Installation
Prerequisites
- Ensure you have the following installed:
    Node.js and npm
    MongoDB
    MetaMask browser extension
    Hardhat (for smart contract development)

# Clone the Repository
git clone https://github.com/TLoc170702/Restaurant.git
cd Restaurant 

# Install Dependencies
- Frontend:
cd frontend
npm install
- Backend:
cd backend
npm install
- Smart Contracts:
cd smart_contract
npm install

# Usage
- Run Frontend:
cd frontend
npm start
- Run Backend:
cd backend
npm run dev
- Deploy Smart Contracts:
cd smart_contract
npx hardhat run scripts/deploy.js --network sepolia

# Environment Variables
Create a .env file in the respective directories with the following structure:

- Backend:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
- Smart Contracts:
SEPOLIA_URL=https://eth-sepolia.g.alchemy.com/v2/your-alchemy-key
PRIVATE_KEY=your_private_key

# Contributing
Contributions are welcome! Please follow the steps below:

1. Fork the project.
2. Create a new branch.
3. Commit your changes.
4. Open a pull request.

# License
This project is licensed under the MIT License. See the LICENSE file for details.

# Contact
If you have any questions or suggestions, feel free to contact me at cuda1707202@gmail.com.
