<style>
.card-img-top {
  height: 200px;
  width: 70%;
  
}
</style>
<template>
  <div class="container">
    <div class="card" style="width: 25rem">
      <img src="../assets/noimage.jpg" class="card-img-top" alt="..." />
      <div class="card-body">
        
        
      </div>
      <ul class="list-group list-group-flush">
        <h3>
          <li class="list-group-item">ID:{{ currentUser.id }}</li>
        </h3>
        <h3>
          <li class="list-group-item">Email:{{ currentUser.email }}</li>
        </h3>
        <h3>
          <li
            class="list-group-item"
            v-for="(role, index) in currentUser.roles"
            :key="index"
          >
            用戶等級:{{ role }}
          </li>
        </h3>
      </ul>
      <div class="card-body">
       
        <a href="#" class="card-link">資料修改</a>
      </div>
    </div>

    <!-- <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>