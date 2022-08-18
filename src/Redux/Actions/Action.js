import { 
    ADD_EMP_STATE,
    CURRENT_USER, 
    LEAVE_STATE, 
    SEARCH_EMP_TEXT, 
    SET_STATE_SHOW, 
    SET_USER_ID,
    UPDATE_SHOW} from "../TYPES/Types";

export const ChangeState = (overlayState) => {
    return {
        type: ADD_EMP_STATE,
        payload: overlayState
    }
}

export const SearchText = (text) => {
    return {
        type: SEARCH_EMP_TEXT,
        payload: text
    }
}

export const SetShow = (stateShow, id) => {
    return {
        type: SET_STATE_SHOW,
        payload: {stateShow, id}
    }
}

export const userID = (userid) => {
    return {
        type: SET_USER_ID,
        payload: userid
    }
}

export const logedInUser = (data) => {
    return {
        type: CURRENT_USER,
        payload: data
    }
}

export const UpdateShow = (updateShow, updateId) => {
    return {
        type: UPDATE_SHOW,
        payload: {updateShow, updateId}
    }
}

export const leaveState = (leave) => {
    return {
        type: LEAVE_STATE,
        payload: leave
    }
}