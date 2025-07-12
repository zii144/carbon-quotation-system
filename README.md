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

4. Start the application:
   ```bash
   npm start
   ```

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
