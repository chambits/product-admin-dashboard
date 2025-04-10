# Product Admin Dashboard

A responsive product management dashboard built with React, TypeScript and Ant Design 5. This application provides a comprehensive interface for managing products, categories, and inventory.

## Features

- **Product Management**: Add, edit, view, and delete products
- **Category Organization**: Manage product categories
- **Inventory Tracking**: Track product stock and status
- **Responsive Design**: Mobile-friendly interface built with Ant Design
- **Data Visualization**: View product statistics on the dashboard
- **Authentication**: Secure login system

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

3. Start the development server:

   ```
   cd mock-server
   yarn server
   ```

4. Start the API server:

   ```
   yarn server
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Available Scripts

- `yarn dev`: Start development server
- `yarn build`: Build for production
- `yarn preview`: Preview production build
- `yarn server`: Start JSON Server API
- `yarn test`: Run tests
- `yarn coverage`: Generate test coverage report
- `yarn lint`: Run ESLint

## Project Structure

- `/src`: Source code
  - `/app`: Core app configuration (store, API)
  - `/components`: Reusable UI components
  - `/features`: Feature-based modules
  - `/layouts`: Page layouts
  - `/pages`: Page components
  - `/providers`: Context providers
  - `/utils`: Utility functions
- `/db`: JSON Server database
- `/public`: Static assets
