import Link from 'next/link';

export default function Support() {
    return (
        <div className="bg-white min-h-screen text-gray-800">
            <h1 className="text-center my-4">Your Support</h1>
            <h2 className="text-center my-4">
                Find confidential advice nearby. Find accepting drug counselling and drug checking services nearby. No strings attached.
            </h2>
            <div className="text-center my-4">
                <p>Links:</p>
                <ul className="list-disc list-inside">
                    <li>
                        <Link href="https://drogennotdienst.de/">drogennotdienst.de</Link>
                    </li>
                    <li>
                        <Link href="https://vistaberlin.de/sprachen/english/">vistaberlin.de - English</Link>
                    </li>
                    <li>
                        <Link href="https://drogennotdienst.de/english/">drogennotdienst.de - English</Link>
                    </li>
                    {/* Add more links as needed */}
                </ul>
            </div>
        </div>
    );
}
