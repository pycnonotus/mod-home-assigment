import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export function GroceriesItems() {
    return (
        <FormControl>
            <InputLabel>
                בחר מוצר
            </InputLabel>
            <Select>
                <MenuItem value="apple">אבטיח</MenuItem>
                <MenuItem value="banana">בננה</MenuItem>
            </Select>
        </FormControl>
    );
}