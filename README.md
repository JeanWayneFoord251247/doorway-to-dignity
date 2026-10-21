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

>
>-**Frontend Clients**
>  - AWS Amplify: doorwaytodignityow251247.co.za
> - Render: doorway-to-dignity-1.onrender.com
>
>-**Backend Services**
>  - AWS Elastic Beanstalk (Node.js/Express)
>  - Render Web Services (Node.js/Express)
>
>-**Database Cluster**
>  - MongoDB Atlas (Cloud)

---

## Features

-**Volunteer Event Discovery:** View public scheduled events, their detail, dates, and their locations.  <br/>
-**Dynamic Sitemap Engine:** A full server-rendered CML Sitemap querying MongoDB collections for search engine indexing  <br/>
-**Dual-Cloud Deployment:** Live deployment across AWS and Render with multi-origin CORS validation.  <br/>
-**Role-Based Access Control:** Specific workflows for authenticated volunteers and administrative managers.  <br/>
-**Google Search Console and SEO:** Domain-level DNS verification, custom Open Graph meta tags, canonical link headers, and robots.txt crawler policies.  <br/>
-**GA4(Google Analytics 4) Pipeline:** Custom conversion event tracking (sign_up, modal engagements) with internal developer IP filtering.  <br/>

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
<p>backend/</p>
<p>.ebextensions/         # AWS Elastic Beanstalk deployment config</p> 
<p>middleware/            # Auth verification and route security (authMiddleware.js)</p> 
<p>models/                # Mongoose data schemas (Event.js, Faq.js, User.js)</p> 
<p>routes/                # Express API endpoints (authRoutes.js, eventRoutes.js, faqRoutes.js)</p> 
<p>.env                   # Local environment variables</p> 
<p>procfile               # Elastic Beanstalk process definition</p> 
<p>server.js              # Express app, CORS configuration, and dynamic sitemap route</p> 

<p>frontend/ 
<p>public/                # Static assets served as-is (robots.txt, sitemap.xml, icons)</p> 
<p>src/</p> 
<p>─ assets/              # Static media (banner images, branding)</p> 
<p>─ components/          # Reusable UI components</p> 
<p>─ css/                 # Custom component stylesheets</p> 
<p>─ hooks/               # Custom React lifecycle hooks</p> 
<p>─ pages/               # Primary view routes (Home, Volunteer, FAQ, Login, Signup)</p> 
<p>─ App.jsx              # Main routing, navigation structure and GA4 initialization</p> 
<p>─ main.jsx             # React entry point</p>  
<p>.env.development       # Local environment variables</p> 
<p>.env.production        # Production environment variables</p> 
<p>index.html             # SEO meta tags</p> 
<p>vite.config.js         # Vite build pipeline setup</p> 
```


---
