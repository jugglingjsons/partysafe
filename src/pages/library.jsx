import React from "react";
import Library from "../components/library"; // Import the Library component
import "../../src/styles/Library.module.css";

export default function LibraryPage() {
  return (
    <div className="container">
      {/* Render the Library component */}
      <Library />
    </div>
  );
}
