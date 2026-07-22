# 📚 Inventory Management API

> A RESTful API for managing a book inventory system built with Node.js, Express.js, and MongoDB. This project demonstrates core backend development concepts including REST API design, data validation, database modeling, and internationalization.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)
![Express.js](https://img.shields.io/badge/Express-5.2+-90C53F?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0+-00ED64?style=flat-square&logo=mongodb)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)

---

## 🎯 Project Overview

This API serves as a learning project to master **Node.js backend development** fundamentals. It provides complete CRUD operations for managing a book inventory with features like:

- ✅ Create, Read, Update, and Delete (CRUD) book records
- ✅ Input validation with detailed error messages
- ✅ Multi-language support (i18n)
- ✅ MongoDB integration with Mongoose ODM
- ✅ Professional error handling
- ✅ RESTful API design principles

---

## 🏗️ Architecture & Structure

```
inventory_management_nodeJs/
├── index.js                          # Application entry point & server setup
├── package.json                      # Project dependencies & scripts
│
├── models/
│   └── book.model.js                # MongoDB Book schema & model definition
│
├── routes/
│   └── book.routes.js               # All book endpoints (CRUD operations)
│
├── validators/
│   └── book.validators.js           # Input validation rules & error handling
│
├── locales/                         # Translation files (for i18n support)
│   └── en.json                      # English language translations
│
├── .gitignore
└── package-lock.json
```

### Directory Purposes

| Directory | Purpose |
|-----------|---------|
| **models/** | Defines MongoDB schemas and data models using Mongoose |
| **routes/** | HTTP endpoint handlers (GET, POST, PUT, DELETE) |
| **validators/** | Input validation rules, sanitization, and error handling |
| **locales/** | Translation files for multi-language support |

---

## 🔄 Request Flow & Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT REQUEST                           │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Express Router     │
                    │  (book.routes.js)    │
                    └──────────────┬───────┘
                                   │
                    ┌──────────────┴────────────────┐
                    │                               │
                    ▼                               ▼
        ┌───────────────────────┐      ┌───────────────────────┐
        │  Input Validators     │      │  Language Detector    │
        │ (book.validators.js)  │      │  (i18next middleware) │
        │                       │      │                       │
        │ • Body validation     │      │ • Detect client lang  │
        │ • Param validation    │      │ • Load translations   │
        │ • Error handling      │      │                       │
        └───────────┬───────────┘      └───────────┬───────────┘
                    │                               │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                    ┌──────────────────────────┐
                    │   Route Handler Logic    │
                    │  (CRUD Operations)       │
                    └───────────┬──────────────┘
                                │
                                ▼
                    ┌──────────────────────────┐
                    │   Mongoose Model         │
                    │  (book.model.js)         │
                    │  Schema Validation       │
                    └───────────┬──────────────┘
                                │
                                ▼
                    ┌──────────────────────────┐
                    │   MongoDB Database       │
                    │   (Atlas/Local)          │
                    └───────────┬──────────────┘
                                │
                                ▼
                    ┌──────────────────────────┐
                    │   JSON Response          │
                    │   with i18n Messages     │
                    └───────────┬──────────────┘
                                │
                                ▼
                    ┌──────────────────────────┐
                    │   CLIENT RESPONSE        │
                    └──────────────────────────┘
```

---

## 📊 Database Schema

### Book Model

```javascript
{
  _id: ObjectId,                    // MongoDB Auto-generated ID
  bookName: {
    type: String,
    required: true,
    length: "5-50 chars"
  },
  countInStock: {
    type: Number,
    required: true,
    range: "5-50 units"
  },
  price: {
    type: Number,
    required: true,
    range: "$1 - $10,000"
  },
  imageUrl: {
    type: String,
    optional: true,
    validation: "Valid HTTP URL"
  },
  dateCreated: {
    type: Date,
    default: "Current timestamp"
  }
}
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local or MongoDB Atlas cloud instance)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amsadeeq/inventory_management_nodeJs.git
   cd inventory_management_nodeJs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the project root:
   ```env
   PORT=3000
   CONNECT_STRING=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/inventory?retryWrites=true&w=majority
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   The server will start with **auto-reload** (nodemon):
   ```
   Server is running at http://localhost:3000
   Connected to MongoDB
   ```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/books
```

### Endpoints Overview

```
POST   /books              Create a new book
GET    /books              Fetch all books
GET    /books/:id          Fetch a specific book by ID
PUT    /books/:id          Update a book
DELETE /books/:id          Delete a book
```

### 1️⃣ **POST /books** - Create a New Book

**Request:**
```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{
    "bookName": "The Node.js Bible",
    "countInStock": 25,
    "price": 49.99,
    "imageUrl": "https://example.com/book.jpg"
  }'
```

**Response (201 Created):**
```json
{
  "_id": "66a1f2e3b4c5d6e7f8g9h0i1",
  "bookName": "The Node.js Bible",
  "countInStock": 25,
  "price": 49.99,
  "imageUrl": "https://example.com/book.jpg",
  "dateCreated": "2024-07-22T10:30:00.000Z",
  "id": "66a1f2e3b4c5d6e7f8g9h0i1"
}
```

---

### 2️⃣ **GET /books** - Fetch All Books

**Request:**
```bash
curl http://localhost:3000/books
```

**Response (200 OK):**
```json
[
  {
    "_id": "66a1f2e3b4c5d6e7f8g9h0i1",
    "bookName": "The Node.js Bible",
    "countInStock": 25,
    "price": 49.99,
    "dateCreated": "2024-07-22T10:30:00.000Z",
    "id": "66a1f2e3b4c5d6e7f8g9h0i1"
  }
]
```

---

### 3️⃣ **GET /books/:id** - Fetch a Specific Book

**Request:**
```bash
curl http://localhost:3000/books/66a1f2e3b4c5d6e7f8g9h0i1
```

**Response (200 OK):**
```json
{
  "_id": "66a1f2e3b4c5d6e7f8g9h0i1",
  "bookName": "The Node.js Bible",
  "countInStock": 25,
  "price": 49.99,
  "dateCreated": "2024-07-22T10:30:00.000Z",
  "id": "66a1f2e3b4c5d6e7f8g9h0i1"
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "Book not found"
}
```

---

### 4️⃣ **PUT /books/:id** - Update a Book

**Request:**
```bash
curl -X PUT http://localhost:3000/books/66a1f2e3b4c5d6e7f8g9h0i1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 59.99,
    "countInStock": 30
  }'
```

**Response (200 OK):**
```json
{
  "message": "Book updated successfully",
  "book": {
    "_id": "66a1f2e3b4c5d6e7f8g9h0i1",
    "bookName": "The Node.js Bible",
    "countInStock": 30,
    "price": 59.99,
    "dateCreated": "2024-07-22T10:30:00.000Z",
    "id": "66a1f2e3b4c5d6e7f8g9h0i1"
  }
}
```

---

### 5️⃣ **DELETE /books/:id** - Delete a Book

**Request:**
```bash
curl -X DELETE http://localhost:3000/books/66a1f2e3b4c5d6e7f8g9h0i1
```

**Response (200 OK):**
```json
{
  "message": "Book deleted successfully"
}
```

---

## ✅ Input Validation Rules

The API enforces strict validation on all inputs. Here's what's validated:

### CREATE Book Validation

| Field | Rules | Error Message |
|-------|-------|---------------|
| `bookName` | Required, 5-50 chars | "Book name is required" / "Length invalid" |
| `countInStock` | Required, 5-50 units | "Stock count required" / "Stock range invalid" |
| `price` | Required, $1-$10,000 | "Price required" / "Price range invalid" |
| `imageUrl` | Optional, valid URL | "Invalid image URL" |

### UPDATE Book Validation

| Field | Rules | Error Message |
|-------|-------|---------------|
| `bookName` | Optional, 5-50 chars | "Length invalid" |
| `countInStock` | Optional, 5-50 units | "Stock range invalid" |
| `price` | Optional, $1-$10,000 | "Price range invalid" |
| `imageUrl` | Optional, valid URL | "Invalid image URL" |

### Error Response Example

```json
{
  "errors": [
    {
      "type": "field",
      "value": "abc",
      "msg": "Book length should be at least 5 characters",
      "path": "bookName",
      "location": "body"
    }
  ]
}
```

---

## 🌍 Multi-Language Support (i18n)

The API supports multiple languages through **i18next**. Responses include translated messages based on client's language preference.

### Supported Languages
- 🇬🇧 English (en)

### How It Works

1. Client sends a request with `Accept-Language` header
2. i18next middleware detects the language
3. Messages are loaded from `locales/<lang>.json`
4. Translated messages are included in responses

**Example with Language Detection:**
```bash
curl -H "Accept-Language: en" http://localhost:3000/books
```

---

## 📚 Tech Stack & Key Dependencies

| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web application framework & routing |
| **Mongoose** | MongoDB object modeling & schema validation |
| **express-validator** | Input validation & sanitization middleware |
| **i18next** | Internationalization framework |
| **i18next-fs-backend** | File system backend for translations |
| **i18next-http-middleware** | Express.js middleware for i18n |
| **dotenv** | Environment variable management |
| **nodemon** | Auto-restart on file changes (development) |

---

## 🎓 Learning Concepts Demonstrated

This project showcases essential backend development patterns:

### 1. **MVC Architecture**
   - **Models**: MongoDB schemas (book.model.js)
   - **Routes/Controllers**: Request handlers (book.routes.js)
   - **Validators**: Input validation (book.validators.js)

### 2. **Input Validation & Sanitization**
   - Using express-validator middleware
   - Custom validation rules
   - Error handling with proper HTTP status codes

### 3. **Database Operations (CRUD)**
   - Create: `Model.create()`
   - Read: `Model.find()`, `Model.findById()`
   - Update: `Model.findByIdAndUpdate()`
   - Delete: `Model.findByIdAndDelete()`

### 4. **Error Handling**
   - Try-catch blocks for async operations
   - Meaningful error messages
   - Proper HTTP status codes (201, 200, 400, 404)

### 5. **Internationalization (i18n)**
   - Multi-language message support
   - Language detection
   - Translation file management

### 6. **Middleware Pattern**
   - Request validation middleware
   - Language detection middleware
   - Error handling middleware

### 7. **RESTful API Design**
   - Proper HTTP methods (GET, POST, PUT, DELETE)
   - Meaningful endpoints
   - Status code conventions
   - JSON request/response format

---

## 🧪 Testing the API

### Using Postman

1. Import the endpoints into Postman
2. Set `Content-Type: application/json` header
3. Test each endpoint with sample data

### Using cURL

**Create a book:**
```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"bookName":"Learning MongoDB","countInStock":20,"price":39.99}'
```

**Get all books:**
```bash
curl http://localhost:3000/books
```

**Update a book:**
```bash
curl -X PUT http://localhost:3000/books/<BOOK_ID> \
  -H "Content-Type: application/json" \
  -d '{"price":44.99}'
```

**Delete a book:**
```bash
curl -X DELETE http://localhost:3000/books/<BOOK_ID>
```

---

## 🛠️ Development Tips

### File Structure Best Practices Used

✅ **Separation of Concerns**: Each directory has a single responsibility  
✅ **Middleware Pattern**: Validation and error handling as middleware  
✅ **Schema Validation**: Database-level constraints in Mongoose  
✅ **Route Organization**: All routes in dedicated directory  
✅ **Reusable Validators**: Validation rules exported for reuse  

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| MongoDB connection fails | Check `CONNECT_STRING` in `.env`, ensure MongoDB is running |
| Port already in use | Change `PORT` in `.env` or kill process using port 3000 |
| Validation errors | Check field constraints in `book.validators.js` |
| Invalid ObjectID error | Ensure book ID is a valid MongoDB ObjectID (24 hex chars) |

---

## 📈 Future Enhancements

Potential features to expand this project:

- [ ] Add user authentication & JWT tokens
- [ ] Implement pagination & sorting for GET /books
- [ ] Add search filters & advanced queries
- [ ] Create category/author management
- [ ] Add order management system
- [ ] Implement API documentation with Swagger/OpenAPI
- [ ] Add comprehensive unit & integration tests
- [ ] Deploy to production (Heroku, AWS, etc.)
- [ ] Add logging & monitoring
- [ ] Implement rate limiting
- [ ] Add more locales for internationalization

---

## 📝 Project Resources

- **[Express.js Documentation](https://expressjs.com/)**
- **[Mongoose Documentation](https://mongoosejs.com/)**
- **[MongoDB Documentation](https://docs.mongodb.com/)**
- **[express-validator Documentation](https://express-validator.github.io/docs/)**
- **[i18next Documentation](https://www.i18next.com/)**

---

## 📄 License

This project is licensed under the **ISC License** - see the LICENSE file for details.

---

## 👨‍💻 Author

**Amsadeeq** - Learning Node.js backend development  
GitHub: [@amsadeeq](https://github.com/amsadeeq)

---

## 🤝 Contributing

This is a personal learning project. Feel free to fork, modify, and use it for your own learning purposes!

---

**Last Updated:** July 2024  
**Status:** Active Learning Project ✨
