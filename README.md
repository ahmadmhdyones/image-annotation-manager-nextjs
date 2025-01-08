# image-annotation-manager-nextjs

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Task

You are requested to create a **Next.js application** with the following features and requirements:

### **Features**

1. **Image Management**
    - Users can upload, view, and delete images.
    - Implement pagination or infinite scrolling for efficient browsing of images.
2. **Category Management**
    - Users can create, read, update, and delete categories.
3. **Filtering**
    - Users can filter images by name, metadata, or category.
4. **Image Annotation**
    - Allow users to annotate images using drawing tools.
    - Save annotations for future use.
5. **UI Elements**
    - Use forms and modals for user interactions.

### **Technologies to Use**

- **Framework:** Next.js (App Router)
- **UI Library:** Material UI (MUI)
- **Data Fetching & State Management:** React Query
- **Drawing Library:** React Konva (for image annotation)
- **Virtualization Library:** React Window (for image gallery)

### **API Endpoints**

Use the provided JSON placeholder API for data operations:
[https://my-json-server.typicode.com/MostafaKMilly/demo](https://my-json-server.typicode.com/MostafaKMilly/demo)

### **Evaluation Criteria**

Your implementation will be evaluated based on:

- **Completeness:** Coverage of all required features.
- **Code Quality:** Clean, structured, and well-documented code.
- **User Experience:** A responsive and user-friendly interface.
- **Performance:** Efficient handling of large datasets.
- **Proper Use of Technologies:** Effective utilization of the specified libraries and frameworks.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
