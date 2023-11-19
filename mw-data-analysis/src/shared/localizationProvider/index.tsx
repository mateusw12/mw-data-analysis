import { LocalizationProvider as MUILocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import locale from "date-fns/locale/pt-BR";

const LocalizationProvider = ({ children }) => {
  return (
    <>
      <MUILocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={locale}
      >
        {children}
      </MUILocalizationProvider>
    </>
  );
};

export default LocalizationProvider;
