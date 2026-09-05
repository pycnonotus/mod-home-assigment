import {TextField} from "@mui/material";
import type {ChangeEvent} from "react";

export default function QunitiyInput(props: { value: string, onChange: (event: ChangeEvent<HTMLInputElement>) => void, validQuantity: boolean }) {
    return <TextField label="כמות" type="number" value={props.value}
                      onChange={props.onChange} error={!props.validQuantity}
                      helperText={!props.validQuantity ? 'הכמות הכוללת למוצר חייבת להיות בין 1 ל־999' : undefined}
                      slotProps={{htmlInput: {min: 1, max: 999, step: 1}}}/>
}