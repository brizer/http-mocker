import React from "react";
import { Modal, Input } from "antd";
import store from "../redux/store/store";
import ReactJson from "react-json-view";
import { getRouteInfo } from "../../ui/redux/actions/configActions";

const { TextArea } = Input;

const ModalTitle = function(){
  return <div><span>Mock Result based on </span> <a target='_blank' href="http://mockjs.com/examples.html">MockJs</a></div>
}

class RouteModal extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      JsonContent: {}
    };
  }

  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState();
      const content = state.config.content;
      const JsonContent = content ? JSON.parse(content) : {};
      this.setState({ content: content });
      this.setState({ JsonContent });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.record == nextProps.record) {
      return;
    }
    // store.dispatch(getRouteInfo(nextProps.record))
  }

  changeContent(e) {
    this.setState({ content: e.target.value });
    let jsonContent
    try {
        jsonContent = JSON.parse(e.target.value)
    } catch (error) {
        jsonContent = '';
    }
    this.setState({ JsonContent:jsonContent})
  }

  onChangeEdiror(e) {
    const { updated_src } = e;
    this.setState({ content: JSON.stringify(updated_src, null, 4) });
  }

  save() {
    this.props.onOk(this.state.content);
    store.dispatch(getRouteInfo(this.props.record));
  }

  render() {
    return (
      <Modal
        title={ModalTitle()}
        visible={this.props.visible}
        onOk={() => this.save()}
        width={1200}
        onCancel={this.props.onCancel}
      >
        <div style={{ float: "left", width: "50%" }}>
          <ReactJson
            src={this.state.JsonContent}
            onEdit={this.onChangeEdiror.bind(this)}
            onAdd={this.onChangeEdiror.bind(this)}
            onDelete={this.onChangeEdiror.bind(this)}
            displayObjectSize={false}
            displayDataTypes={false}
            enableClipboard={false}
          ></ReactJson>
        </div>
        <div style={{ float: "right", width: "50%" }}>
          <TextArea
            value={this.state.content}
            onChange={this.changeContent.bind(this)}
            // rows={20}
            autosize={true}
          />
        </div>
      </Modal>
    );
  }
}

export default RouteModal;
