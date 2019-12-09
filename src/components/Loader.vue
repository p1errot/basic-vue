<template>
  <div class="loader-cont">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: "Loader"
};
</script>

<style lang="scss" scoped>
.loader-cont {
  background: rgba(0, 0, 0, 0.7);
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;

  .loader {
    animation: spin 3s ease infinite;
    border: 3px solid #fc2f70;
    height: 2em;
    left: calc(50% - 1em);
    overflow: hidden;
    position: fixed;
    top: calc(50% - 1em);
    width: 2em;

    &::before {
      animation: fill 3s linear infinite;
      background-color: hsla(341, 97%, 59%, 0.75);
      content: "";
      height: 2.01em;
      left: 0px;
      position: absolute;
      top: 1px;
      transform-origin: center bottom;
      transform: scaleY(1);
      width: 2em;
    }
  }
}

@keyframes spin {
  50%,
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fill {
  25%,
  50% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}
</style>

