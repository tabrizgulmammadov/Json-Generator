<template>
  <div class="home" style="width:100%">
    <v-jsoneditor
      v-model="json"
      :options="options"
      :plus="false"
      height="80vh"
      style="width: 100%"
      @error="onError"
      @input="onJsonChanged"
    ></v-jsoneditor>
    <div class="my-2">
      <v-btn small color="success" @click="onSendJsonData">Generate Form</v-btn>
    </div>
  </div>
</template>
<script>
import VJsoneditor from "v-jsoneditor/src/index";

export default {
  name: "home",
  data() {
    return {
      json: {
        $schema: "http://json-schema.org/draft-04/schema#",
        title: "Product",
        description: "A product from Acme's catalog",
        type: "object",

        properties: {
          id: {
            description: "The unique identifier for a product",
            type: "integer"
          },

          name: {
            description: "Name of the product",
            type: "string"
          },

          price: {
            type: "number",
            minimum: 0,
            exclusiveMinimum: true
          }
        },

        required: ["id", "name", "price"]
      },
      options: {
        mode: "code",
        mainMenuBar: false,
        statusBar: true
      },
      formSchema: null
    };
  },
  components: {
    VJsoneditor
  },
  created() {
    this.json = JSON.parse(window.localStorage.getItem("fromSchema"));
  },
  methods: {
    onError(data) {
      window.console.log(data);
    },
    onJsonChanged(value) {
      this.formSchema = JSON.stringify(value);
    },
    onSendJsonData() {
      if (this.jsonData) {
        window.localStorage.setItem("fromSchema", this.jsonData);
      }
      this.$router.push({
        name: "about",
        params: { jsonData: this.formSchema }
      });
    }
  }
};
</script>
