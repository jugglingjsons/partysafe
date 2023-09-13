// pages/api/druglibrary.js

import drugLibraryData from "../../public/druglibrary.json";

export default function handler(req, res) {
  res.status(200).json(drugLibraryData);
}
