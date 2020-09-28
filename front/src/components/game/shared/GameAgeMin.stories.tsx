import React from 'react';
//import { Button } from '@storybook/react/demo'; Not working, module not found
import Button from '@material-ui/core/Button'; // Temporary replacement
import GameAgeMin from "./GameAgeMin";

export default { title: 'GameAgeMin' };

export const withOneValue = () => <GameAgeMin minAge={12}/>;

export const withOutValue = () => (
    <GameAgeMin/>
);