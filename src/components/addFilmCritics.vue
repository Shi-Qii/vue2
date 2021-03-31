<template>
  <div>
    <h3>Course</h3>
    <div class="container">
      <form @submit="validateAndSubmit">
        
        <fieldset class="form-group">
          <label>Id</label>
          <input type="text" class="form-control" v-model="id" disabled />
        </fieldset>
        <fieldset class="form-group">
          <label>fileName</label>
          <input type="text" class="form-control" v-model="file.name" />
        </fieldset>
        <fieldset class="form-group">
          <label>type</label>
          <b-form-select
            v-model="type"
            :options="options"
            size="xl"
            class="mt-3"
          ></b-form-select>
        </fieldset>
        <fieldset class="form-group">
          <label>title</label>
          <input type="text" class="form-control" v-model="title" />
        </fieldset>

        <button class="btn btn-success" type="submit">Save</button>
      </form>
      <!-- 选择图片后展示 -->
      <img :src="f.src" width="100px" height="100px" v-if="f" />
      <!-- 选择图片之前展示 -->
      <img
        src="../assets/logo.png"
        @click="add()"
        width="100px"
        height="100px"
        v-else
      />
      <input
        class="value"
        style="display: none"
        type="file"
        ref="file"
        accept="image/*"
        multiple="multiple"
        @change="getFile($event)"
      />
      <button @click="submitForm($event)">上傳圖片</button>
      <img :src="loadImage" width="100px" height="100px" />
    </div>
  </div>
</template>
<script>
import theaterDataService from "../services/theaterDataService";
import axios from "axios";
import authHeader from "../services/auth-header";
const API_URL = "http://localhost:8070/";
export default {
  name: "Course",
  data() {
    return {
      file: ' ',
      f: null,
      loadImage: "",
      // 分隔
      title: "",
      fileName: '',
      type: null,
      options: [
        { value: null, text: "Please select an option", disabled: true },
        { value: "action", text: "action" },
        { value: "Horror", text: "horror" },
        { value: "love", text: "love" },
      ],
    };
  },
  computed: {
    id() {
      console.log(this.$route.params);
      return this.$route.params.id;
    },
  },
  methods: {
    add() {
      this.$refs.file.click();
    },
    getFile(event) {
      this.file = event.target.files[0];
      const item = {
        name: this.file.name,
        size: this.file.size,
        file: this.file,
      };
      this.html5Reader(this.file, item);
      this.f = item;
    },
    // 将图片文件转成BASE64格式
    html5Reader(file, item) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.$set(item, "src", e.target.result);
      };
      reader.readAsDataURL(file);
    },
    submitForm(event) {
      event.preventDefault();
      let formData = new FormData();
      formData.append("file", this.file);
     
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(API_URL + "upload", formData, config, { headers: authHeader() })
        .then((res) => {
          this.loadImage = API_URL + "getImage/" + res.data;
        });
    },
    // 分隔--------------
    refreshMovieDetails() {
      theaterDataService.retrieveCourse(this.id, this.title).then((res) => {
        this.fileName = res.data.fileName;
      });
    },
    validateAndSubmit(e) {
      e.preventDefault();
     
        if (this.id === "-1") {
          theaterDataService
            .createMovie(this.title, this.id, {
              id: this.id,
              title: this.title,
              fileName: this.file.name,
              type: this.type,
            })
            .then(() => {
              console.log("我是if" + this.id);
              this.$router.push("/management");
            });
        } else {
          // 如果id不等於-1 那就更新
          theaterDataService
            .updateCourse(this.title, this.id, {
              id: this.id,
              title: this.title,
              
              type: this.type,
            })
            .then(() => {
              console.log("我是else" + this.id);
              this.$router.push("/management");
            });
        }
      
    },
  },
  created() {
    this.refreshMovieDetails();
  },
};
</script>