<template>
  <div class="d-flex align-center container-div">
    <span class="bg"></span>
    <LoginCard />
  </div>
</template>

<script>
import LoginCard from "../components/LoginComponents/LoginCard";
export default {
  components: {
    LoginCard
  }
};
</script>

<style>
.container-div {
  height: 100%;
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80")
    no-repeat center center;
  background-size: cover;
  filter: blur(2px);
  -webkit-filter: blur(2px);
}
</style>
