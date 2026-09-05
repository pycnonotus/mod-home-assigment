import {FormControl, Input, InputLabel} from "@mui/material";

export function OrderSummaryFormLastName() {
    return (
        <FormControl fullWidth>
            <InputLabel>
                שם משפחה
            </InputLabel>
            <Input placeholder="ישראלי"/>
        </FormControl>
    );
}