import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button, Row, Col, Card } from "antd";
import CollectionCreateForm from "../../../components/forms/CollectionCreateForm";
import InternalCards from "../../../components/forms/InternalCards";
import { createTask, getTasks } from "../../../functions/task";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "react-uuid";

const MainTaskBoard = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState([]);

  let dispatch = useDispatch();
  const { Meta } = Card;

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () =>
    getTasks()
      .then((c) => {
        console.log("c.data", c.data);
        setTasks(c.data);

        const columnsFromBackend = {
          [uuid()]: {
            name: "To do",
            items: c.data,
          },
          [uuid()]: {
            name: "In Progress",
            items: [],
          },
          [uuid()]: {
            name: "Done",
            items: [],
          },
        };

        setColumns(() => {
          return columnsFromBackend;
        });
      })

      .catch();

  const taskItems = {
    id: uuid(),
    title: "title",
    storypoints: "storypoints",
    deadline: "deadline",
  };

  // const indvTaskItems = tasks.map((task) => {
  //   return {
  //     id: uuid(),
  //     title: task.title,
  //     storypoints: task.storypoints,
  //     deadline: task.deadline,
  //   };
  // });

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const onCreate = (values) => {
    setLoading(true);

    createTask(
      { ...values, deadline: moment(values.deadline).format("MM/DD/YYYY") },
      user.token
    )
      .then((res) => {
        setLoading(false);
        dispatch({
          type: "CREATE_TASK",
          payload: {
            ...values,
            deadline: moment(values.deadline).format("MM/DD/YYYY"),
          },
        });
        toast.success(`${res.data.title} is created`);
        loadTasks();
      })
      .catch((err) => {
        setLoading(false);

        if (err.response.status === 400) toast.error(err.response.data);
      });

    setVisible(false);
  };

  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Col span={8} key={columnId}>
                <Card
                  title={column.name}
                  extra={
                    column.name === "To do" && (
                      <a href="#" onClick={() => setVisible(true)}>
                        Add
                      </a>
                    )
                  }
                >
                  <div style={{ margin: 8 }}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="site-card-wrapper"
                            style={{
                              background: snapshot.isDraggingOver
                                ? "lightblue"
                                : "lightgrey",
                              padding: 4,
                              marginLeft: -30,
                              marginTop: -14,
                              width: 216,
                              minHeight: 500,
                            }}
                          >
                            <Card>
                              {column.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item._id}
                                    draggableId={item._id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            userSelect: "none",
                                            padding: 16,
                                            margin: "0 0 8px 0",
                                            minHeight: "50px",
                                            backgroundColor: snapshot.isDragging
                                              ? "#263B4A"
                                              : "#456C86",
                                            color: "white",
                                            ...provided.draggableProps.style,
                                          }}
                                        >
                                          <p>{item.title}</p>
                                          <p>{item.storypoints}</p>
                                          <p>
                                            {moment(item.deadline).format(
                                              "MM/DD/YYYY"
                                            )}
                                          </p>
                                        </div>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </Card>
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </Card>
              </Col>
            );
          })}
        </DragDropContext>
      </Row>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default MainTaskBoard;
