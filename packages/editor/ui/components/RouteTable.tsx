import React from "react";
import {
  Table,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Switch,
  Button,
  Affix,
  message,
  Modal
} from "antd";
import { METHODS } from "../constants/httpMothods";
import RouteModal from "./RouteModal";
import { withNamespaces } from "react-i18next";
import store from "../redux/store/store";
import { getRouteInfo, setRouteInfo } from "../redux/actions/configActions";

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

const methods = METHODS;

class EditableTable extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editingKey: "",
      showDetailModal: false,
      detailRecord: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    //todo problem
    if (this.props.routes == nextProps.routes) {
      return;
    }
    this.setState(
      Object.assign({}, this.state, {
        data: nextProps.routes,
        editingKey: ""
      })
    );
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = record => {
    // reback data for select
    this.setState({ editingKey: "" });
    // const newData = [...this.state.data];
    // this.setState({ data: newData, editingKey: "" });
    this.props.onGet();
  };

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

      this.props.onSave(newData);
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  delete(key) {
    const newData = [...this.state.data];
    newData.splice(key, 1);
    this.props.onSave(newData);
  }

  showDetail(record) {
    this.setState({ showDetailModal: true, detailRecord: record });
    store.dispatch(getRouteInfo(record));
  }

  handleAdd() {
    const newData = [...this.state.data];
    newData.push({
      method: "GET",
      url: +new Date()
    });
    this.props.onSave(newData);
  }

  onCancel = () => {
    this.setState({ showDetailModal: false });
  };
  onOk = value => {
    const { t, i18n } = this.props;
    // do not close the dialog
    // this.setState({ showDetailModal: false });
    try {
      JSON.parse(value)
    } catch (error) {
      message.error(`${t("action.save")} ${t("txt.fail")}, ${t("action.please")} ${t("action.check")} ${t("txt.format")}`);
      return;
    }
    store.dispatch(
      setRouteInfo({
        record: this.state.detailRecord,
        content: value || "{}"
      }).bind(this)
    );
    message.success(`${t("action.save")} ${t("txt.success")}`);
  };

  render() {
    const { t, i18n } = this.props;
    const components = {
      body: {
        cell: EditableCell
      }
    };

    const staticColumns = [
      {
        title: t("txt.method"),
        dataIndex: "method",
        width: "25%",
        render: (text, record) => {
          const { editingKey, data } = this.state;
          const editable = this.isEditing(record);
          const changeMethods = value => {
            record.method = value;
          };
          return editable ? (
            <div>
              <Select
                defaultValue={text}
                disabled={!editable}
                onChange={changeMethods}
              >
                {methods.map((v, i) => {
                  return (
                    <Select.Option value={v} key={i}>
                      {v}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
          ) : (
            <div>{text}</div>
          );
        }
      },
      {
        title: t("txt.url"),
        dataIndex: "url",
        width: "20%",
        editable: true
      },
      {
        title: t("txt.path"),
        dataIndex: "path",
        width: "15%",
        editable: true
      },
      {
        title: t("txt.ignore"),
        dataIndex: "ignore",
        width: "15%",
        render: (text, record, index) => {
          const { editingKey, data } = this.state;
          const editable = this.isEditing(record);

          const changeIgnore = checked => {
            record.ignore = checked;
          };
          return editable ? (
            <div>
              <Switch
                defaultChecked={text}
                disabled={!editable}
                onChange={changeIgnore}
              />
            </div>
          ) : (
            <div>{text.toString()}</div>
          );
        }
      },
      {
        title: t("txt.operation"),
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
                    {t("action.save")}
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm
                title="Sure to cancel?"
                onConfirm={() => this.cancel(record)}
              >
                <a>{t("action.cancel")}</a>
              </Popconfirm>
            </span>
          ) : (
            <div>
              <a
                disabled={editingKey !== ""}
                onClick={() => this.edit(record.key)}
                style={{ marginRight: 8 }}
              >
                {t("action.edit")}
              </a>
              <Popconfirm
                title="Sure to Delete?"
                onConfirm={() => this.delete(record.key)}
              >
                <a style={{ marginRight: 8 }}>{t("action.delete")}</a>
              </Popconfirm>
              <a onClick={() => this.showDetail(record)}>
                {t("action.detail")}
              </a>
            </div>
          );
        }
      }
    ];
    const columns = staticColumns.map(col => {
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
        <Affix offsetTop={10}>
          <Button
            onClick={this.handleAdd.bind(this)}
            type="primary"
            style={{ marginBottom: 16 }}
          >
            {t("action.add")}
          </Button>
        </Affix>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            hideOnSinglePage: true,
            pageSize: 10000
          }}
        />
        <RouteModal
          visible={this.state.showDetailModal}
          record={this.state.detailRecord}
          onCancel={() => this.onCancel()}
          onOk={v => this.onOk(v)}
        />
      </EditableContext.Provider>
    );
  }
}

const RouteTable = Form.create()(EditableTable);

export default withNamespaces("translation")(RouteTable);
