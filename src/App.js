import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/Navbar';
import Record from './components/Record';
import { Box } from '@mui/material';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline enableColorScheme />
            <Box sx={{ flexGrow: 1 }} className="App">
                <Navbar />
                <Record />
            </Box>
        </ThemeProvider>
    );
}
