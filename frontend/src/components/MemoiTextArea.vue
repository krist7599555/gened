<template lang="pug">
  div
    textarea.textarea.is-size-7(v-model='text')
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import firebase from "firebase";

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

// import { database } from "firebase";
var textref = database.ref("/textarea");

export default Vue.extend({
  // props: {
  //   key: {
  //     type: String,
  //     require: true
  //   }
  // },
  data() {
    // const response = await axios.get(
    //   "http://128.199.216.159:3124/memoitext?key=" + this.key
    // );
    return {
      text: ""
    };
  },
  created() {
    textref.on("value", snp => {
      this.text = snp ? snp.val().text : this.text;
      console.log("recieve", this.text);
    });
  },
  watch: {
    text(newVal) {
      console.log("update", newVal);
      textref.update({ text: newVal });
    }
  }
});
</script>
