import { useTranslation } from "next-i18next";
import Searchbar from "../components/ui/Searchbar";

const Layout = ({ children }) => {
  const { t } = useTranslation(); // Access the t function for translations

  return (
    <div>
      <header>
        {/* Include the Searchbar component here */}
        {/* For example, you can use t('searchPlaceholder') to translate the placeholder text */}
        <Searchbar placeholder={t("searchPlaceholder")} />
      </header>
      <main>{children}</main>
      <footer>Your footer content here</footer>
    </div>
  );
};

export default Layout;
