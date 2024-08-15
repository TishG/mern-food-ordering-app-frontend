> This is the Frontend repository. You can visit the Backend repository at https://github.com/TishG/mern-food-ordering-app-backend

# Food Delivery Application

Welcome to the Food Delivery Application! This project is a full-stack web application designed to provide a seamless and intuitive experience for users to order food online.

## 🚀 Live Demo

You can view the live application here: [Food Delivery Application](https://mern-food-ordering-app-frontend-oprw.onrender.com/)

#### Log in

![Log in](./readme-images/MERN%20Food%20Ordering%20App%20Auth0.png)

### Quickly search for a restaurant on the homepage

![Homepage search](./readme-images/Mern%20Food%20Ordering%20App%20Homepage%20Search.jpg)

### Apply filters in your restaurant search

![Filtered Search](./readme-images/MERN%20Food%20Ordering%20App%20Filtered%20Search.png)

### Add items to your order

![Order items](./readme-images/MERN%20Food%20Ordering%20App%20Placing%20Order.png)

### Confirm Order placement

![Confirm order](./readme-images/Mern%20Food%20Ordering%20App%20Confirm%20Delivery%20Details.png)

### Checkout in Stripe

![Stripe checkout](./readme-images/MERN%20Food%20Ordering%20App%20Stripe.png)

### View Orders

![View orders](./readme-images/MERN%20Food%20Ordering%20App%20Orders.png)

### View and update your user profile

![User Profile](./readme-images/Mern%20Food%20Ordering%20App%20User%20Profile.png)

### View and update your restaurant profile

![Restaurant Profile](./readme-images/MERN%20Food%20Ordering%20App%20Manage%20Restaurant.png)

## 🛠️ Technologies Used

This project leverages a modern tech stack that includes:

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **CSS**: Styling the application with responsive design in mind.
  - **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
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
VITE_API_BASE_URL=your_base_url
VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client
VITE_AUTH0_CALLBACK_URL=your_auth0_callback
VITE_AUTH0_AUDIENCE=your_auth0_audience
```

### Running the Application

To start the application in development mode, use the following command:

```bash
npm run dev
```

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

Both the Frontend and Backend must be running in order to view locally. Please visit the [Backend Repo](https://github.com/TishG/mern-food-ordering-app-backend) for instructions.

### 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

### 👩🏿‍💻 Author

Tish Griffiths - [GitHub Profile](https://github.com/TishG)

Feel free to reach out if you have any questions or suggestions!
