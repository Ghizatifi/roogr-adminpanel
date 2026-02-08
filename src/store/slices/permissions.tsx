import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const DEFAULT_PERMISSIONS = '0000000000000000000000';
const PERMISSIONS_LENGTH = 22;

function normalizePermissions(value: string | number[] | unknown): string {
    if (Array.isArray(value)) {
        const str = value.map((n) => (n === 1 ? '1' : '0')).join('');
        return str.padEnd(PERMISSIONS_LENGTH, '0').slice(0, PERMISSIONS_LENGTH);
    }
    const str = String(value ?? '').replace(/,/g, '');
    return str.padEnd(PERMISSIONS_LENGTH, '0').slice(0, PERMISSIONS_LENGTH);
}

export interface PermissionsState {
    permissions: string;
}
const stored = localStorage.getItem('permissions');
const initialState: PermissionsState = {
    permissions: stored ? normalizePermissions(stored) : DEFAULT_PERMISSIONS,
};

export const permissionsSlice = createSlice({
    name: 'permissions',
    initialState,
    reducers: {
        setPermissions: (state, action: PayloadAction<string | number[]>) => {
            const normalized = normalizePermissions(action.payload);
            state.permissions = normalized;
            localStorage.setItem('permissions', normalized);
        },
    },
});

export const { setPermissions } = permissionsSlice.actions

export const checkPermissions = (state: RootState) =>
    state.permissions.permissions;

export default permissionsSlice.reducer;
