// // pages/api/signup.js
// import dbConnect from './Db/DbConnect';
// import User from '../../models/User'; // You need to define this model
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import signup from '../signup';

// export default async (req, res) => {
//     await dbConnect();

//     if (req.method === 'POST') {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ error: 'Email and password are required' });
//         }

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: 'A user with this email already exists' });
//         }

//         // Hash password before storing (consider using libraries like bcrypt)
//         // const hashedPassword = await bcrypt.hash(password, 12);

//         // For this example, we'll store the plain password (DO NOT do this in a real app)
//         const newUser = new User({ email, password });
//         await newUser.save();
//         return res.status(201).json({ success: true });
//     }

//     // Handle any other HTTP methods
//     res.status(405).end();
// };
