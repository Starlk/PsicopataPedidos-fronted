<template>
  <div class="_modal" @click="handleClick">
    <section class="_modal__background" @click="e=>e.stopPropagation()">
      <header class="_modal__header">
        <h1 class="_modal__title _modal__header--horizontal">{{ title }}</h1>
        <button
          class="_modal__header--horizontal btn btn-outline-danger"
          @click="handleClick"
        >   
          x
        </button>
      </header>
      <article class="_modal__body">
        <slot></slot>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    btnName: String,

  },
  methods: {
    handleClick() {
      this.$emit("closeModel");
    },
  },
};
</script>

<style>
._modal {
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
._modal__background {
  background-color: white;
  border-radius: 10px;
}
._modal__header {
  width: 100%;
  margin-top: 0;
  display: flex;
  justify-content: space-between;
  background-color: rgb(235, 230, 230);
  box-shadow: 2px 3px 6px 7px rgba(0, 0, 0, 0.19);
  margin-bottom: 0.5em;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  padding: 0.4em;
}

._modal__title {
  font-size: 1.4rem;
}

._modal__header--horizontal {
  margin-left: 0.5em;
  margin-right: 0.5em;
}
._modal__btnCerrar {
  background-color: #f32424;
  border: none;
  color: white;
  border-radius: 5px;
  box-shadow: 2px 3px 6px 2px rgba(0, 0, 0, 0.19);
  padding: 2px 10px;
}

._modal__body {
  padding: 0.5em 4em;
}
</style>
