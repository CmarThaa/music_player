<script setup lang="ts">
import { useSettingStore } from '../stores/setting';
import { storeToRefs } from 'pinia';
const settingStore = useSettingStore()
const { lyricModalSetting } = storeToRefs(settingStore)
function onClose() {
    window.electronAPI?.closeAll()
}

</script>
<template>
    <header id="main-header">
        <span class="app-dragable"></span>
        <el-dropdown trigger="click">
            <span class="white-btn">
                <el-icon>
                    <Operation />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>
                        <el-switch v-model="lyricModalSetting" active-text="打开桌面歌词" inactive-text="关闭桌面歌词"
                            inline-prompt></el-switch>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <span class="white-btn" @click="onClose">
            <el-icon>
                <Close />
            </el-icon>
        </span>
    </header>
</template>
<style scoped>
.white-btn {
    flex: 0;
    font-size: 1.5rem;
    cursor: pointer;
    color: rgb(253, 252, 252);
    margin: .35rem .3rem 0 0;
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