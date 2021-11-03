import { useMutation, useQuery, useSubscription } from '@apollo/client';
import React from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import { messagesQuery, addMessageMutation, messageAddedSubscription } from './graphql/queries';

const Chat = (props) => {
  const {user} = props;

  const {data} = useQuery(messagesQuery);  //also updates to local storage changes
  const messages = data ? data.messages : [];

  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({client, subscriptionData}) => {
      client.writeData({data: { //writing to cache //~client.cache.writeData
        messages: message.concat(subscriptionData.data.messageAdded)
      }});
    }
  });
  //after writing to cache, component is re-rendered and useQuery returns updated value

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
