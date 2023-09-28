import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Header from '../Header/Header';
import StakingRewards from './StakingRewards';

const mdTheme = createTheme();

export default function Dashboard() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header title='Crypto Dashboard' />
        <Box>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

            <Grid container spacing={1}>

              <StakingRewards />
              
            </Grid>

          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}