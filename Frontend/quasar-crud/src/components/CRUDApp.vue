<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md" elevated>
      <q-card-title class="text-h6">User List</q-card-title>

      <q-list bordered separator>
        <q-item
          v-for="user in userList"
          :key="user.id"
          clickable
          @click="selectedUser = user"
          :active="selectedUser && selectedUser.id === user.id"
        >
          <q-item-section>
            <q-item-label>{{ user.name }} </q-item-label>
            <q-item-label caption>{{ user.age }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn dense flat icon="edit" @click.stop="editUser(user)" />
            <q-btn
              dense
              flat
              color="negative"
              icon="delete"
              @click.stop="deleteUser(user)"
            />
          </q-item-section>
        </q-item>
      </q-list>

      <q-card-actions align="right">
        <q-btn
          label="Add User"
          color="primary"
          @click="showCreateDialog = true"
        />
      </q-card-actions>

      <q-dialog v-model="showCreateDialog">
        <q-card>
          <q-card-section>
            <q-input v-model="newUser.name" label="Name" />
            <q-input v-model="newUser.age" label="Age" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn label="Cancel" @click="showCreateDialog = false" />
            <q-btn label="Create" color="primary" @click="createUser" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="showEditDialog">
        <q-card>
          <q-card-section>
            <q-input v-model="selectedUser.name" label="Name" />
            <q-input v-model="selectedUser.age" label="Age" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn label="Cancel" @click="showEditDialog = false" />
            <q-btn label="Save" color="primary" @click="updateUser" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card>
  </q-page>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import {
  getUserListApiCall,
  createUserApiCall,
  updateUserApiCall,
  deleteUserApiCall,
} from "../services/apiCall";

export default {
  setup() {
    const userList = ref([]);
    const selectedUser = reactive({
      id: null,
      name: null,
      age: null,
    });
    const showCreateDialog = ref(false);
    const showEditDialog = ref(false);
    const newUser = reactive({
      name: "",
      age: "",
    });

    const getUsers = async () => {
      try {
        const response = await getUserListApiCall();
        userList.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const createUser = async () => {
      try {
        const response = await createUserApiCall(newUser);
        userList.value.push(response.data);
        showCreateDialog.value = false;
      } catch (error) {
        console.error(error);
      }
    };

    const editUser = (user) => {
      selectedUser.id = user.id;
      selectedUser.name = user.name;
      selectedUser.age = user.age;
      showEditDialog.value = true;
    };

    const updateUser = async () => {
      try {
        await updateUserApiCall(selectedUser.id, selectedUser);
        const index = userList.value.findIndex(
          (u) => u.id === selectedUser.id
        );
        userList.value.splice(index, 1, selectedUser);
        showEditDialog.value = false;
      } catch (error) {
        console.error(error);
      }
    };

    const deleteUser = async (user) => {
      try {
        await deleteUserApiCall(user.id);
        const index = userList.value.findIndex((u) => u.id === user.id);
        userList.value.splice(index, 1);
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      getUsers();
    });

    return {
      userList,
      selectedUser,
      showCreateDialog,
      showEditDialog,
      newUser,
      getUsers,
      createUser,
      editUser,
      updateUser,
      deleteUser,
    };
  },
};
</script>