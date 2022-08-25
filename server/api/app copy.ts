// import express, { Router } from 'express';
// import * as Koa from "koa";
// import { createServer } from "http";
// import { Server } from "socket.io";

// class App {
//   public app: express.Express;

//   public httpServer: any;

//   constructor() {
//     this.app = new Koa.default();
//     this.httpServer = (createServer(this.app.callback());
//     this.app.use(express.json());
//   }

//   public startServer(PORT: string | number = 3001): void {
//     const io = new Server(this.httpServer, { /* options */ });
//     io.on("connection", (_socket) => {
//       // ...
//     });
//     this.httpServer.listen(3000);
//     this.app.listen(
//       PORT,
//       () => console.log(`Server running here 👉 http://localhost:${PORT}`),
//     );
//   }

//   public addRouter(router: Router) {
//     this.app.use(router);
//   }
  
//   public getApp() {
//     return this.app;
//   }
// }

// export default App;
