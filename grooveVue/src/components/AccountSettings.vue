<template>
  <div class="row">
    <div class="col-lg-3">
      <div class="py-11 px-5 text-center mb-5 box">
        <img src="https://www.gravatar.com/avatar/d9674a7569882565f21bf2d1047086b8?d=https://assets.e-food.gr/gravatar/no-avatar2.png" class="mb-5" alt="User Avatar" width="72" height="72">
        <h2 class="fw-bold">Βασιλης Τότσκας</h2>
      </div>
    </div>
    <div class="col-lg-9">
      <div class="box">
        <form class="row g-3">
          <div class="col-md-6">
            <label for="inputFirstName" class="form-label">First Name</label>
            <input type="text" class="form-control" id="inputFirstName">
          </div>
          <div class="col-md-6">
            <label for="inputLastName" class="form-label">Last Name</label>
            <input type="text" class="form-control" id="inputLastName">
          </div>
          <div class="col-12">
            <label for="inputPhone" class="form-label">Phone</label>
            <input type="text" class="form-control" id="inputPhone" placeholder="6943434343">
          </div>
          <div class="col-md-9">
            <label for="inputCity" class="form-label">City</label>
            <input type="text" class="form-control" id="inputCity">
          </div>
          <div class="col-md-3">
            <label for="inputZipcode" class="form-label">Zipcode</label>
            <input type="text" class="form-control" id="inputZipcode">
          </div>
          <div class="col-12">
            <label for="inputAddress" class="form-label">Address</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
          </div>
          <div class="col-12">
            <label for="inputPlace" class="form-label">Place</label>
            <input type="text" class="form-control" id="inputPlace" placeholder="Attica">
          </div>

          <div class="col-md-6">
            <label for="inputCountry" class="form-label">Country</label>
            <select id="inputCountry" class="form-select">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>

          <div class="col-md-6">
            <label for="inputCounty" class="form-label">County</label>
            <select id="inputCounty" class="form-select">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>

          <div class="col-12">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="gridCheck">
              <label class="form-check-label" for="gridCheck">
                Check me out
              </label>
            </div>
          </div>
          <div class="col-12 text-end">
            <button type="submit" class="button is-success">Save</button>
          </div>
        </form>
      </div>

    </div>
  </div>


</template>


<script>

export default {
  name: 'AccountSettings',
  data() {
    return {

    }
  },
  mounted() {
    document.title = 'My Settings | grooveShop'
  },
  methods: {

  }
}
</script>