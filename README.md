# 📝 Notes Taker SPA

A single-page React application to take, edit, pin, search, and delete notes with pagination, real-time search, and backend persistence using [`json-server`]/.
---

## Features

- View notes (paginated, most recently updated at the top)
- Add notes using a modal form
- Edit and delete notes
- Pin/Unpin notes (pinned notes always at the top)
- Real-time search by title or description
- Pagination (5 notes per page)
- Persist notes with a REST API powered by json-server
- Nice loading, empty, and error states
- Responsive layout for all screen sizes

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above recommended)
- npm or yarn
- Git (to clone or pull the project)

---

## Getting Started

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/notes-taker.git
cd notes-taker
```
#### 2.Install dependencies
```bash
npm install
npm install axios react-modal uuid
```

#### 3.Set up the local database with json-server
- Ensuring that you are in root folder, install json-server(if haven't installed already):
```bash
npm install -g json-server
```
- Start json-server in a separate terminal window
```bash
json-server --watch db.json --port 3001
```
- This will run your fake REST API at http://localhost:3001/notes.

- While runing the script, there mind be a execution error, run the powershell as an administrator and apply this script:
```Powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

#### 4. Run the React app
```bash
npm start
# or
yarn start
```

---
