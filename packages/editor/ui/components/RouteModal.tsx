import React from 'react'
import { connect } from "react-redux";
import {Modal} from 'antd'
import store from '../redux/store/store'
import { getRouteInfo } from '../redux/actions/configActions';


class RouteModal extends React.Component<any, any>{
    constructor(props){
        super(props)

        this.state = {
            content:''
        }
    }

    componentDidMount() {
        const record = this.props.record
    }

    componentWillReceiveProps(nextProps){
        if(this.props.record == nextProps.record){
            return
        }
        store.dispatch(getRouteInfo(nextProps.record))
        
    }
    
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