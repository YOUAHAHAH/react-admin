import { Table, Space } from "antd";
import { DragOutlined } from "@ant-design/icons";
import update from "immutability-helper";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Test = (props) => {
  const { getDropData } = props;

  const type = "DraggableBodyRow";

  const DraggableBodyRow = ({
    index,
    moveRow,
    className,
    style,
    ...restProps
  }) => {
    const ref = useRef(null);
    const [{ isOver, dropClassName }, drop] = useDrop({
      accept: type,
      collect: (monitor) => {
        const { index: dragIndex } = monitor.getItem() || {};
        if (dragIndex === index) {
          return {};
        }
        return {
          isOver: monitor.isOver(),
          dropClassName:
            dragIndex < index ? " drop-over-downward" : " drop-over-upward",
        };
      },
      drop: (item) => {
        moveRow(item.index, index);
      },
    });
    const [, drag] = useDrag({
      type,
      item: {
        index,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    drop(drag(ref));
    return (
      <tr
        ref={ref}
        className={`${className}${isOver ? dropClassName : ""}`}
        style={{
          cursor: "move",
          ...style,
        }}
        {...restProps}
      ></tr>
    );
  };

  const columns = [
    {
      key: "title",
      dataIndex: "title",
      render: (_, index) => {
        return (
          <Space size="middle">
            <DragOutlined
              style={{ position: "absolute", left: "0", top: "45%" }}
            />
            <span>{index.title}</span>
          </Space>
        );
      },
    },
  ];

  const [data, setData] = useState(() => {
    const arr = [];
    props.columns.map((item, index) => {
      item.key = index;
      arr.push(item);
    });
    return arr;
  });

  const components = {
    body: {
      row: DraggableBodyRow,
    },
  };

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = data[dragIndex];
      setData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        })
      );
    },
    [data]
  );

  useEffect(() => {
    getDropData(data);
  }, [data]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        showHeader={false}
        pagination={false}
        columns={columns}
        dataSource={data}
        components={components}
        onRow={(_, index) => {
          const attr = {
            index,
            moveRow,
          };
          return attr;
        }}
      />
    </DndProvider>
  );
};

export default Test;
