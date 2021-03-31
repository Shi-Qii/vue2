<template>
  <div>
    <h3>comment</h3>
    <div class="container">
      <form @submit="validateAndSubmit">
        <div v-if="errors.length">
          <div
            class="alert alert-warning"
            v-bind:key="index"
            v-for="(error, index) in errors"
          >
            {{ error }}
          </div>
        </div>
        <fieldset class="form-group">
          <label>Id</label>
          <input type="text" class="form-control" v-model="id" disabled />
        </fieldset>
        <fieldset class="form-group">
          <label>電影名稱</label>
          <input type="text" class="form-control" v-model="file_name" />
        </fieldset>
        <fieldset class="form-group">
          <label>電影類型</label>
          <input type="text" class="form-control" v-model="type" />
        </fieldset>
        <fieldset class="form-group">
          <label>影評撰寫</label>
          <input type="textarea" class="form-control" v-model="comment" />
        </fieldset>
        <button class="btn btn-success" type="submit">Save</button>
      </form>
    </div>
  </div>
</template>
<script>
import CourseDataService from "../services/CourseDataService";
import CommentDataService from "../services/CommentDataService";
export default {
  name: "comment",
  data() {
    return {
      file_name: "",
      type: " ",
      comment: "",
      INSTRUCTOR: "comment",
      errors: [],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    refreshCourseDetails() {
      CourseDataService.retrieveCourse(this.INSTRUCTOR, this.id).then((res) => {
        this.description = res.data.description;
      });
    },
    refreshCommentDetails() {
      CommentDataService.retrieveComment(
        this.comment,
        this.type,
        this.file_name,
        this.id
      ).then((res) => {
        this.comment = res.data.comment;
        this.type = res.data.type;
        this.file_name = res.data.file_name;
      });
    },
    validateAndSubmit(e) {
      e.preventDefault();
      this.errors = [];
      // if (!this.description) {
      //   this.errors.push("Enter valid values");
      // } else if (this.description.length < 5) {
      //   this.errors.push("Enter atleast 5 characters in Description");
      // }
      if (this.errors.length === 0) {
        if (this.id === -1) {
          // 如果id等於-1 那就建立
          CommentDataService.createComment( this.comment,this.type,this.file_name, {
            comment: this.comment,
            type:this.type,
            file_name:this.file_name,
          }).then(() => {
            this.$router.push("/theater");
          });
        } 
        // else {
        //   // 如果id不等於-1 那就更新
        //   CourseDataService.updateCourse(this.INSTRUCTOR, this.id, {
        //     id: this.id,
        //     description: this.description,
        //   }).then(() => {
        //     this.$router.push("/courses");
        //   });
        // }
      }
    },
  },
  created() {
    this.refreshCourseDetails();
  },
};
</script>