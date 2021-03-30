type IContextType = {
  toggleSignInModal: (flag: boolean) => void;
  toggleSignUpModal: (flag: boolean) => void;
  toggleInfoModal: (flag: boolean) => void;
  showInfoModal: (header?: string, text?: string, type?: string, callback?: () => void) => void;
  infoModalHeader?: string;
  infoModalText?: string;
  infoModalType?: string;
  infoModalCallback?: () => void;
  username?: string;
  setNickname: (nick?: string) => void;
};

export default IContextType;
