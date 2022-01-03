import { useState } from 'react';
import { useQuery } from 'react-query';

//Components
import { Drawer, LinearProgress, Grid, Badge } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Item from './Item/Item';
import Cart from './Cart/Cart';

//Styles
import { Wrapper, StyledButton } from './App.styles';

//Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

//Make FakeStoreAPI calls outside of the app, as we don't need to recreate it on each render
const getProducts = async (): Promise<CartItemType[]> => {
  return await (await fetch('https://fakestoreapi.com/products')).json();
}

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);
  console.log(data);

  const getTotalItems = (items: CartItemType[]) => items.reduce((ack:number,item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      //Check if the item is already in the cart
      const isItemInCart = prev.find(item => item.id === clickedItem.id);
      if (isItemInCart) { //item in the cart, add 1 to its current amount
        return prev.map(item =>
          item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item
        );
      }
      else { //item not in the cart, add it and make its amount 1
        return [...prev, { ...clickedItem, amount: 1 }];
      }
      
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => (
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) {
            return ack; //remove the item from the cart
          }
          else {
            return [...ack, { ...item, amount: item.amount - 1 }];
          }
        }
        else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    ));
  };

  if (isLoading) {
    return <LinearProgress></LinearProgress>;
  }

  if (error) {
    return <h1>Sorry, something went wrong...</h1>
  }

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}></Cart>
      </Drawer>

      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon></AddShoppingCartIcon>
        </Badge>
      </StyledButton>

      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart}></Item>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
