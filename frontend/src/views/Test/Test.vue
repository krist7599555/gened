<template lang="pug">
  div
    c1
</template>

<script>
import c2 from "./C2.vue";
import c3 from "./C3.vue";

function resolveAfter(val, ms) {
  return new Promise((res, rej) => {
    setTimeout(() => res(val), ms);
  });
}

export default {
  components: {
    c1: () => ({
      loading: c2,
      error: c3,
      component: resolveAfter(import("./C1.vue"), 1000),
      delay: 8,
      timeout: 10000
    })
  }
};
</script>
