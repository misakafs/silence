<template>
    <article :style="style">
        <slot></slot>
    </article>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type { Silence } from '../../config'

const props = defineProps<{
    opt: Silence.StickyNoteOption
}>()

const style = {
    '--milestone': `"${props.opt.milestone}"`
}
</script>

<style scoped lang="scss">
article {
    --milestone: '';
    position: relative;
    width: 100%;
    //height: 260px;
    background: rgba(#fff, 0.9);
    //background: rgba(#a29bfe, 0.4);
    //background: rgba(#12cbc4, 0.7);
    //background: rgba(#b9887d, 0.4);
    //background: rgba(#a29bfe, 0.3);
    //background-size: 30px 30px, 30px 30px;
    // background-image: linear-gradient(90deg, transparent 79px, #74b9ff 79px, #74b9ff 81px, transparent 81px), linear-gradient(#eee 0.05em, transparent 0.05em);
    border-radius: 10px;

    box-shadow: inset -2px 1px 20px 3px rgba(#e6eae4, 0.6);

    // transform: rotate(358deg);
    overflow: hidden;

    font-family: 'SILENCE';
    letter-spacing: 2px;
    line-height: 1.7;
    font-size: 18px;
    &:before {
        content: var(--milestone);
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgba(#9b59b6, 0.7);
        //height: 15%;
        width: 40%;
        transform: rotate(40deg);
        background: rgba(#9b59b6, 0.2);
        clip-path: polygon(2% 0, 0 11%, 0 92%, 1% 100%, 100% 100%, 94% 84%, 97% 79%, 99% 65%, 94% 57%, 97% 50%, 99% 37%, 91% 28%, 96% 24%, 99% 15%, 91% 12%, 100% 0);
    }
    &:before {
        top: 5%;
        right: -12.5%;
    }
}
</style>
