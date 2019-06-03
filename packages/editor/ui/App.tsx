import React from "react";
import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { connect } from "react-redux";
import { GET_CONFIG_INFO } from "./constants/actionTypes";
import { fetchConfig } from './redux/actions/configActions'

interface AppProps extends React.Props<any> {
  onLoad?: any
}
interface AppState {
  
}
const GlobalStyle = createGlobalStyle`
    ${normalize}    
`;

const mapStateToProps = state => ({
  ...state.config
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(fetchConfig())
});

class App extends React.Component <AppProps, AppState> {

  componentDidMount() {
      this.fetchConfig()
  }

  fetchConfig() {
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
