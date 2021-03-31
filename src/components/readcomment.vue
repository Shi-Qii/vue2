<template>
  <div>
    

    <div class="card mb-2" style="max-width: 90%">
      <div class="row no-gutters">
        <div class="col-md-3">
      <img :src="loadImage" width="200px" height="200px" />
        </div>
        <div class="col-md-7">
          <div class="card-body">
            <!-- <div
              class="card mb-2"
              style="max-width: 90%"
              v-for="course in courses"
              v-bind:key="course.id"
            > -->
              <h5 class="card-title">{{ course.id }}{{ course.title }}</h5>
              <p class="card-text">
                {{ course.type }}
                 {{ course.fileName }}
              </p>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import theaterDataService from "../services/theaterDataService";
const API_URL_getImage = "http://localhost:8070/getImage/";
export default {
  name: "Course",
  data() {
    return {
      fileName: "",
      title: "",
      course: [],
      loadImage:'',
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    refreshCourses(id) {
      theaterDataService.retrieveAllComment(this.INSTRUCTOR,id).then((res) => {
        this.course = res.data;
        this.loadImage = API_URL_getImage +res.data.fileName
        
      });
    },
  },
  mounted() {
    this.refreshCourses(this.id);
  },
};
</script>