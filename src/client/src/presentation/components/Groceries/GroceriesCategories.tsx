import {FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent} from "@mui/material";
import type {Category, CategoryId} from "../../../domain/catalog";
import {toCategoryId} from "../../../domain/catalog";

type GroceriesCategoriesProps = {
    categories: readonly Category[];
    selectedId: CategoryId | null;
    onSelect: (id: CategoryId | null) => void;
    loading?: boolean;
};

export function GroceriesCategories({categories, selectedId, onSelect, loading}: GroceriesCategoriesProps) {
    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        onSelect(value ? toCategoryId(value) : null);
    };

    return (
        <FormControl sx={{width: 200}} disabled={loading}>
            <InputLabel id="groceries-category-label">
                בחר קטגוריה
            </InputLabel>
            <Select
                id="groceries-category"
                labelId="groceries-category-label"
                label="בחר קטגוריה"
                value={selectedId ?? ""}
                onChange={handleChange}
            >
                {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                        {category.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
