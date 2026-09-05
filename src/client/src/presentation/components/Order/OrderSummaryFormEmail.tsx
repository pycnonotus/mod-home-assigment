import {TextField} from '@mui/material';

export function OrderSummaryFormEmail({value, onChange, disabled}: {
    value: string; onChange: (value: string) => void; disabled?: boolean;
}) {
    return <TextField required fullWidth label="כתובת מייל" type="email" autoComplete="email"
                      value={value} onChange={event => onChange(event.target.value)} disabled={disabled}/>;
}
