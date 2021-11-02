<template>
  <!-- Button trigger modal -->
  <div class="user-actions">
    <!-- Modal -->
    <form>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Review product <strong>Adidas Shoes</strong></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <!-- Product Rating -->
                <p>1. Rate</p>
                <div class="col-6" id="full-stars-example-two">
                  <div class="rating-group">
                    <input disabled checked class="rating__input rating__input--none" name="rating3" id="rating3-none" value="0" type="radio">
                    <label aria-label="1 star" class="rating__label" for="rating3-1"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
                    <input class="rating__input" name="rating3" id="rating3-1" value="1" type="radio">
                    <label aria-label="2 stars" class="rating__label" for="rating3-2"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
                    <input class="rating__input" name="rating3" id="rating3-2" value="2" type="radio">
                    <label aria-label="3 stars" class="rating__label" for="rating3-3"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
                    <input class="rating__input" name="rating3" id="rating3-3" value="3" type="radio">
                    <label aria-label="4 stars" class="rating__label" for="rating3-4"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
                    <input class="rating__input" name="rating3" id="rating3-4" value="4" type="radio">
                    <label aria-label="5 stars" class="rating__label" for="rating3-5"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
                    <input class="rating__input" name="rating3" id="rating3-5" value="5" type="radio">
                  </div>
                </div>
                <div class="col-6 d-flex align-items-center">
                  <p class="m-0">Click at stars to choose</p>
                </div>
                <p class="mt-3">2. Comment</p>
                <div class="col-12 review-modal-comment">
                  <div class="form-group">
                    <p>
                      <textarea placeholder="Share your experience..." class="form-control" id="exampleFormControlTextarea1" rows="6" maxlength="10000"></textarea>
                    </p>
                  </div>
                </div>
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Share</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>

</template>

<script lang="ts">
import AppBasePage from '@/pages/AppBasePage.vue'
import { Options } from "vue-class-component"

@Options({
  name: "RateProductModal",
})
export default class RateProductModal extends AppBasePage {

}

</script>

<style lang="scss">
  .modal-dialog{
    top: 12.5%;
  }

  .review-modal-comment{
    display: block;
    margin-bottom: 16px;
    width: 100%;
    overflow: hidden;
    position: relative;
    textarea{
      border-radius: 8px;
      resize: none;
      min-height: 78px;
      line-height: 22px;
      font-size: 14px;
      width: 100%;
      border: 1px solid #dcdcdc;
      padding: 24px 16px 8px;
      color: #000;
    }
  }

  #full-stars-example {

    /* use display:inline-flex to prevent whitespace issues. alternatively, you can put all the children of .rating-group on a single line */
    .rating-group {
      display: inline-flex;
    }

    /* make hover effect work properly in IE */
    .rating__icon {
      pointer-events: none;
    }

    /* hide radio inputs */
    .rating__input {
      position: absolute !important;
      left: -9999px !important;
    }

    /* set icon padding and size */
    .rating__label {
      cursor: pointer;
      padding: 0 0.1em;
      font-size: 2rem;
    }

    /* set default star color */
    .rating__icon--star {
      color: orange;
    }

    /* set color of none icon when unchecked */
    .rating__icon--none {
      color: #eee;
    }

    /* if none icon is checked, make it red */
    .rating__input--none:checked + .rating__label .rating__icon--none {
      color: red;
    }

    /* if any input is checked, make its following siblings grey */
    .rating__input:checked ~ .rating__label .rating__icon--star {
      color: #ddd;
    }

    /* make all stars orange on rating group hover */
    .rating-group:hover .rating__label .rating__icon--star {
      color: orange;
    }

    /* make hovered input's following siblings grey on hover */
    .rating__input:hover ~ .rating__label .rating__icon--star {
      color: #ddd;
    }

    /* make none icon grey on rating group hover */
    .rating-group:hover .rating__input--none:not(:hover) + .rating__label .rating__icon--none {
      color: #eee;
    }

    /* make none icon red on hover */
    .rating__input--none:hover + .rating__label .rating__icon--none {
      color: red;
    }
  }

  #half-stars-example {

    /* use display:inline-flex to prevent whitespace issues. alternatively, you can put all the children of .rating-group on a single line */
    .rating-group {
      display: inline-flex;
    }

    /* make hover effect work properly in IE */
    .rating__icon {
      pointer-events: none;
    }

    /* hide radio inputs */
    .rating__input {
      position: absolute !important;
      left: -9999px !important;
    }

    /* set icon padding and size */
    .rating__label {
      cursor: pointer;
      /* if you change the left/right padding, update the margin-right property of .rating__label--half as well. */
      padding: 0 0.1em;
      font-size: 2rem;
    }

    /* add padding and positioning to half star labels */
    .rating__label--half {
      padding-right: 0;
      margin-right: -0.6em;
      z-index: 2;
    }

    /* set default star color */
    .rating__icon--star {
      color: orange;
    }

    /* set color of none icon when unchecked */
    .rating__icon--none {
      color: #eee;
    }

    /* if none icon is checked, make it red */
    .rating__input--none:checked + .rating__label .rating__icon--none {
      color: red;
    }

    /* if any input is checked, make its following siblings grey */
    .rating__input:checked ~ .rating__label .rating__icon--star {
      color: #ddd;
    }

    /* make all stars orange on rating group hover */
    .rating-group:hover .rating__label .rating__icon--star,
    .rating-group:hover .rating__label--half .rating__icon--star {
      color: orange;
    }

    /* make hovered input's following siblings grey on hover */
    .rating__input:hover ~ .rating__label .rating__icon--star,
    .rating__input:hover ~ .rating__label--half .rating__icon--star {
      color: #ddd;
    }

    /* make none icon grey on rating group hover */
    .rating-group:hover .rating__input--none:not(:hover) + .rating__label .rating__icon--none {
      color: #eee;
    }

    /* make none icon red on hover */
    .rating__input--none:hover + .rating__label .rating__icon--none {
      color: red;
    }
  }

  #full-stars-example-two {

    /* use display:inline-flex to prevent whitespace issues. alternatively, you can put all the children of .rating-group on a single line */
    .rating-group {
      display: inline-flex;
    }

    /* make hover effect work properly in IE */
    .rating__icon {
      pointer-events: none;
    }

    /* hide radio inputs */
    .rating__input {
      position: absolute !important;
      left: -9999px !important;
    }

    /* hide 'none' input from screenreaders */
    .rating__input--none {
      display: none
    }

    /* set icon padding and size */
    .rating__label {
      cursor: pointer;
      padding: 0 0.1em;
      font-size: 2rem;
    }

    /* set default star color */
    .rating__icon--star {
      color: orange;
    }

    /* if any input is checked, make its following siblings grey */
    .rating__input:checked ~ .rating__label .rating__icon--star {
      color: #ddd;
    }

    /* make all stars orange on rating group hover */
    .rating-group:hover .rating__label .rating__icon--star {
      color: orange;
    }

    /* make hovered input's following siblings grey on hover */
    .rating__input:hover ~ .rating__label .rating__icon--star {
      color: #ddd;
    }
  }


  body {
    padding: 1rem;
    text-align: center;
  }

</style>