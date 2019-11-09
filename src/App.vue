<template>

    <v-app>
        <div>
            <v-toolbar dark
                       prominent
                       src="toolbar-image.png"
                       max-height="300"
            >
<!--                <v-app-bar-nav-icon></v-app-bar-nav-icon>-->

                <v-toolbar-title class="site-title">Image-convert.online</v-toolbar-title>

                <v-spacer></v-spacer>


                <div>
                    <router-link to="/" class="language">English</router-link>
                    <span>|</span>
                    <router-link to="/ru" class="language">Russian</router-link>
                </div>

            </v-toolbar>
        </div>

        <router-view/>
    </v-app>
</template>

<script>

    export default {
        name: 'App',

        components: {},

        data: () => ({
            //
        }),
    };
</script>


<style lang="less">
    .site-title {
        text-transform: uppercase;
        font-style: italic;
        font-weight: bold;
    }

    .language {
        color: #8f8f8f !important;
        margin: 0 15px;
        text-transform: uppercase;
        text-decoration: none;
        font-weight: bold;
    }

    .router-link-exact-active {
        color: white !important;
    }

    .text--primary {
        color: #4A148C !important;
    }

    .text--white {
        color: #fff !important;
    }

    .convertSettings {
        color: #fff !important;
        text-transform: uppercase;
        font-weight: bold;
    }

    .mt-1 {
        margin-top: 15px !important;
    }
</style>