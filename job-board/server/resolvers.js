const db = require('./db');

const Query = {
    company: (root, {id}) => db.companies.get(id),
    job: (root, args) => db.job.get(args.id),
    jobs: () => db.jobs.list()
};

const Mutation = {
    createJob: (root, {comapnyId, title, description}) => {
        return db.jobs.create({comapnyId, title, description}); //returns an id
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