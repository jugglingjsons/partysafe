// pages/api/cart/add.js
import { getSession } from 'next-auth/react';
import dbConnect from '../../../../Db/DbConnect'; // Import your database connection
import User from '../../../../Db/models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // try {
      // Get the user's session
      const session = await getSession({ req });

      // Check if the user is authenticated
      // if (!session) {
      //   return res.status(401).json({ message: 'Unauthorized' });
      // }
console.log ('routetriggers==============================')
      // Extract item details from the request body
      const { itemId , userId, quantity } = req.body;
    
      // const userId = session.user.id;

      // Debugging: Log the extracted data
      // console.log('userId:', userId);
      // console.log('itemId:', itemId);
      // console.log('quantity:', quantity);

      // Connect to your MongoDB database
      await dbConnect();

      // Check if the cart item already exists for the user
      const user = await User.findByIdAndUpdate(userId,
        [
          {
            $set: {
              cart: {
                $cond: [{ $in: [itemId, "$cart"] },
                { $setDifference: ["$cart", [itemId]] },
                { $concatArrays: ["$cart", [itemId]] }]
              }
            }
          }
        ]
        , { new: true }
      )
    }
  }


//       if (existingCartItem) {
//         // If the item already exists, update the quantity
//         existingCartItem.quantity += quantity;
//         await existingCartItem.save();
        
//         return res.status(200).json(existingCartItem);
//       } else {

//         // If the item does not exist, create a new cart item
//         const newCartItem = new CartItem({
//           userId,
//           itemId,
//           quantity,

//           // Add other properties of the cart item as needed
//         });

//         // Save the cart item to the database
//         await newCartItem.save();

//         return res.status(201).json(newCartItem);
//       }
//     } catch (error) {
//       // Debugging: Log any errors
//       console.error('Error:', error);
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }
//   }

//   // Handle other HTTP methods if needed
//   return res.status(405).json({ message: 'Method not allowed' });
// }
