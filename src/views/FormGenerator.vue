<template>
  <div class="formGenerator" style="width:100%;">
    <h2>{{this.jsonData.title}}</h2>
    <v-subheader>{{this.jsonData.description}}</v-subheader>
    <v-form v-model="valid" lazy-validation v-show="this.jsonData.layout == 'horizontal'">
      <v-row>
        <v-col v-for="(item, index) in jsonData.items" :key="index" :class="item.width">
          <text-field :jsonData="item" v-if="item.editor == 'SingleLineText'"></text-field>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import router from "../router";
import TextField from "../components/form-elements/TextField";

export default {
  components: {
    TextField
  },
  data() {
    return {
      jsonData: {},
      valid: false
    };
  },
  created() {
    this.jsonData = JSON.parse(this.$route.params.json);
  }
};
</script>
