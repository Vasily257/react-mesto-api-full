import { createContext } from 'react';

export const SpinnerContext = createContext({
  isSpinnerShown: false,
  setIsSpinnerShown: () => {},
});
