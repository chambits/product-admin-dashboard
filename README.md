# Product Admin Dashboard

A responsive product management dashboard built with React, TypeScript and Ant Design 5. This application provides a comprehensive interface for managing products, categories, and inventory.

## Tech Stack

- **Frontend**: React 19, TypeScript
- **UI Library**: Ant Design 5
- **State Management**: Redux Toolkit with RTK Query
- **Routing**: React Router v7
- **Data Grid**: AG Grid for efficient data display
- **Animation**: Framer Motion
- **Form Handling**: Antd Forms
- **Testing**: Vitest with React Testing Library
- **API**: JSON Server (development)

## Getting Started

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/chambits/product-admin-dashboard.git
   cd product-admin-dashboard
   ```

2. Install dependencies:

   ```
   yarn install
   ```

3. Start the app in development server:

   ```
   yarn dev
   ```

4. Start the Mock API server:

   ```
   cd mock-server
   yarn install
   yarn server
   ```

5. Open your browser and navigate to:

   ```
   http://localhost:5173
   ```

6. Login Credentials:

   • **Username:** admin

   • **Password:** password123

## Project Structure

- `/src`: Source code
  - `/app`: Core app configuration (store, API)
  - `/components`: Reusable UI components
  - `/features`: Feature-based modules
  - `/layouts`: Page layouts
  - `/pages`: Page components
  - `/providers`: Context providers
  - `/utils`: Utility functions
- `/server`: JSON Server database and auth endpoint
- `/public`: Static assets
