import gql from 'graphql-tag'; //tag fn are introduced in es6 along with template strings, strings processed by gql fn

export const loadJobsQuery = gql`{
    jobs {
        id
        title
        company {
            id
            name
        }
    }
}`;

export const loadJobQuery = gql`query JobQuery($id: ID!) {
    job(id: $id) {
        id
        title
        description
        company {
            id
            name
        }
    }
}`;

export const loadCompanyQuery = gql`query CompanyQuery($id: ID!) {
    company(id: $id) {
        id
        title
        description
        jobs {
            id
            title
        }
    }
}`;

// job is an alias for the object name which otherwise would be createJob
export const createJobMutation = gql`mutation CreateJob($input: CreateJobInput) {
    job: createJob(input: $input) {
        id
        title
        company {
            id
            name
        }
    }
}`;