const initialState = {
    id: '',
    name: '',
    surname: '',
    password: '',
    jwt: '',
    isLoggedIn: false,
    notification: true,
    messages: [],
    activeContact: [],
    userChats: [],
    role: 'USER'
};

export default function authReducer(state:any = initialState, action: any) {
    if(action.type === 'logout-success'){
        return { ...initialState };
    }   else if (action.type === 'login-success'){
        return {
            ...action.payload,
            isLoggedIn: true,
            notification: true,
            messages: [],
            activeContact: [],
            userChats: []
        };
    }   else if(action.type === 'upload-galery-photo-success'){
        return{
            ...state,
            userGalleries: action.payload.userGalleries
        }
    }   else if(action.type === 'upload-user-photo-success'){
        return{
            ...state,
            mainPhotoUrl: action.payload.mainPhotoUrl
        }
    }   else if(action.type === 'update-user-data'){
        if(state.email !== action.payload.email){
            return { ...initialState };
        } else {
            return{
                ...state,
                ...action.payload
            }
        }
    } else if (action.type === 'add-messages'){
        return {
            ...state,
            messages: action.payload.messages
        }
    } else if (action.type === 'change-notification'){
        return {
            ...state,
            notification: action.payload.notification
        }
    } else if (action.type === 'send-message'){
        return {
            ...state,
            messages: action.payload.messages
        }
    } else if (action.type === 'set-user-chats'){
        return {
            ...state,
            userChats: action.payload.userChats
        }
    } else if (action.type === 'set-active-contact') {
        return {
            ...state,
            activeContact: action.payload.activeContact
        }
    }

    return state;
}