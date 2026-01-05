# Wishlist Manager

A simple web app to create and manage personal wishlists. Users can sign up, log in, and keep track of items they want. 

Built RESTful CRUD APIs for backend operations and implemented React for an interactive, responsive frontend.

... Still in development.

## Features
- User authentication: signup, login, and logout
- Protected user routes
- Add, edit, view, and delete wishlist items
- Responsive React frontend
- Token-based session management

## Tech Stack
- **Languages**: JavaScript, HTML, CSS
- **Frontend**: React, React Router
- **Backend**: Node.js, Express
- **Authentication**: JWT, bcryptjs
- **Storage**: MongoDB

## API Endpoints
### Authentication
- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user info (protected)
- `DELETE /auth/me` - Delete current user (protected)

### Wishlist
- `GET /wishlist` - Get all wishlist items belonging to current user (protected)
- `POST /wishlist` - Add a new item to user's wishlist (protected)
- `PUT /wishlist/:id` - Edit an existing wishlist item
- `DELETE /wishlist/:id` - Remove an item.

### Credits
- Developped by Emily Huynh
