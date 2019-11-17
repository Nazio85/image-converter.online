<template>
    <v-row align="center" justify="start" v-if="isRussian()">
        <v-col sm="12" lg="10" offset-lg="1">
            <v-card class="mx-auto pa-4">
                <!--                    <iframe src="https://money.yandex.ru/quickpay/shop-widget?writer=seller&targets=%D0%9F%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%B0%D1%82%D1%8C%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%2C%20%D0%BC%D1%8B%20%D1%80%D0%B0%D0%B4%D1%8B%20%D0%BB%D1%8E%D0%B1%D0%BE%D0%B9%20%D1%81%D1%83%D0%BC%D0%BC%D0%B5&targets-hint=&default-sum=50&button-text=13&payment-type-choice=on&mobile-payment-type-choice=on&hint=&successURL=&quickpay=shop&account=410012422107208"-->
                <!--                            width="100%" height="250" frameborder="0" allowtransparency="true" scrolling="no"></iframe>-->

                <h6>Любая Ваша помощь бесцена! Вы можете поддержать проект!</h6>
                <p class="supportText">Проект существует исключительно на пожертвованиях и рекламе, поэтому мы будем
                    рады <b>любой сумме</b> если вы решите нас поддержать, заранее спасибо!</p>
                <form method="POST" action="https://money.yandex.ru/quickpay/confirm.xml">
                    <input type="hidden" name="receiver" value="410012422107208">
                    <input type="hidden" name="quickpay-form" value="donate">
                    <input type="hidden" name="targets" value="IMAGE-CONVERTER.ONLINE">
                    <v-row align="center" justify="center">
                        <v-col xl="3" offset-xl="1" lg="3" md="12">
                            <v-text-field type="number" name="sum" v-model="donate" data-type="number" label="Сумма"></v-text-field>
                        </v-col>
                        <v-col xl="6" offset-xl="2" lg="8" offset-lg="1" md="12">
                            <v-radio-group v-model="donateType" row name="paymentType">
                                <v-radio label="Банковской картой" value="AC"></v-radio>
                                <v-radio label="Яндекс.Деньгами" value="PC"></v-radio>
                                <v-radio label="C баланса мобильного" value="MC"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                    <v-btn color="primary" block type="submit" target="_blank">Помочь проекту</v-btn>
                </form>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "Donate",
        data: () => ({
            donate: 50,
            donateType: 'AC',
        }),
        methods: {
            isRussian(){
                let link = this.$route.name;
                return  link === 'ru';
            },
        }
    }
</script>

<style scoped>

</style>