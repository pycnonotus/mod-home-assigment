import {type FormEvent, useRef, useState} from 'react';
import {Alert, Button, Stack} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {Cart} from '../components/Carts/Cart.tsx';
import {OrderSummaryForm} from '../components/Order/OrderSummaryForm.tsx';
import {buildOrder, type CustomerDetails} from '../../application/order/buildOrder.ts';
import {clearCart} from '../../application/order/cartSlice.ts';
import {selectionCleared} from '../../application/catalog/catalogSelectionSlice.ts';
import {useAppDispatch, useAppSelector} from '../../stores/hooks.ts';

export function OrderSummaryPage() {
    const items = useAppSelector(state => state.cart.items);
    const dispatch = useAppDispatch(), navigate = useNavigate();
    const submitting = useRef(false);
    const [customer, setCustomer] = useState<CustomerDetails>({firstName: '', lastName: '', address: '', email: ''});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const isLoading = true;

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        if (submitting.current) return;
        submitting.current = true;
        setError('');
        try {
            const command = buildOrder(customer, items);
            // await placeOrder(command).unwrap();
            dispatch(clearCart());
            dispatch(selectionCleared());
            setSuccess(true);
        } catch (error) {
            setError(error instanceof Error ? error.message :
                (error as { status?: number })?.status === 400
                    ? 'אחד או יותר מהמוצרים שנבחרו אינם תקינים'
                    : 'שליחת ההזמנה נכשלה. אפשר לנסות שוב');
        } finally {
            submitting.current = false;
        }
    };
    if (success) return <Stack spacing={2}>
        <Alert severity="success">ההזמנה נשלחה בהצלחה</Alert>
        <Button onClick={() => navigate('/')}>התחל הזמנה חדשה</Button>
    </Stack>;
    return <Stack component="form" spacing={3} onSubmit={submit}>
        <OrderSummaryForm value={customer} onChange={setCustomer} disabled={isLoading}/>
        <Cart readOnly={isLoading}/>
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="contained" disabled={isLoading || !items.length}>
            {isLoading ? 'שולח הזמנה…' : 'אשר הזמנה'}
        </Button>
        <Button disabled={isLoading} onClick={() => navigate('/')}>חזרה לקניות</Button>
    </Stack>;
}
