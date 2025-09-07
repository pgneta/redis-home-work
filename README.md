# Users Redis App

A simple React frontend with a Node.js backend that fetches GitHub users and displays their public repositories. The app uses a custom backend to avoid multiple GitHub API calls from the client.

---

## Tech Stack

**Frontend:**
- React 19
- TypeScript
- Create React App (CRA)
- Styled-components

**Backend:**
- Node.js
- Express
- Node-Fetch
- dotenv
- CORS

---

## Features

- Search GitHub users by name
- Pagination support
- Display user avatar, user name, and number of public repositories (in a badge)
- Fetch data via a single backend endpoint to avoid excessive GitHub API calls

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/pgneta/redis-home-work.git
cd redis-home-work
```
### 2. Setup Server
```bash
cd server
npm install
```
Create .env file
```bash
GITHUB_API_TOKEN=your_github_token
```
Start server
```bash
npm run start
```
The backend runs on: http://localhost:3010

### 2. Setup Client
```bash
cd ../client
npm install
```
create .env:
```bash
REACT_APP_SERVER_URL='http://localhost:3010'
```
Start client
```bash
npm start
```
The frontend runs on: http://localhost:3000