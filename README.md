# Money Managed - Fullstack Web Application

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

The project includes a frontend user-friendly web site and a functional and clean backend server. The goal of the application is to allow users to create edit and view periodical or event-specific (such as planned travel) budget plans. The processes involve creating transactions that are used to track progress of budget plans, with the added features of creating savings goals.

Additional features include addition of assets to a user's portfolio and compatibility with online to services to monitor the real time value of assets such as a user's stock portfolio or possesed foreign currencies.

## Backend Structure

### User object

The user object is central to the application's backend structure, it control the authentication component of the user experience and tracks the user's total asset value and contains the following data;

- Auth data (all encrypted) [OBJECT - subdocument]
  - Username [!STRING]
  - Email (used for optional communications) [?STRING]
  - Password [!STRING]
- Transaction categories (default values will be included on account creation) [!OBJECT(array) - OBJECTID(category)]
- Currency (used for displaying approximate total assets in user's currency, default is AUD) [!STRING - "AUD" || "USD" || "JPY" || etc.]
- Theme (default is dark) [!STRING - "dark" || "light" || ...etc.]

### Category object

Categories are used in budgets and transactions, and will be attached to user accounts. Some categories by default are attached to a user on account creation, the user can then use those default categories in addtion to making new custom ones. A category object includes the following data;

- Title (home, grocery, other, etc.) [!STRING]
- Description [?STRING]
- Budget type [!STRING - "event" || "period"]

### Transaction object

Transactions are the major crux of how the application tracks a user's portfolio. A transaction object includes information such as;

- Value [!NUMBER]
- Currency (default comes from user object) [!STRING - "AUD" || "USD" || "JPY" || etc.]
- Type (debit/credit) [!STRING - "debit" || "credit"]
- Category (reference to category object) [!STRING - OBJECTID(category)]
- Date (This is addition to timestamps, default is today)[!DATE]
- Description [?STRING]
- The user's objectID (to attach a transaction to a user's portfolio, generated from auth) [!STRING - OBJECTID(user)]

### Budget object

A budget uses an array of transactions, and target values attached to categories to track expenditures over periods of time. A budget object will be used to keep data for either periodical budgets (monthly budget) or event budgets (cost of vacations, weddings, etc.). A budget object includes the following data;

- Title (Europe Holiday, May, Week 20) [STRING]
- Type (choose between event or period) [!STRING - "event" || "period"]
- Categories (A user will select categories and targets at budget creation) [OBJECT(array) - array]
- Transactions (Transactions associated with the budget) [?OBJECT(array) - OBJECTID(transaction)]

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

Possible live urls:

- [https://moneymanagedapp.com](https://moneymanagedapp.com)
- [https://moneymanagedapp.com.au](https://moneymanagedapp.com.au)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
