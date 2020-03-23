import {GenderModel} from "./genderModel";
import * as Yup from 'yup';
import {number, object} from "yup";

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
    genders: GenderModel[];

    constructor( author: string, gameLengthMin: number, popularity: number, minAge: number, name: string, playerMax: number, playerMin: number, distributor: string,gameDetailsId: string, releaseDate: string,  description: string, gameLengthMax: number, editor: string, genders : GenderModel[]) {
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
        this.genders = genders;
    }
};

export const GameSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Name is too short')
        .max(50, 'Name is too long')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    gameDetailsId: Yup.string(),
releaseDate: Yup.string(),
author: Yup.string(),
gameLengthMin: Yup.number()
    .nullable(true),
popularity: Yup.number(),
minAge: Yup.number(),
name: Yup.string(),
playerMax: Yup.number(),
playerMin: Yup.number(),
distributor: Yup.string(),
description : Yup.string(),
gameLengthMax: Yup.number()
    .nullable(true),
editor: Yup.string()
});