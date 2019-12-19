<template>
  <footer>
    <div>
      XML <span
        v-for="(item, index) in itemsXML"
        :key="index"
      >
        - {{item.YEAR._text}}
      </span>
    </div>
    <p>Copyright &copy; 2019</p>
  </footer>
</template>

<script>
import axios from 'axios';
import convert from 'xml-js';

export default {
  name: "PageFooter",
  data() {
    return {
      itemsXML: []
    }
  },
  created() {
    this.getXML();
  },
  methods: {
    getXML() {
      axios
        .get('//www.mocky.io/v2/5dfa935d2f00007400ff9a5e')
        .then(this.handleXMLResponse);
    },
    handleXMLResponse(resp) {
      const convertedData = convert.xml2js(resp.data, { compact: true });
      const itemsXML = convertedData.CATALOG.CD.filter((el, index) => index < 5);
      this.$set(this, 'itemsXML', itemsXML);
    }
  }
};
</script>

<style lang="scss" scoped>
footer {
  background-color: hsl(236, 32%, 26%);
  color: #ffffff;
  margin-top: 20px;
  padding: 50px 0;
  text-align: center;
  width: 100%;
}
</style>
