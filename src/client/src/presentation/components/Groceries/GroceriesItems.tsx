import {FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent} from "@mui/material";
import type {Product, ProductId} from "../../../domain/catalog";
import {toProductId} from "../../../domain/catalog";

type GroceriesItemsProps = {
    products: readonly Product[];
    selectedId: ProductId | null;
    onSelect: (id: ProductId | null) => void;
    disabled?: boolean;
    loading?: boolean;
};

export function GroceriesItems({products, selectedId, onSelect, disabled, loading}: GroceriesItemsProps) {
    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        onSelect(value ? toProductId(value) : null);
    };

    return (
        <FormControl sx={{width: 200}} disabled={disabled || loading}>
            <InputLabel id="groceries-product-label">
                בחר מוצר
            </InputLabel>
            <Select
                id="groceries-product"
                labelId="groceries-product-label"
                label="בחר מוצר"
                value={selectedId ?? ""}
                onChange={handleChange}
            >
                {products.length === 0 ? (
                    <MenuItem value="" disabled>
                        אין מוצרים בקטגוריה זו
                    </MenuItem>
                ) : (
                    products.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                            {product.name}
                        </MenuItem>
                    ))
                )}
            </Select>
        </FormControl>
    );
}
