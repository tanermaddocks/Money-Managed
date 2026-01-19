# Money Managed - Full Stack Web Application

The project includes a frontend user-friendly web site and a functional and clean backend server. The goal of the application is to allow users to create edit and view periodical or event-specific (such as planned travel) budget plans. The processes involve creating transactions that are used to track progress of budget plans, with the added features of creating savings goals.

Additional features include addition of assets to a user's portfolio and compatibility with online to services to monitor the real time value of assets such as a user's stock portfolio or possesed foreign currencies.

## User Stories

**Registering and logging in**

- A new user navigates to the website and is redirected to the sign in page.
- The user selects the "new user? click here!" button and the new user dialog will open.
- The user enters their username, email and password into the input fields, entering a 6 character password. A warning appears indicating that the password is not an acceptable length, so the user enters a longer password, and selects continue.
- The user is redirected to the setup page, where they enter their asset information into the relevant fields.
- They are then redirected to a "how to" pop-up which explains the basic functions of the application.
- The user then clicks logout, and they're session is ended and they are redirected to the sign-in page.
- The user enters their email and password into the sign-in fields and clicks the sign-in button and are then redirected to their dashboard.

**Creating a budget and adding a transaction**

- The registered and logged in user clicks the new budget button on the budget management section of the Money Managed website, this opens the new budget dialog.
- The user enters May 2026 as a name for the budget in the input field and selects period budget, using the radio input.
- The user selects the start and end date for the budget with date selection inputs and presses the confirm button on the dialog. This creates the budget in the backend.
- After pressing the confirm button, the dialog changes to the add categories dialog, default categories are already included with targets pre-filled using the last budget of the same type. The user clicks add category and then clicks add new custom category at the top of the dropdown menu.
- This opens the new category dialog over the top of the add categories dialog and the user then enters "school supplies" as a title for the category in the input field and skips the description section, then presses the add new button.
- The new category dialog closes and the "school supplies" category is added to the list of categories in the add categories dialog. The user adds a target for the category and selects the confirm categories button. This updates the budget in the backend.
- The dialog closes and the created budget is now viewable in the manage budgets section, the user is directed to the budget dashboard.
- The user selects the add transaction button and the add transaction dialog opens. The user enters the value of the transaction, the date, the description and whether the transaction is an income or expense using the relevant fields.
- The user then selects confirm and the transaction is added to the budget, with data relevant to the changes showing in the graphs on the budget dashboard.

## Backend Structure

### Backend Objects

#### User object

The user object is central to the application's backend structure, it controls the authentication component of the user experience contains the following data;

- Auth data (all encrypted) [OBJECT - subdocument]
  - Username [!STRING]
  - Email (used for optional communications) [?STRING]
  - Password [!STRING]
- Transaction categories (default values will be included on account creation) [!OBJECT(array) - OBJECTID(category)]
- Currency (used for displaying approximate total assets in user's currency, default is AUD) [!STRING - "AUD" || "USD" || "JPY" || etc.]
- Theme (default is dark) [!STRING - "dark" || "light" || ...etc.]

##### Example

```json
{
  "auth": {
    "username": "Username",
    "email": "user@name.com",
    "password": "password"
  },
  "assets": [{
    "asset-name": "bank-account",
    "asset-value": 400,
    "asset-currency": "AUD"
  }]
  "categories": ["categoryID1", "categoryID2"],
  "defaultCurrency": "AUD",
  "theme": "dark"
}
```

#### Category object

Categories will be used in budgets and transactions, and will be attached to user accounts. Some categories by default are attached to a user on account creation, the user can then use those default categories in addtion to making new custom ones. A category object includes the following data;

- Title (home, grocery, other, etc.) [!STRING]
- Description [?STRING]

##### Example

```json
{
  "title": "grocery",
  "description": "home food items and other home essentials",
}


{
  "title": "accommodation",
  "description": "",
}
```

#### Transaction object

Transactions are the major crux of how the application tracks a user's portfolio. A transaction object includes information such as;

- Value [!NUMBER]
- Currency (default comes from user object) [!STRING - "AUD" || "USD" || "JPY" || etc.]
- Type (income/expense) [!STRING - "income" || "expense"]
- Category (reference to category object) [!OBJECTID(category)]
- Date (This is addition to timestamps, default is today)[!DATE]
- Description [?STRING]
- The user's objectID (to attach a transaction to a user's portfolio, generated from auth) [!OBJECTID(user)]

##### Example

```json
{
  "value": 123,
  "currency": "AUD",
  "type": "debit",
  "category": "categoryID1",
  "date": "2026-01-01",
  "description": "saturday night dinner",
  "user": "userID1"
}
```

#### Budget object

A budget will use an array of transactions, and target values attached to categories to track expenditures over periods of time. The budget object will be used to keep data for either periodical budgets (monthly budget) or event budgets (cost of vacations, weddings, etc.). The budget object includes the following data;

- Title (Europe Holiday, May, Week 20) [STRING]
- User (the user who created and owns the budget) [!OBJECTID(user)]
- Type (choose between event or period) [!STRING - "event" || "period"]
- Categories (A user will select categories and targets at budget creation) [OBJECT(array) - array of {OBJECTID(category), NUMBER}]
- Transactions (Transactions associated with the budget) [?OBJECT(array) - OBJECTID(transaction)]

##### Example

```json
{
  "title": "Jan 2026",
  "user": "userID1",
  "type": "period",
  "categories": [
    { "category": "categoryID1", "target": 400 },
    { "category": "categoryID2", "target": 300 }
  ],
  "transactions": ["transactionID1", "transactionID2", "transactionID3"]
}
```

### Backend Routes

#### Register new user

- POST /api/auth/register
- Takes the following as variables generated from user inputs:
  - username
  - email
  - password
  - currency
- Only allows requests from /signin
- Returns JWT to cookies

#### Sign-in existing user

- POST /api/auth/signin
- Takes the following as variables generated from user inputs:
  - email
  - password
- Only allows requests from /signin
- Returns JWT to cookies

#### Delete existing user

- DELETE /api/auth/delete/:jwt
- Only allows requests from /settings and only if tokens match.
- On success, clears cookies

#### Set up new user

- PATCH /api/user/setup/:jwt
- Takes the following as variables generated from user inputs:
  - ARRAY of any number of {asset-name, asset-value, asset-currency}
- Only allows requests from /setup
- Returns null

#### Create new budget

- POST /api/budget/new/:jwt
- Takes the following as variables generated from user inputs:
  - title
  - type
- Only allows requests from /budgets or /dashboard

## Frontend Design

The frontend will include two sections, being the sign-in and home sections. The sign-in section includes 