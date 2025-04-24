import { Button, Modal } from "antd";
import { ReactNode, useState } from "react";

interface ConfirmModalProps {
  buttonText?: string;
  buttonType?: "primary" | "dashed" | "link" | "text" | "default";
  modalTitle?: string;
  modalContent?: ReactNode;
  onConfirm?: (data?: any) => void;
  okText?: string;
  cancelText?: string;
}

const ConfirmModal = ({
  buttonText,
  buttonType,
  modalTitle,
  modalContent,
  onConfirm = () => {},
  okText,
  cancelText,
}: ConfirmModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    onConfirm();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        style={{ backgroundColor: "brown" }}
        type={buttonType}
        onClick={showModal}
        htmlType="submit"
      >
        {buttonText}
      </Button>
      <Modal
        title={modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={okText}
        cancelText={cancelText}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default ConfirmModal;
