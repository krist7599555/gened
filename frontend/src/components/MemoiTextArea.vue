<template lang="pug">
  div
    textarea.textarea.is-size-7(v-model='text' aria-labelledby='memoiText')
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import * as firebase from "firebase/app";
import "firebase/database";

var config = {
  apiKey: "AIzaSyBrV-an-AOg5xjb6nmh68Eu5LboNv6efKE",
  authDomain: "gened-ded0f.firebaseapp.com",
  databaseURL: "https://gened-ded0f.firebaseio.com",
  projectId: "gened-ded0f",
  storageBucket: "gened-ded0f.appspot.com",
  messagingSenderId: "424362805330"
};
firebase.initializeApp(config);
var database = firebase.database();

var textref = database.ref("/textarea");

export default Vue.extend({
  data() {
    return {
      text: ""
    };
  },
  created() {
    textref.on("value", snp => {
      this.text = snp ? snp.val().text : this.text;
    });
  },
  watch: {
    text(newVal) {
      textref.update({ text: newVal });
    }
  }
});
</script>
