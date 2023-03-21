<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <CRUDApp />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import CRUDApp from '../src/components/CRUDApp.vue'

export default {
  name: 'LayoutDefault',

  components: {
    CRUDApp
  },

  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>
