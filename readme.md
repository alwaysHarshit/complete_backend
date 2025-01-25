# 🧑‍💻 User Authentication Backend

This backend powers user authentication, including 📝 registration, 🔑 login, 🚪 logout, 👤 profile management, and 🔒 password updates. It ensures secure user data validation, token management, and 🖼️ image uploads to ☁️.

---

## ⚙️ Features

1. **👤 User Registration**
   - Registers users after validating: 🧑‍💻 username, 📧 email, 🔒 password, 📝 full name, 🖼️ avatar.
   - Prevents duplicates and uploads images to ☁️.

2. **🔑 User Login**
   - Authenticates users.
   - Generates and delivers 🎟️ tokens.

3. **🚪 User Logout**
   - Clears 🎟️ tokens and updates the 📂 database.

4. **👤 Profile Retrieval**
   - Fetches user 📜 profile details.

5. **🔄 Password Update**
   - Updates user 🔒 passwords securely.

---

## 🛠️ Project Setup

### 1. 📋 Prerequisites

You need:
- 📦 Node.js
- 🗄️ MongoDB

### 2. 🔧 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure `.env`:
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   CLOUDINARY_URL=<your-cloudinary-url>
   JWT_SECRET=<your-jwt-secret>
   JWT_EXPIRATION=<token-expiration-time>
   ```

### 3. ▶️ Run the Server

Start the development server:
```bash
npm start
```
Default URL: 🌐 `http://localhost:3000`

---

## 🔗 API Endpoints

### 1. **👤 Register**

**POST** `/register`

#### Request:
```json
{
  "username": "user123",
  "email": "user@example.com",
  "password": "securepassword",
  "fullName": "John Doe",
  "avatar": "<file>",
  "coverImage": "<file>"
}
```

#### Response:
- ✅ **201:**
```json
{
  "message": "User created",
  "user": {
    "_id": "<id>",
    "avatar": "<url>",
    "coverImage": "<url>"
  }
}
```
- ❌ **400:** Missing fields or duplicate data.

### 2. **🔑 Login**

**POST** `/login`

#### Request:
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

#### Response:
- ✅ **201:**
```json
{
  "message": "Login successful",
  "accessToken": "<token>",
  "refreshToken": "<token>"
}
```
- ❌ **400:** Missing fields or incorrect credentials.

### 3. **🚪 Logout**

**POST** `/logout`

#### Response:
- ✅ **200:**
```json
{
  "message": "logout"
}
```

### 4. **👤 Profile**

**GET** `/user`

#### Response:
- ✅ **200:**
```json
{
  "_id": "<id>",
  "username": "user123",
  "email": "user@example.com",
  "avatar": "<url>",
  "coverImage": "<url>"
}
```

### 5. **🔄 Update Password**

**PATCH** `/updatePassword`

#### Request:
```json
{
  "newPassword": "newsecurepassword"
}
```

#### Response:
- ✅ **200:**
```json
{
  "message": "updated"
}
```
- ❌ **401:** Missing new password.

---

## 🛠️ Utilities

### ☁️ File Upload
- Handles 🖼️ avatar and cover image uploads to ☁️.

### 🎟️ Token Management
- Generates and securely stores 🔑 JWT tokens.

---

## 🚨 Error Handling

- ❌ **400:** Missing or invalid input fields.
- ❌ **401:** Invalid tokens or unauthorized access.

---

## 🔒 Security Features

- Passwords are hashed 🔒.
- Tokens are validated and secured.
- `httpOnly` and `secure` 🍪 cookies ensure safe storage.

---

## 📈 Future Improvements

- ✉️ Email verification for better security.
- ⏳ Enhanced token renewal logic.
- 🌐 Integration with OAuth (Google/Facebook login).

---

## 🤝 Contact

For any questions or issues, feel free to reach out to the maintainer. Happy Coding! 🚀

