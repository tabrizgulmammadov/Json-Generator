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
      <v-btn small color="success" @click="onSendJsonData">Generate Form Automatic</v-btn>
    </div>
    <div class="my-2">
      <v-btn small color="primary" @click="onPassJsonData">Generate Form Manually</v-btn>
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
        title: "Title of the form",
        description: "Description of this form goes here",
        type: "server.side.models.ModelClassName",
        layout: "horizontal",
        items: [
          {
            name: "firstName",
            type: "text",
            style: "outlined",
            editor: "SingleLineText",
            label: "First Name",
            placeholder: "Please enter your first name",
            maxlength: 15,
            width: "col-md-6 col-lg-1",
            disabled: false,
            mask: "###.###.###-##",
            validations: {
              required: {
                value: true,
                errorMessage: "First name is required"
              },
              minLength: {
                value: 3,
                errorMessage:
                  "First name must be at least three lines in length"
              },
              maxLength: {
                value: 15,
                errorMessage:
                  "Maximum allowed length for the first name is 15 characters"
              },
              regex: {
                value: "[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]",
                errorMessage:
                  "The value you enteres doesn't match the predefined pattern"
              }
            }
          },
          {
            title: "Title of the group",
            name: "address",
            type: "container",
            layout: "vertical",
            items: {}
          }
        ]
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
    if (window.localStorage.getItem("fromSchema")) {
      this.json = JSON.parse(window.localStorage.getItem("fromSchema"));
    }
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
    },
    onPassJsonData() {
      if (this.jsonData) {
        window.localStorage.setItem("fromSchema", this.jsonData);
      }
      this.$router.push({
        name: "formGenerator",
        params: { json: JSON.stringify(this.json) }
      });
    }
  }
};
</script>
