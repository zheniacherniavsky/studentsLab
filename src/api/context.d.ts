type IContextType = {
  isSignInOpen: boolean;
  toggleSignInModal: (mode: boolean) => void;
  isSignUpOpen: boolean;
  toggleSignUpModal: (mode: boolean) => void;
  username: string | null;
  setNickname: (nick: string | null) => void;
};

export default IContextType;
