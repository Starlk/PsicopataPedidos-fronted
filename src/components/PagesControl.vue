<template>
 <section class="container mt-3">
    <div class="row justify-content-end">
      <div class="col d-flex flex-row-reverse">
        <button
          class="btn btn-outline-success user__add--position"
          @click="$emit('openModal')"
        >
          Add
        </button>
      </div>
    </div>
    <div class="row justify-content-center align-items-start">
      <div class="col-12 mt-3">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

