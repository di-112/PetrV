import RedmineClient from '../taskManagers/RedmineClient';

export const getTaskTracker = name => {
  switch (name) {
    case 'Redmine': return RedmineClient
    default: return RedmineClient
  }
}
