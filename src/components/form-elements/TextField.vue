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
export default {
  props: ["jsonData"],
  data() {
    return {
      data: {},
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
        let req = v => !!v || validations.required.errorMessage;
        this.rules.push(req);
        console.log(this.rules);
      }
      if (validations.minLength && validations.minLength.value > 0) {
        let min = v => v.length < validations.minLength.value || validations.minLength.errorMessage;
        console.log(min);
        this.rules.push(min);
        console.log(this.rules);
      }
      if (validations.maxLength && validations.maxLength.value > 0) {
        let max = v => v.length > validations.maxLength.value || validations.maxLength.errorMessage;
        console.log(max);
        this.rules.push(max);
        console.log(this.rules);
      }
      if (
        validations.regex &&
        validations.regex.value != "" &&
        validations.regex.value != null
      ) {
        let regx = v => {
          const pattern = validations.regex.value;
          return pattern.test(v) || validations.regex.errorMessage;
        };
        console.log(regx);
        this.rules.push(regx);
        console.log(this.rules);
      }
    }
  },
  created() {
    //assign props jsonData to data
    this.data = this.jsonData;

    //get needed values for rules
    var validations = this.data.validations;
    this.getRules(validations);
  }
};
</script>
