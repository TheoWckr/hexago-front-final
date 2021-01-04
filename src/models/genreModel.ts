export class GenreModel {
    genre: string ;
    _id: string;
    constructor({
                    genre= '',
                    _id = ''
    }= {}) {
        this.genre = genre;
        this._id = _id;
    }

}
