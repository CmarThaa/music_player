<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useMusicListStore } from '../stores/musics';
import { storeToRefs } from 'pinia';
import { findIndexByCurrentTime, formatLyricsLrc } from '../utils/lyrics';
const musicStore = useMusicListStore()
const { isOpenLyrics, inPlaying } = storeToRefs(musicStore)
const nowDetailTxt = '暂无歌词'
const displayLyrics = ref(nowDetailTxt)

watch(inPlaying, async val => {
    if (val && val.lyricsPath) {
        if (!val.lyrics) {
            const res = await fetch(val.lyricsPath)
            const txt = await res.text()
            musicStore.setPlayingLyricsTxt(txt)
        }
        displayLyrics.value = val.lyrics || ''
        return
    }
    displayLyrics.value = nowDetailTxt
})

const displayDetail = computed(() => formatLyricsLrc(displayLyrics.value))

const curLineIdx = ref(0)

const autoPlayTop = computed(() => {
    const cur = inPlaying.value?.currentTime || 0 // 秒数 number
    curLineIdx.value = findIndexByCurrentTime(displayDetail.value, cur)
    if (!lineWrapperRef.value) { return 0 }
    const h = lineWrapperRef.value.offsetHeight
    const sh = h / (displayDetail.value).length
    return -sh * curLineIdx.value
})

const lineWrapperRef = ref<HTMLElement>()

const oneMoveDiff = ref(0)
const lastMouseTop = ref(40)
const wrapTop = computed(() => lastMouseTop.value + oneMoveDiff.value + autoPlayTop.value)
const isMouseMove = ref(false)
const isMouseDown = ref(false)
const mouseDownY = ref(0)

function onMouseDown(event: MouseEvent) {
    mouseDownY.value = (event as any).pageY
    isMouseDown.value = true
}
function onMousemove(event: Event) {
    if (isMouseDown.value) {
        isMouseMove.value = true
        const nowY = (event as any).pageY
        const diff = nowY - mouseDownY.value
        oneMoveDiff.value = diff
    }
}

function onMouseup(event: Event) {
    isMouseDown.value = false
    isMouseMove.value = false
    lastMouseTop.value += oneMoveDiff.value
    oneMoveDiff.value = 0
}

</script>
<template>
    <el-drawer v-model="isOpenLyrics" size="50%" :title="inPlaying?.name" @mouseup="onMouseup" direction="ttb">
        <div class="wrapper" @mousedown="onMouseDown" @mousemove="onMousemove">
            <div class="lineWrapper" ref="lineWrapperRef" :style="{ 'margin-top': wrapTop + 'px' }">
                <div class="line" :class="curLineIdx === idx ? 'current' : ''" v-for="(item, idx) in displayDetail">{{
                    item.line
                }}</div>
            </div>
            <div class="crossLine" v-show="isMouseMove"></div>
        </div>
    </el-drawer>
</template>
<style scoped>
.line.current {
    color: rgb(154, 103, 103);
    font-size: 2rem;
}

.crossLine {
    height: .2rem;
    background: rgba(0, 0, 0, .2);
    position: absolute;
    top: 50%;
    width: 100%;
    left: 0;
}

.wrapper {
    cursor: grab;
    height: 100%;
    overflow: hidden;
    position: relative;
    user-select: none;
    -webkit-user-select: none;
}
</style>