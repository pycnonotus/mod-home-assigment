import {CartCategory} from "./CartCategory.tsx";

export function Cart() {

    const items: Record<string, { name: string; quantity: number }[]> = {};
    items["food"] = [
        {
            name: "Apple",
            quantity: 3
        },
        {
            name: "Banana",
            quantity: 2
        }
    ];
    items["drinks"] = [
        {
            name: "Water",
            quantity: 1
        },
        {
            name: "Juice",
            quantity: 1
        }
    ];

    return (
        <section>
            {Object.entries(items).map(([key, item]) => (
                <CartCategory key={key} items={item} name={key} />

            ))}
        </section>
    );
}