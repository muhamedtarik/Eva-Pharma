<template>
    <v-app >
        <v-main :key="$route.fullPath">
            <navbar />
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
    name: "App",


    components: {
        Navbar,
    },

};
</script>

<style lang="scss">
    .grid-view{
        box-shadow: unset !important;
        padding: 0px 50px !important;
        @media (max-width: 767px) {
            padding:0px 20px !important;
         }
    }
</style>
