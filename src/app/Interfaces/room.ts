import Player from "./player";

export default interface Room {
    id: string;
    name: string;
    password: string;
    money: number;
    owner: string;
    private: boolean;
    started: boolean;
    playersNum: number;
    players : Player[];
    dice: number[];
    turn: number; 
    pairs: number;
    rolled: boolean;
}