<template>
  <div class="formGenerator" style="width:100%;">
    <h2>{{this.jsonData.title}}</h2>
    <v-subheader>{{this.jsonData.description}}</v-subheader>
    <v-form v-model="valid" v-show="this.jsonData.layout == 'horizontal'">
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" v-for="(item, index) in jsonData.items" :key="index">
            <v-text-field
              v-show="item.editor == 'SingleLineText'"
              v-model="item.value"
              :label="item.label"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
              :mask="item.mask"
              :rules="[
              () => !!item.value || 'This field is required',
              () => !!address && address.length <= 25 || 'Address must be less than 25 characters',
              addressCheck
            ]"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import router from "../router";
export default {
  data() {
    return {
      jsonData: {},
      valid: false
    };
  },
  created() {
    this.jsonData = JSON.parse(this.$route.params.json);
    console.log(this.jsonData);
  }
};
</script>
