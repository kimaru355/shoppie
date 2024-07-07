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
    - Create a new database named `shoppie`.

3. Install backend dependencies:
    ```bash
    cd shoppie/backend
    npm install
    ```

4. Create a `.env` file in the `shoppie/backend` directory and add the following configurations, customizing the `DATABASE_URL` with your SQL Server details, and setting a secure `JWT_SECRET`:
    ```env
    DATABASE_URL="sqlserver://<your_sql_server_host>;database=shoppie;user=<your_username>;password=<your_password>;encrypt=true;trustServerCertificate=true"
    JWT_SECRET="your_jwt_secret_here"

    # Optional email configuration for nodemailer
    USER="your_email@example.com"
    APP_PASSWORD="your_app_password"
    ```

5. Run Prisma migrations to set up the database schema:
    ```bash
    npx prisma migrate dev --name init
    ```

6. Start the backend server:
    ```bash
    npm start
    ```

7. Install frontend dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

8. Start the Angular development server:
    ```bash
    ng serve
    ```

9. Navigate to http://localhost:4200/ to view the application.

## Usage

Use the Angular frontend application to browse products, add them to your cart, and proceed to checkout. Admin features include adding, editing, and removing products.

## Built With

- <img height="40" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js"> Node.js - The runtime environment for the backend
- <img height="40" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express"> Express - The web framework used for the backend
- <img height="40" src="https://user-images.githubusercontent.com/25181517/183890595-779a7e64-3f43-4634-bad2-eceef4e80268.png" alt="Angular"> Angular - The web framework used for the frontend
- <img height="40" src="https://github.com/marwin1991/profile-technology-icons/assets/19180175/3b371807-db7c-45b4-8720-c0cfc901680a" alt="MSSQL"> MSSQL - Database for storing product and user data

## Authors

<div style="display: flex; justify-content: space-around; align-items: center;">
  <div style="text-align: center; margin: 10px;">
    <img src="https://github.com/Marshal-Emanuel.png?size=100" alt="Emanuel Marshal" style="border-radius: 50%; height: 100px; width: 100px;">
    <div style="font-size: 18px; font-weight: bold; margin-top: 10px;"><a href="https://github.com/Marshal-Emanuel" style="color: black; text-decoration: none;">Emanuel Marshal</a></div>
  </div>

  <div style="text-align: center; margin: 10px;">
    <img src="https://github.com/kimaru355.png?size=100" alt="Kimaru Emanuel" style="border-radius: 50%; height: 100px; width: 100px;">
    <div style="font-size: 18px; font-weight: bold; margin-top: 10px;"><a href="https://github.com/kimaru355" style="color: black; text-decoration: none;">Kimaru Emanuel</a></div>
  </div>

  <div style="text-align: center; margin: 10px;">
    <img src="https://github.com/Xhechar.png?size=100" alt="Felix Okoth" style="border-radius: 50%; height: 100px; width: 100px;">
    <div style="font-size: 18px; font-weight: bold; margin-top: 10px;"><a href="https://github.com/Xhechar" style="color: black; text-decoration: none;">Felix Okoth</a></div>
  </div>
</div>

## Support

If you encounter any issues or have any questions, please [open an issue](https://github.com/kimaru355/shoppie/issues) on the GitHub repository.

## Acknowledgments

We would like to thank:

<div style="text-align: center; margin: 20px 0;">
  <div style="display: inline-block; margin: 10px;">
    <img src="https://github.com/kithekadk.png?size=100" alt="Daniel Kainyi" style="border-radius: 50%; height: 100px; width: 100px;">
    <div style="font-size: 18px; font-weight: bold; margin-top: 10px;">
      <a href="https://github.com/kithekadk" style="color: black; text-decoration: none;">Daniel Kainyi</a>
    </div>
    <div style="font-size: 14px;">for providing valuable feedback</div>
  </div>
</div>
