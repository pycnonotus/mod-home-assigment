import {Stack, Typography} from "@mui/material";
import {CartItem} from "./CartItem.tsx";

export function CartCategory(props: { items: { name: string; quantity: number }[], name?: string }) {
    return (
        <Stack>
            <Typography>{props.name}</Typography>
            <ul>
                {
                    props.items.map((item) => (
                        <CartItem key={item.name} item={item} />
                    ))
                }
            </ul>
        </Stack>
    );
}