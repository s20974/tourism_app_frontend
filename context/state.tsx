import * as React from "react";

const AppContext = React.createContext<any>('');

export function ChatAppWrapper(props: { children: JSX.Element, stompClient: any, messages: any }) {
  const sharedState = {
    stompClient: props.stompClient,
    messages: props.messages,
    activeContactId: '',
  }

  return (
    <AppContext.Provider value={sharedState}>
      {props.children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return React.useContext(AppContext);
}