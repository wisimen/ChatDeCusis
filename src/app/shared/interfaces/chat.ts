import { Message } from 'src/app/models/message';

export interface Chat {
    id: string;
    name: string;
    description: string;
    img: string;
    messages: Message[];
}
