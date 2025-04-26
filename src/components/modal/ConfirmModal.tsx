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
  bgColor?: string;
}

const ConfirmModal = ({
  buttonText,
  buttonType,
  modalTitle,
  modalContent,
  onConfirm = () => {},
  okText,
  cancelText,
  bgColor
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
        style={{ backgroundColor: bgColor }}
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
        okText={okText ? okText : null}
        cancelText={cancelText}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default ConfirmModal;
