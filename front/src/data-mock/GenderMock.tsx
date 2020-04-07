import {GenreModel} from "../models/genreModel";


export let genderMock : GenreModel = {
    genre : "Horror",
    _id: ''
};

export let genderMockList : GenreModel[] = [
    new GenreModel({genre: "Funny"} ) , new GenreModel( {genre: "Culture"} ),new GenreModel({genre: " Quizz "})
];

export let genderMockList2 : GenreModel[] = [
    new GenreModel({
        genre : "Medieval"
    } ) , new GenreModel( {genre: "Heroic"} ),new GenreModel({genre: " Collaboration "}),
    new GenreModel({genre: "Magic"} ) , new GenreModel( {genre: "Card Game"} ),new GenreModel({genre: " Duel "}),
];

export let genderMockListString : string [] = ["Medieval" , "Heroic" , " Collaboration ", "Magic", "Card Game", "Duel"];

genderMockList.forEach(gender => genderMockList2.push(gender));


