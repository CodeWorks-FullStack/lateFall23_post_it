<template>
  <div class="container-fluid">
    <section class="row">
      <!-- SECTION album details -->
      <div class="col-3 h-50 d-flex" v-if="activeAlbum">
        <img :src="activeAlbum.coverImg" alt="cover image of the album" class="img-fluid w-50" >
        <div class="h-50 w-50">
          <div class="bg-danger  rounded">
            <h4>{{activeAlbum.title}}</h4>
            <h5> by {{ activeAlbum.creator.name }}</h5>
          </div>
          <div class="h-50">
            <button v-if="account.id" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#add-picture-modal">add picture <i class="mdi mdi-image"></i><i class="mdi mdi-plus"></i></button>
          </div>
        </div>
      </div>
      <!-- SECTION picture area -->
      <div class="col-9 masonry">
        <!-- {{ pictures }} -->
        <img v-for="picture in pictures" class="img-fluid mb-2 rounded" :src="picture.imgUrl" alt="">
      </div>
    </section>
  </div>
  <AddPictureForm/>
</template>


<script>
import { computed, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { albumsService } from '../services/AlbumsService.js';
import AddPictureForm from '../components/AddPictureForm.vue'
import Pop from '../utils/Pop.js';
import { picturesService } from '../services/PicturesService.js';
export default {
  setup(){
    const route = useRoute()
    // onMounted(()=>{
    //   getAlbumById()
    // })
    // NOTE watchEffect, is like a watch, but instead of watching a particular value, it watches, any 'watchable' property accessed inside of it
    watchEffect(()=>{
      route.params.albumId
      getAlbumById()
      getAlbumPictures()
    })
    async function getAlbumById(){
      try {
        await albumsService.getAlbumById(route.params.albumId)
      } catch (error) {
        Pop.error(error)
      }
    }
    async function getAlbumPictures(){
      try {
        await picturesService.getAlbumPictures(route.params.albumId)
      } catch (error) {
        Pop.error(error)
      }
    }
  return {
    activeAlbum : computed(()=> AppState.activeAlbum),
    pictures: computed(( )=> AppState.pictures),
    account: computed(()=> AppState.account)
   }
  },
  components: {AddPictureForm}
};
</script>


<style lang="scss" scoped>
.masonry{
  columns: 200px;
}
</style>
