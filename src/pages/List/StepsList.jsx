import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  message,
  Steps,
  Form,
  Input,
  Radio,
  Descriptions,
  Alert,
  Result,
  Typography,
  Drawer,
} from "antd";
import dayjs from "dayjs";
import QueueAnim from "rc-queue-anim";
import "./Less/StepsList.less";
import { stepsGetUser, stepsSubmit, stepsBill } from "../../api/api";

const { Step } = Steps;
const { Text } = Typography;

export default function StepsList() {
  const token = useSelector((state) => {
    return state;
  });
  const formRef = useRef(null);
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [loadings, setLoadings] = useState(false);
  const [formData, setFormData] = useState({
    paymentUser: "",
    collectionUser: "",
    collectionUserName: "",
    amount: "",
  });
  const [billId, setBillId] = useState();
  const [formRadio, setFormRadio] = useState(true);
  const [open, setOpen] = useState(false);
  const [billData, setBillData] = useState({});

  // 下一步
  const next = () => {
    setCurrent(current + 1);
  };

  // 上一步
  const prev = () => {
    setCurrent(current - 1);
  };

  // 选择付款方式
  const handleChange = (e) => {
    setFormRadio(e.target.value);
  };

  // 第一步表单验证
  const FirstNext = () => {
    form.validateFields().then((values) => {
      stepsGetUser({ user: values.paymentUser }).then((res) => {
        const { code, msg } = res;
        if (code === 200) {
          setFormData((data) => (data = values));
          const timer = Date.now();
          setBillId(timer + values.paymentUser);
          next();
        } else {
          message.error(msg);
        }
      });
    });
  };

  // 提交
  const enter = () => {
    stepsSubmit({ formData, formRadio, billId }).then((res) => {
      const { code, msg } = res;
      if (code === 200) {
        setLoadings((prevLoadings) => {
          return (prevLoadings = true);
        });
        setTimeout(() => {
          setLoadings((prevLoadings) => {
            return (prevLoadings = false);
          });
          message.success(msg);
          next();
        }, 2000);
      } else {
        message.error(msg);
      }
    });
  };

  // 查看账单
  const selectBill = () => {
    stepsBill({ billId }).then((res) => {
      const { code, msg, data } = res;
      if (code === 200) {
        setBillData(data);
        setOpen(true);
      } else {
        message.error(msg);
      }
    });
  };

  const steps = [
    {
      id: 1,
      title: "填写转账信息",
      content: (
        <QueueAnim type={["right", "left"]} className="queue-simple">
          <div key="a">
            <Form
              ref={formRef}
              form={form}
              style={{
                width: "50%",
                margin: "50px auto",
              }}
              name="basic"
              autoComplete="off"
              initialValues={formData}
            >
              <Form.Item
                label="付款账户"
                name="paymentUser"
                rules={[
                  {
                    required: true,
                    message: "请选择付款账户!",
                  },
                ]}
              >
                <Input allowClear placeholder="付款账户即为用户列表中的用户" />
              </Form.Item>

              <Form.Item
                label="收款账户"
                name="collectionUser"
                rules={[
                  {
                    required: true,
                    message: "请输入收款账户!",
                  },
                ]}
              >
                <Input
                  compact="true"
                  addonBefore={
                    <Radio.Group
                      defaultValue={formRadio}
                      buttonStyle="solid"
                      onChange={handleChange}
                    >
                      <Radio.Button value={true}>支付宝</Radio.Button>
                      <Radio.Button value={false}>微信</Radio.Button>
                    </Radio.Group>
                  }
                />
              </Form.Item>

              <Form.Item
                label="收款人姓名"
                name="collectionUserName"
                rules={[
                  {
                    required: true,
                    message: "请输入收款人姓名!",
                  },
                ]}
              >
                <Input allowClear />
              </Form.Item>

              <Form.Item
                label="请输入转账金额"
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "请输入转账金额!",
                  },
                ]}
              >
                <Input prefix="￥" allowClear />
              </Form.Item>

              <Form.Item>
                <Button type="primary" onClick={FirstNext}>
                  下一步
                </Button>
              </Form.Item>
            </Form>
          </div>
        </QueueAnim>
      ),
    },
    {
      id: 2,
      title: "确认转账信息",
      content: (
        <div style={{ width: "50%", margin: "50px auto" }}>
          <div key="b">
            <Alert
              description="确认转账后，资金将直接打入对方账户，无法退回。"
              type="warning"
              showIcon
            />
            <Descriptions column={4}>
              <Descriptions.Item label="付款账户">
                {formData.paymentUser}
              </Descriptions.Item>
              <Descriptions.Item label="收款账户">
                {formRadio ? <Text code>支付宝</Text> : <Text code>微信</Text>}
                {formData.collectionUser}
              </Descriptions.Item>
              <Descriptions.Item label="收款人姓名">
                {formData.collectionUserName}
              </Descriptions.Item>
              <Descriptions.Item label="转账金额">
                {formData.amount}
              </Descriptions.Item>
            </Descriptions>
            <Button
              style={{ marginRight: "10px" }}
              onClick={() => {
                prev();
              }}
            >
              上一步
            </Button>
            <Button type="primary" onClick={enter} loading={loadings}>
              提交
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "完成",
      content: (
        <div>
          <Result
            key="c"
            status="success"
            title="操作成功!"
            subTitle="预计两小时内到账."
            extra={[
              <Button key="buy" onClick={selectBill}>
                查看账单
              </Button>,
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  setCurrent(0);
                }}
              >
                再转一笔
              </Button>,
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Steps
        // ref={ref} // refs无法获取，这是antd form双向绑定对ref有需要。因为ref和key一样，不是通过prop来传递的，react对其有特殊的处理。
        current={current}
        style={{ width: "65%", margin: "auto" }}
      >
        {steps.map((item) => (
          <Step key={item.id} title={item.title} />
        ))}
      </Steps>

      <div className="steps-content">{steps[current].content}</div>

      <Drawer
        title={"账单号" + billData.billId}
        placement="right"
        closable={false}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Descriptions column={6}>
          <Descriptions.Item label="付款账户">
            {billData.paymentUser}
          </Descriptions.Item>
          <Descriptions.Item label="收款方式">
            {billData.payMode}
          </Descriptions.Item>
          <Descriptions.Item label="收款姓名">
            {billData.collectionUserName}
          </Descriptions.Item>
          <Descriptions.Item label="收款人账户">
            {billData.collectionUser}
          </Descriptions.Item>
          <Descriptions.Item label="转账金额">
            {billData.amount}￥
          </Descriptions.Item>
          <Descriptions.Item label="转账时间">
            {dayjs(billData.date).format("YYYY-MM-DD HH:mm:ss")}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
}
