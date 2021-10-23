import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { api } from '../../services/api';
import { io } from 'socket.io-client';

import { Message, IMessageProps } from '../Message';

import { styles } from './styles';

let messagesQueue: IMessageProps[] = [];

const socket = io(String(api.defaults.baseURL));
socket.on('new_message', (newMessage: IMessageProps) => {
  messagesQueue.push(newMessage);
  console.log(newMessage);
})

export function MessageList(){
  const [currentMessages, setCurrentMessages] = useState<IMessageProps[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      const messagesResponse = await api.get<IMessageProps[]>('messages/last3');
      setCurrentMessages(messagesResponse.data);
    }

    fetchMessages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if(messagesQueue.length > 0) {
        setCurrentMessages(prevState => [messagesQueue[0], prevState[0], prevState[1]]);
        messagesQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      { currentMessages.map(message => <Message key={message.id} data={message} />) }
    </ScrollView>
  );
}