<script setup lang="ts">
import MainHeader from '@/layout/MainHeader.vue'
import MusicList from './MusicList.vue';
import FileUploader from './FileUploader.vue';
import InPlay from './InPlay.vue';
import LyricsDetail from '../components/LyricsDetail.vue';
import WebSearchView from '@/components/WebSearchView.vue';
import { ref } from 'vue';
import OnlineNavPage from './OnlineNavPage.vue';
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    activeIndex.value = key
}
</script>

<template>
    <MainHeader></MainHeader>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">本地歌曲</el-menu-item>
        <el-menu-item index="2">线上榜单</el-menu-item>
    </el-menu>
    <div v-if="activeIndex === '1'" class="wrapper">
        <file-uploader :style="{ 'margin-bottom': '0.2rem', 'display': 'block' }"></file-uploader>
        <web-search-view></web-search-view>
        <music-list></music-list>
    </div>
    <div v-if="activeIndex === '2'" class="wrapper">
        <OnlineNavPage></OnlineNavPage>
    </div>
    <br />
    <in-play class="footer"></in-play>
    <LyricsDetail></LyricsDetail>
</template>

<style scoped>
.wrapper {
    height: calc(100vh - 10rem);
    padding: 1rem;
    overflow: auto;
}

.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
}
</style>
