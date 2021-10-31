export const loadJobsQuery = `{
    jobs {
        id
        title
        company {
            id
            name
        }
    }
}`;

export const loadJobQuery = `query JobQuery($id: ID!) {
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

export const loadCompanyQuery = `query CompanyQuery($id: ID!) {
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
export const createJobMutation = `mutation CreateJob($input: CreateJobInput) {
    job: createJob(input: $input) {
        id
        title
        company {
            id
            name
        }
    }
}`;