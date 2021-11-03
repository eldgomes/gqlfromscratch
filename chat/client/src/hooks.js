import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { messagesQuery, addMessageMutation, messageAddedSubscription } from './graphql/queries';

export function useChatMessages() {
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
    return {
      messages,
      addMessage: text => addMessage({variables: {input: {text}}})
    };
  }