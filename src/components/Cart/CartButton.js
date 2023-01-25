import { useDispatch, useSelector } from 'react-redux';
import CartSlice from '../../store/cart-slice';
import { uiAction } from '../../store/ui-slice';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const cartQuantity=useSelector(state=>state.CartSlice.totalQuantity)

  const dispatch = useDispatch();

  const cartVisibilityHandler = () => {
    dispatch(uiAction.toggle());
  };

  return (
    <button className={classes.button} onClick={cartVisibilityHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
