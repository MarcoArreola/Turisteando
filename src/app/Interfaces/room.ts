import Player from "./player";

export default interface Room {
    id: string;
    name: string;
    password: string;
    money: string;
    owner: string;
    private: boolean;
    playersNum: number;
    players : Player[];
    dice: number[];
    turn: string; 
}