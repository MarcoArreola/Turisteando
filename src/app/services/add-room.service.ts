import { Injectable, ɵgetUnknownElementStrictMode } from '@angular/core';
import { Firestore, collectionData, doc, deleteDoc, updateDoc, setDoc, getDoc, onSnapshot, DocumentData, DocumentSnapshot, FirestoreError } from '@angular/fire/firestore';
import { collection, addDoc, DocumentReference } from '@firebase/firestore';
import { Observable, Subject } from 'rxjs';
import Player from '../Interfaces/player';
import Room from '../Interfaces/room';
import Propiety from '../Interfaces/propiety';
import { Blocks } from '../Interfaces/blocks';

@Injectable({
  providedIn: 'root'
})
export class AddRoomService {

  constructor(private firestore: Firestore) {

   }

  addRoom(room: Room){
    const roomRef = collection(this.firestore, 'rooms');
    room.playersNum = 0;
    room.players = [];
    return addDoc(roomRef, room);
  }

  addPlayer(player: Player){
    const roomRef = collection(this.firestore, 'players');
    return addDoc(roomRef, player);
  }

  getRooms(): Observable<Room[]>{
    const roomRef = collection(this.firestore, 'rooms');
    return collectionData(roomRef, {idField: 'id'}) as Observable<Room[]>;
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

  getPlayers(): Observable<Player[]>{
    const roomRef = collection(this.firestore, 'players');
    return collectionData(roomRef, {idField: 'id'}) as Observable<Player[]>;
  }

  async getPlayer(playerId: string){
    const roomDocRef = doc(this.firestore, 'players', `${playerId}`);
    const docSnap = await getDoc(roomDocRef);
    if(docSnap.exists()){
      return docSnap.data();
    }
    else{
      return(0);
    }
  }

  updateId(room: Room){
    const roomDocRef = doc(this.firestore, `rooms/${room.id}`);
    updateDoc(roomDocRef, {
      id: room.id
    });
  }

  updatePlayerId(player: Player){
    const roomDocRef = doc(this.firestore, `players/${player.id}`);
    updateDoc(roomDocRef, {
      id: player.id
    });
  }

  updateRoom(room: Room){
    const roomDocRef = doc(this.firestore, `rooms/${room.id}`);
    updateDoc(roomDocRef, {
      owner: room.owner,
      playersNum: room.playersNum,
      players: room.players,
      started: room.started,
      turn: room.turn,
      dice: room.dice,
      pairs: room.pairs,
      rolled: room.rolled
    })
  }

  updatePlayer(player: Player){
    const roomDocRef = doc(this.firestore, `players/${player.id}`);
    updateDoc(roomDocRef, {
      position: player.position,
      money: player.money,
      jail: player.jail,
      ports: player.ports,
      propieties: player.propieties
    })
  }

  async updateMoney(player: Player, money: number){
    const roomDocRef = doc(this.firestore, `players/${player.id}`);
    updateDoc(roomDocRef, {
      money: player.money - money,
    })
  }

  updateDice(room: string, numbers: number[]){
    const roomDocRef = doc(this.firestore, `rooms/${room}`);
    updateDoc(roomDocRef, {
      dice: numbers,
    })
  }

  deleteRoom(room: Room){
    const roomDocRef = doc(this.firestore, `rooms/${room.id}`);
    return deleteDoc(roomDocRef);
  }

  updateDices(room: string){
    const roomDocRef = doc(this.firestore, `rooms/${room}`);
    let roomParams!: Room;
    onSnapshot(roomDocRef, (doc) => {
      roomParams = doc.data() as Room;
    })
    console.log(roomParams)
    return roomParams;
  }

  async getBlock(room: string){
    const roomDocRef = doc(this.firestore, `rooms/${room}/propiedades/zvcddfUBe42Vv3W5Dd9u`);
    const docSnap = await getDoc(roomDocRef);
    console.log(room)
    if(docSnap.exists()){
      console.log(docSnap.data())   
    }
    else{
      console.log("0")
    }
  }

  setBlock(room: string, block: Propiety | Blocks){
    const roomRef = collection(this.firestore, `rooms/${room}/propiedades`);
    return addDoc(roomRef, block).then(doc => {
      return doc.id
    });
  }

  getBlocks(room: string){
    const roomRef = collection(this.firestore, `rooms/${room}/propiedades`);
    return collectionData(roomRef, {idField: 'dbId'})
  }

  updateProperty(room: string, property: Propiety){
    const roomDocRef = doc(this.firestore, `rooms/${room}/propiedades/${property.dbId}`);
    updateDoc(roomDocRef, {
      dbId: property.dbId,
      currentLevel: property.currentLevel,
      owner: property.owner,
      ownerColor: property.ownerColor
    })
  }

 
}
