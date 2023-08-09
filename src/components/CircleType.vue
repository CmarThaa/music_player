<script setup lang="ts">
import { usePlayerStore } from '../stores/player';
const playerStore = usePlayerStore()
function changeCircle() {
    playerStore.changeCircleType()
}
</script>
<template>
    <button @click="changeCircle">{{ playerStore.circleType }}</button>
</template>
<style scoped></style>