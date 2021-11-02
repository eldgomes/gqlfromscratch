import gql from 'graphql-tag'; //tag fn are introduced in es6 along with template strings, strings processed by gql fn

const JobDetailFragment = gql`
    fragment JobDetail on Job {
        id
        title
        company {
            id
            name
        }
        description
    }
`;

export const loadJobsQuery = gql`query JobsQuery{
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
        ...JobDetail
    }
    ${JobDetailFragment}
}`;

export const loadCompanyQuery = gql`query CompanyQuery($id: ID!) {
    company(id: $id) {
        id
        title
        jobs {
            id
            title
        }
        description
    }
}`;

// job is an alias for the object name which otherwise would be createJob
export const createJobMutation = gql`mutation CreateJob($input: CreateJobInput) {
    job: createJob(input: $input) {
        ...JobDetail
    }
    ${JobDetailFragment}
}`;