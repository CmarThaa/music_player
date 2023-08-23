import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/lyric',
            name: 'lyric',
            component: () => import('../layout/LyricsModal.vue')
        },
        {
            path: '/',
            name: 'Main',
            component: () => import('../layout/Main.vue')
        }
    ]
})

export default router
