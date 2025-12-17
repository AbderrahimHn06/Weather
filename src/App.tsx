import "./styles/App.css";

//  Components
import Index from "./components/Index";
// Theme
import { ThemeProvider } from "@mui/material";
import { themeContext } from "./providers/ThemeProvider";
// Mui Componenets
function App() {
  return (
    <>
      <ThemeProvider theme={themeContext}>
        <Index />
      </ThemeProvider>
    </>
  );
}

export default App;
