# 🌐 Nourish360 Deployment Guide

This guide explains how to deploy **Nourish360** to the cloud so anyone around the world can access it via a public URL.

---

## 📦 Architecture Options for Deployment

You have two simple options:

| Strategy | Best For | Platform | Setup Difficulty |
| :--- | :--- | :--- | :--- |
| **Option A (Recommended)** | Separate high-speed CDN + Node API + Cloud DB | **Vercel** (Frontend) + **Render** (Backend) + **MongoDB Atlas** | ⭐ Easy (10 mins) |
| **Option B (All-in-One)** | Single URL, single server running both frontend + API | **Render** or **Railway** Web Service | ⭐⭐ Very Easy |

---

## 🛠️ Step 1: Push Your Project to GitHub

1. Open PowerShell in your desktop folder:
   ```powershell
   cd C:\Users\MP\Desktop\nourish360
   ```
2. Initialize git and commit:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit - Nourish360 platform"
   ```
3. Create a new repository on [GitHub](https://github.com/new) named `nourish360`.
4. Link and push:
   ```powershell
   git remote add origin https://github.com/YOUR_USERNAME/nourish360.git
   git branch -M main
   git push -u origin main
   ```

---

## 🍃 Step 2: Set Up Free Cloud MongoDB (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account.
2. Create a **Shared Free Cluster (M0 Sandbox)** (100% free forever).
3. Under **Database Access**, create a user (e.g., `nourish_admin` and password).
4. Under **Network Access**, click **Add IP Address** ➔ Select **Allow Access from Anywhere (`0.0.0.0/0`)**.
5. Click **Connect** ➔ **Connect your application** ➔ Copy the Connection String:
   ```
   mongodb+srv://nourish_admin:<password>@cluster0.abcde.mongodb.net/nourish360?retryWrites=true&w=majority
   ```

---

## 🚀 Step 3: Deploy Backend (Render.com)

1. Sign up on [Render.com](https://render.com/).
2. Click **New +** ➔ **Web Service**.
3. Connect your GitHub repository `nourish360`.
4. Configure the settings:
   - **Name**: `nourish360-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`
5. Add **Environment Variables** under the Environment tab:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
   - `JWT_SECRET` = `your_super_secret_jwt_key_2026`
   - `MONGODB_URI` = *(your MongoDB Atlas URI from Step 2)*
   - `CLIENT_URL` = `https://your-frontend-domain.vercel.app`
6. Click **Create Web Service**.
7. Render will provide a live URL (e.g., `https://nourish360-api.onrender.com`).
   - Test it at: `https://nourish360-api.onrender.com/api/health`

---

## ⚡ Step 4: Deploy Frontend (Vercel)

1. Sign up on [Vercel.com](https://vercel.com/).
2. Click **Add New...** ➔ **Project** ➔ Import your `nourish360` repository.
3. Configure the settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Under **Environment Variables**, add:
   - `VITE_API_URL` = `https://nourish360-api.onrender.com` *(your backend Render URL)*
5. Click **Deploy**.
6. In ~60 seconds, Vercel will give you a global public domain (e.g., `https://nourish360.vercel.app`)!

---

## 🎉 Your Application is Now Live to the World!

- Users worldwide can access: **`https://your-app.vercel.app`**
- All signups, 8-step onboarding submissions, meal swaps, and progress charts will sync safely to your cloud database.