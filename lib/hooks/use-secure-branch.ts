import * as SecureStore from 'expo-secure-store';
import { type PersistStorage } from 'zustand/middleware';
import { type BranchPortState } from './use-branch-port';

export const secureBranchStorage: PersistStorage<BranchPortState> = {
  getItem: async (name) => {
    const value = await SecureStore.getItemAsync(name);
    // Return the value as a parsed object with 'state' property
    return value ? { state: JSON.parse(value) as BranchPortState } : null;
  },
  setItem: async (name, value) => {
    // Store the value as a JSON string
    await SecureStore.setItemAsync(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    await SecureStore.deleteItemAsync(name);
  },
};
