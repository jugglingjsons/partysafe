import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function DrugDetail(props) {
  const router = useRouter();
  const { t } = useTranslation(); // Access the t function for translations
  const { name } = props;
  const [drugDetails, setDrugDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the drug details based on the name from your JSON file
        const response = await fetch('/druglibrary.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();

        // Find the drug object with the matching name
        const foundDrug = data.find((drug) => drug.name === name);
        if (foundDrug) {
          setDrugDetails(foundDrug);
        } else {
          console.error(`Drug with name "${name}" not found.`);
        }
      } catch (error) {
        console.error('Error fetching drug details:', error);
      }
    };

    if (name) {
      fetchData();
    }
  }, [name]);

  if (!drugDetails) {
    return <div>{t('loading')}</div>;
  }

  const {
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
          <strong>{t('aliases')}:</strong> {aliases.join(', ')}
        </p>
      )}
      <p>
        <strong>{t('appearance')}:</strong> {appearance}
      </p>
      <h2>{t('details')}:</h2>
      <p>{description}</p>
      <p>
        <strong>{t('effects')}:</strong> {effects}
      </p>
      <p>
        <strong>{t('dosage')}:</strong> {dosage}
      </p>
      <p>
        <strong>{t('usage')}:</strong> {usage}
      </p>
      <p>
        <strong>{t('duration')}:</strong> {duration}
      </p>
      <p>
        <strong>{t('risks')}:</strong> {risks}
      </p>
      <p>
        <strong>{t('sideEffects')}:</strong> {sideEffects}
      </p>
      <p>
        <strong>{t('sexUse')}:</strong> {sexUse}
      </p>
      <p>
        <strong>{t('mixedUse')}:</strong> {mixedUse}
      </p>
      <p>
        <strong>{t('otherInformation')}:</strong> {otherInformation}
      </p>
    </div>
  );
}
