<template>
  <section class="title">
    <h1>{{ title }}</h1>
    <p>{{ paragraph }}</p>
  </section>
</template>

<script>
export default {
  name: 'Title',
  props: {
    title: String,
    paragraph: String,
  },
};
</script>
