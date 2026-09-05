import {Alert, Button, CircularProgress, Stack} from "@mui/material";
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../stores/hooks.ts';
import {addItem} from '../../application/order/cartSlice.ts';
import {isValidQuantity} from '../../domain/order/cart.ts';
import {useGroceriesCatalog} from "../../application/catalog/useGroceriesCatalog.ts";
import {Cart} from "../components/Carts/Cart.tsx";
import {GroceriesCategories} from "../components/Groceries/GroceriesCategories.tsx";
import {GroceriesItems} from "../components/Groceries/GroceriesItems.tsx";
import QunitiyInput from "../components/Groceries/QunitiyInput.tsx";

export default function GroceriesPage() {
    const {
        categories,
        products,
        selectedCategoryId,
        selectedProductId,
        isLoading,
        isError,
        refetch,
        selectCategory,
        selectProduct,
    } = useGroceriesCatalog();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const items = useAppSelector(state => state.cart.items);
    const [quantity, setQuantity] = useState('1');
    const category = categories.find(item => item.id === selectedCategoryId);
    const product = category?.products.find(item => item.id === selectedProductId);
    const combinedQuantity = (items.find(item => item.productId === selectedProductId)?.quantity ?? 0) + Number(quantity);
    const validQuantity = isValidQuantity(Number(quantity)) && isValidQuantity(combinedQuantity);
    const add = () => {
        if (!category || !product || !validQuantity || isError) return;
        dispatch(addItem({
            productId: product.id, productName: product.name,
            categoryId: category.id, categoryName: category.name, quantity: Number(quantity)
        }));
        setQuantity('1');
    };

    return (
        <section>
            <Stack spacing={3}>
                {isError && (
                    <Alert
                        severity="error"
                        action={
                            <Button color="inherit" size="small" onClick={refetch}>
                                נסה שוב
                            </Button>
                        }
                    >
                        טעינת הקטלוג נכשלה
                    </Alert>
                )}

                {isLoading ? (
                    <CircularProgress/>
                ) : (
                    <Stack direction={{xs: "column", sm: "row"}} spacing={2}>
                        <GroceriesCategories
                            categories={categories}
                            selectedId={selectedCategoryId}
                            onSelect={selectCategory}
                            loading={isLoading}
                        />
                        <QunitiyInput value={quantity} onChange={event => setQuantity(event.target.value)}
                                      validQuantity={validQuantity}/>
                        <GroceriesItems
                            products={products}
                            selectedId={selectedProductId}
                            onSelect={selectProduct}
                            disabled={!selectedCategoryId}
                            loading={isLoading}
                        />
                    </Stack>
                )}

                <Cart/>


                <Button variant="contained" disabled={!product || !validQuantity || isLoading || isError} onClick={add}>
                    הוסף לעגלה
                </Button>
                <Button variant="contained" disabled={!items.length} onClick={() => navigate('/order-summary')}>
                    המשך הזמנה
                </Button>

            </Stack>

        </section>
    );
}
