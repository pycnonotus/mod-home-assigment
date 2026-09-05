import {TextField} from '@mui/material';

export function OrderSummaryFormLastName({value, onChange, disabled}: {
    value: string; onChange: (value: string) => void; disabled?: boolean;
}) {
    return <TextField required fullWidth label="שם משפחה" type="text" autoComplete="family-name"
                      value={value} onChange={event => onChange(event.target.value)} disabled={disabled}/>;
}
