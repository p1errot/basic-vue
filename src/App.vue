<template>
  <div id="app">
    <page-header :image="header.image" :items="header.menu" @onChangeItem="updateTerm"/>
    <router-view>
      <data-section v-if="term" :term="term" />
    </router-view>
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
    },
    term() {
      return this.$store.state.term;
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
      }
    };
  },
  created() {
    this.checkCurrentRoute();
  },
  watch: {
    $route(to) {
      const { term: newTerm } = to.params;
      this.updateTerm(newTerm);
    }
  },
  methods: {
    checkCurrentRoute() {
      const currentRoute = this.$route.name;

      if (currentRoute !== 'index') {
        return;
      }

      const defaultTerm = this.header.menu[0];
      const termValue = this.$options.filters.toURL(defaultTerm.title);

      this.$store.commit('updateTerm', defaultTerm.title);
      this.$router.replace(`/term/${termValue}`);
    },
    updateTerm(term) {
      this.$store.commit('updateTerm', term);
      this.$store.commit("toggleLoader", true);
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
