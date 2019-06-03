import React from 'react'
import { Table, Divider, Tag } from 'antd'

interface RouteTableProps extends React.Props<any> {
}
interface RouteTableState {
}


const columns = [
    {
        title: 'Method',
        dataIndex: 'method',
        key: 'method',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
          title: 'Url',
          dataIndex: 'url',
          key: 'url'
      },
      {
          title:'Path',
          dataIndex: 'path',
          key: 'path'
      },
      {
          title:'isIgnore',
          dataIndex:'isignore',
          key:'isignore'
      },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">Delete</a>
        </span>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      method:'get',
      url:'/j/getSomeData.json',
      path:'/api/info.json',
      isignore:'false'
    }
  ];
  

class RouteTable extends React.Component<RouteTableProps, RouteTableState> {
    render() {
        return (
            <Table columns={columns} dataSource={data} />
        );
    }
}

export default RouteTable