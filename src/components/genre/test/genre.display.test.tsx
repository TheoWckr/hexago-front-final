import {createMount} from "@material-ui/core/test-utils";
import GenreQuickSearch from "../shared/GenreQuickSearch";
import {GenreModel} from "../../../models/genreModel";
import React, {useState} from "react";
import GenreSearch from "../shared/GenreSearch";
import GenresSelector from "../shared/GenresSelector";
import {GenreUpdatePanel} from "../panel/genreUpdatePanel";
import {genreMock} from "../../../data-mock/GenreMock";


describe('Render - Genre Component  ', () => {
    // @ts-ignore
    let mount :  mount<any> & {
        attachTo: HTMLElement;
        cleanUp(): void;
    };

    beforeAll(() => {
        mount = createMount();
    });

    it('should display - GenreQuickSearch', () => {
        const setChoices = (genres :GenreModel[]) => {} ;
        const wrapper = mount(<GenreQuickSearch setChoices={setChoices} />) ;
    });

    it('should display - Call To action', () => {
        const wrapper = mount(<GenreSearch genresHidden={[]} />) ;
    });



});
