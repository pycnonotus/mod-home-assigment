import {type FormEvent, useRef, useState} from 'react';
import {Alert, Button, Stack} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {Cart} from '../components/Carts/Cart.tsx';
import {OrderSummaryForm} from '../components/Order/OrderSummaryForm.tsx';
import {buildOrder, type CustomerDetails, type PlaceOrderCommand} from '../../application/order/buildOrder.ts';
import {useCreateOrderMutation} from '../../infrastructure/api/ordersApi.ts';
import {clearCart} from '../../application/order/cartSlice.ts';
import {selectionCleared} from '../../application/catalog/catalogSelectionSlice.ts';
import {useAppDispatch, useAppSelector} from '../../stores/hooks.ts';

export function OrderSummaryPage() {
    const items = useAppSelector(state => state.cart.items);
    const dispatch = useAppDispatch(), navigate = useNavigate();
    const submitting = useRef(false);
    const [customer, setCustomer] = useState<CustomerDetails>({firstName: '', lastName: '', email: ''});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [createOrder, {isLoading}] = useCreateOrderMutation();
    const pendingOrder = useRef<PlaceOrderCommand | null>(null);

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        if (submitting.current) return;
        submitting.current = true;
        setError('');
        try {
            const order = buildOrder(customer, items);
            const previous = pendingOrder.current;
            // Reuse the ID after a lost response when the submitted contents are unchanged.
            if (previous && previous.fullName === order.fullName && previous.email === order.email &&
                JSON.stringify(previous.items) === JSON.stringify(order.items)) {
                order.orderId = previous.orderId;
            }
            pendingOrder.current = order;
            await createOrder(order).unwrap();
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
