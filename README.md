# Image Annotation Manager with Next.js

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## Table of Contents

1. [Task Overview](#task-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [API Endpoints](#api-endpoints)
5. [Evaluation Criteria](#evaluation-criteria)
6. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Environment Variables](#environment-variables)
    - [API Configuration](#api-configuration)
    - [Available Scripts](#available-scripts)
7. [Project Structure](#project-structure)
8. [Running the Project](#running-the-project)
9. [Deployment](#deployment)
10. [App Routes](#app-routes)
11. [Canvas Implementation Flow](#canvas-implementation-flow)
    - [Core Components](#core-components)
    - [Design Principles](#design-principles)
    - [Tools & Features](#tools-features)
    - [Component Communication Scenarios](#component-communication-scenarios)
    - [Error Handling](#error-handling)

---

## Task Overview

Create a **Next.js application** that provides robust functionalities for image and category management, alongside user-friendly interfaces for annotation and filtering.

---

## Features

1. **Image Management**
    - Upload, view, and delete images.
    - Pagination or infinite scrolling support.
2. **Category Management**
    - Full CRUD operations for categories.
3. **Filtering**
    - Filter images by name, metadata, or category.
4. **Image Annotation**
    - Draw annotations on images with customizable tools.
    - Save and retrieve annotations.
5. **User Interface**
    - Intuitive forms and modals for enhanced UX.

---

## Technologies Used

- **Framework:** [Next.js (App Router)](https://nextjs.org)
- **UI Library:** [Material UI (MUI)](https://mui.com/)
- **State Management:** [React Query](https://tanstack.com/query)
- **Drawing Library:** [React Konva](https://konvajs.org/)
- **Virtualization Library:** [React Window](https://react-window.vercel.app/)

---

## API Endpoints

The project utilizes the JSON placeholder API for backend operations:
[https://my-json-server.typicode.com/MostafaKMilly/demo](https://my-json-server.typicode.com/MostafaKMilly/demo)

---

## Evaluation Criteria

Your project will be evaluated on:

- **Completeness:** Fulfillment of all required features.
- **Code Quality:** Clean, structured, and documented code.
- **User Experience:** Responsive and intuitive interfaces.
- **Performance:** Efficient data handling.
- **Technology Usage:** Proper utilization of libraries/frameworks.

---

## Getting Started

### Prerequisites

Ensure the following are installed:

- Node.js >= 20.0.0
- npm >= 11.0.0

### Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://my-json-server.typicode.com/MostafaKMilly/demo
```

### API Configuration

#### Mock System Features

1. **CRUD Operations:**
    - Categories
    - Images
    - Annotations
2. **Data Relationships:**
    - Cascading deletes.
    - Referential integrity.
3. **Filtering:**
    - Name-based, format-based, and resolution-based.

#### Configuration Options

Update in `src/configs/global.config.ts`:

```typescript
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Mock settings
export const API_MOCK_ENABLED = true; // Set to false for real API
export const API_MOCK_DELAY = 1000; // Network delay in ms
```

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Format and lint checks
npm run format
npm run lint
npm run check
```

---

## Project Structure

```plaintext
├── src/
│   ├── app/                  # Next.js app directory
│   ├── components/           # Reusable components
│   ├── configs/              # Configuration files
│   ├── helpers/              # Utility functions
│   ├── types/                # TypeScript type definitions
│   ├── theme/                # Custom Material UI theme
│   └── __mock__/             # Mock data and services
├── public/                   # Static assets
└── config/                   # Configuration files
```

---

## Running the Project

1. Clone the repository:

```bash
git clone https://github.com/ahmadmhdyones/image-annotation-manager-nextjs.git
cd image-annotation-manager-nextjs
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

---

## App Routes

```plaintext
├── /               # Home
├── /dashboard      # Dashboard Overview
├── /categories     # Categories Management
│   ├── /           # List Categories
│   ├── /new        # Create Category
│   └── /[id]/edit  # Edit Category
├── /images         # Image Management
│   ├── /           # Image Gallery
│   ├── /upload     # Upload Images
│   └── /[id]/canvas # Annotation Editor
```

---

## Canvas Implementation Flow

### Core Components

1. **CanvasContainer**: Main orchestrator

    - Manages canvas state.
    - Handles tool selection and color.
    - Coordinates drawing surface and toolbar.

2. **CanvasDrawer**: Drawing surface

    - Implements Konva stage/layers.
    - Processes interactions and manages drawing.

3. **CanvasToolbar**: User interface
    - Tool selection.
    - Color picker.
    - Conditional visibility.

### Tools & Features

1. **Drawing Tools**

    - Freehand: Natural brush strokes.
    - Rectangle: Precise shapes.
    - Color Picker: Custom colors.
    - Grab: Navigation.

2. **Interactive Features**
    - Real-time previews.
    - Canvas zoom and pan.
    - Visual feedback.

### Error Handling

- Optimistic updates.
- Visual error states.
- Network failure recovery.

---
