/* eslint-disable max-len */
/* eslint-disable no-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from 'node-fetch';
import getAllUsersModel from '../models/allUsers.model';

class UserService {
  private _defaultImage: string;

  private _getAllUsers: any;

  constructor() {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);

    this._defaultImage = 'https://www.nicepng.com/png/full/933-9332131_profile-picture-default-png.png';
  }

  public async getAll(): Promise<any> {
    this._getAllUsers = await getAllUsersModel();
    return this._getAllUsers;
  }

  public async create(id: number, messages: string, name: string, phoneNumber: string): Promise<any> {
    const graphQuery = JSON.stringify({
      query: `mutation {
        signupUser(
            data: {
              name: "${name}",
              profile_picture: "${this._defaultImage}",
              phone_number: "${phoneNumber}",
              whatsapp_name: "${name}",
              group: false,
              pinned: false,
              typing: false,
              messages: [
                    {
                        content: "${messages[0]}",
                        sender: ${id},
                        time: "${new Date().toLocaleTimeString('BR')}",
                        status: "delivered"
                    },
              ],
              },
        )
        {
        id
        }
    }`,
      variables: {},
    });

    const requestOptions: any = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: graphQuery,
    };
		
    try {
      const response = await fetch(
        'http://localhost:3002/graphql',
        requestOptions,
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(`Algo deu errado :( \n${error}`);
    }
  }
}

export default UserService;