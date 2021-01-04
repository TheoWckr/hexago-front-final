import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {useLocation} from "react-router";

test('renders learn react link', () => {
  const location =  useLocation()
  const { getByText } = render(<App  location={location} />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
