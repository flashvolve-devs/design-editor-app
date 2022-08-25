import { Request, Response } from 'express';
import Service from '../services/Base.service';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
}

abstract class Controller<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(protected service: Service<T>) {}

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  findAll = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const objs = await this.service.findAll();
      return res.json(objs);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  abstract findByPk(
    req: Request<{ id: string }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  abstract update(
    req: Request<{ id: string }, unknown, T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  abstract destroy(
    req: Request<{ id: string }, unknown, T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;
}

export default Controller;
