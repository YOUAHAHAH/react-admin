import React, { useState } from "react";
import { Tooltip, Modal, Collapse, Typography } from "antd";
import { CopyOutlined } from "@ant-design/icons";
const { Panel } = Collapse;
const { Text } = Typography;

export default function CardList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        <Tooltip placement="left" title={<span>查看sql字段</span>}>
          <CopyOutlined
            onClick={() => {
              setIsModalOpen(true);
            }}
          />
        </Tooltip>
      </div>
      <Modal
        title="表名：card_list"
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
        width={800}
      >
        <Collapse>
          <Panel header="查询card_list">
            <p>
              `select * from `card_list` where <Text code>state = 1</Text> order
              by id desc`
            </p>
          </Panel>
          <Panel header="添加字段">
            <p>
              {
                " `insert into card_list (PicUrl, title, content, state) values ('${PicUrl}','${title}','${content}','1')` "
              }
            </p>
            <p>
              必传参数：<Text code>PicUrl</Text>：图片路径；
              <Text code>title</Text>：图片标题；
              <Text code>content</Text>：图片描述
            </p>
          </Panel>
          <Panel header="删除字段 -- 这里的删除只是改变字段状态，并不是真正的删除字段">
            <p>{"`update card_list set state = 2 where id = ${id}`"}</p>
            <p>
              必传参数：<Text code>id</Text>：当前字段id
            </p>
          </Panel>
        </Collapse>
      </Modal>
    </>
  );
}
