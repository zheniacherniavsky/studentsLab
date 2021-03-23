type IContextType = {
  function?: () => void;
  toggleOnModal: (type: string) => void;
  toggleOffModal: () => void;
  isModalOpen: boolean;
  modalType: string;
  username: string | null;
  setNickname: (nick: string | null) => void;
};

export default IContextType;
