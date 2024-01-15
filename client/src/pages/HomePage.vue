<template>
 <div class="container-fluid">
  <section class="row">
    <!-- TODO this is where my albums go -->
  </section>
 </div>
 <div class="container">
  <section class="row">
    <!-- {{ albums }} -->
    <div class="col-3" v-for="album in albums" :key="album.id">
      <!-- {{ album.title }} -->
      <AlbumCard :album="album"/>
    </div>
  </section>
 </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import AlbumCard from '../components/AlbumCard.vue';
import { albumsService } from '../services/AlbumsService.js';
import Pop from '../utils/Pop.js';
export default {
  setup() {
    onMounted(()=> {
      getAllAlbums()
    })
    async function getAllAlbums(){
      try {
        await albumsService.getAllAlbums()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      albums: computed(()=> AppState.albums)
    }
  },
  components: {AlbumCard}
}
</script>

<style scoped lang="scss">

</style>
