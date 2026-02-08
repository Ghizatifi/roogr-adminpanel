import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
export interface PermissionsState {
    permissions: string;
}
const initialState: PermissionsState = {
    permissions: localStorage.getItem('permissions') || '0000000000000000000000'
};

export const permissionsSlice = createSlice({
    name: 'permissions',
    initialState,
    reducers: {
        setPermissions: (state, action) => {
            state.permissions = action.payload
            localStorage.setItem("permissions", action.payload);
            
        },
    }
})

export const { setPermissions } = permissionsSlice.actions

export const checkPermissions = (state: RootState) =>
    state.permissions.permissions;

export default permissionsSlice.reducer;
