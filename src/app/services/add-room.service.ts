import { Injectable } from '@angular/core';
import { Firestore, collectionData, doc, deleteDoc, updateDoc, setDoc, getDoc } from '@angular/fire/firestore';
import { collection, addDoc, DocumentReference } from '@firebase/firestore';
import { Observable, Subject } from 'rxjs';
import Player from '../Interfaces/player';
import Room from '../Interfaces/room';

@Injectable({
  providedIn: 'root'
})
export class AddRoomService {

  constructor(private firestore: Firestore) { }

  addRoom(room: Room){
    const roomRef = collection(this.firestore, 'rooms');
    room.playersNum = 0;
    room.players = [];
    return addDoc(roomRef, room);
  }

  getRooms(): Observable<Room[]>{
    const roomRef = collection(this.firestore, 'rooms');
    return collectionData(roomRef, {idField: 'id'}) as Observable<Room[]>;
  }

  updateRoom(room: Room){
    const roomDocRef = doc(this.firestore, `rooms/${room.id}`);
    updateDoc(roomDocRef, {
      owner: room.owner,
      playersNum: room.playersNum,
      players: room.players})
  }

  deleteRoom(room: Room){
    const roomDocRef = doc(this.firestore, `rooms/${room.id}`);
    return deleteDoc(roomDocRef);
  }

  async getRoom(roomId: string){
    const roomDocRef = doc(this.firestore, 'rooms', `${roomId}`);
    const docSnap = await getDoc(roomDocRef);
    if(docSnap.exists()){
      return docSnap.data();
    }
    else{
      return(0);
    }
  } 


}
