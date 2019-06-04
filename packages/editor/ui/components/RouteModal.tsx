import React from 'react'
import {Modal} from 'antd'
class RouteModal extends React.Component<any, any>{
    
    render(){
        return (
        <Modal
          title="Basic Modal"
          visible={this.props.visible}
          onOk={this.props.onOk}
          width={800}
          onCancel={this.props.onCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        )
    }
}


export default RouteModal