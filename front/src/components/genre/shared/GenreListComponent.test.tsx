import React from 'react';
import {mount, shallow} from 'enzyme';
import GenreList from "./GenreListComponent";
import {createMount, createRender, createShallow} from "@material-ui/core/test-utils";
import {GenreModel} from "../../../models/genreModel";
let genreMockList2 : GenreModel[] = [
    new GenreModel({genre : "Medieval",_id : 'Heroic'}), new GenreModel( {genre: "Heroic",_id : 'Heroic'} ),
    new GenreModel({genre: " Collaboration ",_id : 'Collaboration'}),new GenreModel({genre: "Magic",_id : 'Magic'}),
    new GenreModel( {genre: "Card Game", _id :'CardGame'} ),new GenreModel({genre: " Duel ", _id : 'Duel'})
];

describe('<GenreList />', () => {
    // @ts-ignore
    let mount :  mount<any> & {
        attachTo: HTMLElement;
        cleanUp(): void;
    };

    beforeAll(() => {  // This is Mocha; in Jest, use beforeAll
        mount = createMount();
    });

    it('should work', () => {
        const wrapper = mount(<GenreList genres={genreMockList2} />) ;
            console.log(wrapper.find('#genre-list-grid-container'));
    });

});
/*
it('display the number of genre that the list provides', () => {
    const wrapper = shallow(<GenreList genres={genreMockList2}/>);
    const chip = wrapper.find('div');
    console.log(chip);
 //   const text = wrapper.find('h1').text();
  //  expect(text).toEqual('Value : 1');
});*/