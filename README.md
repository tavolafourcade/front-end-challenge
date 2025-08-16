# Image Annotation Tool

A modern, interactive image annotation application built with React, TypeScript, and Vite. This tool allows users to annotate images with bounding boxes and categorize detected objects for machine learning training datasets.

## 🚀 Features

### Core Functionality
- **Image Queue Management**: Fetch and navigate through unanalyzed images sequentially
- **Interactive Bounding Box Drawing**: Draw single bounding boxes on images using pointer events
- **Category Selection**: Choose from fetched categories with real-time search filtering
- **Annotation Submission**: Submit or discard annotations with normalized coordinate data
- **Automatic Navigation**: Loop through images with automatic progression after annotation

### User Experience
- **Responsive Design**: Optimized layout that adapts to different screen sizes
- **Loading States**: Skeleton components and loading indicators throughout the app
- **Toast Notifications**: Real-time feedback for user actions and API responses
- **Accessibility Support**: Keyboard navigation and ARIA attributes
- **Visual Feedback**: Clear visual indicators for selected categories and active images

### Technical Features
- **Normalized Coordinates**: Bounding boxes stored as ratios [0,1] for consistency across image scales
- **Performance Optimizations**: Memoized calculations, lazy loading, and efficient re-renders
- **Type Safety**: Full TypeScript implementation with Zod schema validation
- **Error Handling**: Robust error boundaries and graceful failure handling
- **State Management**: Zustand for UI state, React Query for server state

## 🛠️ Tech Stack

### Core Technologies
- **React 19** with functional components and hooks
- **TypeScript** for type safety and developer experience
- **Vite** for fast development and build tooling
- **Tailwind CSS** for utility-first styling

### State Management & Data Fetching
- **@tanstack/react-query** for server state management, caching, and mutations
- **Zustand** for client-side UI state (selected category, active image, annotations)
- **Zod** for runtime schema validation and type inference

### Development Tools
- **ESLint** with TypeScript and React-specific rules
- **Prettier** for consistent code formatting
- **pnpm** for efficient package management

### Utilities
- **Sonner** for toast notifications
- **@tanstack/react-virtual** for future virtualization support

## 📁 Project Structure

```
src/
├── app/                    # App-level providers and configuration
├── components/             # Shared UI components
│   └── ui/                # Base UI components (Skeleton, etc.)
├── features/              # Feature-based modules
│   ├── analyzer/          # Main annotation interface
│   │   ├── components/    # Canvas, skeletons
│   │   ├── containers/    # Business logic containers
│   │   └── utils/         # Bounding box utilities
│   ├── categories/        # Category selection
│   │   ├── components/    # List, search, buttons
│   │   └── containers/    # Category logic
│   └── images/            # Image queue management
│       ├── components/    # Queue display
│       └── containers/    # Queue logic
├── lib/                   # Shared libraries
│   └── api/              # API client and endpoints
│       ├── httpClient.ts  # HTTP client with error handling
│       ├── schemas.ts     # Zod schemas
│       └── endpoints.ts   # API endpoint functions
└── stores/               # Zustand state stores
    ├── annotationStore.ts # Bounding box state
    ├── categoryStore.ts   # Selected category
    └── imageQueueStore.ts # Active image
```

## 🏗️ Architecture Decisions

### Container/Presentational Pattern
- **Containers**: Handle business logic, API calls, and state management
- **Components**: Pure presentational components focused on UI rendering
- Clear separation of concerns for better testability and reusability

### Service Layer
- **HTTP Client**: Centralized API client with timeout, error handling, and AbortController
- **Schema Validation**: Runtime validation with Zod for type safety and error prevention
- **Endpoint Functions**: Clean, typed API methods with automatic validation

### State Architecture
- **Server State**: React Query for caching, synchronization, and optimistic updates
- **UI State**: Zustand stores for component-specific state (selections, UI interactions)
- **Normalized Data**: Consistent coordinate system independent of display size

### Performance Strategy
- **Memoization**: Strategic use of useMemo and useCallback for expensive operations
- **Lazy Loading**: Image loading optimization with native lazy loading
- **Prefetching**: Next image prefetching for smooth user experience

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 20.x or higher (see `.nvmrc`)
- **pnpm**: Latest version

### Installation
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Development Scripts
```bash
# Linting
pnpm lint          # Check for linting errors
pnpm lint:fix      # Auto-fix linting errors

# Formatting
pnpm format        # Format code with Prettier
pnpm format:check  # Check formatting without changes
```

## 🔌 API Integration

### Endpoints Used
- **GET** `/categories` - Fetch available annotation categories
- **GET** `/unanalyzed-images` - Fetch images requiring annotation
- **POST** `/annotations` - Submit annotation data

### Annotation Payload Structure
```typescript
{
  imageId: number,
  annotations: [
    {
      categoryId: number,
      boundingBoxes: [
        {
          topLeftX: number,    // Pixel coordinates
          topLeftY: number,    // in original image size
          width: number,
          height: number
        }
      ]
    }
  ]
}
```

## 🎯 Key Implementation Details

### Bounding Box Coordinate System
- **Internal Storage**: Normalized coordinates [0,1] relative to rendered image
- **API Submission**: Converted to pixel coordinates based on natural image dimensions
- **Benefits**: Resolution-independent, responsive design compatible

### Error Handling Strategy
- **Network Errors**: Automatic retry with exponential backoff
- **Validation Errors**: Runtime schema validation with user-friendly messages
- **UI Errors**: Toast notifications with actionable feedback

### Accessibility Features
- **Keyboard Navigation**: Tab navigation through interactive elements
- **ARIA Attributes**: Proper labeling for screen readers
- **Focus Management**: Logical focus flow and visual indicators
- **Color Contrast**: Sufficient contrast ratios for readability

## 🔮 Future Enhancements

### Planned Features
- **Multiple Bounding Boxes**: Support for multiple annotations per image
- **Zoom Functionality**: Image zoom and pan capabilities
- **Keyboard Shortcuts**: Power user keyboard navigation
- **Undo/Redo System**: Action history with state restoration
- **Batch Operations**: Bulk annotation processing

### Performance Optimizations
- **Virtual Scrolling**: Efficient handling of large image queues
- **Image Caching**: Advanced caching strategies for faster loading
- **Background Processing**: Worker threads for intensive operations

### Advanced Features
- **Real-time Collaboration**: Multi-user annotation sessions
- **Export Capabilities**: Multiple format export (JSON, XML, COCO)
- **Advanced Filtering**: Complex category and image filtering
- **Analytics Dashboard**: Annotation progress and quality metrics
