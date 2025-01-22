# Image Annotation Manager with Next.js

![Canvas Editor Preview](./public/assets/images/demo.gif)

_A showcase of the canvas editor for smooth and responsive image annotation._

## Live Demo

Try the application here: [Live Demo](https://image-annotation-manager-nextjs.vercel.app/)

## Table of Contents

1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Focus Areas](#focus-areas)
4. [Getting Started](#getting-started)
5. [Configuration](#configuration)
6. [Mock Mode vs API Mode](#mock-mode-vs-api-mode)
7. [Technologies Used](#technologies-used)
8. [Acknowledgments](#acknowledgments)

## Overview

This repository was created as technical assignment expertise in building a **high-performance Next.js application**. It focuses on two main areas:

1. **Optimized Image Listing**: Implementing advanced performance techniques for smooth, responsive image galleries.
2. **Canvas Annotation Editor**: Designing an intuitive canvas tool using React Konva.

The project showcases skills in React, React Query, dynamic UI optimization, and virtualized list handling.

For further details, refer to the files in the `docs` directory.

## Key Features

- **Optimized Image Listing**:
    - Fully responsive, smooth-scrolling virtualized list with `react-window`.
    - Filters by name, metadata, and category with dynamic UI elements.
- **Canvas Annotation Editor**:
    - Tools for drawing annotations like rectangles with customizable colors.
    - Synchronization with a mock backend using UUID-based annotations.
    - Smooth transitions, state management, and loading indicators.
- **General**:
    - Category Management: Full CRUD operations with real-time syncing.
    - Image filtering: by name, metadata, or categories.
    - Fully mobile-friendly design.
    - Mock server support for easy testing.

## Focus Areas

1. **Image Listing Optimization**:

    - Leveraged `react-window` for a responsive and performant virtualized list.
    - Optimized image loading with placeholders and smooth transitions.

2. **Canvas Annotation**:

    - Designed an interactive canvas editor using React Konva.
    - Implemented features for annotation creation, deletion, and syncing.
    - Provided loading indicators and user feedback for better UX.

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm >= 11.0.0

### Installation

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

## Configuration

### Environment Variables

Create a `.env` file with the following:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Mock Mode vs API Mode

This app supports running in two modes:

1. **Mock Mode**:

    - Ideal for testing without a backend.
    - Enable mock mode in `src/configs/global.config.ts`:

        ```typescript
        export const API_MOCK_ENABLED = true; // Enable mock mode
        export const API_MOCK_DELAY = 1000; // Simulate network delay
        ```

2. **API Mode**:

    - Connect to a real backend.
    - Disable mock mode:

        ```typescript
        export const API_MOCK_ENABLED = false; // Use live API
        ```

## Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org/)
- **State Management**: [React Query](https://tanstack.com/query)
- **Virtualization**: [React Window](https://react-window.vercel.app/)
- **Canvas Library**: [React Konva](https://konvajs.org/)
- **UI Library**: [Material UI](https://mui.com/)

## Acknowledgments

This project was developed to demonstrate my ability to handle complex UI challenges and optimize performance. I appreciate the opportunity to showcase these skills as technical assignment.

For further technical documentation, please see the files in the `docs` directory.
