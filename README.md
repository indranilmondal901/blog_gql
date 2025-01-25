# Blog Post Application

## Description
This is a simple full-stack blog post application that allows users to view and add blog posts. The application uses React for the frontend, Node.js with GraphQL for the backend, and MongoDB as the database. It demonstrates basic CRUD operations with a responsive user interface and is designed to be functional across devices.

## Features
- View a list of blog posts.
- Add a new blog post with a title and content.
- Search and sort blog posts on the frontend.
- Fetch all posts or a specific post by ID from the backend using GraphQL.
- Responsive design for an optimal user experience on different devices.

## Technologies Used
### Frontend
- React
- CSS (or a CSS framework like SASS/Styled Components)
- React Router DOM

### Backend
- Node.js
- Express
- GraphQL
- MongoDB with Mongoose

### Database
- MongoDB

## Setup Instructions

### Prerequisites
- Node.js installed on your system
- MongoDB instance (local or cloud, such as MongoDB Atlas)

### Steps to Set Up

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

#### 2. Install Dependencies
##### Backend
```bash
cd be
npm install
```
##### Frontend
```bash
cd fe
npm install
```

#### 3. Set Up Environment Variables
Create a `.env` file in the `backend` directory and configure the following:
```env
PORT=8080
MONGO_URI=mongodb+srv://indranilmondal901:abcd1234@cluster0.flnxd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```
Replace `<username>`, `<password>`, `<cluster>`, and `<database>` with your MongoDB credentials.

#### 4. Start the Backend Server
Navigate to the backend directory and run:
```bash
npm start
```
The server will start on `http://localhost:8080/graphql`.

#### 5. Start the Frontend Application
Navigate to the frontend directory and run:
```bash
npm start
```
The frontend will start on `http://localhost:3000/`.

### GraphQL Endpoints
#### Queries
- `getPosts`: Fetch all blog posts.
- `getPost(id: ID!)`: Fetch a specific blog post by its ID. {but not used}

#### Mutations
- `addPost(title: String!, content: String!)`: Add a new blog post.

### Example GraphQL Query
```graphql
query {
  getPosts {
    id
    title
    content
  }
}
```

### Example GraphQL Mutation
```graphql
mutation {
  addPost(title: "Sample Title", content: "Sample Content") {
    id
    title
    content
  }
}

```

## Approach
1. **Frontend:**
   - Built a responsive interface using React for displaying and adding blog posts.
   - Implemented search and sort functionalities.
   - Integrated API calls to fetch data from the backend.

2. **Backend:**
   - Created a Node.js server using Express and GraphQL.
   - Defined a GraphQL schema and resolvers for managing posts.
   - Used Mongoose for MongoDB operations.

3. **Database:**
   - Stored blog posts in a MongoDB database with `title` and `content` fields.

4. **Integration:**
   - Connected the frontend to the backend using GraphQL queries and mutations.
   - Deployed a seamless workflow for adding and viewing blog posts.

## Notes
- Ensure MongoDB is running before starting the backend.
- Customize styles in the frontend for a better user experience.


## Images
### > 768px (PC)
![alt text](image.png)

### > 480 && < 768 (Tablet)
![alt text](image-1.png)

### < 480px (Mobile)
![alt text](image-2.png)