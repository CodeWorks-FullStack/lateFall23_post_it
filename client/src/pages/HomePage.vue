<template>
 <div class="container-fluid">
  <section class="row">
    <!-- TODO this is where my albums go -->
  </section>
 </div>
 <div class="container">
<!-- SECTION filter bar -->
  <section class="row bg-info p-3 rounded my-2 gap-2">
<!-- ['dogs', 'cats', 'games', 'gachamon', 'misc', 'asthetics', 'animals'] -->
    <button class="col btn btn-outline-light" :class="{'bg-primary': filterBy == ''}" @click="filterBy = ''">all</button>
    <button class="col btn btn-outline-light" :class="{'bg-primary': filterBy == 'cats'}" @click="filterBy = 'cats'">cats</button>
    <button class="col btn btn-outline-light" :class="{'bg-primary': filterBy == 'dogs'}" @click="filterBy = 'dogs'">dogs</button>
    <button class="col btn btn-outline-light" :class="{'bg-primary': filterBy == 'games'}" @click="filterBy = 'games'">games</button>
    <button class="col btn btn-outline-light" :class="{'bg-primary': filterBy == 'gachamon'}" @click="filterBy = 'gachamon'">gachamon</button>
    <button class="col btn btn-outline-light" :class="{'bg-primary': filterBy == 'aesthetics'}" @click="filterBy = 'aesthetics'">aesthetics</button>
    <button class="col btn btn-outline-light" :class="{'bg-primary': filterBy == 'animals'}" @click="filterBy = 'animals'">animals</button>
    <button class="col btn btn-outline-light" :class="{'bg-primary': filterBy == 'misc'}" @click="filterBy = 'misc'">misc</button>
  </section>
  <section class="row">
    <!-- {{ albums }} -->
    <div class="col-6 col-md-3" v-for="album in albums" :key="album.id" v-if="albums.length">
      <!-- {{ album.title }} -->
      <AlbumCard :album="album"/>
    </div>
    <div v-else> no albums here 🤷</div>
  </section>
 </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import AlbumCard from '../components/AlbumCard.vue';
import { albumsService } from '../services/AlbumsService.js';
import Pop from '../utils/Pop.js';
export default {
  setup() {
    onMounted(()=> {
      getAllAlbums()
    })
    const filterBy = ref('')
    async function getAllAlbums(){
      try {
        await albumsService.getAllAlbums()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      filterBy,
      albums: computed(()=> {
        if(filterBy.value){
          return AppState.albums.filter(a => a.category == filterBy.value)
        } else {
          return AppState.albums
        }
      })
    }
  },
  components: {AlbumCard}
}
</script>

<style scoped lang="scss">

</style>
