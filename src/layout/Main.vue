<script setup lang="ts">
import MainHeader from '@/layout/MainHeader.vue'
import MusicList from './MusicList.vue';
import FileUploader from './FileUploader.vue';
import InPlay from './InPlay.vue';
import LyricsDetail from '../components/LyricsDetail.vue';
import WebSearchView from '@/components/WebSearchView.vue';

</script>

<template>
    <MainHeader></MainHeader>
    <div id="wrapper">
        <file-uploader :style="{ 'margin-bottom': '0.2rem', 'display': 'block' }"></file-uploader>
        <web-search-view></web-search-view>
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
