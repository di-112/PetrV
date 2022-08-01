import { getTaskTracker } from './getTaskTracker';
import { TaskTrackers } from '../enums/TaskTrackers';

export const getTasks = async (taskManager: string, apiKey: string) => {
  const TaskTracker = getTaskTracker(taskManager)

  if (taskManager === TaskTrackers.Redmine && apiKey) {
    const client = new TaskTracker(apiKey)
    const data = await client?.getIssuesForPlan()

    return data
  }

  return []
}
