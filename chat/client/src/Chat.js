import { useQuery } from '@apollo/client';
import React from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import { messagesQuery } from './graphql/queries';

const Chat = (props) => {
  const {user} = props;

  const result = useQuery(messagesQuery); //rendered twice, first time data is null, second time it loads it
  // also pass veriables, fetchpoolicy in useQuery, 
  // get loading out out of it as well to show loader, get error as well

  const messages = data ? data.messages : [];

  const handleSend = text => {
    //TODO
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
}

export default Chat;
