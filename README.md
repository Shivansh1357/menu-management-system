# Menu Management System – Documentation

This project provides a **front-end** (Next.js) and **back-end** (Node.js) application for managing menus and their items. Below is a **step-by-step** guide to get everything running locally, along with a **demo** link and an example **database connection** configuration.

---

## 1. Overview

- **Front-End**: Next.js (React) + Redux Toolkit  
- **Back-End**: Node.js + Express (Example)  
- **Database**: PostgreSQL  
- **Demo URL**: [Loom Recording](https://www.loom.com/share/27b8c23ec1f5443a9105e4c7c54f208d?sid=3f28acaa-168a-4ba2-a180-853861c67dd0)  
- **Live Deployed Site**: [Menu Management System](https://menu-management-system-shivansh.netlify.app/)

---

## 2. Prerequisites

- **Node.js** (v14+ recommended)  
- **npm** or **pnpm**  
- A local PostgreSQL **database** (or use the provided Supabase URI)  
  - Example connection string:
    ```
    postgresql://postgres:nRT9QosxAp7gj7XO@db.eihqlysjuwhhxsdrizqy.supabase.co:5432/postgres
    ```

---

## 3. Cloning the Repository

1. Open your terminal.  
2. Navigate to your preferred folder.  
3. Clone the repository:  
   ```bash
   git clone https://github.com/Shivansh1357/menu-management-system.git
   ```
4. Move into the folder:  
   ```bash
   cd menu-management-system
   ```

---

## 4. Back-End Setup

1. **Move** to the backend directory:
   ```bash
   cd backend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```
3. **Create a `.env`** in `backend/`:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=YOUR_PASSWORD
   DB_NAME=menu_db

   # OR replace the above with a single connection string:
   DATABASE_URL=postgresql://postgres:nRT9QosxAp7gj7XO@db.eihqlysjuwhhxsdrizqy.supabase.co:5432/postgres
   ```
   *Make sure your app reads this variable in your config.*  

4. **Run Migrations**  
   - Run Prisma migrations and generate client:
     ```bash
     pnpm prisma migrate dev
     pnpm prisma generate
     ```
   - If you have seed scripts:
     ```bash
     pnpm prisma db seed
     ```

5. **Start Back-End**  
   ```bash
   pnpm start:dev
   ```
   or
   ```bash
   pnpm start
   ```
   The server typically runs at `http://localhost:8080` (or your configured port).

---

## 5. Front-End Setup

1. **Move** to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```
3. **Environment Variables**:
   - Create a `.env` in **frontend** if needed:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:3000
     ```
   - If you deployed the back-end or are using the Supabase URL, update the value accordingly.

4. **Start the front-end**:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
   By default, this runs at `http://localhost:3000`.

---

## 6. Connecting a Local (or Remote) Database

- **Local**: Install PostgreSQL locally. Create a database named `menu_db`. Update `.env` in `backend/` with your local credentials.  
- **Remote**: Use the provided Supabase connection string. Replace it in your `.env` as:
  ```env
  DATABASE_URL=postgresql://postgres:nRT9QosxAp7gj7XO@db.eihqlysjuwhhxsdrizqy.supabase.co:5432/postgres
  ```
- **Verify** by running `npm run dev` in `backend/`. You should see a successful DB connection message.

---

## 7. Usage

1. **Run both** the front-end and back-end servers:
   - `pnpm start:dev` in the `backend/`
   - `pnpm run dev` in the `frontend/`
2. Open a browser to:
   ```
   http://localhost:3000
   ```
3. Toggle the **Menu** section, create/edit menu items, and see them persisted in the database.

---

## 8. Additional Tips

- **Logging**: Use server logs or console output for debugging.  
- **Testing**: If included, run `npm test` in back-end or front-end directories.  
- **Deployment**: For production, create environment files, set up your DB, and build each app.

---

**Enjoy** developing and managing your menus! 