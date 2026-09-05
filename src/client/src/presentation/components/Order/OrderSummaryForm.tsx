import {Stack} from '@mui/material';
import type {CustomerDetails} from '../../../application/order/buildOrder.ts';
import {OrderSummaryFormFirstName} from './OrderSummaryFormFirstName.tsx';
import {OrderSummaryFormLastName} from './OrderSummaryFormLastName.tsx';
import {OrderSummaryFormEmail} from './OrderSummaryFormEmail.tsx';

export function OrderSummaryForm({value, onChange, disabled}: {
    value: CustomerDetails; onChange: (value: CustomerDetails) => void; disabled?: boolean;
}) {
    return <Stack spacing={2}>
        <OrderSummaryFormFirstName value={value.firstName} onChange={firstName => onChange({...value, firstName})}
                                   disabled={disabled}/>
        <OrderSummaryFormLastName value={value.lastName} onChange={lastName => onChange({...value, lastName})}
                                  disabled={disabled}/>

        <OrderSummaryFormEmail value={value.email} onChange={email => onChange({...value, email})} disabled={disabled}/>
    </Stack>;
}
