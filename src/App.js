import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData } from './store/cart-slice';
import { uiAction } from './store/ui-slice';

let isInitial=true;

function App() {

  const dispatch=useDispatch();
  const cart=useSelector(state=>state.CartSlice.items)
  const isVisible=useSelector((state)=>state.ui.cartIsVisible);
  const notification =useSelector(state=>state.ui.notification)

  useEffect(()=>{
    // const sendCartData=async ()=>{
      // dispatch(uiAction.showNotification({
      //   status:'Pending',
      //   title:'Sending...',
      //   message:'Sending Data...'
      // }))
    //  const response=await fetch('https://moviesstore-f98ff-default-rtdb.firebaseio.com/redux.json',{
    //     method:"PUT",
    //     body:JSON.stringify(cart)
    //   });
    //   if(!response.ok){
    //     throw new Error('send cart data failled!!!')
        

    //   }
    //   // const responseData=await response.json();

    //   dispatch(uiAction.showNotification({
    //     status:'success',
    //     title:'success!!!',
    //     message:'Send data sucessfully!'
    //   }))

    // };
    if(isInitial){
      isInitial=false;
      return
    }
dispatch(sendCartData(cart));


    // sendCartData().catch((error)=>{
      // dispatch(uiAction.showNotification({
      //   status:'error',
      //   title:'error(catch function)',
      //   message:'Could not sent data!'
      // }))
    // })
  },[cart,dispatch])
 
  return (
    <Fragment>
      {notification && <Notification 
      status={notification.status}
      title={notification.title}
      message={notification.message} />}
    <Layout>
      {isVisible && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
