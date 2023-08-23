<script setup lang="ts">
function onClose() {
    window.electronAPI?.closeLyricModal()
}

</script>
<template>
    <section class="app-dragable">
        <span class="btn" @click="onClose">
            <el-icon>
                <Close />
            </el-icon>
        </span>
    </section>
</template>
<style scoped>
.btn {
    position: absolute;
    cursor: pointer;
    font-size: 2rem;
    right: 0.2rem;
    top: 0;
}
</style>