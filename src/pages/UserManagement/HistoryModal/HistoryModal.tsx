import { Modal, Tabs, TabsProps } from "antd";
import { useState } from "react";
import PracticeHistory from "./PracticeHistory";
import ExamHistory from "./ExamHistory";

import styles from "./index.module.scss";

interface IHistoryModalProps {
  children: React.ReactNode;
  userId: string;
}

const HistoryModal = (props: IHistoryModalProps) => {
  const { children, userId } = props;

  const [open, setOpen] = useState(false);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Luyện tập",
      children: <PracticeHistory userId={userId} />,
    },
    { key: "2", label: "Thi thử", children: <ExamHistory userId={userId} /> },
  ];

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div onClick={onOpen} className="inline-block">
        {children}
      </div>

      <Modal
        open={open}
        onCancel={onClose}
        centered
        width="60vw"
        title="Lịch sử học tập"
        footer={null}
        className={styles.modal}
        destroyOnClose
      >
        <Tabs
          defaultActiveKey="1"
          items={items}
          centered
          indicator={{ size: (origin) => origin - 20, align: "center" }}
        />
      </Modal>
    </>
  );
};

export default HistoryModal;
