import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import Peer from 'peerjs';
@Component({
  selector: 'zc-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.styl']
})
export class RoomComponent implements OnInit {
  roomId: any;
  peer: any;
  peers: any = {}

  @ViewChild('VideoGrid') VideoGridRef: ElementRef | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private socketService: SocketService,
    private elemRef: ElementRef

  ) { }

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    if (!this.roomId) {
      var number = Math.random() // 0.9394456857981651
      number.toString(36); // '0.xtis06h6'
      var id = number.toString(36).substr(2, 9); // 'xtis06h6'
      this.router.navigate(['room', id])
    } else {
      this.initialize()
    }
  }

  initialize() {
    navigator.mediaDevices.getUserMedia({ video: { width: 300, height: 300 }, audio: true }).then((stream) => {
      this.peer = new Peer();
      // Put everything in callback to avoid any race conditions
      this.peer.on('open', (id: any) => {
        // Once peer connection is done, connect to socket(room)
        this.socketService.connect(this.roomId, id)

        //My Video Element
        const myVideo = document.createElement('video')
        myVideo.id = "myVideo"
        myVideo.muted = true;
        // add my video screen to view
        this.addVideoStream(myVideo, stream)

        // Listen to other people joinging the room
        this.socketService.getSocket()?.on('user-connected', (userId: any) => {
          console.log('New user connected: ', userId)
          setTimeout(() => {
            // this function will basically call the other peer(which was recently connected)
            this.connectToNewUser(userId, stream)
          }, 1000);
        })

        // Listen to other people joining the peer
        this.peer.on('call', (call: any) => {
          // Answering the call will send our data to the person calling
          call.answer(stream)


          // On recieving their stream, add video to view
          const video = document.createElement('video')
          call.on('stream', (userVideoStream: MediaStream) => {
            this.addVideoStream(video, userVideoStream)
          })
        })

        // When user leaves the room, remove their video from view
        this.socketService.getSocket()?.on('user-disconnected', (userId: any) => {
          console.log('user dis-connected: ', userId)
          this.peers?.userId?.close();
          document.getElementById(userId)?.remove()
        })
      })
    }).catch((err) => {
      console.error('Failed to get local stream', err);
    })
  }

  addVideoStream(video: HTMLVideoElement, stream: any) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play();
    })
    this.VideoGridRef?.nativeElement.append(video)
  }

  connectToNewUser(userId: string, stream: MediaStream) {
    const call = this.peer.call(userId, stream)
    const video = document.createElement('video')
    video.id = userId;
    call.on('stream', (userVideoStream: MediaStream) => {
      this.addVideoStream(video, userVideoStream)
    })

    call.on('close', () => {
      video.remove()
    })

    this.peers.userId = call;
  }

}
