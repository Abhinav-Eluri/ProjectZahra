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
