# Furniture Web App Development Plan (MERN + Next.js + Tailwind)

This document outlines the step-by-step structure to build an online furniture store. Mark each step as completed by checking the box.

---

## 1. Project Setup
- [x] Initialize monorepo or separate folders for backend and frontend
- [x] Initialize Git repository
- [x] Setup README and .gitignore

## 2. Backend (Express + MongoDB)
- [x] Initialize Node.js backend with Express (now in TypeScript)
- [x] Setup MongoDB connection (Mongoose)
- [x] Define User, Product, Order, Cart models
- [x] Implement authentication (JWT, bcrypt)
- [x] CRUD APIs for products
- [x] Cart and order APIs
- [x] Admin APIs (add/edit/delete products)
- [x] Seed database with sample furniture
- [x] API error handling and validation

> **Note:** Backend is now fully migrated to TypeScript. All new backend code should use `.ts` files and TypeScript best practices.

## 3. Frontend (Next.js + Tailwind)
- [x] Initialize Next.js app
- [x] Setup Tailwind CSS
- [x] Configure absolute imports/aliases (already set in tsconfig.json; create src/components and src/utils folders as needed)
- [x] Create main layout and navigation
- [x] Home page: featured products, categories
- [x] Product listing page
- [x] Product detail page
- [x] Cart page
- [x] Checkout page
- [x] User authentication (login/register)
- [x] User profile page (orders, info)
- [ ] Admin dashboard (manage products/orders)
- [ ] Responsive/mobile design

> **Note:** All above pages are implemented and most are integrated with backend data. Admin dashboard and responsive polish remain.

## 4. Integration
- [x] Connect frontend to backend APIs
- [x] Implement authentication flow (frontend/backend)
- [x] Cart and checkout integration
- [ ] Order placement and confirmation

## 5. Testing
- [ ] Backend API tests (Jest/Supertest)
- [ ] Frontend component/page tests (Jest/React Testing Library)
- [ ] End-to-end tests (Cypress/Playwright)

## 6. Deployment
- [ ] Prepare environment variables
- [ ] Deploy backend (Render/Heroku/Vercel/other)
- [ ] Deploy frontend (Vercel/Netlify)
- [ ] Connect custom domain
- [ ] Monitor and error tracking (Sentry/LogRocket)

---

**Legend:**
- [ ] Not started
- [x] Done

Update this file as you progress to keep track of completed steps. 