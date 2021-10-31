const db = require('./db');

const Query = {
    company: (root, {id}) => db.companies.get(id),
    job: (root, args) => db.job.get(args.id),
    jobs: () => db.jobs.list()
};

const Mutation = {
    createJob: (root, {input}, context) => { //context used to provide data not belonging to gql but are part of application
        // check user auth
        if (!context.user) {
            throw new Error('Unauthorized')
        }
        console.log(conext);
        const id = db.jobs.create(input);
        return db.jobs.get(id);
    } 
}

// all resolver functions reciev parent argument (`job` in  this case)
// the job object passed here is the result of invoking the parent resolver `jobs`
const Job = {
    company: job => db.companies.get(job.companyId)
}

const Company = {
    job: company => db.jobs.list()
        .filter(job => job.companyId === company.id)
}

module.exports = { Query, Mutation, Job, Company };