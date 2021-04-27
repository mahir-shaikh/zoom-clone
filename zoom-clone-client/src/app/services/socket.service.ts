import { Injectable } from '@angular/core';
import { io, Socket} from 'socket.io-client'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: Socket | undefined;

  constructor() { }

  connect(roomId: string, userId: string){
    this.socket = io(environment.SOCKET_URL)
    this.socket.emit('join-room', {roomId: roomId, userId: userId})
  }

  getSocket(){
    return this.socket;
  }

  send(event: string, data: any) {
    return new Promise((resolve, reject)=>{
      if(!this.socket){
        reject('No socket connection.')
      }

      this.socket?.emit(event, data)
      resolve('Event emited successfully')
    })
  }



}
