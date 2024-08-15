# Food Delivery Application

Welcome to the Food Delivery Application! This project is a full-stack web application designed to provide a seamless and intuitive experience for users to order food online.

## 🚀 Live Demo

You can view the live application here: [Food Delivery Application](https://mern-food-ordering-app-frontend-oprw.onrender.com/)

## 🛠️ Technologies Used

This project leverages a modern tech stack that includes:

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **CSS**: Styling the application with responsive design in mind.
- **JavaScript (ES6+)**: Modern JavaScript features for efficient code.

### Backend

- **Node.js**: JavaScript runtime environment to build the backend.
- **Express.js**: Fast and minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing user and order information.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Stripe**: Payment processing integration for handling transactions.
- **Cloudinary**: Cloud-based image and video management service.

### DevOps & Tools

- **TypeScript**: Static typing for JavaScript to enhance code quality and maintainability.
- **Nodemon**: Tool that helps develop Node.js applications by automatically restarting the server when code changes.
- **Concurrently**: Utility that allows running multiple commands concurrently.
- **dotenv**: Environment variable management.
- **Multer**: Middleware for handling `multipart/form-data`, used for uploading files.
- **Express Validator**: Middleware for validating and sanitizing request data.

## 📦 Front End Installation

Follow these steps to run the project locally on your machine:

### Prerequisites

- **Node.js** (v14.x or later)
- **npm** (v6.x or later)
- **MongoDB** (running locally or via a cloud provider)
- **Stripe CLI** (for handling webhook events)

### Clone the Repository

```bash
git clone https://github.com/yourusername/food-delivery-app.git
cd food-delivery-app
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a .env file in the root directory and add the following environment variables:

```plaintext
MONGO_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Running the Application

To start the application in development mode, use the following command:

```bash
npm run dev
```

> This will start both the server and the Stripe webhook listener.

### Building the Application

To build the application for production:

```bash
npm run build
```

### Starting the Application

To start the application after building it:

```bash
npm start
```

## 📦 Back End Installation

View [GitHub Readme](https://github.com/TishG/mern-food-ordering-app-backend) for Back End

### 👥 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

### 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

### 👩🏿‍💻 Author

Tish Griffiths - [GitHub Profile](https://github.com/TishG)

Feel free to reach out if you have any questions or suggestions!
