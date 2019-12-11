<template>
  <section class="data-section">
    <h1 v-pin="handleScroll">{{ title | uppercase }}</h1>
    <div class="section-img">
      <img :src="image">
    </div>
    <div class="section-data">
      <base href="https://en.wikipedia.org" target="_blank">
      <div v-html="data"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: "DataSection",
  props: {
    term: String
  },
  data() {
    return {
      data: "",
      image: ""
    };
  },
  computed: {
    title() {
      return this.term;
    }
  },
  watch: {
    term(newTerm, oldTerm) {
      const isNotEmpty = !!newTerm;
      const isDifferent = newTerm !== oldTerm;

      if (isNotEmpty && isDifferent) {
        this.fetchData(newTerm);
      }
    }
  },
  methods: {
    handleResponseData([imageResp, dataResp]) {
      const image = imageResp.items[0].link;
      const data = dataResp.parse.text["*"];

      this.$set(this, "image", image);
      this.$set(this, "data", data);
      this.$emit("onDataUpdated", false);
    },
    handleScroll(event, el) {
      const shouldBePinned = window.scrollY >= 200;
      el.classList.toggle("pinned", shouldBePinned);
    },
    getData(term) {
      const requestUrl = `https://en.wikipedia.org/w/api.php?action=parse&prop=text&format=json&section=0&page=${term}&origin=*`;

      return fetch(requestUrl).then(response => response.json());
    },
    getImageData(term) {
      const requestImg = `//www.googleapis.com/customsearch/v1?key=${process.env.VUE_APP_GOOGLE_API}&q=${term}%20photograph&cx=010572450088251993962:di6deszsjtb&num=1&searchType=image`;

      return fetch(requestImg).then(response => response.json());
    },
    fetchData(term) {
      const image = this.getImageData(term);
      const data = this.getData(term);

      Promise
        .all([image, data])
        .then(this.handleResponseData);
    }
  }
};
</script>

<style lang="scss" scoped>
.data-section {
  margin: 0 auto;
  max-width: 90%;
  width: 800px;

  h1 {
    background-color: #fff;
    font-family: Copperplate, Copperplate Gothic Light, fantasy;
    margin: 0;
    padding: 20px 0;
    width: 100%;

    &.pinned {
      box-shadow: rgb(0, 0, 0) 0px 15px 8px -15px;
      max-width: 800px;
      position: fixed;
      top: 0;
      width: 90%;
      z-index: 1;
    }
  }

  .section-img {
    text-align: center;

    img {
      height: auto;
      max-width: 100%;
      width: auto;
    }
  }
}
</style>

<style>
.data-section .infobox.biota {
  display: none;
}
</style>

