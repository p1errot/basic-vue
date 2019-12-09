<template>
  <div id="app">
    <page-header :image="header.image" :items="header.menu" @onChangeItem="updateTerm"/>
    <data-section :term="term" @onDataUpdated="toggleLoader"/>
    <page-footer/>
    <transition name="fade" mode="out-in">
      <loader v-if="loader"/>
    </transition>
  </div>
</template>

<script>
import PageHeader from "./components/PageHeader";
import PageFooter from "./components/PageFooter";
import DataSection from "./components/DataSection";
import Loader from "./components/Loader";

export default {
  name: "App",
  components: {
    PageHeader,
    PageFooter,
    DataSection,
    Loader
  },
  computed: {
    loader() {
      return this.$store.state.loader;
    }
  },
  data() {
    return {
      header: {
        image:
          "https://cdn10.bigcommerce.com/s-tbgp7/products/12165/images/14119/T-25081__48134.1504971524.1000.1200.jpg?c=2",
        menu: [
          {
            id: 1,
            title: "Tyrannosaurus",
            active: true
          },
          {
            id: 2,
            title: "Velociraptor",
            active: false
          },
          {
            id: 3,
            title: "Spinosaurus",
            active: false
          },
          {
            id: 4,
            title: "Brachiosaurus",
            active: false
          }
        ]
      },
      term: ""
    };
  },
  methods: {
    updateTerm(term) {
      const isSameTerm = term === this.term;

      if (isSameTerm) {
        return;
      }

      this.toggleLoader();
      this.term = term;
    },
    toggleLoader(action) {
      this.$store.commit("toggleLoader", action);
    }
  }
};
</script>

<style lang="scss">
@import "./assets/styles/reset";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

a {
  color: inherit;
  position: relative;
  text-decoration: none;
  transition: all 0.1s ease-in-out;

  &:hover {
    color: #fff;
  }

  &::before {
    content: "";
    background-color: #fc2f70;
    bottom: 0;
    left: -0.05em;
    position: absolute;
    right: -0.05em;
    top: 0;
    transform-origin: bottom center;
    transform: scaleY(0.02);
    transition: all 0.1s ease-in-out;
    z-index: -1;
  }

  &:hover::before {
    transform: scaleY(1);
    background-color: #fc2f70;
  }
}
</style>
