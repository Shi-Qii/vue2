<template>
  <div>
    <button type="button" class="btn btn-primary">首頁</button>
    <button type="button" class="btn btn-secondary">動作</button>
    <button type="button" class="btn btn-success">喜劇</button>
    <button type="button" class="btn btn-danger">愛情</button>
    <button type="button" class="btn btn-warning">恐怖</button>
    <button type="button" class="btn btn-primary"  @click="addcomment()">新增影評文章</button>
    <div class="card-deck">
      <div class="card">
        <img
          class="card-img-top"
          src="../assets/noimage.jpg"
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title">{{ Cardtitle }}</h5>
          <p class="card-text">
            {{ CardContent }}
          </p>
          <!-- <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p> -->
          <button type="button" class="btn btn-warning">看影評</button>
        </div>
      </div>
      <div class="card">
        <img
          class="card-img-top"
          src="../assets/noimage.jpg"
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
          <button type="button" class="btn btn-warning">看影評</button>
        </div>
      </div>
      <div class="card">
        <img
          class="card-img-top"
          src="../assets/noimage.jpg"
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
          <button type="button" class="btn btn-warning">看影評</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Cardtitle: "Noimage",
      CardContent: "test",
    };
  },
  methods: {
    addcomment() {
      this.$router.push(`/comment/-1`);
    },
  },
};
</script>