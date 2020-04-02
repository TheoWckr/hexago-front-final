import {GenderModel} from "../models/genderModel";


export let genderMock : GenderModel = {
    label : "Horror"
};

export let genderMockList : GenderModel[] = [
    new GenderModel("Funny" ) , new GenderModel( "Culture" ),new GenderModel(" Quizz ")
];

export let genderMockList2 : GenderModel[] = [
    new GenderModel("Medieval" ) , new GenderModel( "Heroic" ),new GenderModel(" Collaboration "),
    new GenderModel("Magic" ) , new GenderModel( "Card Game" ),new GenderModel(" Duel "),
];

export let genderMockListString : string [] = ["Medieval" , "Heroic" , " Collaboration ", "Magic", "Card Game", "Duel"]

genderMockList.forEach(gender => genderMockList2.push(gender));


