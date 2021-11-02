import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';
import { isLoggedIn, getAccessToken } from './auth';

const endpointURL = 'http://localhost:9000/graphql';
const { loadJobsQuery, loadJobQuery, loadCompanyQuery, createJobMutation} = require('./queries');

const authLink = new ApolloLink((operation, forward)=> {
    if (isLoggedIn()) {
        //request.header['authorization'] = 'Bearer' + getAccessToken();
        operation.setContext({
            headers: {
                'authorization': 'Bearer ' + getAccessToken()
            }
        });
    }
    return forward(operation);
});

const client = new ApolloClient({
    link: ApolloLink.from([
        authLink, //authLink first, then http request (to prep request with auth)
        new HttpLink({uri: endpointURL})
    ]),
    cache: new InMemoryCache()
});

export async function loadJobs() {
    const { data } = await client.query({query: loadJobsQuery, fetchPolicy: 'no-cache'}) //client object has query method used to send request
    return data.jobs;
}

export async function loadJob(id) {
    const { data } = await client.query({query: loadJobQuery, variables: { id }});
    return data.job;
}

export async function loadCompany(id) {
    const { data } = await client.query({query: loadCompanyQuery, variables: { id }});
    return data.company;
}

export async function createJob(input) {
    const { job } = await client.mutate({
        createJobMutation, 
        variables: { input },
        update: (cache, mutationResult) => { //called after the mutation has been executed , get resp and save in cache as if result of running the job query
            cache.writeQuery({
                query: loadJobQuery, 
                variables: {id: mutationResult.data.job.id},
                data: mutationResult.data
            })  //writeQuery save results of a query
        }
        //cache~store or proxy
        //mutationResult ->result from server
    });
    return job;
}