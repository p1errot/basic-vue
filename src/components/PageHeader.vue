<template>
  <header>
    <div class="header-banner">
      <img :src="image">
    </div>
    <nav>
      <ul>
        <li
          v-for="item in items"
          :key="item.id"
          :class="(item.active ? 'active' : '')"
          @click="handleMenuItem($event, item.id)"
        >{{ item.title }}</li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    image: String,
    items: Array
  },
  created() {
    const defautlItem = this.items[0];

    this.$set(defautlItem, "active", true);
    this.$emit("onChangeItem", defautlItem.title);
  },
  watch: {
    items() {
      const defautlItem = this.items[0];

      this.$set(defautlItem, "active", true);
      this.$emit("onChangeItem", defautlItem.title);
    }
  },
  methods: {
    handleMenuItem(e, id) {
      const clickedEl = this.items.find(el => el.id === id);
      const menuItems = this.items;

      menuItems.forEach((el, index) => {
        this.$set(menuItems[index], "active", false);
      });

      this.$set(clickedEl, "active", true);
      this.$emit("onChangeItem", clickedEl.title);
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  text-align: center;

  .header-banner {
    font-size: 1px;
    margin: 0;
    padding-top: 50px;
  }

  img {
    height: 63px;
    object-fit: cover;
    width: 624px;
  }

  nav {
    background-color: hsl(236, 32%, 26%);
    display: flex;
    text-align: center;

    ul {
      display: flex;
      font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;
      letter-spacing: 1px;
      list-style-type: none;
      margin: 0 auto;
      padding: 0;

      li {
        border: none;
        color: white;
        font-family: inherit;
        font-size: inherit;
        outline: none;
        padding: calc(0.5em + 4px) 1em 0.5em;
        position: relative;
        z-index: 1;

        &.active {
          border-bottom: 4px solid #fc2f70;
        }

        &::before {
          content: "";
          background-color: #fc2f70;
          bottom: 0;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          transform-origin: center bottom;
          transform: scaleY(0);
          transition: transform 0.25s ease-in-out;
          z-index: -1;
        }

        &:hover {
          cursor: pointer;
        }

        &:hover::before {
          transform-origin: center bottom;
          transform: scaleY(1);
        }
      }
    }
  }
}
</style>
