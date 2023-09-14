// // pages/api/druglibrary.js

// export default async function handler(req, res) {
//   try {
//     // Implement your data fetching logic here, for example, fetching from a JSON file:
//     const data = await fetch("/public/druglibrary.json");
//     const drugLibraryData = await data.json();

//     // Return the fetched data as JSON
//     res.status(200).json(drugLibraryData);
//   } catch (error) {
//     // Handle errors gracefully
//     console.error("Error fetching data:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
