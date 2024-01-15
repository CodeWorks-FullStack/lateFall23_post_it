<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-3 d-flex" v-if="activeAlbum">
        <img :src="activeAlbum.coverImg" alt="cover image of the album" class="img-fluid w-50" >
        <div class="bg-danger w-50 rounded">
          <h4>{{activeAlbum.title}}</h4>
          <h5> by {{ activeAlbum.creator.name }}</h5>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { albumsService } from '../services/AlbumsService.js';
import Pop from '../utils/Pop.js';
export default {
  setup(){
    const route = useRoute()
    onMounted(()=>{
      getAlbumById()
    })
    async function getAlbumById(){
      try {
        await albumsService.getGetAlbumById(route.params.albumId)
      } catch (error) {
        Pop.error(error)
      }
    }
  return {
    activeAlbum : computed(()=> AppState.activeAlbum)
   }
  }
};
</script>


<style lang="scss" scoped>

</style>
