import { useDispatch } from "react-redux";
import { uiAction } from "../../store/ui-slice";
import CartButton from "../Cart/CartButton";
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  const dispatch = useDispatch();

  const cartVisibilityHandler = () => {
    dispatch(uiAction.toggle());
  };

  return (
    <header className={classes.header} onClick={cartVisibilityHandler}>
      <h1>ReduxCart</h1>
      <nav>
        <ul>
          <li>
            <CartButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
