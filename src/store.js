import { createStore } from "redux";
import reducer from "./redux/reducers/main";


const store = createStore(
    reducer
);


export default store;