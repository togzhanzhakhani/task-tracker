export interface Task {
  id: number;
  title: string;
  deadline: Date | null;
  priority: string;
  status: string;
  assignees: string[];
}
 