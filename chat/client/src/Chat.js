import { useMutation, useQuery, useSubscription } from '@apollo/client';
import React, {useState} from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import { messagesQuery, addMessageMutation, messageAddedSubscription } from './graphql/queries';

const Chat = (props) => {
  const {user} = props;

  const [messages, setMessages] = useState([]);

  useQuery(messagesQuery, {
    onCompleted: data => setMessages(data.messages)
  }); 

  useSubscription(messageAddedSubscription, {
    onSubscriptionData: (result) => {
      setMessages(message.concat(result.subscriptionData.data.messageAdded));
    }
  }); // handles closing subscriptions

  const [addMessage, result]= useMutation(addMessageMutation); //return a fn and a result obj (has loading, error, data, called props)

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
