interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    dueDate: string;
    userId: string;
}

export type TaskRequest = Omit<Task, '_id'>;
export type TaskResponse = Task;