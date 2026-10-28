<p align="center">
  <img src="./frontend/src/assets/img/banner.png" alt="Doorway to Dignity Banner" width="100%" />
</p>

<h1 align="center">Doorway to Dignity</h1>

<p align="center">
  <em>One Step at a Time, One Life at a Time.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%20%7C%20Vite-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?logo=node.js&logoColor=white" alt="Node" />
  <img src="https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Hosting-AWS%20%26%20Render-FF9900?logo=amazon-aws&logoColor=white" alt="AWS and Render" />
</p>

---

## Architecture Overview

> **Frontend Clients**
>
> - AWS Amplify: doorwaytodignityow251247.co.za
> - Render: doorway-to-dignity-1.onrender.com
>
> **Backend Services**
>
> - AWS Elastic Beanstalk (Node.js/Express)
> - Render Web Services (Node.js/Express)
>
> **Database Cluster**
>
> - MongoDB Atlas (Cloud)

---

## Designed By

- Shanae Van Eeden, 251010
- Lesedi Chocho, 252073
- Dihan Janse van Rensburg, 251030
- Justin Dubbelman, 251227
- René Mtshatsheni, 251126

---

## Features

- **Volunteer Event Discovery:** View public scheduled events, their detail, dates, and their locations. <br/>
- **Dynamic Sitemap Engine:** A full server-rendered CML Sitemap querying MongoDB collections for search engine indexing <br/>
- **Dual-Cloud Deployment:** Live deployment across AWS and Render with multi-origin CORS validation. <br/>
- **Role-Based Access Control:** Specific workflows for authenticated volunteers and administrative managers. <br/>
- **Google Search Console and SEO:** Domain-level DNS verification, custom Open Graph meta tags, canonical link headers, and robots.txt crawler policies. <br/>
- **GA4(Google Analytics 4) Pipeline:** Custom conversion event tracking (sign_up, modal engagements) with internal developer IP filtering. <br/>

---

## Live Production Links

<table border="1">
  <tr>
    <th>Service</th>
    <th>Provider</th>
    <th>Production Link</th>
  </tr>
  <tr>
    <td>Primary Frontend</td>
    <td>AWS Amplify</td>
    <td>https://www.doorwaytodignityow251247.co.za</td>
  </tr>
  <tr>
    <td >Primary Backend</td>
    <td>Elastic Beanstalk</td>
    <td>https://api.doorwaytodignityow251247.co.za</td>
  </tr>
  <tr>
    <td >Secondary Frontend</td>
    <td>Render</td>
    <td>https://doorway-to-dignity-1.onrender.com</td>
  </tr>
  <tr>
    <td >Secondary Backend</td>
    <td>Render</td>
    <td>https://doorway-to-dignity-3t2b.onrender.com</td>
  </tr>
  <tr>
    <td >Sitemap</td>
    <td></td>
    <td>https://www.doorwaytodignityow251247.co.za/sitemap.xml</td>
  </tr>
</table>

---

## Project Structure

```
backend/</p>
middleware/            # Auth verification and route security (authMiddleware.js)
models/                # Mongoose data schemas (Event.js, Faq.js, User.js)
routes/                # Express API endpoints (authRoutes.js, eventRoutes.js, faqRoutes.js)
.env                   # Local environment variables
server.js              # Express app, CORS configuration, and dynamic sitemap route

frontend/
public/                # Static assets served as-is (robots.txt, sitemap.xml, icons)
src/
─ assets/              # Static media (banner images, branding)
─ components/          # Reusable UI components
─ css/                 # Custom component stylesheets
─ hooks/               # Custom React lifecycle hooks
─ pages/               # Primary view routes (Home, Volunteer, FAQ, Login, Signup)
─ App.jsx              # Main routing, navigation structure and GA4 initialization
─ main.jsx             # React entry point
.env.development       # Local environment variables
.env.production        # Production environment variables
index.html             # SEO meta tags
vite.config.js         # Vite build pipeline setup

```

---

## Local Development Setup

1. Prerequisites
   - Node.js (v18 or v20)
   - npm
   - MongoDB Atlas cluster

2. Backend Setup

```
    cd backend
    npm install
    nodemon server.js
```

3. Frontend Setup

```
    cd frontend
    npm install
    npm run dev
```

---

## Deployment Configuration Notes

### Single Page Application (SPA) Rewrites

#### AWS Amplify

Added rewrite rules mapping `/sitemap.xml` directly to target resources, with negative lookaheads redirecting remaining web document requests to `/index.html` to preserve client-side routing.

#### Render

I implemented an explicit rewrite rule in the Render dashboard:

- **Source:** `/*`
- **Destination:** `/index.html`
- **Action:** Rewrite (200)

---

## Cross-Origin Resource Sharing (CORS)

`backend/server.js` maintains an explicit whitelist to handle requests and preflight `OPTIONS` calls across domains:

```
const allowedOrigins = [
  'https://doorwaytodignityow251247.co.za',
  'https://www.doorwaytodignityow251247.co.za',
  'https://doorway-to-dignity-1.onrender.com',
  'http://localhost:5173',
];
```

## Mockups

<p align="center">
  <img src="/frontend/src/assets/img/laptop.png" alt="Doorway to dignity Laptop" width="100%" />
</p>

<p align="center">
  <img src="/frontend/src/assets/img/tablet.png" alt="Doorway to dignity Tablet" width="100%" />
</p>

<p align="center">
  <img src="/frontend/src/assets/img/phone.png" alt="Doorway to dignity Phone" width="100%" />
</p>

---

## Documentation


