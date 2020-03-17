export class GameModel {


    gameDetailsId: string;
    releaseDate: string;
    author: string;
    gameLengthMin: number;
    popularity: number;
    minAge: number;
    name: string;
    playerMax: number;
    playerMin: number;
    distributor: string;
    description : string;
    gameLengthMax: number;
    editor: string;

    constructor( author: string, gameLengthMin: number, popularity: number, minAge: number, name: string, playerMax: number, playerMin: number, distributor: string,gameDetailsId: string, releaseDate: string,  description: string, gameLengthMax: number, editor: string) {
        this.gameDetailsId = gameDetailsId;
        this.releaseDate = releaseDate;
        this.author = author;
        this.gameLengthMin = gameLengthMin;
        this.popularity = popularity;
        this.minAge = minAge;
        this.name = name;
        this.playerMax = playerMax;
        this.playerMin = playerMin;
        this.distributor = distributor;
        this.description = description;
        this.gameLengthMax = gameLengthMax;
        this.editor = editor;
    }
};
