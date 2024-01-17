<template>
  <div class="container-fluid">
    <section class="row">
      <!-- SECTION album details -->
      <div class="col-3" v-if="activeAlbum">
        <!-- STUB album info -->
        <section class="d-flex">
          <img :src="activeAlbum.coverImg" alt="cover image of the album" class="img-fluid w-50" >
          <div class="h-50 w-50">
            <div class="bg-danger  rounded">
              <h4>{{activeAlbum.title}}</h4>
              <h5> by {{ activeAlbum.creator.name }}</h5>
            </div>
            <div class="h-50">
              <button v-if="account.id" class="btn btn-warning" :disabled="!isCollaborator" data-bs-toggle="modal" data-bs-target="#add-picture-modal">add picture <i class="mdi mdi-image"></i><i class="mdi mdi-plus"></i></button>
            </div>
            <div class="h-50">
              <button v-if="account.id" class="btn btn-danger" :disabled="isCollaborator" @click="createCollaborator()"><i class="mdi mdi-heart"> Collab</i></button>
              <div v-if="isCollaborator" class="text-info">you're already a collaborator!</div>
            </div>
          </div>
        </section>
        <!-- STUB collab pictures -->
        <!-- {{ collaborators }} -->
          <section class="row">
            <div v-for="collaborator in collaborators" :key="collaborator.id" class="col-12 col-md-4 mb-2">
              <img :src="collaborator.profile.picture" class="img-fluid rounded" :alt="`image of ${collaborator.profile.name}`" :title="collaborator.profile.name">
              <!-- {{ collaborator.profile.name }} -->
            </div>
        </section>
      </div>
      <!-- SECTION picture area -->
      <div class="col-9 masonry">
        <!-- {{ pictures }} -->
        <img v-for="picture in pictures" :key="picture.id" class="img-fluid mb-2 rounded" :src="picture.imgUrl" alt="">
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
import { collaboratorsService } from '../services/CollaboratorsService.js'
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
      getAlbumCollaborators()
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
    async function getAlbumCollaborators(){
      try {
        await collaboratorsService.getAlbumCollaborators(route.params.albumId)
      } catch (error) {
        Pop.error(error)
      }
    }
  return {
    activeAlbum : computed(()=> AppState.activeAlbum),
    pictures: computed(( )=> AppState.pictures),
    collaborators: computed(()=> AppState.collaborators),
    account: computed(()=> AppState.account),
    isCollaborator: computed(()=>{
      const account = AppState.collaborators.find(collab => collab.accountId == AppState.account.id)
      return account != undefined
    }),
    async createCollaborator(){
      try {
        const collabData = {albumId: route.params.albumId}
        await collaboratorsService.createCollaborator(collabData)
      } catch (error) {
        Pop.error(error)
      }
    }
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
