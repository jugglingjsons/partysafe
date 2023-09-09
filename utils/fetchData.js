// utils/fetchData.js
export async function fetchDrugLibrary() {
    const response = await fetch('/druglibrary.json');
    if (!response.ok) {
      throw new Error('Failed to fetch drug library data');
    }
    return response.json();
  }
  