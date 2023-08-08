<script setup lang="ts">
function onClose() {
    console.log(2222);

    window.electronAPI.closeAll()
}
</script>
<template>
    <header id="main-header">
        <span class="app-dragable"></span>
        <span class="close" @click="onClose"> x </span>
    </header>
</template>
<style scoped>
.close {
    font-size: 1.5rem;
    margin: 0 .5rem 0.2rem 0;
    cursor: pointer;
    flex: 0;
    transform: scaleX(1.3);
    color: rgb(253, 252, 252);
}

.app-dragable {
    flex: 1;
    height: 100%;
}

#main-header {
    height: 2rem;
    background-color: #606060;
    display: flex;
    align-items: center;
    justify-content: end;
}
</style>