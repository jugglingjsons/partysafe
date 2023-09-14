import Image from "next/image";
import styles from "../styles/support.module.css";

const links = [
  { text: "Drogennotdienst.de", url: "https://drogennotdienst.de/" },
  {
    text: "Vistaberlin.de - English",
    url: "https://vistaberlin.de/sprachen/english/",
  },
  {
    text: "Drogennotdienst.de - English",
    url: "https://drogennotdienst.de/english/",
  },
  // Add more links as needed
];

export default function Support() {
  return (
    <div className={styles["support-container"]}>
      <h1 className={styles["support-title"]}>Your Support</h1>
      <div className={styles["image-container"]}>
        <Image
          src="/support.png" // Ensure the path is correct
          alt="Support"
          width={400} // Adjust the width as needed
          height={200} // Adjust the height as needed
          className={styles["support-image"]}
          layout="responsive" // Use "responsive" to maintain aspect ratio
        />
      </div>
      <h2 className={styles["support-description"]}>
        Find confidential advice nearby. Find accepting drug counseling and drug
        checking services nearby. No strings attached.
      </h2>
      <div className={styles["link-list"]}>
        <p className={styles["link-item"]}>Useful Links:</p>
        <ul>
          {links.map((link, index) => (
            <li key={index} className={styles["link-item"]}>
              <a
                className={styles["link-button"]}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
        {links.length > 3 && (
          <div className={styles["animation-container"]}>
            <Image
              src="/support.gif" // Replace with your GIF animation source
              alt="Support Animation"
              width={300} // Adjust the width as needed
              height={150} // Adjust the height as needed
              priority={true}
              className={styles["animation-image"]}
            />
          </div>
        )}
      </div>
    </div>
  );
}
