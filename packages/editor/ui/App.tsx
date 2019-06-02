import React from "react";
import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { connect } from "react-redux";
import { GET_CONFIG_INFO } from "./constants/actionTypes";

interface AppProps extends React.Props<any> {
  onLoad: any
}

const GlobalStyle = createGlobalStyle`
    ${normalize}    
`;

const mapStateToProps = state => ({
  ...state.config
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch({ type: GET_CONFIG_INFO })
});

class App extends React.Component <AppProps, any> {

  componentDidMount() {
      this.props.onLoad()
  }
  render() {
    return (
        <React.Fragment>
          <GlobalStyle />
          <div className="App">
            <h1>GUI for http-mockjs</h1>
          </div>
        </React.Fragment>
      );
  }
  
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
