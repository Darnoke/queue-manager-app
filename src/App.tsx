import { ThemeProvider } from '@mui/material/styles'
import './App.scss'
import AppRouter from './routes/AppRouter'
import theme from './styles/theme.tsx'

function App() {

  return (
  <ThemeProvider theme={theme}>
    <AppRouter />
  </ThemeProvider>
  )
}

export default App
