import {GenreModel} from "../models/genreModel";


export let genreMock : GenreModel = {
    genre : "Horror",
    _id: 'mock'
};

export let genreMockList : GenreModel[] = [
    new GenreModel({genre: "Funny", _id:'Funny'} ) , new GenreModel( {genre: "Culture", _id :'Culture'}),
    new GenreModel({genre: "Quiz", _id:'Quiz'})
];

export let genreMockList2 : GenreModel[] = [
    new GenreModel({genre : "Medieval",_id : 'Heroic'}), new GenreModel( {genre: "Heroic",_id : 'Heroic'} ),
    new GenreModel({genre: " Collaboration ",_id : 'Collaboration'}),new GenreModel({genre: "Magic",_id : 'Magic'}),
    new GenreModel( {genre: "Card Game", _id :'CardGame'} ),new GenreModel({genre: " Duel ", _id : 'Duel'})
];

genreMockList.forEach(genre => genreMockList2.push(genre));


