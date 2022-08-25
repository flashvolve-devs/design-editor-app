/* eslint-disable no-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import postUserMessageModel from '../models/postUserMessage.model';
import getAllUsersModel from '../models/allUsers.model';
import UserService from './User.service';

export interface Message {
  text: {
    body: string
  }
}

class MessageService {
  private _jsonData: string[];

  private _userService: any;

  constructor() {
    this.getMessage = this.getMessage.bind(this);
    this._jsonData = [];
    this._userService = new UserService();
  }

  public getMessage(obj: any): string[] {
    this._jsonData = [];
    const messageData = obj.value.messages;
    messageData.forEach((message: Message) => {
      this._jsonData.push(message.text.body);
    });

    return this._jsonData;
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  public async postMessage(obj: any): Promise<any> {
    const messages = this.getMessage(obj);
    const { name } = obj.value.contacts[0].profile;
    const phoneNumber = obj.value.metadata.display_phone_number;
    let userExists = false;
    let id = 1;
    
    const allUsers = await getAllUsersModel();
    
    if (allUsers !== []) {
      allUsers.forEach((user: any) => { 
        if (user.phone_number === phoneNumber) {
          userExists = true;
          id = user.id;
        } else {
          id = allUsers[allUsers.length - 1].id + 1;
        }
      });
    }
    
    if (userExists) {
      const requestPostNewMessage = await postUserMessageModel(id, messages);
      
      return requestPostNewMessage;
    }
    
    return this._userService.create(id, messages, name, phoneNumber);
  }
}

export default MessageService;