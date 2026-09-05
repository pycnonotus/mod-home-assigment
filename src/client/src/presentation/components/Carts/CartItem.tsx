import {Button} from '@mui/material';
import type {ProductId} from '../../../domain/catalog';
import type {CartItem as Item} from '../../../domain/order/cart.ts';

export function CartItem({item, onRemove}: { item: Item; onRemove?: (id: ProductId) => void }) {
    return <li>
        {item.productName} — {item.quantity}
        {onRemove &&
            <Button aria-label={`הסר ${item.productName}`} onClick={() => onRemove(item.productId)}>הסר</Button>}
    </li>;
}
