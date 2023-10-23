export type Todo = {
    id: number;
    description: string;
    status: TodoStatus;
};
  
export enum TodoStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}