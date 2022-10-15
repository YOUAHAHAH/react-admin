import React, { useState } from "react";
import { Tooltip, Modal, Collapse, Typography } from "antd";
import { CopyOutlined } from "@ant-design/icons";
const { Panel } = Collapse;
const { Text } = Typography;

export default function SelectList() {
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
        title="表名：user"
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
          <Panel header="查询user -- 默认查询">
            <p>{"select * from user where showUser = 'true'"}</p>
            <p>
              {
                "`select * from user where showUser = 'true' limit ${(num - 1) * count},${count} `"
              }
            </p>
            <p>
              必传参数：<Text code>num</Text>：当前页数；
              <Text code>count</Text>：每页条数
            </p>
          </Panel>
          <Panel header="编辑用户状态">
            <Collapse>
              <Panel header="当参数state为1时：">
                <p>{"`update user set state = 2 where id = ${id}`"}</p>
              </Panel>
            </Collapse>
            <Collapse>
              <Panel header="当参数state为2时：">
                <p>{"`update user set state = 1 where id = ${id}`"}</p>
              </Panel>
            </Collapse>
            <p>
              必传参数：<Text code>id</Text>：当前字段id；
              <Text code>state</Text>：用户状态
            </p>
          </Panel>
          <Panel header="编辑用户">
            <p>{"`select * from user where id = ${id}`"}</p>
            <p>
              {
                "`update user set username = '${username}', password = '${password}', email = '${email}', state = '${state}', note = '${note}', posts = '${posts}' where id = ${id}`"
              }
            </p>
            <p>
              必传参数：<Text code>id</Text>：当前字段id
              <Text code>username</Text>：用户名；
              <Text code>password</Text>：密码；
              <Text code>email</Text>：邮箱；
              <Text code>state</Text>：用户状态；
              <Text code>note</Text>：用户备注；
              <Text code>posts</Text>：用户权限
            </p>
          </Panel>
          <Panel header="添加用户">
            <p>
              {
                "`insert into user (username, password, email, posts, state, note) values ('${username}','${password}','${email}','${posts}','${state}','${note}')`"
              }
            </p>
            <p>
              必传参数：<Text code>username</Text>：用户名；
              <Text code>password</Text>：密码；
              <Text code>email</Text>：邮箱；
              <Text code>state</Text>：用户状态；
              <Text code>note</Text>：用户备注；
              <Text code>posts</Text>：用户权限
            </p>
          </Panel>
          <Panel header="删除用户">
            <p>{"`update user set showUser = 'false' where id = ${id}`"}</p>
            <p>
              必传参数：<Text code>id</Text>：当前字段id
            </p>
          </Panel>
        </Collapse>
      </Modal>
    </>
  );
}
