import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Library() {
    const { data: drugData, error } = useSWR('/api/drug/${id}', fetcher);

    if (error) return <div>Error loading drug data</div>;

    return (
        <div>
            <h1>Drug Library</h1>
            {drugData ? (
                <div>
                    {drugData.map((drug) => (
                        <div key={drug._id}>
                            <h2>{drug.name}</h2>
                            <p>Effect: {drug.effect}</p>
                            <p>Dosage: {drug.dosage}</p>
                            <p>Risks: {drug.risks}</p>
                            <p>Safer Use: {drug.saferUse}</p>
                            <p>Mixed Use: {drug.mixedUse}</p>
                            <p>Sex: {drug.sex}</p>
                            <p>Synthesis Impurities: {drug.synthesisImpurities}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
