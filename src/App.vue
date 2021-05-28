<template>
    <div class="search">
        <input type="search" size="30" placeholder="Search" autocomplete="off" v-model="keyword" :disabled="isloading" @keyup.enter="search" />
    </div>
    <main>
        <Card v-for="(v, i) in list" :key="i" :opt="v" />
    </main>
    <div class="loading">
        <Loading :isloading="isloading"></Loading>
    </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, watch } from 'vue'
import Card from './components/card/Card.vue'
import Loading from './components/loading/Loading.vue'
import { useScroll } from './composables/scroll'
import type { Silence } from './config'
import query from './http'

// 搜索框变量
const keyword = ref('')
const list = ref<any>([])
const page = ref<Silence.NextPage | null | undefined>(null)
const isloading = ref(true)

const loadData = async () => {
    if (isloading.value) {
        return
    }
    isloading.value = true
    if (!page.value?.hasNext) {
        isloading.value = false
        return
    }
    const data = await query(keyword.value, page.value.after)
    let items = data?.items
    if (items?.length) {
        list.value = [...list.value, ...items]
    }
    page.value = data?.nextPage
    isloading.value = false
}

const search = () => {
    page.value = { after: null, hasNext: true }
    list.value = []
    loadData()
}

useScroll(loadData)

onBeforeMount(() => {
    search()
})
</script>

<style scoped lang="scss">
.search {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 3rem 0;
    input {
        box-sizing: border-box;
        width: 80%;
        max-width: 600px;
        outline: none;
        border: 1px solid rgba($color: #333, $alpha: 0.1);

        padding: 13px 20px;
        border-radius: 30px;
        color: rgba(0, 0, 0, 0.8);
        font-size: small;
        font-weight: normal;
        font-family: 'Microsoft Yahei', sans-serif;
        text-align: center;
        transition: 0.3s;
        letter-spacing: 2px;
    }
}
main {
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-gap: 3vmin;
    place-content: center center;
    grid-template-columns: repeat(auto-fill, 320px);
}
.loading {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
