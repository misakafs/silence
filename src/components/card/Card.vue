<template>
    <StickyNote :opt="{ milestone: opt.milestone?.title }">
        <div class="card">
            <h3>
                <a :href="opt.link" target="_blank">{{ opt.title }}</a>
            </h3>
            <p class="limit-3">{{ opt.html }}</p>
            <ul>
                <li v-for="(label, i) in opt.labels" :key="i" :style="{ color: label.color }">
                    <a target="_blank">{{ label.name }}</a>
                </li>
            </ul>
            <div class="meta">
                <!--                {{ td(opt.createdAt) }} ~ <a :href="opt.author?.url" target="_blank">{{ opt.author?.name }}</a>-->
                {{ td(opt.createdAt) }} ~ <a target="_blank">{{ opt.author?.name }}</a>
            </div>
        </div>
    </StickyNote>
</template>

<script lang="ts" setup>
import { onMounted, defineProps } from 'vue'
import type { Silence } from '../../config'
import StickyNote from '../sticky-note/StickyNote.vue'
import { useTimeDisplay } from '../../composables/time'

const { td } = useTimeDisplay()

const props = defineProps<{
    opt: Silence.IssueOption
}>()

onMounted(() => {})
</script>

<style lang="scss" scoped>
.card {
    padding: 1.5rem;
    box-sizing: border-box;
    letter-spacing: 1px;
    h3 {
        a {
            color: #000;
            font-weight: bolder;
        }
    }
    .limit-3 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    a {
        color: inherit;
        text-decoration: none;
    }
    p {
        margin: 0;
        color: #444;
        font-weight: 500;
    }
    ul {
        color: #666;
        font-size: 14px;
        margin: 0;
        padding: 0;
        margin-top: 0.5rem;
        list-style-type: none;
        li {
            position: relative;
            display: inline-block;
            margin: 0 10px;
            &:before {
                content: '#';
                position: absolute;
                left: -10px;
                top: 0;
            }
        }
    }
    .meta {
        margin-top: 0.5rem;
        color: #333;
        font-size: 16px;
        text-align: right;
        a {
            color: coral;
            text-decoration: underline;
            text-decoration-style: wavy;
        }
    }
}

@keyframes GradientAnimation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>
