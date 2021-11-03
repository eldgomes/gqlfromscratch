import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import { messagesQuery, addMessageMutation } from './graphql/queries';

const Chat = (props) => {
  const {user} = props;

  const result = useQuery(messagesQuery); //rendered twice, first time data is null, second time it loads it
  // also pass veriables, fetchpoolicy in useQuery, 
  // get loading out out of it as well to show loader, get error as well

  const [addMessage, result]= useMutation(addMessageMutation); //return a fn and a result obj (has loading, error, data, called props)

  const messages = result.data ? result.data.messages : [];

  const handleSend = async (text) => {
    /*const {data} =*/ await addMessage({variables: {input: {text}}}); //dont need to do anything with data
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
