PartySafe

A web application built with Next.js to buy drugkits. Deployed on Vercel.
Table of Contents

    Features
    Setup and Installation
    Deployment with Vercel
    Usage
    Contributing
    License

Features

    User Authentication: Secure signup and login functionality with NextAuth.js.
    Browse Products: Users can view all available drugkits.
    Favorites: Users can favorite drugkits and view them later.
    Responsive Design: Suitable for desktop and mobile devices.

Setup and Installation
Prerequisites:

    Node.js
    MongoDB

Steps:

    Clone the repository:

bash

git clone [repository-url]

    Navigate to the PartySafe directory:

bash

cd PartySafe

    Install the required dependencies:

bash

npm install

    Set up your .env.local file with the necessary environment variables, like the MongoDB URI and NextAuth.js configurations.

    Start the development server:

bash

npm run dev

The application should now be running at http://localhost:3000/.
Deployment with Vercel

    Install the Vercel CLI:

bash

npm install -g vercel

    Deploy the application:

bash

vercel

Follow the prompts to deploy your application. Once deployed, Vercel will provide you with a live URL.
Usage

After setting up PartySafe, you can:

    Navigate to the homepage to view all drugkits.
    Sign up or log in to access user-specific features like favoriting drugkits.
    Visit the favorites page to view all your liked drugkits.

Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
License

MIT

Remember to replace placeholders like [repository-url] with your specific details. The README should be updated as your project evolves, adding more details or modifying existing information as needed.