export interface IMessage {
    _id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    sender: {
        _id: string;
        username: string;
    };
    receiver: {
        _id: string;
        username: string;
    }; 
}