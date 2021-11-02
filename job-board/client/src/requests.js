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
    const { data } = await client.query({loadJobsQuery}) //client object has query method used to send request
    return data.jobs;
}

export async function loadJob(id) {
    const { data } = await client.query({loadJobQuery, variables: { id }});
    return data.job;
}

export async function loadCompany(id) {
    const { data } = await client.query({loadCompanyQuery, variables: { id }});
    return data.company;
}

export async function createJob(input) {
    const { job } = await client.mutate({createJobMutation, variables: { input }});
    return job;
}