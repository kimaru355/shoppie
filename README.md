

# Shoppie

Shoppie is an e-commerce platform designed to facilitate the seamless listing, updating, and purchasing of products. It includes a backend server to manage products, orders, reviews, and user authentication, along with a frontend application for a user-friendly shopping experience.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (https://nodejs.org/)
- Angular CLI (https://cli.angular.io/)
- SQL Server (https://www.microsoft.com/en-us/sql-server/)

### Installing

Follow these steps to set up your development environment:

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/kimaru355/shoppie.git
    ```

2. Set up the SQL Server database:
    - Ensure SQL Server is running on your machine.
    - Create a new database named ShoppieDB.
    - Use the SQL script provided in shoppie/backend/sql to create the necessary tables and relationships.

3. Install backend dependencies:
    ```bash
    cd shoppie/backend
    npm install
    ```

4. Update the database connection string in shoppie/backend/config/database.js to reflect your SQL Server credentials and database name.

5. Start the backend server:
    ```bash
    npm start
    ```

6. Install frontend dependencies:
    ```bash
    cd shoppie/frontend
    npm install
    ```

7. Start the Angular development server:
    ```bash
    ng serve
    ```

8. Navigate to http://localhost:4200/ to view the application.

## Usage

Use the Angular frontend application to browse products, add them to your cart, and proceed to checkout. Admin features include adding, editing, and removing products.

## Built With

- ![Node.js](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white) - The runtime environment for the backend
- ![Express](https://img.shields.io/badge/express-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) - The web framework used for the backend
- ![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white) - The web framework used for the frontend
- ![SQL Server](https://img.shields.io/badge/Microsoft_SQL_Server-%23CC2927.svg?style=for-the-badge&logo=microsoft-sql-server&logoColor=white) - Database for storing product and user data


## Authors

- Emanuel Marshal - Marshal-Emanuel - github.com/Marshal-Emanuel
- KIMARU EMMANUEL - kimaru355 - github.com/kimaru355
- Xhechar - github.com/Xhechar


## Support

If you encounter any issues or have any questions, please [open an issue](https://github.com/kimaru355/shoppie/issues) on the GitHub repository.

## Acknowledgments

We would like to thank the following individuals for their valuable feedback:

- [Daniel Kainyi](https://github.com/kithekadk) - for providing valuable feedback


