<template>
  <button class="btn btn-outline-danger" @click="$emit('Click')">
    <slot></slot>
  </button>
</template>


