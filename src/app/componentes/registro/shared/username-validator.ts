import { ChatsService } from './../../../servicios/chats.service';
import { FormControl } from '@angular/forms';
export class UsernameValidator {
    static chatsService: ChatsService;
    constructor(private chatsService: ChatsService) {
        this.chatsService = chatsService;
    }
    static async validUsername(fc: FormControl) {
        this.chatsService.doExistsUsername(fc.value).toPromise()
        .then(
            response => {
                console.log('response', response);
            }
        ).catch(e => { console.log(e); });
        if (fc.value.toLowerCase() === 'abc123') {
            return ({ validUsername: true });
        } else {
            return (null);
        }
    }
}