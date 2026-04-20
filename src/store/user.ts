import { defineStore } from 'pinia'
import { User, UserProfile, UserWithProfile } from '../Interface/User'


type UserState = {
  user: User | null
  profile: UserProfile | null
  token: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
    profile: null,
    token: null,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.user,
    isAdmin: (state): boolean => state.user?.role === "ADMIN",
    fullName: (state): string => {
      if (!state.profile) return ""
      return `${state.profile.firstname} ${state.profile.lastname}`
    }
  },

  actions: {
    setUser(user: User) {
      this.user = user
    },

    setProfile(profile: UserProfile) {
      this.profile = profile
    },

    setToken(token: string) {
      this.token = token
    },
    clearToken() {
      this.token = null
    },
    setUserWithProfile(data: UserWithProfile) {
      const { profile, ...user } = data
      this.user = user
      this.profile = profile
    },

    clearUser() {
      this.user = null
      this.profile = null
    }
  }
})