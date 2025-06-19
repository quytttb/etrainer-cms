# eTrainer CMS

A content management system for the eTrainer platform, built with React, TypeScript, and Vite.

## Overview

eTrainer CMS is an administrative web application for managing educational content, including:

- User Management
- Lesson Management (Grammar, Vocabulary, etc.)
- Question Management
- Exam Management
- Stage Management
- Account Management
- Dashboard Analytics

## Technology Stack

- **Frontend Framework:** React with TypeScript
- **Build Tool:** Vite
- **UI Library:** Ant Design
- **Styling:** SCSS and Tailwind CSS
- **State Management:** React Context API
- **Routing:** React Router

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/quytttb/etrainer-cms.git
   cd etrainer-cms
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

- `/src`: Source code
  - `/api`: API request utilities
  - `/assets`: Static assets
  - `/components`: Reusable UI components
  - `/constants`: Application constants
  - `/hooks`: Custom React hooks
  - `/layouts`: Page layouts
  - `/pages`: Application pages
  - `/routes`: Routing configuration
  - `/styles`: Global styles
  - `/utils`: Utility functions

## Features

- Authentication and authorization
- Content management for various lesson types
- Question and exam creation
- User progress tracking
- Administrative dashboard
