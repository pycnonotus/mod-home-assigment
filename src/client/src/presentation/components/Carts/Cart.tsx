import {Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../stores/hooks.ts';
import {removeItem} from '../../../application/order/cartSlice.ts';
import type {CartItem} from '../../../domain/order/cart.ts';
import {CartCategory} from './CartCategory.tsx';

export function Cart({readOnly = false}: { readOnly?: boolean }) {
    const items = useAppSelector(state => state.cart.items);
    const dispatch = useAppDispatch();
    const groups = new Map<string, { name: string; items: CartItem[] }>();
    for (const item of items) {
        const group = groups.get(item.categoryId);
        if (group) group.items.push(item);
        else groups.set(item.categoryId, {name: item.categoryName, items: [item]});
    }
    return <section aria-label="עגלת קניות">
        {!items.length && <Typography>העגלה ריקה</Typography>}
        {[...groups].map(([id, group]) => <CartCategory key={id} {...group}
                                                        onRemove={readOnly ? undefined : id => dispatch(removeItem(id))}/>)}
        <Typography>סה״כ פריטים: {items.reduce((total, item) => total + item.quantity, 0)}</Typography>
    </section>;
}
