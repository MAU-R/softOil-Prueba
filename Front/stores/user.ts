// stores/userStore.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as Array<{ name: string, email: string, password: string }>
  }),
  actions: {
    addUser(user: { name: string, email: string, password: string }) {
      this.users.push(user);
    }
  }
});

