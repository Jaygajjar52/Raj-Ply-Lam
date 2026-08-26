#  Raj Ply Lam Website

A modern business website built for **Raj Ply Lam** to showcase the business and make it easier for customers to send product inquiries online.

The project also includes a **private admin dashboard** where the business owner can securely view and manage customer inquiries. 🚀

---

## ✨ What This Project Does
<img width="1137" height="912" alt="Screenshot 2026-08-25 124653" src="https://github.com/user-attachments/assets/c98aac98-6837-4024-9c13-e6e1d6acf336" />
<img width="1914" height="671" alt="Screenshot 2026-08-25 135557" src="https://github.com/user-attachments/assets/6be79686-bdfd-4cb3-a19a-9bdf97d0637a" />
<img width="1910" height="908" alt="Screenshot 2026-08-25 140428" src="https://github.com/user-attachments/assets/e2d639b6-e46c-4bc9-a0fb-df311e3c8197" />
<img width="1909" height="905" alt="Screenshot 2026-08-25 140445" src="https://github.com/user-attachments/assets/7892c501-4133-44c9-a203-860fb359cb90" />
<img width="1917" height="909" alt="Screenshot 2026-08-25 140507" src="https://github.com/user-attachments/assets/5b2bbf9f-685c-471f-89ae-5f54984b0148" />
<img width="1919" height="913" alt="Screenshot 2026-08-25 140530" src="https://github.com/user-attachments/assets/d6b4894f-bbbd-4d3d-b35c-3210ae9fd13c" />





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
