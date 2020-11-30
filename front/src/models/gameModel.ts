import {GenreModel} from "./genreModel";

/**
 * Model of games , refers to GameDetails in DB
 * If changed , need to update Game Create section and game create panels
 */

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
    baseGameId? :string;
    genres: GenreModel[];

    constructor({
                    author = '',
                    gameLengthMin = 0,
                    popularity = 0,
                    minAge = 0,
                    name = '',
                    playerMax = 6,
                    playerMin = 2,
                    distributor = '',
                    _id = '',
                    releaseDate = '',
                    description = '',
                    gameLengthMax=0,
                    editor = '',
                    baseGameId  = '',
    genres = [] as any[]
                } = {}) {

        this._id = _id.length === 0  ? undefined : _id;
        if (releaseDate.length === 0)
            this.releaseDate = new Date().toDateString();
        else
            this.releaseDate = releaseDate;
        this.author =  author.length !== 0  ? author : undefined;
        this.gameLengthMin = gameLengthMin !== 0 ? gameLengthMin : undefined;
        this.popularity = popularity;
        this.minAge = minAge !== 0 ? minAge : undefined;
        this.name = name;
        this.playerMax = playerMax;
        this.playerMin = playerMin;
        this.distributor = distributor.length !== 0  ? distributor : undefined;
        this.description = description;
        this.gameLengthMax = gameLengthMax !== 0 ? gameLengthMax : undefined;
        this.baseGameId = baseGameId.length !== 0  ? baseGameId : undefined;
        this.editor = editor.length !== 0  ? editor : undefined;
        this.genres = [] as GenreModel[];
        if(genres.length)
            genres.forEach((genres) => this.genres.push(new GenreModel(genres)));
    };

    toFormData = () :FormData =>  {
        const formData = new FormData();
        console.log("genre",this.genres)
        formData.append('author',  this.author!)
        formData.append('genres',  this.genres.toString())
    formData.append('releaseDate', this.releaseDate)
        if(this.baseGameId)
        formData.append('baseGameId',this.baseGameId)
        if(this.distributor)
            formData.append('distributor',this.distributor)
        formData.append('description',this.description)
        if(this.editor)
            formData.append('editor',this.editor)
        if(this.gameLengthMax)
            formData.append('gameLengthMax',this.gameLengthMax.toString())
        if(this.gameLengthMin)
            formData.append('gameLengthMin',this.gameLengthMin.toString())
        if(this.minAge)
            formData.append('minAge',this.minAge.toString())
        formData.append('name',this.name)
        formData.append('playerMax',this.playerMax.toString())
        formData.append('playerMin',this.playerMin.toString())
        formData.append('popularity',this.popularity.toString())
        return formData;
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


export const marksGameNumPlayer = [
    {
        value: 1,
        label: '1',
    },
    {
        value: 4,
        label: '4',
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
        value: 16,
        label: '16+',
    },
];