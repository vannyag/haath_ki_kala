import { useContext } from 'react';
import { CartContext } from './cartContextDefinition';

export const useCart = () => useContext(CartContext);
