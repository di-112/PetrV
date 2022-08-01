import RedmineClient from '../taskManagers/RedmineClient';
import { TaskTrackers } from '../enums/TaskTrackers';

export const getTaskTracker = name => {
  switch (name) {
    case TaskTrackers.Redmine: return RedmineClient
    default: return RedmineClient
  }
}
