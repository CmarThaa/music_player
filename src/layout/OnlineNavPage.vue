<script setup lang="ts">
import { ref } from 'vue';
import { OpenView } from '../utils/shared';
const wy_url = ref('https://music.163.com/#/discover/toplist?id=3778678')
const QQ_url = ref('https://y.qq.com/n/ryqq/toplist/26')
const Kugou_url = ref('https://www.kugou.com/yy/html/rank.html')
const openView = (val: string) => OpenView(val)
</script>
<template>
    <section class="board" @click="openView(wy_url)">网易云热歌榜</section>
    <section class="board" @click="openView(QQ_url)">QQ音乐榜</section>
    <section class="board" @click="openView(Kugou_url)">酷狗音乐榜</section>
</template>
<style scoped>
.board {
    cursor: pointer;
    height: 5rem;
    border: 1px dashed #ccc;
    line-height: 3rem;
    margin: .5rem 0;
    padding: .5rem;
}

.board:hover {
    border: 2px solid rgb(214, 177, 248);
}
</style>