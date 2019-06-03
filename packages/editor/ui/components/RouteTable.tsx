import React from "react";
import { Table, Form, Input, InputNumber, Popconfirm, Select, Switch } from "antd";
import { METHODS } from "../constants/httpMothods";

const data = [];
for (let i = 0; i < 30; i++) {
  data.push({
    key: i.toString(),
    method: `GET`,
    url:'/user/:id',
    path: '/api/user.json',
    ignore: true,
    age: 32,
    address: `London Park no. ${i}`
  });
}
const EditableContext = React.createContext({});

class EditableCell extends React.Component<any, any> {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`
                }
              ],
              initialValue: record[dataIndex]
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}

const methods = METHODS

class EditableTable extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      data,
      editingKey: "",
      columns: [
        {
          title: "Method",
          dataIndex: "method",
          width: "25%",
          render: (text, record) => {
            const { editingKey, data} = this.state;
            const editable = this.isEditing(record)
            return (
              <div>
                <Select defaultValue={text} disabled={!editable} onChange={this.methodChange}>
                  {methods.map((v,i)=>{
                    return <Select.Option value={v} key={i}>{v}</Select.Option>
                  })}
                </Select>
              </div>
            )
          }
        },
        {
          title: 'Url',
          dataIndex: 'url',
          width:"20%",
          editable:true
        },
        {
          title: "Path",
          dataIndex: "path",
          width: "15%",
          editable: true
        },
        {
          title: "Ignore",
          dataIndex: "ignore",
          width: "15%",
          render:(text,record)=>{
            const {editingKey,data} = this.state;
            const editable = this.isEditing(record)
            const onChange=(checked)=>{
              text = !text;
            }
            return (
              <div>
                <Switch checked={text} onChange={onChange}/>
              </div>
            )
          }
        },
        {
          title: "operation",
          dataIndex: "operation",
          render: (text, record) => {
            const { editingKey } = this.state;
            const editable = this.isEditing(record);
            return editable ? (
              <span>
                <EditableContext.Consumer>
                  {form => (
                    <a
                      href="javascript:;"
                      onClick={() => this.save(form, record.key)}
                      style={{ marginRight: 8 }}
                    >
                      Save
                    </a>
                  )}
                </EditableContext.Consumer>
                <Popconfirm
                  title="Sure to cancel?"
                  onConfirm={() => this.cancel(record)}
                >
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <a
                disabled={editingKey !== ""}
                onClick={() => this.edit(record.key)}
              >
                Edit
              </a>
            );
          }
        }
      ]
    };
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = (record) => {
    console.log(record)
    // reback data for select
    // this.setState({ editingKey: "" });
    const newData = [...this.state.data];
    this.setState({ data: newData, editingKey: "" });
  };

  methodChange = (value) => {
    console.log(value)
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ data: newData, editingKey: "" });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: "" });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell
      }
    };

    const columns = this.state.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === "age" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            hideOnSinglePage:true,
            pageSize:10000
          }}
        />
      </EditableContext.Provider>
    );
  }
}

const RouteTable = Form.create()(EditableTable);

export default RouteTable;
