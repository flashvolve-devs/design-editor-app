/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Router } from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

class App {
  public app: express.Express;

  public server: any;

  private _update: boolean;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors()); // Add cors middleware
    this.server = http.createServer(this.app); // Add this
    this._update = false;
  }

  public databaseUpdate() {
    this._update = true;
  
    return this._update;
  }

  public startServer(PORT: string | number = 3001): void {
    const io = new Server(this.server, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log(`User connected ${socket.id}`);
      if (this._update === true) {
        console.log(this._update);
        socket.emit('send_new_message', (true));
      }
    });
    // io.on('connection', (socket) => {
    //   socket.on('details', (...args) => {
    //     console.log(`User connected ${socket.id}`);
    //     if (this._update === true) {
    //       console.log(this._update);
    //       socket.emit('send_new_message', (true));
    //     }
    //   });
    // });

    this.server.listen(
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
