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
            <font-awesome-icon icon="home"/>
            股票
          </router-link>
        </li>
        <li class="nav-item">
          <b-button v-b-toggle.sidebar-1>各項選單</b-button>
          <b-sidebar backdrop id="sidebar-1" title="選單" shadow>
            <div class="px-3 py-2">
              <b-dropdown Block id="dropdown-dropright" dropright text="個股查詢" variant="primary" class="m-2 ">
                <!--                <b-dropdown-item>-->
                <!--                  <router-link to="/sndividualStockInquiry">-->
                <!--                    個股查詢-->
                <!--                  </router-link>-->
                <!--                </b-dropdown-item>-->
                <!--                <b-dropdown-item>-->
                <!--                  <router-link to="/monthlyrevenue">-->
                <!--                    個股查詢_月查詢-->
                <!--                  </router-link>-->
                <!--                </b-dropdown-item>-->
                <b-dropdown-item>
                  <router-link to="/mainStockSearch">
                    個股查詢
                  </router-link>
                </b-dropdown-item>
              </b-dropdown>
            </div>
            <div class="px-3 py-2">
              <b-dropdown Block id="dropdown-dropright" dropright text="月營收" variant="primary" class="m-2 ">
                <b-dropdown-item>
                  <router-link to="/allStockQuery">
                    上市全部營收查詢
                  </router-link>
                </b-dropdown-item>

                <b-dropdown-item>
                  <router-link to="/annualGrowthRate">
                    上市月營收長短期年增率
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link to="/shortRevenueBreakthroughLong">
                    當月短期總營收突破長期營收
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link to="/longRevenueBreakthroughShort">
                    當月長期總營收突破短期營收
                  </router-link>
                </b-dropdown-item>
              </b-dropdown>
            </div>
            <div class="px-3 py-2">
              <b-dropdown Block id="dropdown-dropright" :no-close-on-backdrop="true"
                          backdrop
                          shadow dropright text="法人進出" variant="primary" class="m-2 ">

                <b-dropdown-group id="dropdown-group-2" header="買超組合">
                  <b-dropdown-item>
                    <router-link
                        to='/foreignPurchases'>
                      外資買超排行
                    </router-link>
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <router-link
                        to='/listedTrustBuy'>
                      投信買超排行
                    </router-link>
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <router-link
                        to='/listedDealerBuy'>
                      自營買超排行
                    </router-link>
                  </b-dropdown-item>


                  <b-dropdown-item-button>
                    <router-link
                        to='/listedForeignDealerBuy'>
                      外資+自營
                    </router-link>
                  </b-dropdown-item-button>
                  <b-dropdown-item-button>
                    <router-link
                        to='/listedForeignTrustBuy'>
                      外資+投信
                    </router-link>
                  </b-dropdown-item-button>
                  <b-dropdown-item-button>

                    <router-link
                        to='/listedTrustDealerBuy'>
                      自營+投信
                    </router-link>
                  </b-dropdown-item-button>
                  <b-dropdown-item-button>外資+自營+投信</b-dropdown-item-button>
                </b-dropdown-group>
                <b-dropdown-group id="dropdown-group-2" header="賣超組合">
                  <b-dropdown-item>
                    <router-link
                        to='/ListedForeignCapitalSoldOver'>
                      外資賣超排行
                    </router-link>
                  </b-dropdown-item>

                  <b-dropdown-item>
                    <router-link
                        to='/listedTrustSell'>
                      投信賣超排行
                    </router-link>
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <router-link
                        to='/listedDealerSell'>
                      自營賣超排行
                    </router-link>
                  </b-dropdown-item>

                  <b-dropdown-item-button>
                    <router-link
                        to='/listedForeignDealerSell'>
                      外資+自營
                    </router-link>
                  </b-dropdown-item-button>
                  <b-dropdown-item-button>
                    <router-link
                        to='/listedForeignTrustSell'>
                      外資+投信
                    </router-link>
                  </b-dropdown-item-button>
                  <b-dropdown-item-button>
                    <router-link
                        to='/listedTrustDealerSell'>
                      自營+投信
                    </router-link>
                  </b-dropdown-item-button>
                  <b-dropdown-item-button>
                    <router-link
                        to='/totalSales'>
                      總買賣
                    </router-link>
                  </b-dropdown-item-button>

                </b-dropdown-group>
                <!--                <b-dropdown-divider></b-dropdown-divider>-->
              </b-dropdown>

            </div>
            <div class="px-3 py-2">
              <b-dropdown Block id="dropdown-dropright" dropright text="圖表" variant="primary" class="m-2 ">
                <b-dropdown-item>
                  <router-link to="/hightcharts_sndividualStockInquiry">
                    <font-awesome-icon icon="user-plus"/>
                    圖表_個股查詢
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link to="/hightcharts_monthlyChart">
                    <font-awesome-icon icon="user-plus"/>
                    圖表_月營收
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link to="/stockCandlesstick">
                    <font-awesome-icon icon="user-plus"/>
                    圖表_candles
                  </router-link>
                </b-dropdown-item>

              </b-dropdown>
            </div>
          </b-sidebar>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus"/>
            Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt"/>
            Login
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
            <font-awesome-icon icon="sign-out-alt"/>
            LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container col-10">
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {

  data() {

    return {};
  }
  ,
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
.setWigth {
  width: 30px;
}
</style>