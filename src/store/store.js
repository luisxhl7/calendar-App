import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui/uiSlice";
import authReducer from "./auth/authSlice";
import calendarReducer from "./calendar/calendarSlice";

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        calendar: calendarReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false
    })
})