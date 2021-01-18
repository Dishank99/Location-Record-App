import React, { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [textInput, setTextInput] = useState();
  const [inputVisible, setInputVisible] = useState(false);

  const getUser = async () => {
    const user = await AsyncStrorage.getItem("user");
    console.log("1 ", user);
    if (user) {
      user = JSON.parse(user);
    //   setCurrentUser(user);
      // setInputVisible(false)
    } else {
      setInputVisible(true);
    }
  };

  const handleSave = async () => {
    console.log("2 ", textInput);
    AsyncStrorage.setItem("user", textInput);
    setCurrentUser(textInput);
    // console.log('2.1 ',currentUser)
    // saveUser()
    // setInputVisible(false)
    // console.log('3 ',currentUser)
  };

  useEffect(() => {
    AsyncStrorage.removeItem("user");
    getUser();
  }, []);

  const values = {
      currentUser,
      setCurrentUser,
      textInput,
      setTextInput,
      inputVisible,
      setInputVisible,
      handleSave,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
