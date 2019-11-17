<template>
    <v-container fluid>
        <v-row align="center" justify="center">
            <v-col lg="11" sm="12" offset-lg="1" class="mt-5">
                <v-row align="center" justify="start">
                    <v-col lg="8" sm="12" md="9">
                        <h1>{{getText('previewHeader')}}</h1>
                        <p class="previewText">
                            {{getText('previewText')}}
                        </p>
                        <p class="previewSupportFormat">{{getText('previewSupportFormat')}}</p>
                    </v-col>
                    <v-col md="3" class="d-none d-md-flex">
                        <v-img src="rhombus.png" lazy-src="rhombus.png"></v-img>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row align="start" justify="start">
            <v-col md="8" lg="7" offset-lg="1" sm="12">
                <v-card class="mx-auto pa-5" min-height="500">
                    <h2 class="text-center text-uppercase text-primary my-3">Add yor images to convert</h2>
                    <v-file-input prepend-icon="mdi-camera" class="mt-1"
                                  :small-chips="files.length < 10"
                                  accept="image/png, image/jpeg, image/bmp, image/webp"
                                  multiple
                                  counter
                                  show-size
                                  v-model="files"
                                  label="Images"></v-file-input>

                    <item-request :convert-type="getFormat"
                                  :isWebp="isWebp"
                                  :files="files"
                                  :resize="resize"
                                  :quality="quality"></item-request>
                </v-card>
            </v-col>

            <v-col md="4" lg="3" sm="12">
                <v-card class="mx-auto" min-height="300">
                    <v-img class=" align-end"
                           height="60px"
                           gradient="0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 50%"
                           src="https://i.pinimg.com/originals/e0/00/43/e00043e8e45186d7dddbf54c90b0c58a.jpg"
                    >
                        <v-card-title class="convertSettings">{{ $t('convertSettings') }}</v-card-title>
                    </v-img>
                    <v-select
                            background-color="#fff"
                            class="mt-3 mx-5"
                            :items="imageFormatType"
                            v-model="imageFormatChanged"
                            filled
                            label="Image format"
                    ></v-select>

                    <v-slider
                            class="mt-3 mx-5"
                            label="Quality"
                            v-model="quality"
                            thumb-label="always"
                    ></v-slider>

                    <v-switch class="mx-5"
                              v-model="resize.isResize" label="Resize image"></v-switch>
                    <v-switch v-if="resize.isResize" class="mx-5 mt-1"
                              @change="clearSize()"
                              v-model="resize.isProportional" label="Proportional"></v-switch>

                    <v-row class="px-5">
                        <v-col sm="6" v-if="resize.isResize">
                            <v-text-field
                                    @change="widthChanged()"
                                    v-model="resize.width"
                                    label="Width"
                                    outlined
                                    type="number"
                            ></v-text-field>
                        </v-col>

                        <v-col sm="6" v-if="resize.isResize">
                            <v-text-field
                                    @change="heightChanged()"
                                    v-model="resize.height"
                                    label="Height"
                                    outlined
                                    type="number"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <div>
                        <!-- 300*250 Advertur.ru start -->
                        <div id="advertur_103225"></div>
                        <!-- 300*250 Advertur.ru end -->
                    </div>
                </v-card>
            </v-col>

        </v-row>

        <donate></donate>

    </v-container>
</template>

<script>

    import ItemRequest from "../components/ItemRequest";
    import Donate from "../components/Donate";

    export default {
        name: 'home',
        components: {Donate, ItemRequest},
        data: () => ({
            files: [],
            imageFormatChanged: 'JPG',
            imageFormatType: ['JPG', 'PNG', 'WEBP', 'BMP'],
            isWebp: false,
            quality: 10,
            resize: {isResize: false, width: "", height: "", isProportional: true}
        }),

        computed: {
            getFormat() {
                if (this.imageFormatChanged === 'JPG') {
                    return 'image/jpeg'
                }
                return 'image/' + this.imageFormatChanged.toLowerCase()
            },
        },

        watch: {

            imageFormatChanged() {
                this.checkIsWebp();
            },
            files() {
                this.checkIsWebp();
            }
        },

        methods: {
            getText(text) {
                let link = this.$route.name;
                let isEnglish = link === undefined || link === 'home';
                let title = isEnglish ? text : text + 'Ru';
                return this.$t(title);
            },
            checkIsWebp() {
                if (this.imageFormatChanged === 'WEBP') {
                    this.isWebp = true;
                } else {
                    let result = false;
                    for (const file of this.files) {
                        if (file.type === 'image/webp') {
                            result = true;
                            break;
                        }
                    }
                    this.isWebp = result;
                }
            },
            widthChanged() {
                if (this.resize.isProportional) {
                    this.resize.height = "";
                }
            },
            heightChanged() {
                if (this.resize.isProportional) {
                    this.resize.width = "";
                }
            },
            clearSize() {
                this.resize.width = "";
                this.resize.height = "";
            }
        }
    }


</script>

<style>

</style>
