import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { Row, Col, Card } from "antd";
import CollectionCreateForm from "../../../components/forms/CollectionCreateForm";
import TaskBoardColumns from "../dashboard/TaskBoardColumns";
import { getTasks } from "../../../functions/task";
import { useDispatch } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "react-uuid";

const MainTaskBoard = () => {
  const [visible, setVisible] = useState(false);
  let dispatch = useDispatch();
  const [columns1, setColumns1] = useState([]);
  const [columns2Len, setColumns2Len] = useState(0);

  useEffect(async () => {
    loadTasks();
  }, []);

  const setTaskBoardColumnValues = (values) => {
    return setColumns1(values);
  };

  const loadTasks = () =>
    getTasks()
      .then((c) => {
        removeDatesFromResponse(c.data);
        setColumns2Len(c.data.length);
        return setColumns1(c.data);
      })
      .catch();

  const removeDatesFromResponse = (response) => {
    return response.map((task) => {
      const { createdAt, updatedAt, ...indvTasks } = task;

      dispatch({
        type: "CREATE_TASKS",
        payload: { ...indvTasks },
      });
    });
  };

  return (
    <div>
      {columns1.length == columns2Len && (
        <TaskBoardColumns
          visible={visible}
          setVisible={setVisible}
          columnValues={columns1}
        />
      )}

      <CollectionCreateForm
        visible={visible}
        setVisible={setVisible}
        columns2Len={columns2Len}
        setColumns2Len={setColumns2Len}
        setTaskBoardColumnValues={setTaskBoardColumnValues}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default MainTaskBoard;
