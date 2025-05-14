import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { secureBranchStorage } from './use-secure-branch';

export type BranchPortState = {
  selectedBranch: string;
  setSelectedBranch: (port: string) => void;
  clearSelectedBranch: () => void;
};

export const useBranchPort = create<BranchPortState>()(
  persist(
    (set) => ({
      selectedBranch: '',
      setSelectedBranch: (port) => set({ selectedBranch: port }),
      clearSelectedBranch: () => set({ selectedBranch: '' }),
    }),
    {
      name: 'branch-port-storage', // SecureStore key
      storage: secureBranchStorage,
    },
  ),
);
