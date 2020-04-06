import {GenderModel} from "./genderModel";

export class GameModel {
    _id?: string;
    releaseDate: string;
    popularity: number = 0;
    name: string = '';
    description: string = '';
    playerMax: number = 4;
    playerMin: number = 8;
    minAge?: number;
    gameLengthMin?: number;
    author?: string;
    gameLengthMax?: number;
    distributor?: string;
    editor?: string;


    genders: GenderModel[];

    constructor({
                    author = '',
                    gameLengthMin = 0,
                    popularity = 0,
                    minAge = 0,
                    name = '',
                    playerMax = 6,
                    playerMin = 2,
                    distributor = '',
                    gameDetailsId = '',
                    releaseDate = '',
                    description = '',
                    gameLengthMax =0,
                    editor = '',
                    genre = [] as string[]
                } = {}) {

        this._id = gameDetailsId;
        if (releaseDate.length === 0)
            this.releaseDate = new Date().toDateString();
        else
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
        this.genders = [] as GenderModel[];
        if(genre.length)
        genre.forEach((genre) => this.genders.push(new GenderModel(genre)));
    }
}

export const marksGameAgeMin = [
    {
        value: 3,
        label: '3',
    },
    {
        value: 8,
        label: '8',
    },
    {
        value: 12,
        label: '12',
    },
    {
        value: 18,
        label: '18',
    },
    {
        value: 21,
        label: '21+',
    },
];

export const marksGameDuration: {
    label: string, value: number, hiddenLabel: string
}[] = [
    {
        value: 15,
        label: '-15min',
        hiddenLabel: '-15m'
    },
    {
        value: 30,
        label: '',
        hiddenLabel: '~30m'
    },
    {
        value: 45,
        label: '',
        hiddenLabel: '~45m'
    },
    {
        value: 60,
        label: '~1h',
        hiddenLabel: '~1h'

    },
    {
        value: 90,
        label: '',
        hiddenLabel: '~1h30'

    },
    {
        value: 120,
        label: '2h',
        hiddenLabel: '~2h'
    },
    {
        value: 180,
        label: '+3h',
        hiddenLabel: '+3h'
    }
];
