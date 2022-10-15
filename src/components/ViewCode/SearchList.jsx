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
        title="表名：table_list"
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
          <Panel header="查询table_list -- 按时间分页查询">
            <p>
              {
                "`select * from table_list where state = 1 order by ${checked} limit ${(num - 1) * count},${count} `"
              }
            </p>
            <p>
              必传参数：<Text code>num</Text>：当前页数；
              <Text code>count</Text>：每页条数
            </p>
            <p>
              可传参数：<Text code>checked</Text>：排序方式：默认值为id
            </p>
          </Panel>
          <Panel header="编辑字段">
            <p>
              {
                "`update table_list set title = '${title}',content = '${content}', tags = '${tags}' where id = ${id}`"
              }
            </p>
            <p>
              必传参数：<Text code>id</Text>：当前字段id；
              <Text code>title</Text>：消息标题；
              <Text code>content</Text>：消息内容；
              <Text code>tags</Text>：标签
            </p>
          </Panel>
          <Panel header="删除字段">
            <p>{"`update table_list set state = 2 where id = ${id}`"}</p>
            <p>
              必传参数：<Text code>id</Text>：当前字段id
            </p>
          </Panel>
          <Panel header="添加字段">
            <p>
              {
                "`insert into table_list (title, content, tags, state, author) values ('${title}','${content}','${tags}','1','游客')`"
              }
            </p>
            <p>
              必传参数：<Text code>id</Text>：当前字段id；
              <Text code>title</Text>：消息标题；
              <Text code>content</Text>：消息内容；
              <Text code>tags</Text>：标签
            </p>
          </Panel>
          <Panel header="搜索查询">
            <Collapse>
              <Panel header="当参数为title和content时：">
                <p>
                  {
                    "`select * from table_list where title like '%${values.title}%' and content like '%${values.content}%'`"
                  }
                </p>
                <p>
                  {
                    "`select * from table_list where title like '%${values.title}%' and content like '%${values.content}%' order by ${checked} limit ${(nums - 1) * counts},${counts}`"
                  }
                </p>
              </Panel>
            </Collapse>
            <Collapse>
              <Panel header="当参数为title时：">
                <p>
                  {
                    "`select * from table_list where title like '%${values.title}%'`"
                  }
                </p>
                <p>
                  {
                    "`select * from table_list where title like '%${values.title}%' order by ${checked}  limit ${(nums - 1) * counts},${counts}`"
                  }
                </p>
              </Panel>
            </Collapse>
            <Collapse>
              <Panel header="当参数为content时：">
                <p>
                  {
                    "`select * from table_list where content like '%${values.content}%'`"
                  }
                </p>
                <p>
                  {
                    "`select * from table_list where content like '%${values.content}%' order by ${checked}  limit ${(nums - 1) * counts},${counts}`"
                  }
                </p>
              </Panel>
            </Collapse>
            <p>
              必传参数：<Text code>num</Text>：当前页数；
              <Text code>count</Text>：每页条数
            </p>
            <p>
              可传参数：<Text code>checked</Text>：排序方式：默认值为
              <Text code>id</Text>
              <Text code>title</Text>：消息标题；
              <Text code>content</Text>：消息内容
            </p>
          </Panel>
        </Collapse>
      </Modal>
    </>
  );
}
