export interface IUser {
  id: number;
  login: string;
  admin: boolean;
  firstname: string;
  lastname: string;
  mail: string;
  created_on: Date;
  last_login_on: Date;
  api_key: string;
}

export interface ITasks {
  id: number;
  status: IAssignedTo;
  priority: IAssignedTo;
  assigned_to: IAssignedTo;
  subject: string;
  tracker_name: string;
  isChecked?: boolean;
  value?: string;
}

export interface IAssignedTo {
  id: number;
  name: string;
}

export interface ITimeEntry {
  issue_id: number,
  comment: string,
  hours: number,
}
