"use client";
import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from "react";
import { Modal, ModalProps } from "antd/lib";

type useModalType = [
  React.FC<ModalProps>,
  {
    close: () => void;
    open: () => void;
    state: boolean;
  },
];

const ModalContext = createContext({} as useModalType);

const useLogic = (): useModalType => {
  const [modalState, setModalState] = useState<boolean>(false);

  const ModalRoot: useModalType[0] = ({ children, ...restProps }) => {
    return (
      <Modal
        onCancel={() => setModalState(false)}
        open={modalState}
        maskClosable={false}
        width="max-content"
        {...restProps}
      >
        <div style={{ marginTop: "20px" }} />
        {children}
      </Modal>
    );
  };

  return [
    ModalRoot,
    {
      close: () => setModalState(false),
      open: () => setModalState(true),
      state: modalState,
    },
  ];
};

const ModalProvider = ({ children }: { children: ReactElement }) => {
  const value = useLogic();

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};

export default ModalProvider;
