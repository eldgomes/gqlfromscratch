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