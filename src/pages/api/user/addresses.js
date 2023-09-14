// pages/api/addresses.js
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    // Implement logic to retrieve the user's addresses
    const addresses = await getUserAddresses(session.user.id);

    return res.status(200).json({ addresses });
  } else if (req.method === "POST") {
    // Implement logic to add a new address for the user
    const newAddress = req.body; // Assuming the request body contains the new address data
    const addressId = await addAddress(session.user.id, newAddress);

    if (addressId) {
      return res
        .status(200)
        .json({ message: "Address added successfully", addressId });
    } else {
      return res.status(500).json({ error: "Failed to add address" });
    }
  } else if (req.method === "PUT") {
    // Implement logic to update an existing address for the user
    const addressId = req.query.id; // Assuming you pass the address ID as a query parameter
    const updatedAddress = req.body; // Assuming the request body contains the updated address data
    const success = await updateAddress(
      session.user.id,
      addressId,
      updatedAddress
    );

    if (success) {
      return res.status(200).json({ message: "Address updated successfully" });
    } else {
      return res.status(500).json({ error: "Failed to update address" });
    }
  } else if (req.method === "DELETE") {
    // Implement logic to delete an address for the user
    const addressId = req.query.id; // Assuming you pass the address ID as a query parameter
    const success = await deleteAddress(session.user.id, addressId);

    if (success) {
      return res.status(200).json({ message: "Address deleted successfully" });
    } else {
      return res.status(500).json({ error: "Failed to delete address" });
    }
  }
}
