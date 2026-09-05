import {Alert, Button, CircularProgress, Stack} from "@mui/material";
import {useGroceriesCatalog} from "../../application/catalog/useGroceriesCatalog.ts";
import {Cart} from "../components/Carts/Cart.tsx";
import {GroceriesCategories} from "../components/Groceries/GroceriesCategories.tsx";
import {GroceriesItems} from "../components/Groceries/GroceriesItems.tsx";

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
                <Button variant="contained">
                    המשך הזמנה
                </Button>

            </Stack>

        </section>
    );
}
