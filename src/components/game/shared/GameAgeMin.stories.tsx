import React from 'react';
//import { Button } from '@storybook/react/demo'; Not working, module not found
// Temporary replacement
import GameAgeMin from "./GameAgeMin";

export default { title: 'GameAgeMin' };

export const withOneValue = () => <GameAgeMin minAge={12}/>;

export const withOutValue = () => (
    <GameAgeMin/>
);