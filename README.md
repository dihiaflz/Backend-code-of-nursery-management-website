# Backend-code-of-nursery-management-website
This Git repository contains the backend code for a comprehensive nursery management website . The website provides distinct interfaces catering to administrators, nurses, speech therapists, and parents, each equipped with specialized functionalities tailored to their roles and responsibilities.

Key Features:

Role-Based Interfaces: The backend is structured to support four distinct user interfaces, ensuring that each role has access to relevant functionalities and information.
JWT Authentication: Security is paramount, and the backend implements JSON Web Tokens (JWT) for secure authentication, ensuring that only authorized users can access the system.
MongoDB Integration: The backend seamlessly integrates with MongoDB, a robust NoSQL database, to efficiently manage and store data related to nursery operations, user profiles, and interactions.
Scalable Architecture: The backend is designed with scalability in mind, allowing for future enhancements and the addition of new features to meet evolving requirements in nursery management .

# HOW TO USE :
1. Clone the repository to your local machine.
2. Run the command **npm install** to install all the project's dependencies
3. Create in the project's root directory a .env file
4. Create a new database in mongodb and find the link to connect your db ( sign in in mongodb website => database => connect => mongodb for vs code )
5. Fill out the **.env** file with the following informations : DATABASE_URI= the link to use your db, SECRET= the secret for your jwt token, it can be any word you want but you should keep it a secret
6. Run the code using the command **npm start** and everything will work properly . 
GOOD LUCK !


