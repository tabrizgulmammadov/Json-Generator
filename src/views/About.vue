<template>
  <v-form
    ref="myForm"
    v-model="formValid"
    lazy-validation
    @submit.prevent="save"
    style="width: 50%"
  >
    <v-jsonschema-form
      v-if="schema"
      :schema="schema"
      v-model="model"
      :options="options"
      @error="showError"
      @change="showChange"
      @input="showInput"
    />
    <v-btn small color="success" type="submit">Subscribe</v-btn>
  </v-form>
</template>

<script>
import VJsonschemaForm from "@koumoul/vuetify-jsonschema-form";

export default {
  props: ["jsonData"],
  data: () => ({
    schema: {},
    model: {},
    formValid: true,
    options: {
      debug: true,
      disableAll: false,
      autoFoldObjects: true
    },
    result: {}
  }),
  mounted() {
    this.$refs.myForm.validate();
  },
  methods: {
    save() {
      window.console.log(this.result);
    },
    showError(err) {
      window.alert(err);
    },
    showChange(e) {
      window.console.log('"change" event', e);
      var key = e.key;
      window.console.log(key);
      this.result[key] = e.model;
    },
    showInput(e) {
      window.console.log('"input" event', e);
    }
  },
  components: { VJsonschemaForm },
  created() {
    if (this.jsonData != null) {
      this.schema = JSON.parse(this.jsonData);
      window.localStorage.setItem("fromSchema", this.jsonData);
    } else {
      this.schema = JSON.parse(window.localStorage.getItem("fromSchema"));
    }
  }
};
</script>