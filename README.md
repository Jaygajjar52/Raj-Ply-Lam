# Raj Ply Lam Website

Production-ready website for Raj Ply Lam, with a public inquiry form and a private
admin dashboard for the owner to review every saved lead.

The flow is simple:

1. Customer submits an inquiry on the website.
2. The backend validates it with Zod.
3. The inquiry is saved to Supabase PostgreSQL through Prisma.
4. The owner logs into the private dashboard at `/admin` and reviews the details.

There is no customer login, no OTP service, no email/SMS notification system, and no
paid messaging dependency in this version.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + Framer Motion |
| Forms | React Hook Form + Zod |
| Backend | Node.js + Express |
| Database | PostgreSQL + Prisma ORM |
| Hosting | Vercel for frontend, any Node host for backend |

---

## Repository Layout

```text
raj-ply-lam/
|-- client/     # React website and private admin screen
`-- server/     # Express API + Prisma + Supabase Postgres
```

Key backend files:

```text
server/src/index.ts
server/src/routes/inquiry.ts
server/src/routes/admin.ts
server/src/controllers/inquiryController.ts
server/src/controllers/adminController.ts
server/src/lib/adminAuth.ts
server/src/lib/prisma.ts
server/src/lib/validation.ts
```

---

## Local Setup

### 1. Database

Use Supabase Postgres or any PostgreSQL database.

```bash
cd server
npm install
npm run db:push
```

### 2. Backend

Create `server/.env` from the example file and fill in:

```env
DATABASE_URL="postgresql://user:password@host:5432/db?schema=public"
DIRECT_URL="postgresql://user:password@host:5432/db"
ADMIN_PHONE="9427049594"
ADMIN_PASSWORD="your-private-pin"
ADMIN_SESSION_SECRET="replace-with-a-long-random-string"
ADMIN_COOKIE_SAMESITE="Lax"
CLIENT_ORIGIN="http://localhost:5173"
PORT=4000
```

Then run:

```bash
npm run dev
```

### 3. Frontend

```bash
cd client
npm install
npm run dev
```

---

## Public Inquiry Flow

```text
Customer fills the form
        ->
POST /api/inquiry
        ->
Zod validation
        ->
Save inquiry to Supabase PostgreSQL using Prisma
        ->
Return success to the customer
```

The public form stores:

- Full name
- Mobile number
- Optional email
- Optional product
- Optional category
- Optional quantity
- Optional city
- Message

The inquiry is saved first. If any later step fails, the saved record stays in the
database.

---

## Private Admin Dashboard

The private dashboard is at `/admin`.

Login uses:

- Mobile number
- Private access code

This is intentionally free and self-contained. It does not require OTP, SMS, email, or
any external auth provider.

After logging in, the owner can:

- View all inquiries
- Search by name, phone, product, city, or message
- See inquiry ID, timestamps, IP address, and form details
- Refresh the inbox
- Log out

---

## Deployment

### Frontend on Vercel

1. Push the repo to GitHub.
2. Create a Vercel project from the repo.
3. Set the root directory to `client`.
4. Deploy with the Vite preset.
5. Set `VITE_API_BASE_URL` to the deployed backend API URL, ending in `/api`.
   Example: `https://raj-ply-lam-api.onrender.com/api`.

Vercel provides a free `*.vercel.app` deployment domain on the Hobby plan. If you want
a custom domain like `rajplylam.in`, that domain must be purchased separately from a
domain registrar.

### Backend

Deploy the `server` folder to any Node host and set the same environment variables as in
`server/.env`.

For production, set:

```env
NODE_ENV="production"
CLIENT_ORIGIN="https://your-vercel-site.vercel.app"
ADMIN_COOKIE_SAMESITE="None"
```

If you also connect a custom domain, include both origins separated by commas:

```env
CLIENT_ORIGIN="https://rajplylam.in,https://your-vercel-site.vercel.app"
```

Make sure `CLIENT_ORIGIN` exactly matches the deployed frontend URL, including `https://`.

### Database

Supabase Free is enough for a small lead inbox to start with. If the business grows,
upgrade the database plan later.

---

## Health and API

- `GET /api/health` returns a basic API health check.
- `POST /api/inquiry` saves a customer inquiry.
- `POST /api/admin/login` signs the owner in.
- `GET /api/admin/me` checks the admin session.
- `GET /api/admin/inquiries` returns saved inquiries.
- `POST /api/admin/logout` ends the admin session.

---

## Notes

- Keep the admin phone number and access code private.
- `ADMIN_SESSION_SECRET` should be long and random.
- `CLIENT_ORIGIN` must match the real frontend origin in production.
- `VITE_API_BASE_URL` must point to the live backend `/api` URL in production.
- Production admin login uses a secure HTTP-only cookie. If frontend and backend are on different domains, keep `ADMIN_COOKIE_SAMESITE="None"`.
- Rate limiting is enabled on the public inquiry route.
- Helmet and CORS are enabled in the backend.

---

## Production Checklist

Before launch:

1. Backend host has `DATABASE_URL`, `DIRECT_URL`, `ADMIN_PHONE`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `CLIENT_ORIGIN`, `ADMIN_COOKIE_SAMESITE="None"`, and `NODE_ENV="production"`.
2. Frontend host has `VITE_API_BASE_URL` set to the deployed backend URL ending with `/api`.
3. Run `npm run db:push` on the backend once so the `inquiries` table exists.
4. Open the website, submit one test inquiry, then go to `/admin`.
5. Click `Admin Login`, enter the admin mobile number and password, and confirm the full inquiry details appear.
