/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
// import Controller from '../controllers/Base.controller';

class CustomRouter {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(controller: any, route: string = controller.route) {
    this.router.get(route, controller.getAll);
    // this.router.get(`${route}/:id`, controller.findByPk);
    // this.router.post(route, controller.create);
    // this.router.put(`${route}/:id`, controller.update);
    // this.router.delete(`${route}/:id`, controller.destroy);
  }

  public getDataByJson(controller: any, route: string = controller.route) {
    this.router.get(route, controller.getMessage);
    this.router.post(route, controller.postMessage);
  }
}

export default CustomRouter;
