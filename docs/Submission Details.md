### **Features Implemented**

**Image Management:**

- Built a responsive image gallery with functionalities to view, and delete images.
- Added a filtering functionality and integrate it with react-query for images, allowing users to filter by name, metadata, and category (via dynamic chips).
- Implemented a hover feature to display the number of annotations per image, optimizing performance with cleanup hooks to manage React Query keys for inactive images.
- Ensured a dynamic and responsive React Window implementation for the virtualized image list.

 **Category Management:**

- Developed CRUD functionalities for categories with a single reusable form for creating and updating categories.
- Displayed category counts dynamically, synced with React Query and application data state.
- Leveraged both server-side rendering (SSR) and client-side operations in the categories page for partial preloading (PPR), enabling optimal performance by providing initial data to React Query.

**Canvas Editor:**

- Designed an intuitive canvas editor using prior experience with OpenLayer concepts. Features include drawing rectangles, selecting colors, and managing canvas stats (e.g., tools, annotations).
- Implemented syncing with the backend for drawing and erasing operations using a UUID-based approach.
- Built loading and syncing UIs for annotations and ensured performance optimization during annotation creation and deletion.
- Add rectangle drawing tool.

**Other Features:**

- Optimized dynamic forms for filtering images but noted the limitation of not dynamically rendering filtering inputs due to time constraints.
- Created reusable components like a delete button with a confirmation modal.

---
### **Technical Aspects**

**Code Quality and Structure:**

- Defined **ESLint rules** to ensure clean, maintainable, and readable code.
- Built a simple, generic Resource API service for CRUD operations on resources using OOP principles.
- Created a centralized custom Axios instance for API configurations, including headers, error handling (integrated with Sentry), and mock API support.
- Split business logic into smaller hooks for better organization and maintainability.

**State Management:**

- Centralized React Query key management using a mapped structure for type-safe and consistent caching across operations, grouped by categories and images.
- Designed a route and search parameter mapper for consistent, centralized URL management, avoiding hardcoded strings.

**Configuration and Constants:**

- - Used a `configs` directory to manage constants, configurations, and mock setups for dashboards, canvas tools, and API settings.
- Introduced mock API adaptors to test caching and heavy loads without backend support, with utilities to generate mock data dynamically.

---
### **Performance Optimizations**

**React Window for Virtualized Lists:**

- Implemented infinite scrolling with loaders and optimized lazy-loaded images using Next.js's `Image` component.
- Enhanced UX by managing blank spaces during image loading and ensuring smooth scrolling with blur placeholders and image skeletons.
- I used responsive react-window list.

**Optimistic Updates:**

- Applied optimistic updates for deleting images and categories, ensuring smooth user interactions while invalidating React Query keys for consistency.

**Error Handling:**

- Centralized error management using Axios interceptors, React Query's `onError` handlers, and a global error wrapper in Next.js.
- Handled edge cases, such as unsupported API endpoints or large dataset failures, with proper user feedback.

**Loading States:**

- Ensured consistency in loading states by implementing skeletons and loaders to create seamless transitions.

---
### **APIs**

- Used an Axios adaptor to mock APIs for testing caching and performance under heavy data loads.
- Introduced utilities to generate mock data dynamically for testing.
- Configured mock servers to be enabled or disabled via `global.config`, allowing testing of error scenarios for new mock APIs (which aren't existed in the provided DB server).

---
### **Additional Notes**

- I enjoyed canvas and image gallery features as they had engaging aspects of the task.
- Didn’t focus on implementing stats cards beyond basic functionality (only counts of entities synced with React Query - charts are static).
- Ensured the app was fully mobile-friendly, even for complex components like React Window's auto-sizing list.
- Added comments to most files to explain the purpose and flow of each component for clarity and maintainability.

---
