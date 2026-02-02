import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const DEFAULT_DOCK_WIDTH = 360

export const useUiStore = create(
  persist(
    (set) => ({
      dockWidth: DEFAULT_DOCK_WIDTH,
      setDockWidth: (width) => set({ dockWidth: width }),
      resetUi: () => set({ dockWidth: DEFAULT_DOCK_WIDTH })
    }),
    {
      name: 'netrunner-ui',
      partialize: (state) => ({ dockWidth: state.dockWidth })
    }
  )
)

export const UI_DEFAULTS = {
  dockWidth: DEFAULT_DOCK_WIDTH
}
