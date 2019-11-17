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

        <router-view />
        <footer-application></footer-application>

    </v-app>
</template>

<script>

    import FooterApplication from "./components/Footer-Application";
    export default {
        name: 'App',
        components: {FooterApplication},
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

    .text-primary {
        color: #4A148C !important;
    }

    .text-white {
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

    .previewText{
        font-size: 20px;
    }
    .block{
        width: 100%
    }
    .text-italic{
        font-style: italic;
    }
    .text-bold{
        font-weight: bold;
    }
    h1{
        color: #4A148C !important;
        font-size: 38px;
        margin: 25px 0;
    }
    h6{
        text-transform: uppercase;
        font-size: 24px;
        color: #4a148c;
        text-align: center;
        font-style: italic;
        margin-bottom: 15px;
    }

    .supportText{
        font-style: italic;
        text-align: center;
        color: #6a1b99;
    }
    .previewText{
        font-weight: bold;
        font-size: 20px;
    }

    .previewSupportFormat{
        font-style: italic;
        margin-top: 50px;
        color: #4a148c;
        font-weight: bold;
        text-transform: uppercase;
    }
</style>