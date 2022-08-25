/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { ResponseError } from './Base.controller';
import MessageService from '../services/Message.service';
import App from '../app';

const app = new App();

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
}

class MessageController {
  protected errors = ControllerErrors;
  
  private $route: string;
  
  private service = new MessageService();
  
  constructor(
    route = '/image',
  ) {
    this.$route = route; 
  }
  
  get route() {
    return this.$route;
  }
  
  getMessage = (
    req: Request<{ id: string }>,
    res: Response<ResponseError | string[]>,
  ): typeof res => {
    try {
      const messageFound = this.service.getMessage(req.body);
  
      if (!messageFound) {
        return res.status(404).json({ error: this.errors.notFound });
      }

      return res.status(200).json(messageFound);
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  postMessage = async (
    req: Request<{ id: string }>,
    res: Response<ResponseError | string[]>,
  ): Promise<typeof res> => {
    try {
      const messageFound = await this.service.postMessage(req.body);
  
      if (!messageFound) {
        return res.status(404).json({ error: this.errors.notFound });
      }

      if (messageFound.errors) return res.status(400).json(messageFound);

      if (messageFound) console.log(app.databaseUpdate());

      return res.status(200).json(messageFound);
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({ error: this.errors.internal });
    }
  };
  
  // update = async (
  //   req: Request<{ id: string }>,
  //   res: Response< ResponseError>,
  // ): Promise<typeof res> => {
  //   const { id } = req.params;
  
  //   const { body } = req;
  
  //   if (Object.keys(body).length === 0) return res.status(400).json();
  
  //   try {
  //     const user = await this.service.update(id, body);
  //     const { code, message, findUser } = user;
  
  //     if (!user) {
  //       return res.status(404).json({ error: this.errors.notFound });
  //     }
  
  //     if (message) return res.status(code).json(message);

  //     return res.status(code).json(findUser);
  //   } catch (error) {
  //     console.error(error);
  
  //     return res.status(500).json({ error: this.errors.internal });
  //   }
  // };
  
  // destroy = async (
  //   req: Request<{ id: string }>,
  //   res: Response<ResponseError>,
  // ): Promise<typeof res> => {
  //   const { id } = req.params;
  
  //   if (!id) return res.status(400).json({ error: this.errors.requiredId });
  
  //   try {
  //     const user = await this.service.destroy(id);
  
  //     if (!user) {
  //       return res.status(404).json({ error: this.errors.notFound });
  //     }
  
  //     return res.status(204).json(user);
  //   } catch (error) {
  //     console.error(error);
  
  //     return res.status(500).json({ error: this.errors.internal });
  //   }
  // };
}
  
export default MessageController;
