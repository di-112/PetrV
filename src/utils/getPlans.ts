import { getTaskTracker } from './getTaskTracker';

export const getPlans = async (taskManager: string, apiKey: string) => {
  const TaskTracker = getTaskTracker(taskManager)
  if (taskManager === 'Redmine') {
    const client = new TaskTracker(apiKey)
    const data = await client.getIssuesForPlan()

    return data
  }

  return []
}
