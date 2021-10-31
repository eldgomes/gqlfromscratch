import React, { Component } from 'react';
import { JobList } from './JobList';
import { loadJobs } from './requests';

export class JobBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {jobs: []};
  }

  // call graphql API
  // this function is called when component has mounted or basically when its displayed on the page
  async componentDidMount() {
    const jobs = await loadJobs();
    this.setState({ jobs });
  }

  render() {
    const { jobs } = this.state;
    return (
      <div>
        <h1 className="title">Job Board</h1>
        <JobList jobs={jobs} />
      </div>
    );
  }
}
