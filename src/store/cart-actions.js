
import { useDispatch } from "react-redux";
import { cartSliceAction } from "./cart-slice";
import { uiAction } from "./ui-slice";

// const dispatch=useDispatch()

export const fetchCartData=()=>{
    return async dispatch=>{
        const fetchData=async()=>{
            const response =await fetch('https://moviesstore-f98ff-default-rtdb.firebaseio.com/redux.json');

            if(!response.ok){
                throw new Error('Could not fetch data!')
            }

            const data=await response.json();

            return data;
        };

        try {
          const cartData = await fetchData();
          console.log('cartDataFetch.totalQuantity',cartData.totalQuantity);
          dispatch(cartSliceAction.replaceCart({
            items:cartData.items || [],
            totalQuantity:cartData.totalQuantity
          }))
        } catch (error) {
            dispatch(uiAction.showNotification({
                status:'error',
                title:'error(catch function)',
                message:'Could not sent data!'
              }))
        }
    }
}

export const sendCartData=(cart)=>{
    return async (dispatch)=>{
        dispatch(
            uiAction.showNotification({
                status:'Pending',
                title:'Sending...',
                message:'Sending Data...'
              })
        );

        const sendReq= async ()=>{
            const response=await fetch('https://moviesstore-f98ff-default-rtdb.firebaseio.com/redux.json',{
                method:"PUT",
                body:JSON.stringify({
                    items:cart.items,
                    totalQuantity:cart.totalQuantity
                })
              });
              if(!response.ok){
                throw new Error('send cart data failled!!!')
                
        
              }
              // const responseData=await response.json();
        
              
        }
        try{
            await sendReq();
            dispatch(uiAction.showNotification({
                status:'success',
                title:'success!!!',
                message:'Send data sucessfully!'
              }))
        }catch(err){
            dispatch(uiAction.showNotification({
                status:'error',
                title:'error(catch function)',
                message:'Could not sent data!'
              }))
        }

    }
}