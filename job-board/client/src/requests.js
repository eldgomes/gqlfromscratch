const endpointURL = 'http://localhost:9000/graphql';
const { loadJobsQuery, loadJobQuery, loadCompanyQuery} = require('./queries');

async function graphqlRequest(query, variables = {}) {
    const response = fetch(endpointURL, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    });
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