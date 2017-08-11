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
this.socketService = Observable.create(observer => {
this.socketObserver = observer; 
/* __________________________________________________________________*/
this.uuid = uuid;

 });
this.socket = io.connect(socketurl);
this.login();
}
login(){ 
this.id =this.uuid; 
this.socket.emit('login', {id: this.id, uuid:this.uuid});
}//login information in socket service

initialize(){
//this.koler = this.kolerstream.asObservable();
let peer_uuid = this.id;
 let th = this;
  return new Promise(resolve=>{
   th.socket.on('connect', function(socket){
     console.log(socket);   
     th.login(); 
     resolve(true);    
   });


  th.socket.on('currentusers',function(data){    
    console.log(data); 
    console.log('data from koler');   
    th.usersonline = data.length;
    th.usersonlinedata = data;

     console.log('data from users');
  });
  this.socket.on('postsent', function(data){
   th.onPost(data ); 

  }); 
  this.socket.on('disconnect',function(data){
    console.log('userleft');
    th.activeclient =   th.activeclient - 1;
  });
  this.socket.on('login', function(data){ 
     this.socketObserver.next(()=>{
       console.log("logged in");
      th.activeclient =   th.activeclient + 1;
      console.log('this.activeclient ' + th.activeclient);
      
      
  });
  }); 
   resolve(true);
     });

}
postmessage(message, id){
  return new Promise(resolve=>{
  let th = this;
  message.id = id;
  th.socket.emit('sendpost', { 'message':message});
  });
}
onPost(data){
   this.messagefromclient.unshift(data);

   //this.messagefromclient.push(data);
   console.log( this.messagefromclient);
   this.kolerstream.next(data);
   console.log('messages sent');
}

}