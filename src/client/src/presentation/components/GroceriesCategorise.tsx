import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export function GroceriesCategorise() {
    return (
        <FormControl sx={{width: 200}}>
            <InputLabel>
                בחר קטגוריה
            </InputLabel>
            <Select>
                <MenuItem value="fruit">פירות</MenuItem>
                <MenuItem value="vegetable">ירקות</MenuItem>
            </Select>


        </FormControl>
    );
}