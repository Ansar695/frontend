import { ADD_EMP_STATE, CURRENT_USER, LEAVE_STATE, SEARCH_EMP_TEXT, SET_STATE_SHOW, SET_USER_ID, UPDATE_SHOW } from "../TYPES/Types";

const initState = {
    overlayState: false,
    text: "",
    id: "",
    stateShow: false,
    userid: "",
    data: "",
    updateShow: "",
    updateId: "",
    leave: false
}

const addStateReducer = (state=initState, action) => {
    switch(action.type){
        case ADD_EMP_STATE:
            return {
                overlayState: action.payload
            }

        case SEARCH_EMP_TEXT:
            return {
                ...state,
                text: action.payload
            }

        case SET_STATE_SHOW:
            return {
                stateShow: action.payload.stateShow,
                id: action.payload.id
            }

        case SET_USER_ID:
            return {
                userid: action.payload
            }
            
        case CURRENT_USER:
            return {
                data: action.payload
            }

        case UPDATE_SHOW:
            return {
                updateShow: action.payload.updateShow,
                updateId: action.payload.updateId
            }

        case LEAVE_STATE:
            return {
                leave: action.payload
            }

        default: return state
    }
}

export default addStateReducer