# Project Overview

## Overview

This is a Persian fitness and nutrition tracking application built with a modern full-stack architecture. The app allows users to track their food intake, log workouts, monitor weight progress, and set fitness goals. The interface is designed with Persian/Farsi language support and includes features like calorie tracking, exercise logging, and progress visualization.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Shadcn/UI components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Mobile-First Design**: Responsive design with bottom navigation for mobile experience

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with structured route handling
- **Development Setup**: Hot reloading with Vite integration for full-stack development
- **Error Handling**: Centralized error handling middleware with structured error responses

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon Database serverless PostgreSQL connection
- **Data Modeling**: Strongly typed schemas with Zod validation integration

### Database Schema Design
- **Users**: Profile management with weight tracking and calorie goals
- **Foods**: Persian food database with nutritional information
- **Food Entries**: Meal logging with portion tracking and meal type categorization
- **Exercises**: Exercise database with muscle group targeting and calorie burn rates
- **Workout Sets**: Individual workout set tracking with weights, reps, and duration
- **Workouts**: Workout session management
- **Weight Entries**: Historical weight tracking for progress monitoring

### Authentication and Authorization
- Currently uses mock user IDs for development
- Session-based authentication infrastructure prepared
- User isolation implemented in data queries

### Performance Optimizations
- React Query for intelligent caching and background updates
- Component-based architecture for code reusability
- Optimistic updates for better user experience
- Lazy loading and code splitting capabilities

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database queries and migrations

### UI and Styling
- **Radix UI**: Headless UI components for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety across the entire stack
- **ESBuild**: Fast JavaScript bundler for production builds

### State Management
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management with validation

### Validation and Schemas
- **Zod**: Runtime type validation
- **Drizzle Zod**: Integration between Drizzle schemas and Zod validation

### Development Environment
- **Replit**: Cloud development environment with live preview
- **Node.js**: JavaScript runtime for server-side execution