<template>
    <v-footer dark padless>
        <v-card flat tile class="purple darken-3 white--text text-center">
            <v-card-text class="mt-3 mb-2">
                <div class="ya-share2" :data-services="getSocial()"></div>
            </v-card-text>

            <v-card-text class="white--text mb-5">
                {{ getText('footerText')}}
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text class="white--text purple darken-4">
                2019 - {{ new Date().getFullYear() }} | <strong>IMAGE-CONVERTER.ONLINE</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
    export default {
        name: "Footer-Application",
        data: () => ({
            icons: [
                'fab fa-facebook',
                'fab fa-twitter',
                'fab fa-google-plus',
                'fab fa-linkedin',
                'fab fa-instagram',
            ],
        }),
        methods: {
            getSocial(){
                let link = this.$route.name;
                let isEnglish = link === undefined || link === 'home';
                let text = 'telegram,facebook,whatsapp,twitter,linkedin,lj,skype';
                return isEnglish ? text : text + ',collections,vkontakte,odnoklassniki,moimir';
            },
            getText(text) {
                let link = this.$route.name;
                let isEnglish = link === undefined || link === 'home';
                let title = isEnglish ? text : text + 'Ru';
                return this.$t(title);
            },
        }
    }
</script>

<style scoped>

</style>