Wanderlust – Full Stack MERN Project

A full-stack Airbnb-style travel listing platform built using Node.js, Express, MongoDB, Cloudinary, Mapbox, PassportJS, and EJS.
Users can sign up, create listings, upload images, add reviews, and explore locations on interactive maps.

🔗 Live Demo: https://wander-full-stack-project.onrender.com

🔗 GitHub Repository: https://github.com/VishwjitMore/Wander-Full-Stack-Project

🚀 Features
🔐 User Authentication & Authorization

Secure login & signup using Passport.js

Flash messages for success/error

Only owners can edit/delete their listings

Only review authors can delete their reviews

🏡 Listing Management

Create, edit, delete listings

Upload images via Multer + Cloudinary

Edit listing retains old images if no new image is uploaded

Full CRUD functionality

⭐ Reviews System

Add reviews with ratings

Delete only your reviews

Star rating UI

🗺️ Interactive Mapbox Map

Automatic geocoding using Mapbox API

Map and marker shown on every listing page

Fallback coordinates for old listings

🔍 Searching

Search listings by title

Flash message shown when no results found

💾 Tech Stack

Frontend: EJS, Bootstrap, CSS
Backend: Node.js, Express.js, MongoDB, Mongoose
Cloud: MongoDB Atlas, Cloudinary, Mapbox
Deployment: Render

🛠️ Installation & Setup (Local)
1️⃣ Clone the repository
git clone https://github.com/VishwjitMore/Wander-Full-Stack-Project
cd Wander-Full-Stack-Project

2️⃣ Install dependencies
npm install

3️⃣ Create a .env file and add:
ATLASDB_URL=your_mongodb_atlas_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MAP_TOKEN=your_mapbox_token
SESSION_SECRET=your_secret

4️⃣ Run development server
node app.js


App runs on:

http://localhost:8080

🌐 Deployment (Render)

Backend hosted on Render

Database on MongoDB Atlas

Cloudinary handles image uploads

Mapbox used for geocoding and map rendering
