import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { isLoggedIn, getAccessToken } from './auth';

const endpointURL = 'http://localhost:9000/graphql';
const { loadJobsQuery, loadJobQuery, loadCompanyQuery, createJobMutation} = require('./queries');

const client = new ApolloClient({
    link: new HttpLink({uri: endpointURL}), //how to connect to server
    cache: new InMemoryCache() //local storage/async storage
});

async function graphqlRequest(query, variables = {}) {
    const request = {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };
    if (isLoggedIn()) {
        request.header['authorization'] = 'Bearer' + getAccessToken();
    }
    const response = fetch(endpointURL, request);
    const responseBody = await response.json();
    if (responseBody.errors) {
        const message = responseBody.errors.map(error => error.message).join('\n');
        throw new Error(message); //do something better on the UI with this error
    }
    return responseBody.data;
}

export async function loadJobs() {
    const data = await graphqlRequest(loadJobsQuery);
    return data.jobs;
}

export async function loadJob(id) {
    const data = await graphqlRequest(loadJobQuery, { id });
    return data.job;
}

export async function loadCompany(id) {
    const data = await graphqlRequest(loadCompanyQuery, { id });
    return data.company;
}

export async function createJob(input) {
    const { job } = await graphqlRequest(createJobMutation, {input});
    return job;
}