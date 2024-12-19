# E-commerce Website - Products Listing and Product Details Page

## Objective
The objective of this project is to develop a fully functional and mobile-optimized e-commerce website with product listing and product details pages, integrated with an API using **Next.js**. The goal is to create scalable and responsive web pages, implement server-side rendering (SSR), and demonstrate client-side functionality.

## Framework
- **Next.js** 

## Deployment

The live project is deployed on Vercel. Check it out here:

[Live Demo](https://shop-iq-e-commerce.vercel.app/)


## Features & Functionality

### 1. **Navbar**
The website includes a responsive navigation bar with the following components:
- **Logo**
- **Menu Options**:
  - Home
  - Categories
  - About
  - Contact

### 2. **Hero Section**
- A carousel showcasing product images.
- Smooth transitions for the carousel slides to improve the user experience.

### 3. **Product Listing Section**
This section displays a list of products, each represented by a product card.
- **Layout**:
  - Desktop View: Displays 4 cards in a row.
  - Mobile View: Displays 2 cards in a row.
  
- **Product Card Components**:
  - Product Image
  - Product Title
  - Price
  - Ratings 

- **Pagination**: 
  - The initial page shows 12 products.
  - The **"Show More"** button allows users to dynamically load 12 more products on each click until no more products remain.

### 4. **Product Details Page**
- **Left Section**: Displays a product image carousel (showing multiple images for each product).
- **Right Section**: Displays product details, including:
  - Product Title
  - Price
  - Description
  - Ratings
  - **"Add to Cart"** button or any other relevant information.

- The navbar is consistent across the homepage and product details page.

### 5. **Functionality Requirements**
- **Show More Button**: 
  - Dynamically loads 12 more products each time it’s clicked until all products are displayed.

- **Server-side Rendering (SSR)**: 
  - Both the product listing page and individual product details pages are built using SSR to improve SEO and performance.

- **Scroll Position Persistence**:
  - When navigating back from the product details page to the listing page, the scroll position on the listing page is preserved.

### 6. **API Integration**
- The project integrates with the **[DummyJSON Products API](https://dummyjson.com/docs/products)** to fetch product data.
- Error handling and loading states are managed during API calls to ensure a smooth user experience.

### 7. **Mobile Optimization**
- The product listing is fully optimized for mobile devices. On mobile, the page will display 2 cards per row, ensuring an optimal viewing experience.

## Installation Instructions

To run the project locally, follow the steps below:

### 1. Clone the repository:
```bash
git clone https://github.com/yourusername/ecommerce-website.git
cd ecommerce-website.
```

### 2. Install the required dependencies:
```bash
npm install
```

### 3. Start the development server:
```bash
npm run dev
```

### 4. Open your browser and navigate to:
http://localhost:3000


## **Folder Structure**

The folder structure of the project is organized as follows:

```bash
Copy code
/ecommerce-website
  /components        # Contains reusable components (Navbar, ProductCard, etc.)
  /pages            # Contains pages for the website (Home, Product Details, etc.)
  /styles           # Global styles and Tailwind CSS configurations
  /utils            # Utility functions (fetching data from the API, etc.)
  /context          # Context providers (for managing state like cart, etc.)
  /public           # Static assets (images, icons, etc.)
  README.md         # Project documentation
```

## **Technologies Used**
  
* Next.js for building SSR pages
* Tailwind CSS for responsive and utility-first styling
* React Context API for managing application state (e.g., cart items)
* DummyJSON API for fetching product data

## Demo Video

Watch the demo video of the project below:

[![Demo Video](https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)




## **Conclusion**

This project demonstrates the ability to build a fully responsive e-commerce website using Next.js, with features like server-side rendering, dynamic product loading, and API integration. The application is designed to be both desktop and mobile-friendly, ensuring a smooth and scalable user experience.


## **License**

This project is licensed under the MIT License.