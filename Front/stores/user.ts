import { defineStore } from 'pinia';
import axios from 'axios';
/**
 * Store de pinia 
 * 
 */
//definimos un store "user"
export const useUserStore = defineStore('user', {
  //Definimos el estado que serian los usuarios
  state: () => ({
    users: [] as Array<{ id: number, userName: string, email: string, password: string }>
  }),
  actions: {
    //Definimos las acciones que son un crud de usuarios que se guardaran en el estado 
    //Se usa axios para actualizar la base de datos segun el estado del store
    //Metodo "get"
    async fetchUsers() {
      const response = await axios.get('http://localhost:3005/auth/users');
      this.users = response.data;
    },
    //metodo "POST"
    async addUser(user: { id: number, userName: string, email: string, password: string }) {
      this.users.push(user);
    },
    //Metodo "update, put"
    async updateUser(id: number, user: { userName: string, email: string, password: string }) {
      const response = await axios.put(`http://localhost:3005/auth/update/${id}`, user);
      const index = this.users.findIndex(u => u.id === id);
      this.users[index] = response.data;
    },
    //Metodo "delete"
    async deleteUser(id: number) {
      await axios.delete(`http://localhost:3005/auth/delete/${id}`);
      this.users = this.users.filter(user => user.id !== id);
    }
  }
});


