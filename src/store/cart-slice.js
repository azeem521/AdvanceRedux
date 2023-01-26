import { createSlice } from "@reduxjs/toolkit";
import { uiAction } from "./ui-slice";


const cartSlice=createSlice({
    name:'cartSlice',
    initialState:{
        items:[],
        totalQuantity:0
    },
    reducers:{
        replaceCart(state,action){
            state.totalQuantity=action.payload.totalQuantity;
            state.items=action.payload.items
        },
        addItemToCart(state,action){
            const newItem=action.payload;
            const existingItem=state.items.find((item)=>item.id===newItem.id);
            state.totalQuantity++;
            if(!existingItem){
                state.items.push({
                    id:newItem.id,
                    price:newItem.price,
                    quantity:1,
                    totalPrice:newItem.price,
                    name:newItem.title
                })
            }else{
                existingItem.quantity++;
                existingItem.totalPrice=existingItem.totalPrice+newItem.price
            }
        },
        removeFromCart(state,action){
            const id=action.payload;
            const existingItem=state.items.find(item=>item.id===id);
            state.totalQuantity--;
            state.changed=true
            if(existingItem.quantity===1){
                state.items=state.items.filter(item=>item.id!==id);
            }else{
                existingItem.quantity--;
                existingItem.totalPrice=existingItem.totalPrice-existingItem.price;
            }
        }
    }
});

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
                body:JSON.stringify(cart)
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

export const cartSliceAction=cartSlice.actions;
export default cartSlice.reducer