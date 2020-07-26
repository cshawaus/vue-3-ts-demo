<template>
  <h1>Hello – {{ count }}</h1>
  <button @click.prevent="increment">
    Increment Count
  </button>
</template>

<script lang="ts" src="./App.ts"></script>
