
export function CartItem(props: { item: { name: string; quantity: number } }) {
    return (
        <li>
            {props.item.name}
            {props.item.quantity}
        </li>
    );
}