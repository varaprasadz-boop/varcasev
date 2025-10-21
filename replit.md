# VARCAS Electric Vehicles - Project Documentation

## Overview

VARCAS is a comprehensive electric vehicle (e-bike and e-scooter) manufacturer website showcasing their product lineup, company information, and dealer network. The application serves as both a marketing platform and information hub for customers interested in sustainable electric mobility solutions.

**Core Purpose**: Provide an engaging, informative platform for customers to explore VARCAS electric vehicles, locate dealers, apply for careers, and inquire about products or partnerships.

**Tech Stack**: React SPA with TypeScript, Express backend, PostgreSQL database (via Drizzle ORM), and shadcn/ui component library.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server.

**Routing**: Wouter for client-side routing - a lightweight alternative to React Router. Routes include:
- Home (`/`)
- About (`/about`)
- Vehicle details (`/vehicle/:slug`)
- Joint ventures, dealer finder, spare parts, careers, and press pages

**UI Component System**: shadcn/ui (New York style variant) - a collection of re-usable Radix UI primitives with Tailwind CSS styling. Components are copied into the project rather than imported as dependencies, allowing for full customization.

**State Management**: 
- React Query (TanStack Query) for server state and data fetching
- React Hook Form with Zod for form validation
- Local component state via React hooks

**Styling Approach**:
- Tailwind CSS with custom design system (defined in `design_guidelines.md`)
- Dark mode optimized color palette with brand yellow/gold (#F5A623) as primary
- CSS custom properties for theming (HSL color space)
- Consistent spacing scale and typography system

**Data Organization**: Frontend components updated to fetch data from PostgreSQL database via REST API. Key components (HeroSection, StatsSection, Testimonials) use React Query for data fetching with fallback to static data. Admin can manage all content through the CMS.

### Backend Architecture

**Server Framework**: Express.js with TypeScript, serving both API routes and the built React application in production.

**Development Setup**: Vite middleware integration for hot module replacement (HMR) during development. The server conditionally loads Vite in development mode for seamless client-side development experience.

**API Structure**: Comprehensive RESTful API with `/api` prefix. Includes:
- Public routes: vehicles, hero-slides, testimonials, stats, press articles, job openings, dealers, FAQ
- Admin routes: Full CRUD operations for all content types, protected by authentication middleware
- Authentication: Session-based auth using express-session with MemoryStore

**Storage Layer**: `DatabaseStorage` class implementing full CRUD operations for all 16 content areas:
- Vehicles (with colors, specifications, smart features)
- Hero slides, testimonials, stats
- Company info, team members, values
- Press articles, job openings
- Dealers, joint ventures, strategic partners
- FAQ categories and questions
- Form submissions
- Site settings and SEO metadata

**Authentication**: 
- Session middleware configured with express-session and MemoryStore
- Bcrypt password hashing (10 rounds)
- Role-based access control (super_admin, admin, content_manager, etc.)
- Protected routes with requireAuth and requireAdmin middleware

### Database Design

**ORM**: Drizzle ORM - type-safe TypeScript ORM with minimal runtime overhead.

**Schema Definition**: Comprehensive schema in `shared/schema.ts` covering 16 major content areas:
- Users (with roles and authentication)
- Vehicles (with colors, specifications, smart features relationships)
- Content: hero slides, testimonials, stats, environmental impacts
- Company: info, values, team members
- Press & media, job openings, FAQ
- Dealers, joint ventures, strategic partners
- Form submissions with response tracking
- Site settings and SEO metadata
- All tables have automatic updatedAt triggers ($onUpdate(() => sql`now()`))
- Zod schemas generated from Drizzle tables for runtime validation

**Migration Strategy**: Drizzle Kit for schema migrations with output to `./migrations` directory.

**Database Provider**: PostgreSQL via Neon serverless driver (`@neondatabase/serverless`).

**Current State**: 
- Database fully operational with comprehensive schema
- Seeded with admin user (username: admin, password: admin123)
- DatabaseStorage class handles all CRUD operations
- API routes serve data to frontend
- Admin CMS fully functional for content management

### Design System

**Color Philosophy**: Dark-mode first design inspired by premium EV manufacturers (Tesla, Rivian):
- Primary: Brand yellow/gold for CTAs and accents
- Backgrounds: Multiple shades of black/charcoal for depth
- Accent: Electric blue for tech features

**Typography**:
- Headers: Inter/Poppins (600-700 weight)
- Body: Inter (400-500 weight)
- Stats/Numbers: Space Grotesk (500-600 weight)

**Component Patterns**:
- Cards with hover elevation effects (`hover-elevate` utility class)
- Consistent padding scale (py-16, py-24, py-32 for sections)
- Badge system for certifications and categories
- Dialog-based forms for enquiries and applications

### Key Features

**Smart Features Showcase**: GPS tracking, battery management, trip tracking, and smart alerts are highlighted throughout the application to emphasize the connected nature of VARCAS vehicles.

**Vehicle Gallery**: Dynamic vehicle detail pages with color selection, image carousel, specifications grid, and smart features breakdown.

**Dealer Locator**: State/district/city filtering for finding authorized dealers with contact information.

**Forms & Dialogs**: Reusable dialog components for:
- General enquiries (`EnquiryDialog`)
- Partnership applications (`PartnershipDialog`)
- Job applications (`JobApplicationDialog`)

**Content Management System**: Full-featured admin CMS with:
- Authentication (login/logout with session management)
- Protected admin routes requiring authentication
- Dashboard with content overview
- Form submissions viewer with response capability
- Ready for expansion to manage all content types (vehicles, press, jobs, dealers, etc.)
- All management operations go through authenticated API routes

## External Dependencies

### UI & Component Libraries
- **Radix UI**: Accessible, unstyled component primitives (dialogs, dropdowns, navigation, etc.)
- **shadcn/ui**: Pre-styled Radix components with Tailwind CSS
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Carousel/slider functionality for hero section and testimonials

### Forms & Validation
- **React Hook Form**: Performant form state management
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Zod resolver for React Hook Form integration

### Data Fetching
- **TanStack Query (React Query)**: Server state management, caching, and data synchronization

### Database & ORM
- **Drizzle ORM**: TypeScript ORM with PostgreSQL support
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon
- **drizzle-zod**: Generate Zod schemas from Drizzle tables

### Routing & Navigation
- **Wouter**: Minimalist routing library (2KB alternative to React Router)

### Build & Development Tools
- **Vite**: Fast build tool and dev server with HMR
- **TypeScript**: Type safety across frontend and backend
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS & Autoprefixer**: CSS processing

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Code mapping for Replit IDE
- **@replit/vite-plugin-dev-banner**: Development mode indicator

### Asset Management
- Custom alias for attached assets (`@assets`) pointing to `attached_assets` directory
- Stock images and brand assets stored in repository
- **Object Storage Integration**: Replit Object Storage configured for vehicle image uploads
  - Protected file uploading with admin authentication
  - Presigned URLs for direct-to-cloud uploads via Uppy
  - ACL policies for public vehicle images accessible to all authenticated users
  - Files served via `/objects/` endpoint with authentication check

### Future Considerations
- Session management via `connect-pg-simple` (included but not actively used)
- Database implementation ready but currently using in-memory storage
- Email/SMS integration for form submissions (console.log currently used)