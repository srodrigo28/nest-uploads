export class ResponseTaskDto{
    id: number;
    userId: number | null;

    name: string;
    description: string;
    completed: boolean;
    
    created?: Date;
    updated?: Date;
}