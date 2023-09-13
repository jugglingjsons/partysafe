import React from "react";
import styles from "../styles/Library.module.css";
import Library from "../components/library"; // Import the Library component

export default function LibraryPage() {
  return (
    <div className="container">
      {/* Render the Library component */}
      <Library />
    </div>
  );
}
