# Carbon Quotation System

A comprehensive business quotation and cost management system for manufacturing operations.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Overview

**Carbon Quotation System** is a full-stack web application designed for manufacturing businesses to manage quotations, cost calculations, vendor relationships, and material information. The system features a Chinese user interface and provides comprehensive tools for business operations management.

## Features

- **Quotation Management**: Create and manage detailed quotations with cost breakdowns
- **Cost Entry & Calculation**: Advanced cost calculation with material, labor, and outsourcing costs
- **Employee Management**: Maintain employee records and information
- **Client Information**: Store and manage customer/client data
- **Material Maintenance**: Track material costs and specifications
- **Vendor Management**: Manage outsourcing vendor relationships
- **Drawing Number Management**: Central management of technical drawings
- **Inquiry Forms**: Handle customer inquiries efficiently
- **Order Approval Workflow**: Built-in approval processes
- **Role-based Authentication**: Secure access control
- **Modern UI**: Material-UI based responsive interface
- **Multi-language**: Chinese interface support

## Tech Stack

### Frontend

- **React 18** with TypeScript
- **Material-UI (MUI)** for component library
- **Vite** as build tool
- **React Router** for navigation
- **Axios** for HTTP requests

### Backend

- **Node.js** with Express.js
- **MySQL** database
- **mysql2** driver
- **CORS** enabled

### DevOps

- **Docker** & **Docker Compose** for containerization
- **Multi-stage builds** for optimization
- **Hot reload** for development

## Installation

### Prerequisites

- **Docker** and **Docker Compose** (recommended)
- **Node.js 18+** and **npm** (for manual setup)
- **MySQL 8.0+** (for manual setup)

### Option 1: Docker Setup (Recommended)

1. Clone the repository:

   ```bash
   git clone https://github.com/zii144/carbon-quotation-system.git
   cd carbon-quotation-system
   ```

2. Start all services with Docker Compose:

   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5001`
   - MySQL Database: `localhost:3306`

### Option 2: Manual Setup

#### 1. Database Setup

```bash
# Start MySQL server
mysql -u root -p

# Create database
CREATE DATABASE carbon_quotation CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 2. Backend Setup

```bash
cd backend
npm install
npm start
# Server runs on port 5000
```

#### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
# Development server runs on port 3000
```

## Usage

1. **Access the System**: Navigate to `http://localhost:3000`
2. **Login**: Use the authentication system to access different modules
3. **Navigate**: Use the sidebar to access different forms and functionalities
4. **Manage Data**:
   - Add/edit employee information
   - Maintain material databases
   - Manage vendor relationships
   - Create quotations and cost entries
   - Process inquiries and approvals

### Key Modules

- **員工基本資料** (Employee Management)
- **客戶基本資料** (Client Management)
- **維護材質資料** (Material Maintenance)
- **委外廠商資料** (Vendor Management)
- **中央圖號管理資料** (Drawing Number Management)
- **填寫詢價單** (Inquiry Forms)
- **填寫成本資料** (Cost Entry)
- **已簽核成本資料** (Approved Cost Data)
- **訂單簽核** (Order Approval)

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
MYSQL_ROOT_PASSWORD=password
MYSQL_DATABASE=carbon_quotation
MYSQL_CHARSET=utf8mb4
MYSQL_COLLATION=utf8mb4_unicode_ci

# Port Configuration
FRONTEND_PORT=3000
BACKEND_PORT=5001
DATABASE_PORT=3306
```

### Docker Configuration

The system uses `docker-compose.yml` with three services:

- **frontend**: React app served via Nginx (port 3000)
- **backend**: Node.js Express server (port 5001)
- **db**: MySQL database (port 3306)

## Project Structure

```
carbon-quotation-system/
├── backend/                 # Node.js Express API
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── Dockerfile          # Backend container
├── frontend/               # React TypeScript app
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Main pages
│   │   ├── shared-theme/  # Material-UI theme
│   │   ├── hooks/         # Custom React hooks
│   │   └── context/       # React context
│   ├── package.json       # Frontend dependencies
│   └── Dockerfile         # Frontend container
├── db/                    # Database configuration
│   ├── docker-entrypoint-initdb.d/  # DB initialization
│   └── my.cnf             # MySQL configuration
├── docker-compose.yml     # Multi-container setup
└── README.md             # This file
```

## API Reference

The backend provides RESTful APIs for all major functionalities:

### Base URL

```
http://localhost:5001/api
```

### Main Endpoints

#### Employee Management

```http
GET    /api/employees          # Get all employees
POST   /api/employees          # Create employee
PUT    /api/employees/:id      # Update employee
DELETE /api/employees/:id      # Delete employee
```

#### Client Management

```http
GET    /api/companies          # Get all companies
POST   /api/companies          # Create company
PUT    /api/companies/:id      # Update company
DELETE /api/companies/:id      # Delete company
```

#### Material Management

```http
GET    /api/materials          # Get all materials
POST   /api/materials          # Create material
PUT    /api/materials/:id      # Update material
DELETE /api/materials/:id      # Delete material
```

#### Vendor Management

```http
GET    /api/vendors            # Get all vendors
POST   /api/vendors            # Create vendor
PUT    /api/vendors/:id        # Update vendor
DELETE /api/vendors/:id        # Delete vendor
```

#### Cost Entries

```http
GET    /api/cost-entries       # Get all cost entries
POST   /api/cost-entries       # Create cost entry
PUT    /api/cost-entries/:inquiry_number  # Update cost entry
DELETE /api/cost-entries/:inquiry_number  # Delete cost entry
```

#### Inquiries

```http
GET    /api/inquiries          # Get all inquiries
POST   /api/inquiries          # Create inquiry
PUT    /api/inquiries/:inquiry_number  # Update inquiry
DELETE /api/inquiries/:inquiry_number  # Delete inquiry
```

#### Drawing Numbers

```http
GET    /api/drawing-numbers    # Get all drawing numbers
POST   /api/drawing-numbers    # Create drawing number
PUT    /api/drawing-numbers/:drawing_number  # Update drawing number
DELETE /api/drawing-numbers/:drawing_number  # Delete drawing number
```

### Response Format

All APIs return JSON responses with consistent structure:

```json
{
  "success": true,
  "data": [...],
  "message": "Operation successful"
}
```

For detailed API documentation with request/response examples, see the backend source code or contact the development team.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

### Development Guidelines

- Follow TypeScript best practices
- Use Material-UI components consistently
- Maintain Chinese language support
- Write meaningful commit messages
- Test thoroughly before submitting PRs

## License

MIT License. See [LICENSE](LICENSE) for details.

---

**Carbon Quotation System** - Business Quotation & Cost Management Platform  
Developed by Zii Wong, 2025
