/* eslint-disable max-len */
import App from './app';

import ImageController from './controllers/Image.controller';

import CustomRouter from './routes/Router';

const server = new App();

const imageController = new ImageController();

const imageRouter = new CustomRouter();

imageRouter.getJson(imageController);

server.addRouter(imageRouter.router);

export default server;