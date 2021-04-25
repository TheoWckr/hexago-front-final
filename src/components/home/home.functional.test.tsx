import {createMount} from "@material-ui/core/test-utils";
import GenreList from "../genre/shared/GenreListComponent";
import React from "react";
import {About} from "./about";
import CallToAction from "./callToAction";
import {EventCity} from "./eventCity";
import {Home} from "./home";

describe('Render - Home ', () => {
    // @ts-ignore
    let mount :  mount<any> & {
        attachTo: HTMLElement;
        cleanUp(): void;
    };

    beforeAll(() => {
        mount = createMount();
    });

    it('should display - About', () => {
        const wrapper = mount(<About />) ;
    });

    it('should display - Call To action', () => {
        const wrapper = mount(<CallToAction />) ;
    });

    it('should display - EventCity', () => {
        const wrapper = mount(<EventCity />) ;
    });
    it('should display - Home', () => {
        const wrapper = mount(<Home />) ;
    });

});
