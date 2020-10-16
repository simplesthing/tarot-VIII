import AppEntry from "./components/AppEntryPage";
import React from "react";
import UserProvider from "./contexts/UserProvider";

function App() {
  return (
    <UserProvider>
      <AppEntry />
    </UserProvider>
  );
}
export default App;
