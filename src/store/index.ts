import { create } from 'zustand'
import type { Database } from '@/lib/database.types'
type ProfileType = Database['public']['Tables']['profiles']['Row']

type StateType = {
  user: ProfileType
  setUser: (payload: ProfileType) => void
}

const useStore = create<StateType>((set) => ({
  user: {
    id: '',
    email: '',
    name: null,
    introduce: null,
    avatar_url: null,
    interval: null,
    is_subscribed: null,
    stripe_customer: null,
  },
  setUser: (payload) => set({ user: payload }),
}))

export default useStore
