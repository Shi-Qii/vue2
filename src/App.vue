
<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
<!--      <a class="navbar-brand">影評網</a>-->
      <a class="navbar-brand">股票</a>
      <div class="navbar-nav mr-auto">
        <!-- <li class="nav-item">
          <router-link to="/theater" class="nav-link">
            <font-awesome-icon icon="home" />Theater
          </router-link>
        </li> -->
<!--        <li v-if="showAdmin" class="nav-item">-->
<!--          <router-link to="/management" class="nav-link">-->
<!--            <font-awesome-icon icon="home" />後台管理-->
<!--          </router-link>-->
<!--        </li>-->
<!--        <li class="nav-item">-->
<!--          <router-link to="/filmCritics" class="nav-link">-->
<!--            <font-awesome-icon icon="home" />股票-->
<!--          </router-link>-->
<!--        </li>-->
        <li class="nav-item">
          <router-link to="/stockHome" class="nav-link">
            <font-awesome-icon icon="home" />股票
          </router-link>
        </li>
        <li class="nav-item">
          <b-button v-b-toggle.sidebar-1>各項選單</b-button>
          <b-sidebar backdrop id="sidebar-1" title="選單" shadow>
            <div class="px-3 py-2">
              <b-dropdown Block  id="dropdown-dropright" dropright text="個股查詢" variant="primary" class="m-2 ">
                <b-dropdown-item>
                  <router-link to="/sndividualStockInquiry">
                    <font-awesome-icon icon="user-plus" />個股查詢
                  </router-link>
                  </b-dropdown-item>
              </b-dropdown>
            </div>
            <div  class="px-3 py-2">
              <b-dropdown Block  id="dropdown-dropright" dropright text="法人進出" variant="primary" class="m-2 ">
                <b-dropdown-item>
                  <router-link to="/foreignPurchases" >
                    <font-awesome-icon icon="user-plus" />外資買超排行
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item>外資賣超排行</b-dropdown-item>
                <b-dropdown-item>自營買超排行</b-dropdown-item>
                <b-dropdown-item>自營賣超排行</b-dropdown-item>
              </b-dropdown>
            </div>

          </b-sidebar>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" />Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <!-- <li class="nav-item">
          
            <font-awesome-icon icon="user" />
            暱稱:{{ currentUser.username }}
          <router-link to="/profile" class="nav-link">
          </router-link>
        </li> -->
        <li class="nav-item dropdown">
          <h4
            class="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
           歡迎 {{ currentUser.username }} 到來
          </h4>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="/profile">個人資料中心</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdmin() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }
      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>
<style>
.setWigth{
  width: 30px;
}
</style>