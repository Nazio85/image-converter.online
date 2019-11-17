import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'


Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        light: true,
        options: {
            // customProperties: true,
        },
        themes: {
            light: {

                primary: colors.purple.darken4,
                secondary: colors.purple.darken1,
                accent: '#8E24AA',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107'
            },
            dark: {
                primary: colors.purple.darken4,
                secondary: '#424242',
                accent: '#8E24AA',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107'
            },
        },
    },
});
