import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router';
import * as React from 'react';
import { useSelector } from 'react-redux';
import '../styles/global.scss'

import Messages from './messages';
import { getFriendData } from '../api/apiCallsUserData';
import { findChatMessageAxios } from '../api/apiCallUserMessages';
import FwmNotification from '../components/FwmNotification/FwmNotification';
import { store, wrapper } from '../redux/configurStore';
import { sendMessageData } from '../redux/messagesActions';


const isLoggedIn = (state: any) => state;
let stompClient: any;

function App({ Component, pageProps }: AppProps) {

  // user data
  const currentUser = useSelector(isLoggedIn)
  const router = useRouter()

  // is loged in
  const [authorized, setAuthorized] = React.useState(false)

  // set notification after message was resieved
  const [notification, setNotification] = React.useState<any>()

  // When user get message
  const onMessageReceived = (msg: any) => {
    const notification = JSON.parse(msg.body)

    findChatMessageAxios(notification.id).then((message: any) => {
      if (currentUser.activeContact && currentUser.activeContact.data.id == notification.senderId && currentUser.activeContact.isActive) {
        const newMessages = currentUser.messages;
        newMessages.push(message.data)
        store.dispatch(sendMessageData(currentUser, newMessages))
      } else {
        getFriendData(currentUser.id, notification.senderId).then((notificatiorData: any) => {
          setNotification({
            id: notificatiorData.data.id,
            name: notificatiorData.data.name,
            surname: notificatiorData.data.surname,
            profileImage: notificatiorData.data.mainPhotoUrl,
            notificationMessage: message.data.content
          })
        })
      }
    })
  };

  // Subscribe on WebSocket
  const onConnected = () => {
    try {
      stompClient.subscribe(
        "/user/" + currentUser.id + "/queue/messages",
        onMessageReceived
      );
    } catch (err: any) {
      console.log()
    }
  };

  // connect to WebSocket server
  const connect = () => {
    const Stomp = require("stompjs");
    let SockJS = require("sockjs-client");
    SockJS = new SockJS("http://ec2-3-124-196-203.eu-central-1.compute.amazonaws.com/ws");

    stompClient = Stomp.over(SockJS);
    stompClient.connect({}, onConnected, (err: any) => {console.log(err)});
  };

  React.useEffect(() => {
    if (authorized)
      connect();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // auth checker
  function authCheck(url: any) {
    const publicPaths = ['/account/login', '/account/signup', '/verify/[token]'];
    const path = url.split('?')[0];
    if (!currentUser.isLoggedIn && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/account/login',
      });
    } else {
      // if(!authorized) {
      //   router.push({
      //     pathname: '/profile',
      //   });
      // }
      setAuthorized(true);
      connect();
    } 
  }

  React.useEffect(() => {
    authCheck(router.asPath);

    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    router.events.on('routeChangeComplete', authCheck)

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (router.pathname) {
    case "/messages":
    case "/messages/:id*":
    case "/messages/*":
    case "/messages/[id]":
    case "/messages/(@[a-zA-Z0-9]+)": 
      return (
        <>
          {authorized &&
            <React.Fragment>
              <Head>
                <title>FlyWithMe</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
              </Head>
              {
                <Messages
                  stompClient={stompClient}
                />
              }
            </React.Fragment>
          }
        </>
      )
  }

  return (
    <>
      <Head>
        <title>FlyWithMe</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </Head>
      {authorized &&
        <React.Fragment>
          <FwmNotification notification={notification} onCloseNotification={() => setNotification(null)} />
          <Component {...pageProps} />
        </React.Fragment>
      }
    </>
  )
}

export default wrapper.withRedux(App)