const db = require('./db');

const Query = {
    job: (root, args) => db.job.get(args.id),
    jobs: () => db.jobs.list()
};

// all resolver functions reciev parent argument (`job` in  this case)
// the job object passed here is the result of invoking the parent resolver `jobs`
const Job = {
    company: job => db.companies.get(job.companyId)
}

module.exports = { Query };