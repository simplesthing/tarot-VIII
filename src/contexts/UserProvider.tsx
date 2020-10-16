import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from "../services/firebase";

interface UserContextInterface {
  email: string;
  displayName: string;
  photoURL: string;
}

export const UserContext = createContext<UserContextInterface | null>(null);

class UserProvider extends Component {
  state = {
    user: null,
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async (userAuth) => {
      const user = await generateUserDocument(userAuth);
      this.setState({ user });
    });
  };

  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;
