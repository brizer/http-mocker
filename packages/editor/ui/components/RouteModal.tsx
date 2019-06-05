import React from 'react'
import {Modal, Input } from 'antd'
import store from '../redux/store/store'
import { getRouteInfo } from '../redux/actions/configActions';

const { TextArea } = Input 

class RouteModal extends React.Component<any, any>{
    constructor(props){
        super(props)

        this.state = {
            content:''
        }
    }

    componentDidMount() {
        store.subscribe(()=>{
            const state = store.getState()
            const content = state.config.content
            this.setState({content:content})
        })
    }

    componentWillReceiveProps(nextProps){
        if(this.props.record == nextProps.record){
            return
        }
        // store.dispatch(getRouteInfo(nextProps.record))
        
    }

    changeContent (e){
        this.setState({content:e.target.value})
    }


    save() {
        this.props.onOk(this.state.content)
    }
    
    render(){
        return (
        <Modal
          title="Basic Modal"
          visible={this.props.visible}
          onOk={()=>this.save()}
          width={800}
          onCancel={this.props.onCancel}
        >
          <TextArea value={this.state.content} onChange={this.changeContent.bind(this)} rows={20} />
        </Modal>
        )
    }
}


export default RouteModal