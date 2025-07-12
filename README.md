# carbon-quotation-system

A comprehensive system for generating carbon emission quotations for businesses and organizations.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Overview

**carbon-quotation-system** is designed to help companies estimate and manage their carbon emissions by providing accurate quotations based on customizable parameters. The system supports multiple emission factors, reporting standards, and integrates with external data sources.

## Features

- Generate carbon emission quotations for various activities and assets
- Support for multiple emission factors and standards (e.g., GHG Protocol)
- RESTful API for integration with other systems
- User authentication and role-based access control
- Export reports in PDF and CSV formats
- Modular and extensible architecture

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ziiwong/carbon-quotation-system.git
   cd carbon-quotation-system
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (see [Configuration](#configuration)).
4. Set up and run the application:

### Option 1: Run with Docker (Recommended)

If you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed, you can run the entire stack (database, backend, and frontend) with a single command:

```bash
docker-compose up --build
```

This will start all required services as defined in `docker-compose.yml`. The frontend will be available at `http://localhost:3000` (or the port specified in your `.env`), and the backend/API will be accessible as configured.

### Option 2: Run Each Service Manually

#### 1. Start the Database

Ensure your database (e.g., PostgreSQL, MySQL) is running and accessible as configured in your `.env` file.

#### 2. Start the Backend

```bash
cd backend
npm install
npm run start
```

#### 3. Start the Frontend

```bash
cd frontend
npm install
npm start
```

The frontend will typically be available at `http://localhost:3000` by default.

## Usage

After installation, access the system via `http://localhost:3000`. Use the web interface or the API to create and manage quotations.

### Example API Request

```http
POST /api/quotations
Content-Type: application/json

{
  "company": "Acme Corp",
  "activities": [
     { "type": "electricity", "amount": 1000, "unit": "kWh" }
  ]
}
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

## API Reference

See [API documentation](docs/API.md) for detailed endpoints and usage.

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

## License

MIT License. See [LICENSE](LICENSE) for details.

---

By Zii Wong, 2025 Jan
