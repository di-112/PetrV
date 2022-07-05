import axios from 'axios';
import { ITasks, IUser } from './types';

class RedmineClient {
  apiKey = null

  redmineHost = null

  constructor(apiKey, redmineHost = 'https://tasks.rcbi.pro') {
    if (!apiKey) {
      throw new Error('Api Token is required')
    }
    this.apiKey = apiKey
    this.redmineHost = redmineHost
  }

  getIssuesForPlan() : Promise<ITasks[]> {
    return axios.get(`${this.redmineHost}/issues.json`, {
      params: { assigned_to_id: 'me', sort: 'priority.desc' },
      headers: { 'X-Redmine-API-Key': this.apiKey },
    })
      .then(response => response.data)
      .then(data => data.issues.map(issue => ({
        id: issue.id,
        tracker_name: issue.tracker.name,
        subject: issue.subject,
        assigned_to: issue.assigned_to.name,
        priority: issue.priority.name,
        status: issue.status.name,
      })))
  }

  getIssuesByMultipleId(multipleId) {
    return axios.get(`${this.redmineHost}/issues.json`, {
      headers: { 'X-Redmine-API-Key': this.apiKey },
      params: {
        issue_id: multipleId,
      },
    }).then(response => response.data.issues
      .map(({ id, tracker: { name } }) => ({ issue_id: id, tracker_name: name })))
  }

  getMe = () : Promise<IUser> => axios.get(`${this.redmineHost}/my/account.json`, {
    headers: { 'X-Redmine-API-Key': this.apiKey },
  }).then(response => response.data?.user)

  getTodayTimeEntries(userId) {
    return axios.get(`${this.redmineHost}/time_entries.json`, {
      params: {
        limit: 100, user_id: userId, spent_on: 't', sort: 'id.asc',
      },
      headers: { 'X-Redmine-API-Key': this.apiKey },
    })
      .then(response => response.data)
      .then(data => data.time_entries
        .map(entry => ({
          issue_id: entry.issue.id,
          comment: entry.comments,
          hours: entry.hours,
        })))
  }
}

export default RedmineClient
