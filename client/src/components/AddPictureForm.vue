<template>


  <!-- Modal -->
  <div
    class="modal fade"
    id="add-picture-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalTitleId"
    aria-hidden="true"
  >
    <div
      class="modal-dialog "
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalTitleId">
            Add a Picture
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">

         <form @submit.prevent="addPicture()" class="row">
          <div class="mb-3 col-12">
            <label for="picture-url">Picture URL</label>
            <input v-model="pictureData.imgUrl" type="url" name="picture-url" id="add-picture-url" class="form-control" maxlength="750" required>
          </div>
          <div class="col-6">
            preview image
          </div>
          <div class="col-6">
            <button class="btn btn-primary">Add <i class="mdi mdi-plus"></i></button>
          </div>
        </form>


        </div>
      </div>
    </div>
  </div>

</template>


<script>
import Pop from '../utils/Pop.js';
import {ref} from 'vue'
import {picturesService} from '../services/PicturesService.js'
import { useRoute } from 'vue-router';
import { Modal } from 'bootstrap';

export default {
setup(){
  const pictureData = ref({})
  const route = useRoute()
return{
  pictureData,
  async addPicture(){
    try {
      // NOTE adds in the key 'albumId' and assigns the value from the route parameters, of the album page we are on
      pictureData.value.albumId = route.params.albumId
      pictureData.value.creatorId = 'Micks id'
      await picturesService.addPicture(pictureData.value)
      Pop.success('whoopie new picture!')
      pictureData.value = {}
      Modal.getOrCreateInstance('#add-picture-modal').hide()
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
