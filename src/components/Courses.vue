
<template>
  <div class="container">
    <h3>All Courses</h3>

    <div v-if="message" class="alert alert-success">{{ this.message }}</div>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in courses" v-bind:key="course.id">
            <td>{{ course.id }}</td>
            <td>{{ course.description }}</td>
            <td>
              <button
                class="btn btn-success"
                v-on:click="updateCourse(course.id)"
              >
                Update
              </button>
            </td>
            <td>
              <button
                class="btn btn-warning"
                v-on:click="deleteCourse(course.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <button class="btn btn-success" v-on:click="addCourse()">Add</button>
      </div>
      <div class="icon-bar">
        <a href="#" class="facebook">F<i class="fa fa-facebook"></i></a>
        <a href="#" class="twitter">t<i class="fa fa-twitter"></i></a>
        <a href="#" class="google">G<i class="fa fa-google"></i></a>
        <a href="#" class="linkedin">in<i class="fa fa-linkedin"></i></a>
        <a href="#" class="youtube">y<i class="fa fa-youtube"></i></a>
      </div>
    </div>
  </div>
</template>
<script>
import CourseDataService from "../services/CourseDataService";

export default {
  name: "Courses",
  data() {
    return {
      courses: [],
      message: "",
      INSTRUCTOR: "in28minutes",
    };
  },
  methods: {
    refreshCourses() {
      CourseDataService.retrieveAllCourses(this.INSTRUCTOR).then((res) => {
        this.courses = res.data;
      });
    },
    addCourse() {
      this.$router.push(`/courses/-1`);
    },
    updateCourse(id) {
      this.$router.push(`/courses/${id}`);
    },
    deleteCourse(id) {
      CourseDataService.deleteCourse(this.INSTRUCTOR, id).then(() => {
        this.refreshCourses();
      });
    },
  },
  created() {
    this.refreshCourses();
    // Vue defines a component lifecycle. created will be called as soon as the component is mounted. We are calling refreshCourses as soon as a component is mounted.
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
</style>