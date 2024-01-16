<template>

  <!-- Modal -->
  <div
    class="modal fade"
    id="create-album-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalTitleId"
    aria-hidden="true"
  >
    <div
      class="modal-dialog"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body container-fluid">
          <h4 class="text-primary p-2">Create An Album</h4>

          <form class="row" @submit.prevent="createAlbum()">
            <div class="mb-3 col-6">
              <label for="album-title">Title</label>
              <input v-model="albumData.title" class="form-control" type="text" name="album-title" id="create-album-title" required minlength="3" maxlength="30">
            </div>
            <div class="mb-3 col-6">
              <label for="album-cover-image">Cover Image Link</label>
              <input v-model="albumData.coverImg" class="form-control" type="url" name="album-cover-image" id="create-album-cover-image"  maxlength="500">
            </div>
            <div class="mb-3 col-6">
              <label for="album-title">Category</label>
              <select v-model="albumData.category" class="form-control" name="album-title" id="create-album-title">
                <option selected disabled value="">select a category</option>
                <option v-for="option in categoryOptions" :value="option">{{ option }}</option>
              </select>
            </div>
            <div class="mb-3 col-6 d-flex align-items-end justify-content-end">
              <button class="btn btn-primary">Create <i class="mdi mdi-plus"></i></button>
            </div>

          </form>

        </div>

      </div>
    </div>
  </div>

</template>


<script>
import { useRouter } from 'vue-router';
import { albumsService } from '../services/AlbumsService.js';
import Pop from '../utils/Pop.js';
import {ref} from 'vue'
import { Modal } from 'bootstrap';

export default {
setup(){
  const albumData = ref({})
  const router = useRouter()
return{
  albumData,
  categoryOptions : ['dogs', 'cats', 'games', 'gachamon', 'misc', 'asthetics', 'animals'],
  async createAlbum(){
    try {
      // NOTE the createAlbum function here returns the newly created album from the network request, so we can use it for our router push a few lines later
      const album = await albumsService.createAlbum(albumData.value)
      Pop.success('album created')
      albumData.value = {}
      Modal.getOrCreateInstance('#create-album-modal').hide()
      router.push({name: 'Album Details', params: {albumId: album.id}})
    } catch (error) {
      Pop.error(error)
    }
  }
}
}
}
</script>


<style lang="scss" scoped>

</style>
