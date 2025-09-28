# Online Blog App

An online blog app that users can write blog and follow others

---

## Features
- follow users
- create blog
- add blogs to favorite
- create yout account

---
## Technologies Used
- **Node.js** – JavaScript runtime environment for server-side development  
- **Express.js** – Fast, unopinionated web framework for Node.js  
- **EJS** – Embedded JavaScript templating engine  
- **PostgreSQL** – Relational database management system  
- **pg** – PostgreSQL client for Node.js  
- **Passport.js** – Authentication middleware for Node.js  
- **passport-local** – Local authentication strategy for Passport.js  
- **passport-google-oauth20** – Google OAuth 2.0 authentication strategy  
- **bcrypt** – Library for hashing passwords  
- **dotenv** – Loads environment variables from `.env` file  
- **express-session** – Session management for Express applications  
- **multer** – Middleware for handling file uploads  


---

## Installation & Running
1. Clone the repository:
```bash
git clone https://github.com/yourusername/hangman-game.git
```
2. Install dependencies
```bash
   npm install
   ```
3. Setup environment variables
```ini
  PORT=3000
  DATABASE_URL=your_postgres_connection_string
  SESSION_SECRET=your_secret_key
  GOOGLE_CLIENT_ID=your_google_client_id
  GOOGLE_CLIENT_SECRET=your_google_client_secret
```
4. Setup database
```bash
psql -U your_postgres_username -d your_database_name -f schema.sql
```
5. Start the application

