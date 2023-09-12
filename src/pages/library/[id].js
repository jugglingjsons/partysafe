import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function DrugDetail() {
  const router = useRouter();
  const { id: drugName } = router.query; // Change 'name' to 'drugName'
  // console.log('Drug Name:', drugName);
  const [drugDetails, setDrugDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/druglibrary.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        // console.log('Fetched data:', data);

        // Find the drug details based on the 'drugName'
        const foundDrug = data.find((drug) => drug.name === drugName);
        if (foundDrug) {
          // console.log('Found drug:', foundDrug);
          setDrugDetails(foundDrug);
        } else {
          console.error(`Drug with name "${drugName}" not found.`);
        }
      } catch (error) {
        console.error("Error fetching drug details:", error);
      }
    };

    if (drugName) {
      fetchData();
    }
  }, [drugName]);

  // console.log('Drug details:', drugDetails);

  if (!drugDetails) {
    return <div>Loading...</div>;
  }

  // Assuming 'details' is an object inside the drug data
  const {
    name,
    aliases,
    appearance,
    details: {
      description,
      effects,
      dosage,
      usage,
      duration,
      risks,
      sideEffects,
      sexUse,
      mixedUse,
      otherInformation,
    },
  } = drugDetails;

  return (
    <div>
      <h1>{name}</h1>
      {aliases && (
        <p>
          <strong>Aliases:</strong> {aliases.join(", ")}
        </p>
      )}
      <p>
        <strong>Appearance:</strong> {appearance}
      </p>
      <h2>Details:</h2>
      <p>{description}</p>
      <p>
        <strong>Effects:</strong> {effects}
      </p>
      <p>
        <strong>Dosage:</strong> {dosage}
      </p>
      <p>
        <strong>Usage:</strong> {usage}
      </p>
      <p>
        <strong>Duration:</strong> {duration}
      </p>
      <p>
        <strong>Risks:</strong> {risks}
      </p>
      <p>
        <strong>Side Effects:</strong> {sideEffects}
      </p>
      <p>
        <strong>Sexual Use:</strong> {sexUse}
      </p>
      <p>
        <strong>Mixed Use:</strong> {mixedUse}
      </p>
      <p>
        <strong>Other Information:</strong> {otherInformation}
      </p>
    </div>
  );
}
