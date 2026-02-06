
# ERP & E-Commerce Platform Documentation

## Table of Contents
- [ERP \& E-Commerce Platform Documentation](#erp--e-commerce-platform-documentation)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Project Structure](#project-structure)
  - [Setup \& Installation](#setup--installation)
  - [User Roles \& Access](#user-roles--access)
    - [1. **Visitor/Customer**](#1-visitorcustomer)
    - [2. **Staff/User**](#2-staffuser)
    - [3. **Admin**](#3-admin)
  - [Frontend (Public Web)](#frontend-public-web)
  - [Dashboard (Admin/Staff)](#dashboard-adminstaff)
  - [API Endpoints](#api-endpoints)
  - [Database Schema (Key Tables)](#database-schema-key-tables)
  - [Development \& Contribution](#development--contribution)
  - [FAQ](#faq)

---

## Overview
This is a full-featured ERP and E-Commerce platform built with Next.js, MySQL, and Bootstrap 5. It supports:
- Role-based authentication and permissions
- Department and user management
- Product showcase (e-commerce ready)
- Public-facing company website
- Admin dashboard for business operations

## Project Structure
```
├── public/                # Static assets (images, icons, etc.)
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── layout.js      # Main layout (public)
│   │   ├── dashboard/     # Dashboard (admin/staff) pages
│   │   ├── about/         # About Us page
│   │   ├── contact/       # Contact page
│   │   ├── products/      # Product showcase
│   │   └── ...
│   ├── components/        # Reusable React components (menus, cards, tables, etc.)
│   └── lib/               # Database and business logic helpers
├── package.json           # Project metadata and dependencies
├── next.config.mjs        # Next.js configuration
├── README.md              # This documentation
└── ...
```

## Setup & Installation
1. **Clone the repository**
2. **Install dependencies**
	```bash
	npm install
	```
3. **Configure the database**
	- Import the provided SQL file to create tables and seed data
	- Update `src/lib/db.js` with your DB credentials
4. **Run the development server**
	```bash
	npm run dev
	```
5. **Access the app**
	- Public site: [http://localhost:3000/](http://localhost:3000/)
	- Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

## User Roles & Access
### 1. **Visitor/Customer**
- Can view public pages: Home, Products, About, Contact
- Can register/login (if enabled)

### 2. **Staff/User**
- Can log in and access dashboard features based on permissions
- Can view assigned departments, orders, production, etc.

### 3. **Admin**
- Full access to dashboard
- Manage users, departments, permissions, and products
- Assign roles and permissions

## Frontend (Public Web)
- **Home/Landing Page**: Welcome, company intro, quick links
- **Products**: Product showcase (e-commerce features coming soon)
- **About Us**: Company details, mission, team
- **Contact**: Contact form for inquiries
- **Menu**: MainMenu component for navigation

## Dashboard (Admin/Staff)
- **Dashboard Home**: Stats, quick actions, admin panel
- **Orders**: View/manage orders
- **Production**: Track production tasks and status
- **Departments**: CRUD for departments (admin only)
- **Permissions**: Manage roles and permissions (admin only)
- **Menu**: DashboardMenu component for navigation

## API Endpoints
- `POST /api/auth/login` — User login
- `POST /api/auth/register` — User registration
- `POST /api/auth/logout` — User logout
- `GET/POST /api/departments` — List/create departments
- `GET/PUT/DELETE /api/departments/[id]` — Single department CRUD
- (Extendable for products, orders, users, etc.)

## Database Schema (Key Tables)
- **users**: id, email, password, role_id
- **roles**: id, name
- **permissions**: id, name
- **role_permissions**: role_id, permission_id
- **user_permissions**: user_id, permission_id
- **departments**: id, name, slug
- (Extendable for products, orders, etc.)

## Development & Contribution
- Use feature branches for new features
- Run `npm run dev` for local development
- Use the provided `.gitignore` to avoid uploading node_modules/.next
- PRs and issues welcome!

## FAQ
**Q: How do I add a new department?**
A: Log in as admin, go to Dashboard > Departments, and use the Add Department button.

**Q: How do I add products?**
A: Use the Products page (admin features coming soon for product CRUD).

**Q: How do I manage users/roles?**
A: Go to Dashboard > Permissions (admin only).

**Q: How do I contact support?**
A: Use the Contact page form or email the admin listed in the About Us page.

---

For more details, see code comments and each page's inline documentation.
