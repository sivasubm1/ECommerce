import React from "react";
import "antd/dist/antd.css";
import { Modal, Form, Input, DatePicker } from "antd";
import { createTask } from "../../functions/task";
import moment from "moment";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import uuid from "react-uuid";

const CollectionCreateForm = ({
  visible,
  setVisible,
  columns2Len,
  setColumns2Len,
  setTaskBoardColumnValues,
  onCancel,
}) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [form] = Form.useForm();
  let dispatch = useDispatch();
  const stateItems = useSelector((state) => state.task.items);

  const titleCreate = (values) => {
    const indvItems = {
      _id: uuid(),
      title: values.title,
      storypoints: values.storypoints,
      deadline: moment(values.deadline).format("MM/DD/YYYY"),
    };

    onCreateTask(indvItems);
  };

  const callSum = (a, b) => {
    console.log("sumVal", a + b);
  };

  const onCreateTask = (values) => {
    const { _id, ...indvItems } = values;

    callSum(2, 3);

    createTask(
      {
        ...indvItems,
      },
      user.token
    )
      .then((res) => {
        dispatch({
          type: "CREATE_TASKS",
          payload: values,
        });

        //  const obj = [...stateItems, values].length;
        //  console.log("objlength", obj);
        setColumns2Len([...stateItems, values].length);
        setTaskBoardColumnValues(Object.assign([...stateItems, values]));
        toast.success(`${res.data.title} is created`);
      })
      .catch((err) => {
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <Modal
      visible={visible}
      title="Create a new task"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            // onCreate(values);
            setVisible(false);
            titleCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="storypoints"
          label="StoryPoints"
          rules={[
            {
              required: true,
              message: "Please input the storypoints!",
            },
          ]}
        >
          <Input type="textarea" />
        </Form.Item>
        <Form.Item
          name="deadline"
          label="DeadLine"
          rules={[
            {
              required: true,
              message: "Please select the date!",
            },
          ]}
        >
          <DatePicker
            dateRender={(current) => {
              const style = {};
              if (current.date() === 1) {
                style.border = "1px solid #1890ff";
                style.borderRadius = "50%";
              }
              return (
                <div className="ant-picker-cell-inner" style={style}>
                  {current.date()}
                </div>
              );
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CollectionCreateForm;
