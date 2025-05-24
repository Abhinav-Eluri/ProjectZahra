This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.jsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Data Storage

This project uses local storage for authentication and mock data for the gallery.

## Stripe Integration

This project uses [Stripe](https://stripe.com) for payment processing. The integration includes:

1. Checkout API endpoint (`/api/checkout/route.js`) for creating Stripe checkout sessions
2. Webhook handler (`/api/webhook/route.js`) for processing Stripe events

### Stripe Setup

1. Create a Stripe account and get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Add your API keys to `.env.local`:
   ```
   NEXT_STRIPE_SECRET_KEY=sk_test_your_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
   ```

### Webhook Setup

Stripe webhooks are essential for reliable payment processing. They allow Stripe to notify your application when events occur, such as successful payments or failed charges.

1. Set up a webhook endpoint in the [Stripe Dashboard](https://dashboard.stripe.com/webhooks):
   - For production: `https://your-domain.com/api/webhook`
   - For development: Use the [Stripe CLI](https://stripe.com/docs/stripe-cli) to forward events to your local server:
     ```bash
     stripe listen --forward-to localhost:3000/api/webhook
     ```

2. Add the webhook secret to `.env.local`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

For more information, check out the [Stripe Documentation](https://stripe.com/docs).

## Email Notifications

This project uses [Nodemailer](https://nodemailer.com/) to send email notifications to users. Currently, the system sends order confirmation emails when a purchase is completed.

### Email Setup

1. Configure your email settings in `.env.local`:
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

2. For Gmail, you need to use an App Password instead of your regular password:
   - Go to your Google Account > Security
   - Under "Signing in to Google", select "2-Step Verification"
   - At the bottom of the page, select "App passwords"
   - Select "Mail" as the app and "Other" as the device
   - Enter a name (e.g., "Project Zahra")
   - Click "Generate" and use the generated password

A sample configuration file is available at `.env.local.example`.

## Cloudinary Integration

This project uses [Cloudinary](https://cloudinary.com/) for image storage and management. Images uploaded through the admin dashboard are stored in Cloudinary instead of the local filesystem.

### Cloudinary Setup

1. Create a Cloudinary account at [https://cloudinary.com/](https://cloudinary.com/)
2. Get your account details from the Cloudinary Dashboard
3. Add your Cloudinary credentials to `.env.local`:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

> **Important Note**: For `CLOUDINARY_CLOUD_NAME`, use only the cloud name part (e.g., `dvqtxsfta`), not the full Cloudinary URL. If you're copying from the Cloudinary dashboard, make sure to extract just the cloud name from the URL (the part after the `@` symbol in `cloudinary://api_key:api_secret@cloud_name`).

The application will automatically upload images to your Cloudinary account and use the provided URLs for displaying images.

## Database with Prisma

This project uses [Prisma](https://prisma.io/) as an ORM for database access. The project is configured to use SQLite for development, but you can easily switch to another database provider like PostgreSQL, MySQL, or MongoDB.

### Prisma Setup

1. The database schema is defined in `prisma/schema.prisma`
2. To create your database and generate the Prisma client, run:

```bash
npx prisma migrate dev --name init
```

3. To explore your database with Prisma Studio, run:

```bash
npx prisma studio
```

4. To update the Prisma client after schema changes, run:

```bash
npx prisma generate
```

For more information, check out the [Prisma documentation](https://prisma.io/docs).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
