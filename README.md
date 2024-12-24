# Connect MongoDB with Express

This guide explains how to set up a basic Express.js application and connect it to a MongoDB database using Mongoose.

---

## Prerequisites

- **Node.js** installed on your system
- **MongoDB** installed locally or a MongoDB Atlas account for a cloud database
- **npm** (comes with Node.js) or **yarn**

---

## Steps to Connect MongoDB with Express

### 1. Initialize the Project

Run the following command in your terminal to create a new project:

```bash
mkdir express-mongodb-connection
cd express-mongodb-connection
npm init -y
```

This creates a `package.json` file with default settings.

---

### 2. Install Required Packages

Install the required dependencies for Express and Mongoose:

```bash
npm install express mongoose dotenv
```

- `express`: Web framework for Node.js
- `mongoose`: MongoDB object modeling tool

---

### 3. Set Up the Project Structure

Create the following files:

```
express-mongodb-connection/
├── index.js
├── models/
│   └── chat.js
└── package.json
```

---

### 4. Add Environment Variables

Create a `.env` file in the root directory to store your MongoDB connection string:

```
MONGO_URI=<your-mongodb-connection-string>
PORT=8080
```

 `mongodb://127.0.0.1:27017/instagram` is  MongoDB connection string.

---

### 5. Set Up the index

In `index.js`, write the following code:

```javascript
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Example Route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

---

### 6. Create a Model

In the `models` directory, create a file named `ExampleModel.js` with the following code:

```javascript
const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Example', exampleSchema);
```

---

### 7. Add a Sample Route

In `server.js`, add a route to create a new document:

```javascript
const Example = require('./models/ExampleModel');

app.post('/examples', async (req, res) => {
  try {
    const example = new Example(req.body);
    const savedExample = await example.save();
    res.status(201).json(savedExample);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

---

### 8. Run the Application

Start the server with the following command:

```bash
node server.js
```

You should see:

```
Connected to MongoDB
Server is running on http://localhost:8080
```

---
## Conclusion

\ we have successfully connected MongoDB to an Express.js application. we can now extend this setup to build a full-featured application.
