import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {ProductId} from '../../domain/catalog';
import {type CartItem, isValidQuantity} from '../../domain/order/cart.ts';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {items: [] as CartItem[]},
    reducers: {
        addItem(state, {payload}: PayloadAction<CartItem>) {
            const existing = state.items.find(item => item.productId === payload.productId);
            const quantity = (existing?.quantity ?? 0) + payload.quantity;
            if (!isValidQuantity(payload.quantity) || !isValidQuantity(quantity)) return;
            if (existing) existing.quantity = quantity;
            else state.items.push({...payload});
        },
        removeItem(state, {payload}: PayloadAction<ProductId>) {
            state.items = state.items.filter(item => item.productId !== payload);
        },
        clearCart(state) {
            state.items = [];
        },
    },
});
export const {addItem, removeItem, clearCart} = cartSlice.actions;
