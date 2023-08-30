<script setup lang="ts">
import { ref } from 'vue';

const iptValue = ref()
const selectValue = ref('mp3')
function openView() {
    if (iptValue.value) {
        window.electronAPI.openView(`https://www.bing.com/search?q=${iptValue.value}.${selectValue.value}`)
    }
}

const vAutoSelect = {
    mounted: (el: HTMLInputElement) => {
        el.onclick = () => {
            const inputDom = el.querySelector('input')
            if (inputDom) {
                inputDom.select()
            }
        }
    }
}
</script>
<template>
    <div class="searchView">
        <el-input type="text" v-auto-select v-model="iptValue" placeholder="输入歌曲名称" size="small" class="ipt"
            @keyup.enter="openView">
            <template #append>
                <el-select v-model="selectValue" placeholder="类型" style="width: 115px">
                    <el-option label="mp3" value="mp3" />
                    <el-option label="lrc" value="lrc" />
                </el-select>
            </template>
        </el-input>
        <el-button type="success" :style="{ 'margin-left': '.1rem' }" @click="openView">寻找资源</el-button>
    </div>
</template>
<style scoped>
.searchView {
    display: flex;
    margin: .5rem 0;
}

.ipt {
    width: 80%;
    margin-right: 1rem;
}
</style>