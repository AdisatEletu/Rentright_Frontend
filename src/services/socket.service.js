import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

const socketurl = 'https://rentright-socket.herokuapp.com/'
export default class SocketService {
socketService;
socketObserver;
socket;
activeclient = 1;
koler; //converted geojson object
kolerstream = new BehaviorSubject({});
uuid;
id;
usersonline;
usersonlinedata;
messagefromclient = [];
constructor(uuid) {
this.uuid = uuid;
this.socketService = Observable.create(observer => {
this.socketObserver = observer; 
 });
this.koler = this.kolerstream.asObservable();
this.socket = io.connect(socketurl);
this.login();
}
login(){ 
this.id =this.uuid; 

this.socket.emit('login', {id: this.uuid, uuid:this.uuid});
}//login information in socket service

initialize(){

let peer_uuid = this.id;
 let th = this;
  return new Promise(resolve=>{
   th.socket.on('connect', function(socket){     
     th.login(); 
     resolve(true);    
   });
  th.socket.on('currentusers',function(data){    
    th.usersonline = data.length;
    th.usersonlinedata = data;
  });
  this.socket.on('postsent', function(data){
   th.onPost(data ); 

  });  
  this.socket.on('messageReceived', function(data){
   th.onPost(data ); 
  });
  this.socket.on('disconnect',function(data){
    th.activeclient =   th.activeclient - 1;
  });
  this.socket.on('login', function(data){ 
     this.socketObserver.next(()=>{
      th.activeclient =   th.activeclient + 1;
       
      
  });
  }); 
     });

}
postmessage(data){
  return new Promise(resolve=>{
  let th = this;
  th.socket.emit('sendMessage',data);
  });
}
onPost(data){
   this.messagefromclient.unshift(data);
   this.kolerstream.next(data);
}

}