import React, { useState } from "react";
import { Tabs } from "antd";
import Messages from "../../components/Message/Messages";

export default function MessageList() {
  const [unread, setUnread] = useState();
  const [receivedRead, setReceivedRead] = useState();
  const [recyclingStation, setRecyclingStation] = useState();
  const [tabState, setTabState] = useState(1);

  const UnreadMessage = (value) => {
    setUnread(value);
  };

  const ReceivedReadMessage = (value) => {
    setReceivedRead(value);
  };

  const RecyclingStation = (value) => {
    setRecyclingStation(value);
  };

  const onTabClick = (key) => {
    if (key === "item-1") {
      setTabState(1);
    } else if (key === "item-2") {
      setTabState(2);
    } else if (key === "item-3") {
      setTabState(3);
    }
  };

  const items = [
    {
      label: unread === 0 ? "暂无消息" : `未读消息(${unread})`,
      key: "item-1",
      children: (
        <Messages
          UnreadMessage={UnreadMessage}
          ReceivedReadMessage={ReceivedReadMessage}
          RecyclingStation={RecyclingStation}
          state={tabState}
        />
      ),
    },
    {
      label: `已读消息(${receivedRead})`,
      key: "item-2",
      children: (
        <Messages
          UnreadMessage={UnreadMessage}
          ReceivedReadMessage={ReceivedReadMessage}
          RecyclingStation={RecyclingStation}
          state={tabState}
        />
      ),
    },
    {
      label: `回收站(${recyclingStation})`,
      key: "item-3",
      children: (
        <Messages
          UnreadMessage={UnreadMessage}
          ReceivedReadMessage={ReceivedReadMessage}
          RecyclingStation={RecyclingStation}
          state={tabState}
        />
      ),
    },
  ];

  return <Tabs items={items} onTabClick={onTabClick} />;
}
