<template>
    <v-container fluid>
        <v-row align="center" justify="center">

            <v-col lg="11" sm="12" offset-lg="1" class="mt-5">
                <v-row align="center" justify="start">
                    <v-col lg="8">
                        <h1 class="text--primary">Simple package convert images without limits</h1>
                        <p>
                            Использование th:text и многоязычность текста. Многоязычный текст представлен вне файлов
                            шаблонов и хранится в отдельных файлах (обычно в файлах .properties) и его можно легко
                            заменить
                            эквивалентными текстами, написанными
                        </p>
                    </v-col>
                    <v-col lg="3">
                        <v-img src="rhombus.png"
                               lazy-src="rhombus.png"></v-img>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row align="center" justify="start">
            <v-col lg="3" sm="12" offset-lg="1">
                <v-card class="mx-auto"
                        height="600"
                >
                    <v-img class=" align-end"
                           height="60px"
                           gradient="0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 50%"
                           src="https://i.pinimg.com/originals/e0/00/43/e00043e8e45186d7dddbf54c90b0c58a.jpg"
                    >
                        <v-card-title class="convertSettings">{{ $t('convertSettings') }}</v-card-title>
                    </v-img>
                    <v-select
                            background-color="#fff"
                            class="mt-1"
                            :items="imageFormatType"
                            filled
                            label="Image format"
                    ></v-select>
                </v-card>
            </v-col>
            <v-col lg="7" sm="12">
                <v-card class="mx-auto pa-3" height="600">
                    <v-file-input prepend-icon="mdi-camera"
                                  :small-chips="files.length < 10"
                                  multiple
                                  counter
                                  show-size
                                  v-model="files"
                                  label="Images"></v-file-input>
                    <v-btn text small @click="test2">Normal</v-btn>
                </v-card>

                <v-card v-for="file in files"
                        class="mx-auto"
                        max-width="400"
                >
                    <v-img
                            class="white--text align-end"
                            height="200px"
                            :src="file"
                    >
                    </v-img>
                    <v-card-title>Top 10 Australian beaches</v-card-title>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

    export default {
        name: 'home',
        components: {},
        data: () => ({
            imageFormatChanged: '',
            imageFormatType: ['jpg', 'jpeg', 'png', 'webp'],
            disabled: false,
            openDelay: '0',
            closeDelay: '0',
            value: false,

            files: [],
            filesResponse: [],
            isConverting: false,
        }),

        methods: {
            test() {
                // const config = {headers: {'Content-Type': 'multipart/form-data'}};
                // let formData = new FormData();
                // for (let i = 0; i < this.files.length; i++) {
                //   let file = this.files[i];
                //   formData.append('files', file, file.name);
                // }
                // axios.post('/api/', formData, config)
                //         .then(value => console.log(value.data));
            },
            test2() {
                var img = new Image;
                console.error(img);
                img.onload = convert;
                img.src = URL.createObjectURL(this.files[0]);
            },
            save() {

            },
            // convert() {
            //     console.log(this)
            //     URL.revokeObjectURL(this.src);             // free up memory
            //     var c = document.createElement("canvas"),  // create a temp. canvas
            //         ctx = c.getContext("2d");
            //     c.width = this.width;                      // set size = image, draw
            //     c.height = this.height;
            //     ctx.drawImage(this, 0, 0);
            //
            //     // convert to File object, NOTE: we're using binary mime-type for the final Blob/File
            //     c.toBlob(create, "image/png", 0.75);  // mime=JPEG, quality=0.75
            // },
            // create(blob) {
            //     let file = new File([blob], "MyJPEG.png", {type: "application/octet-stream"});
            //     window.location = URL.createObjectURL(file);
            // }

        }
    }

    function convert() {
        console.log(this)
        URL.revokeObjectURL(this.src);             // free up memory
        var c = document.createElement("canvas"),  // create a temp. canvas
            ctx = c.getContext("2d");
        c.width = this.width;                      // set size = image, draw
        c.height = this.height;
        ctx.drawImage(this, 0, 0);

        // convert to File object, NOTE: we're using binary mime-type for the final Blob/File
        c.toBlob(create, "image/png", 0.75);  // mime=JPEG, quality=0.75
    }

    function create(blob) {
        let file = new File([blob], "MyJPEG.png", {type: "application/octet-stream"});
        window.location = URL.createObjectURL(file);
    }
</script>

<style>

</style>
