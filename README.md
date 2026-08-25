#  Raj Ply Lam Website

A modern business website built for **Raj Ply Lam** to showcase the business and make it easier for customers to send product inquiries online.

The project also includes a **private admin dashboard** where the business owner can securely view and manage customer inquiries. 🚀

---

## ✨ What This Project Does
<img width="1137" height="912" alt="Screenshot 2026-08-25 124653" src="https://github.com/user-attachments/assets/c98aac98-6837-4024-9c13-e6e1d6acf336" />


The workflow is simple:

1. 👤 Customer visits the website.
2. 📝 Customer submits an inquiry.
3. 🔍 Backend validates the inquiry using Zod.
4. 💾 Inquiry is saved to PostgreSQL using Prisma.
5. 🔐 Owner logs into `/admin`.
6. 📊 Owner can view and search all submitted inquiries.

There is no customer login, OTP, email/SMS service, or paid messaging dependency.

---

##  Tech Stack

| Layer | Technology |
|---|---|
|  Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + Framer Motion |
|  Forms | React Hook Form + Zod |
|  Backend | Node.js + Express |
|  Database | PostgreSQL + Prisma ORM |
|  Hosting | Vercel + Node.js Hosting |

---

## 📁 Project Structure

```text
raj-ply-lam/
├── client/     # React website + admin dashboard
└── server/     # Express API + Prisma + PostgreSQL
└── Readme.md   # Information
