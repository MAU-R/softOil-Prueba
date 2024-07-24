import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as Array<{ id: number, userName: string, email: string, password: string }>
  }),
  actions: {
    async fetchUsers() {
      
      const response = await axios.get('http://localhost:3005/auth/users');
      this.users = response.data;
    },
    async addUser(user: { id: number, userName: string, email: string, password: string }) {
      this.users.push(user);
    },
    async updateUser(id: number, user: { userName: string, email: string, password: string }) {
      const response = await axios.put(`http://localhost:3005/auth/update/${id}`, user);
      const index = this.users.findIndex(u => u.id === id);
      this.users[index] = response.data;
    },
    async deleteUser(id: number) {
      await axios.delete(`http://localhost:3005/auth/delete/${id}`);
      this.users = this.users.filter(user => user.id !== id);
    }
  }
});


