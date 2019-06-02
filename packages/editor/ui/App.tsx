import React from 'react';
import { createGlobalStyle } from "styled-components";

const { normalize } = require('styled-normalize')


const GlobalStyle = createGlobalStyle`
    ${normalize}    
`;

const App: React.FC = () => {
  return (
        <React.Fragment>
            <GlobalStyle />
            <div className="App">
                <header className="App-header">
                    <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Learn React
                    </a>
                </header>
            </div>
        </React.Fragment>
        
  );
}

export default App;