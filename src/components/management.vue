
<template>
  <!-- {{ course.id }}     v-for="course in courses" v-bind:key="course.id" -->
  <div class="make-container">
    <h3>影評網(後台)</h3>

    <b-button type="button" pill variant="info" @click="refreshTheater()">首頁</b-button>
    <b-button type="button" pill variant="info" @click="selectType('action')">動作</b-button>
    <b-button type="button" pill variant="info" @click="selectType('love')">愛情</b-button>
    <b-button type="button" pill variant="info" @click="selectType('Horror')">恐怖</b-button>
    <b-button type="button" pill variant="danger" @click="addMovie()">新增</b-button>

    <br /><br />

    <div
      class="card mb-2"
      style="max-width: 90%"
      v-for="movie in movies"
      v-bind:key="movie.id"
    >
      <div class="row no-gutters">
        
        <div class="col-md-7">
          <div class="card-body">
            <h5 class="card-title">
              ID:{{ movie.id }}<br />
              Title:{{ movie.title }}
            </h5>
            <p class="card-text">type: {{ movie.type }}</p>
          </div>
        </div>
        <button class="btn btn-warning" v-on:click="deleteMovie(movie.id)">
          Delete
        </button>
        <button class="btn btn-warning" v-on:click="updateMovie(movie.id)">
          updata
        </button>
        <button class="btn btn-warning" v-on:click="readcomment(movie.id)">
          看影評
        </button>
      </div>
    </div>

    <div class="icon-bar">
      <a href="#" class="facebook">F<i class="fa fa-facebook"></i></a>
      <a href="#" class="twitter">t<i class="fa fa-twitter"></i></a>
      <a href="#" class="google">G<i class="fa fa-google"></i></a>
      <a href="#" class="linkedin">in<i class="fa fa-linkedin"></i></a>
      <a href="#" class="youtube">y<i class="fa fa-youtube"></i></a>
    </div>
  </div>
</template>
<script>
import theaterDataService from "../services/theaterDataService";

export default {
  name: "Courses",
  data() {
    return {
      slide: 0,
      sliding: null,
      movies: [],
    };
  },
  methods: {
    refreshTheater() {
      theaterDataService.retrieveAllCourses(this.INSTRUCTOR).then((res) => {
        this.movies = res.data;
      });
    },
    selectType(type) {
      theaterDataService.selectType(this.INSTRUCTOR, type).then((res) => {
        this.movies = res.data;
      });
    },
    addMovie() {
      console.log('555')
      this.$router.push(`/addFilmCritics/-1`);
    },
    updateMovie(id) {
      this.$router.push(`/addFilmCritics/${id}`);
    },
    deleteMovie(id) {
      theaterDataService.deletemovie(this.INSTRUCTOR, id).then(() => {
        this.refreshTheater();
      });
    },
    readcomment(id) {
      this.$router.push(`/readcomment/${id}`);
    },
  },
  created() {
    this.refreshTheater();
  },
};
</script>
<style scoped>
.icon-bar {
  position: fixed;
  top: 40%;
  left: 2px;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-10%);
  transform: translateY(-50%);
}

.icon-bar a {
  display: block;
  text-align: center;
  padding: 14px;
  transition: all 0.3s ease;
  color: white;
  font-size: 14px;
}

.icon-bar a:hover {
  background-color: #000;
}
.facebook {
  background: #3b5998;
  color: white;
}

.twitter {
  background: #55acee;
  color: white;
}

.google {
  background: #dd4b39;
  color: white;
}

.linkedin {
  background: #007bb5;
  color: white;
}

.youtube {
  background: #bb0000;
  color: white;
}

.make-container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: -80px;
}
</style>