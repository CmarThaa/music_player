<script setup lang="ts">
import { usePlayerStore } from '../stores/player';
const playerStore = usePlayerStore()
function changeCircle() {
    playerStore.changeCircleType()
}
</script>
<template>
    <el-button class="CircleType" type="primary" @click="changeCircle">{{ playerStore.circleType }}</el-button>
</template>
<style scoped>
.CircleType {
    margin-left: .2rem;
}
</style>