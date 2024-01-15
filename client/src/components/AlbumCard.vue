<template>
  <router-link :to="{path: `/albumDetails/${album.id}`}">
    <div class="album-card card mb-3 bg-danger selectable">
      <!-- 🚵‍♀️ {{ album.title }} -->
      <img :src="album.coverImg" class="img-fluid" :alt="`cover image for ${album.title}`"/>
      <div class="bg-danger">
        <h4 class="text-center">{{ album.title }}</h4>
        <div class="text-center">
          <b>2 <i class="mdi mdi-heart"></i></b>
        </div>
      </div>
    </div>
  </router-link>
</template>


<script>
import { Album } from '../models/Album.js';

export default {
  props: {album: {type: Album, required: true}},
  setup(){
  return {  }
  }
};
</script>


<style lang="scss" scoped>
.album-card{
  border-radius: 15px;
  overflow: hidden;
  img{
    height: 23vh;
    object-fit: cover;
    object-position: center;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
  }
}
</style>
