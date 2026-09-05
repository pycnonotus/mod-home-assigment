import {TextField} from '@mui/material';

export function OrderSummaryFormFirstName({value, onChange, disabled}: {
    value: string; onChange: (value: string) => void; disabled?: boolean;
}) {
    return <TextField required fullWidth label="שם פרטי" type="text" autoComplete="given-name"
                      value={value} onChange={event => onChange(event.target.value)} disabled={disabled}/>;
}
