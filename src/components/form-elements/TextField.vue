<template>
  <v-text-field
    v-model="data.value"
    :label="data.label"
    :placeholder="data.placeholder"
    :disabled="data.disabled"
    :maxlength="data.maxlength"
    :hint="data.hint"
    v-mask="data.mask"
    :rules="validationGenerator"
    :prepend-inner-icon="data.icon"
    :outlined="data.style.includes('outlined') ? true : false"
    :solo="data.style.includes('solo') ? true : false"
    :filled="data.style.includes('filled') ? true : false"
    :shaped="data.style.includes('shaped') ? true : false"
    :rounded="data.style.includes('rounded') ? true : false"
    :single-line="data.style.includes('single-line') ? true : false"
    :clearable="data.style.includes('clearable') ? true : false"
    :persistent-hint="data.style.includes('persistent-hint') ? true : false"
    :loading="data.style.includes('loading') ? true : false"
    :flat="data.style.includes('flat') ? true : false"
    :counter="data.style.includes('counter') ? true : false"
    color="secondary"
  ></v-text-field>
</template>

<script>
import {mask} from 'vue-the-mask';
export default {
  directives: {
    mask: {
      ...mask
    }
  },
  props: ["jsonData"],
  data() {
    return {
      data: {},
      minLength: 0,
      minLengthErrorMessage: "",
      maxLength: 0,
      maxLengthErrorMessage: "",
      isRequired: false,
      requiredErrorMessage: "",
      regex: "",
      regexErrorMessage: "",
      rules: []
    };
  },
  computed: {
    validationGenerator() {
      return this.rules;
    }
  },
  methods: {
    getRules(validations) {
      if (validations.required && validations.required.value) {
        let exp = v => !!v || validations.required.errorMessage;
        this.rules.push(exp);
        console.log(this.rules);
      }
    }
  },
  created() {
    //assign props jsonData to data
    this.data = this.jsonData;

    //get needed values for rules
    var validations = this.data.validations;
    window.console.log(validations);

    this.getRules(validations);

    // if (validations.minLength) {
    //   this.minLength = validations.minLength.value;
    //   this.minLengthErrorMessage = validations.minLength.errorMessage;
    // }

    // if (validations.maxLength) {
    //   this.maxLength = validations.maxLength.value;
    //   this.maxLengthErrorMessage = validations.maxLength.errorMessage;
    // }

    // if (validations.regex) {
    //   this.regex = validations.regex.value;
    //   this.regexErrorMessage = validations.regex.errorMessage;
    // }

    // if (validations.required) {
    //   this.isRequired = validations.required.value;
    //   this.requiredErrorMessage = validations.required.errorMessage;
    // }
  }
};
</script>
