import {Stack, Typography} from '@mui/material';
import type {ProductId} from '../../../domain/catalog';
import type {CartItem as Item} from '../../../domain/order/cart.ts';
import {CartItem} from './CartItem.tsx';

export function CartCategory({items, name, onRemove}: {
    items: readonly Item[]; name: string; onRemove?: (id: ProductId) => void;
}) {
    return <Stack>
        <Typography>{name}</Typography>
        <ul>{items.map(item => <CartItem key={item.productId} item={item} onRemove={onRemove}/>)}</ul>
    </Stack>;
}
