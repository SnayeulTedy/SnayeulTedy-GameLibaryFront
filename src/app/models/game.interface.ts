export interface Game{
    uuid: string;
    name: string;
    publisher: string;
    type: string;
    completed: boolean;
    completionRate: number;
    imageUrl: string;
}