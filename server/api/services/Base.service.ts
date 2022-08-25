/* eslint-disable @typescript-eslint/no-explicit-any */
// import { ZodError } from 'zod';

// export interface ServiceError {
//   error: ZodError;
// }

abstract class Service<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(protected model: any) {}

  public async create(obj: T, authorization?: string): 
  Promise<T | any> {
    return this.model.create(obj, authorization);
  }

  public async findAll(): Promise<T[]> {
    return this.model.findAll();
  }

  public async findByPk(id: string): Promise<T | null > {
    return this.model.findByPk(id);
  }

  public async update(id: string, obj: T): Promise<T | any> {
    return this.model.update(id, obj);
  }

  public async destroy(id: string): Promise<T | any > {
    return this.model.destroy(id);
  }
}

export default Service;
