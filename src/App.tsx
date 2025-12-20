import "./styles/App.css";

//  Components
import Index from "./components/Index";
// Theme
import { ThemeProvider } from "@mui/material";
import { themeContext } from "./providers/ThemeProvider";

// Providers
import { LanguageProvider } from "./providers/LanguageProvider";

function App() {
  return (
    <>
      <LanguageProvider>
        <ThemeProvider theme={themeContext}>
          <Index />
        </ThemeProvider>
      </LanguageProvider>
    </>
  );
}

export default App;
