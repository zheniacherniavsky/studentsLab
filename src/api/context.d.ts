type IContextType = {
  toggleSignInModal: (flag: boolean) => void;
  toggleSignUpModal: (flag: boolean) => void;
  username?: string;
  setNickname: (nick?: string) => void;
};

export default IContextType;
