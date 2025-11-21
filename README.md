# TinyLink

[![Live Demo](https://img.shields.io/badge/Live%20App-TinyLink-blue?logo=vercel)](https://tiny-link-umber.vercel.app)

A modern, full-stack URL shortener built with **Next.js 16 App Router** and **PostgreSQL (NeonDB)**, now LIVE at  
👉 [https://tiny-link-umber.vercel.app](https://tiny-link-umber.vercel.app)

..
---
## 🌐 Demo / Live Project

You can test, create, and manage short links here:  
👉 [https://tiny-link-umber.vercel.app](https://tiny-link-umber.vercel.app)


## 🚀 Features

- **Create Short Links:** Enter any URL or use custom shortcodes.
- **Easy Redirection:** Visit `/code` to be instantly redirected to your long URL.
- **Dashboard:** View, copy, and delete all your short links.
- **Click Tracking:** Tracks clicks (views) and last access date.
- **Robust Error Handling:** Graceful UX for invalid or expired links.
- **Full API:** Modern REST handlers for GET, POST, DELETE.
- **Next.js 16 App Router:** Latest folder/file conventions and serverless functions.

---

## 🖥️ Tech Stack

- **Frontend:** React, Next.js 16 (App Router)
- **Backend:** Next.js API handlers (Route Handlers)
- **Database:** PostgreSQL (NeonDB free tier)
- **Deployment:** Vercel (recommended), or any Node.js-compatible host

---

## 🔧 Local Development Setup

1. **Clone the Repo**
    ```
    git clone https://github.com/Jyothinadh025/TinyLink.git
    cd TinyLink
    ```

2. **Install Dependencies**
    ```
    npm install
    # or
    yarn
    ```

3. **Set Up Environment Variables**

    - Copy `.env.example` to `.env.local`:
      ```
      cp .env.example .env.local
      ```
    - Fill in your NeonDB/Postgres connection string:
      ```
      DATABASE_URL=your_neon_postgres_connection_string
      ```

4. **Run Locally**
    ```
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000)

---

## 🌍 Deploying to Vercel

1. **Push your code to GitHub** (see steps above).
2. Go to [https://vercel.com](https://vercel.com), import your repo.
3. In Vercel dashboard, set your `.env` variables (use your PostgreSQL URL).
4. Click "Deploy."  
   - After a minute, your live app will be at:  
      ```
      https://your-vercel-project.vercel.app
      ```

---

## 📸 Screenshots

*(Insert screenshots of the dashboard, creation page, successful redirect, etc. if desired)*

---

## ❓ FAQ / Troubleshooting

- **404 or ‘Link not found’ errors:**  
  Make sure your short code exists in the database and that you’re using Next.js 16+ (`await context.params` in route handlers!).

- **Database errors:**  
  Double-check your `DATABASE_URL` in `.env.local`.  
  Table schema should have at least: `id`, `code`, `target_url`, `clicks`, `last_clicked`, `created_at`.

---

## 🙋‍♂️ Author

- [Jyothinadh025](https://github.com/Jyothinadh025)
- Email/contact: ajyothinadh@gmail.com

---

## 📄 License

MIT – free to use, remix, or deploy!

---

*Built as a modern portfolio/assignment project using Next.js best practices (2025).*
