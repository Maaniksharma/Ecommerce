# Ecommerce Project

This is a full-stack Ecommerce application utilizing SQL, Node.js, Express, and React. The project implements various API concepts including Context API, lazy loading, useQuery, routing, pagination, JWT token-based authentication, and refresh tokens.

## Project Overview

The project follows an MVC architecture and is currently deployed with the database hosted on DigitalOcean. The application revolves around four primary roles:

1. **User**: Users can login, sign up, manage their cart (add/remove items), make payments, and track orders by status.

2. **Seller**: Sellers have the ability to login, sign up, list their products pending admin approval, and check the order status. They are responsible for shipping products to transporters.

3. **Transporter**: Transporters receive orders from sellers and handle the transportation of products. They can update the order status to dispatched and delivered.

4. **Admin**: Admins manage seller registration requests, approve/deny products, and oversee the entire system.

All data in this project is synchronized across JavaScript, localStorage, and the database.

## Features

- User authentication (JWT token-based)
- Role-based access control
- Cart management
- Order tracking by status
- Product listing and approval system
- Transporter order handling
- Admin authorization for user and product management

## Installation

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Ecommerce.git
   ```
2. Run frontend
   ```bash
   npm run dev
   ```
3. Run backend
   ```bash
   cd backend
   node main.js
   ```

```

```
