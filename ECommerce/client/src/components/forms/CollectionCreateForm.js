import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Modal, Form, Input, DatePicker } from "antd";

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
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
            onCreate(values);
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
