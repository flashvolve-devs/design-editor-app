/* eslint-disable max-len */
import App from './app';

import MessageController from './controllers/Message.controller';
import UserController from './controllers/User.controller';

import CustomRouter from './routes/Router';

const server = new App();

const messageController = new MessageController();
const userController = new UserController();

const messageRouter = new CustomRouter();
const userRouter = new CustomRouter();

messageRouter.getDataByJson(messageController);
userRouter.addRoute(userController);

server.addRouter(messageRouter.router);
server.addRouter(userRouter.router);

export default server;