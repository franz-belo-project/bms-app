import { create } from 'zustand';

type BranchPortState = {
  selectedBranch: string;
  setSelectedBranch: (port: string) => void;
  clearSelectedBranch: () => void;
};

export const useBranchPort = create<BranchPortState>((set) => ({
  selectedBranch: '',
  setSelectedBranch: (port) => set({ selectedBranch: port }),
  clearSelectedBranch: () => set({ selectedBranch: '' }),
}));
