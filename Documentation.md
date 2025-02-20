# Menu Management System – Documentation

This project provides a **front-end** (Next.js) and **back-end** (Node.js) application for managing menus and their items. Below is a concise guide to get you up and running locally, including how to connect a local database.

---

## 1. Overview

- **Front-End**: Next.js (React) + Redux Toolkit  
- **Back-End**: Node.js + Express (Example)  
- **Database**: PostgreSQL

---

## 2. Prerequisites

- **Node.js** (v14+ recommended)  
- **npm** or **Pnpm**  
- A local or remote Postgres **database** 

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

1. Navigate to the **backend** directory:  
   ```bash
   cd backend
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```
3. **Configure Environment**  
   - Create a `.env` file in the **backend** folder to store your database credentials:  
     ```env
     DB_HOST=localhost
     DB_PORT=5432
     DB_USER=postgres
     DB_PASSWORD=YOUR_PASSWORD
     DB_NAME=menu_db
     ```
   - Adjust these to match your local database setup.  

4. **Run Migrations / Seeds (if any)**  
   - If using an ORM (e.g., Sequelize/TypeORM), run migrations:
     ```bash
     npm run migrate
     ```
   - If you have sample seeds:
     ```bash
     npm run seed
     ```

5. **Start Back-End**  
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm start
   ```
   By default, the server might run on `http://localhost:3001` (or your configured port).

---

## 5. Front-End Setup

1. Navigate to the **frontend** directory:  
   ```bash
   cd ../frontend
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```
3. **Environment Variables**  
   - Create a `.env` file in **frontend** if needed:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:3001
     ```
   - Adjust the API URL to match your back-end server address.

4. **Start Front-End**  
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
   By default, the front-end runs on `http://localhost:3000`.

---

## 6. Connecting a Local Database

- **Choose** your DB engine (MySQL / Postgres / Mongo, etc.).  
- **Install** it locally.  
- **Create** a new database named, for instance, `menu_db`.  
- **Configure** your `.env` as shown in [Back-End Setup](#4-back-end-setup).  
- **Test** the connection by running the server. It should log "connected" or similar without errors.

---

## 7. Usage

1. With **both** front-end and back-end servers running, open your browser:  
   ```
   http://localhost:3000
   ```
2. Access the **Menu** section, create or edit menu items, and see them persist in your local database.

---

## 8. Additional Tips

- **Logging**: Use server logs or console output for debugging.  
- **Testing**: If included, run `npm test` in back-end or front-end directories.  
- **Deployment**: For production, create environment files, set up your DB, and build each app.

---

**Enjoy** developing and managing your menus! 