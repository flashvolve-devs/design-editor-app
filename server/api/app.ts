/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Router } from 'express';
import cors from 'cors';

class App {
  public app: express.Express;

  public server: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors()); // Add cors middleware
  }

  public startServer(PORT: string | number = 3001): void {
    this.app.listen(
      PORT,
      () => console.log(`Server running here 👉 http://localhost:${PORT}`),
    );
  }

  public addRouter(router: Router) {
    this.app.use(router);
  }

  public getApp() {
    return this.app;
  }
}

export default App;
