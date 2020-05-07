import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import CssBaseline from '@material-ui/core/CssBaseline';

import Kyselyt from './kysely/kyselyt';
import Kysely from './kysely/kysely';
import Vastaa from './kysely/vastaa';
import Vastaukset from './kysely/vastaukset';

const theme = createMuiTheme({
    palette: {
        primary: {main: '#2b2b2b', contrastText: '#FFFFFF'},
        secondary: {main: '#232323', contrastText: '#FFFFFF'},
        text: {primary: '#FFFFFF', secondary: '#bdbdbd' },
        background: {default: '#1a1a1a'}
    },
    overrides:{
        MuiExpansionPanelSummary: {
            root: {
                backgroundColor: '#2D2D2D',
                borderBottom: '1px solid #151515',
                minHeight: 20,
                marginBottom: -5,
                '&$expanded': {
                  minHeight: 20,
                }   
            },
              content: {
                '&$expanded': {
                  margin: '12px 0',
                }
            }
        },
        MuiExpansionPanelDetails: {
            root:{
                backgroundColor: '#262626',
                paddingBottom: 8,
                paddingTop: 10,
            }
        },
        MuiCard:{
            root:{
                backgroundColor: '#262626',
            }
        }
    }
});

function App() {
    return(
        <MuiThemeProvider theme={ theme }>
            <BrowserRouter>
            <div>
                <CssBaseline />
                <Switch>
                    <Route exact path='/kyselyt' component={ Kyselyt } />
                    <Route path='/kysely/:id' component={ Kysely } />
                    <Route path='/vastaa/:id' component={ Vastaa } />
                    <Route path='/vastaukset/:id' component={ Vastaukset } />
                </Switch> 
            </div>
            </BrowserRouter>
        </MuiThemeProvider>
    );
}

export default App;