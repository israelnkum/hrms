import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from "../utils/Store";
import {useContext} from "react";
import {AppContext, AppContextType} from "../context/app-context";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within a AppContextProvider");
    }
    return context;
};
