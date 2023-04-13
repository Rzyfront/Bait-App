const initialState={
    cards:[]
}

const rootReducer=(state=initialState ,{type,payload})=>{
     switch (type) {

           default:
            return{...state}
     }
}
export default rootReducer;