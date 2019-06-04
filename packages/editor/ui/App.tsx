import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { connect } from "react-redux";
import { Input, Row, Col } from "antd";
import { fetchConfig, setConfig } from "./redux/actions/configActions";
import RouteTable from './components/RouteTable'

interface AppProps extends React.Props<any> {
  onLoad?: any;
  config: any;
}
interface AppState {
  config: any;
}
const GlobalStyle = createGlobalStyle`
    ${normalize}    
`;

const MiddleLabel = styled.span<any>`
  display: inline-block;
  text-align: center;
  width: 100%;
`;

const mapStateToProps = state => ({
  ...state.config
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(fetchConfig()),
  saveConfig: (data)=>dispatch(setConfig(data))
});

class App extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      config: {}
    };
  }
  componentDidMount() {
    this.fetchConfig();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      Object.assign({}, this.state, {
        config: nextProps.config
      })
    );
  }

  fetchConfig =()=> {
    this.props.onLoad();
  }

  saveConfigRoute(data) {
    //first set config and then get config
    this.props.saveConfig(data)
  }

  render() {
    const mockFileNameChange = e => {
      this.setState({
        config: Object.assign({}, this.state.config, {
          mockFileName: e.target.value
        })
      });
    };

    return (
      <React.Fragment>
        <GlobalStyle />
        <div className="App">
          <h1>GUI for http-mockjs</h1>
          <Row>
            <Col span={8}>
              <MiddleLabel>mock文件夹名称</MiddleLabel>
            </Col>
            <Col span={8}>
              <Input
                disabled={true}
                value={this.state.config.mockFileName}
                onChange={mockFileNameChange}
              />
            </Col>
          </Row>
          <div className="table">
            <RouteTable routes={this.state.config.routes}  onSave={this.saveConfigRoute.bind(this)}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
