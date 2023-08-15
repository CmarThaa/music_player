<script setup lang="ts">
import MainHeader from '@/layout/MainHeader.vue'
import MusicList from './layout/MusicList.vue';
import FileUploader from './layout/FileUploader.vue';
import InPlay from './layout/InPlay.vue';
import LyricsDetail from './components/LyricsDetail.vue';

</script>

<template>
    <MainHeader></MainHeader>
    <div id="wrapper">
        <file-uploader></file-uploader>
        <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
        <!-- <button @click="ipcMessage">ipc message btn</button> -->
        <!-- <RouterView /> -->
        <music-list></music-list>
    </div>
    <br />
    <in-play class="footer"></in-play>

    <LyricsDetail></LyricsDetail>
</template>

<style scoped>
#wrapper {
    height: calc(100vh - 7rem);
    padding: 1rem;
    overflow: auto;
}

.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
}
</style>
