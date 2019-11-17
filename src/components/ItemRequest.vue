<template>
    <div>


        <v-slide-group
                v-if="!isProgress"
                class="pa-4"
                multiple
                show-arrows
        >
            <v-slide-item
                    v-for="(file, index) in files"
                    :key="index"
            >
                <v-card
                        class="ma-4 fill-height"
                        height="260"
                        width="200"
                        align="start"
                        justify="center"
                >

                    <v-img :src="fileToImage(file)" height="150"
                           gradient="0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 50%"
                           class="white--text align-end text-uppercase">
                        <v-card-title>{{ file.name }}</v-card-title>
                    </v-img>

                    <v-card-text class="text--primary pb-0">
                        <p class="mb-1">Type: {{file.type}}</p>
                        <p class="mb-1">Size: {{ calculateSize(file.size) }}</p>
                    </v-card-text>


                    <v-btn color="primary" @click="deleteImage(index)" icon class="float-right mr-2">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-card>
            </v-slide-item>
        </v-slide-group>

        <v-btn block @click="convert()" v-if="files.length > 0 && !isProgress" color="secondary"
               >Convert</v-btn>

        <v-row align="center" justify="center" v-if="isProgress" class="mt-5">
            <v-col cols="12">
                <v-progress-circular :indeterminate="false"
                                     :rotate="270"
                                     :size="100"
                                     :value="getPercentProgress"
                                     :width="10"
                                     color="primary"
                                     class="block"
                                     style="width: 100%"
                >{{ getPercentProgress }}
                </v-progress-circular>
            </v-col>
        </v-row>

        <!--            response                -->
        <v-slide-group v-if="responseFiles.length > 0 && !isProgress" multiple show-arrows>
            <v-slide-item v-for="(responseFile, index) in responseFiles"
                          :key="index">
                <v-card class="ma-4 fill-height"
                        height="260"
                        width="200"
                        align="start"
                        justify="center">

                    <v-img :src="fileToImage(responseFile)" height="150"
                           gradient="0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 50%"
                           class="white--text align-end text-uppercase">
                        <v-card-title>{{ responseFile.name }}</v-card-title>
                    </v-img>

                    <v-card-text class="text--primary pb-0">
                        <p class="mb-1">Type: {{responseFile.type}}</p>
                        <p class="mb-1">Size: {{ calculateSize(responseFile.size) }}</p>
                    </v-card-text>


                    <v-btn color="primary" @click="deleteImage(index)" icon class="float-right mr-2">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-card>
            </v-slide-item>
        </v-slide-group>
        <v-btn @click="save()" v-if="responseFiles.length > 0 && !isProgress" color="primary" block>Save</v-btn>
    </div>
</template>

<script>
    import JSZip from 'jszip'
    import HermiteClass from 'hermite-resize';
    import Jimp from 'jimp'

    export default {
        name: "ItemRequest",
        props: {
            convertType: {
                type: String,
                required: true
            },
            quality: {
                type: Number,
                required: true
            },
            isWebp: {
                type: Boolean,
                required: true
            },
            resize: {
                type: Object,
                required: true
            },
            files: {
                type: Array,
                required: true
            }
        },

        data: () => ({
            responseFiles: [],
            hermit: new HermiteClass(),
            isProgress: false,
        }),

        computed: {
            getPercentProgress() {
                return Math.round(this.responseFiles.length / this.files.length * 100);
            },

        },
        methods: {
            checkProgress() {
                if (this.responseFiles.length === this.files.length) {
                    this.isProgress = false;
                }
            },

            fileToImage(file) {
                return URL.createObjectURL(file)
            },

            deleteImage(position) {
                this.files.splice(position, 1)
            },
            calculateSize(size) {
                if (size < 1024) {
                    return size + ' b'
                } else if (size < 1048576) {
                    let result = size / 1024;
                    return Math.round(result) + ' кb'
                } else {
                    let result = size / 1048576;
                    return result.toFixed(1) + ' мb'
                }
            },

            convert() {
                this.responseFiles = [];
                this.isProgress = true;

                for (const file of this.files) {
                    if (this.isWebp)
                        this.convertWebp(file);
                    else
                        this.convertJimp(file);
                }
            },

            convertJimp(file) {
                Jimp.read(URL.createObjectURL(file)).then(image => {
                        let resize = this.resize;
                        if (resize.isResize) {
                            console.log(resize)
                            if (resize.isProportional && resize.height === "") {
                                image.resize(Number.parseInt(resize.width), Jimp.AUTO);
                            } else if (resize.isProportional && resize.width === "") {
                                image.resize(Jimp.AUTO, Number.parseInt(resize.height));
                            } else if (!resize.isProportional) {
                                image.resize(Number.parseInt(resize.width), Number.parseInt(resize.height));
                            }
                        }
                        image.quality(this.quality);

                        image.getBuffer(this.convertType, (err, value) => {
                            let name = file.name.substr(0, file.name.lastIndexOf('.')) +
                                '.' + this.convertType.split('/')[1];
                            let newFile = new File([value], name, {type: this.convertType});
                            this.responseFiles.push(newFile);
                            this.checkProgress();
                        })
                    }
                )
            },
            convertWebp(file) {
                let img = new Image();
                img.onload = () => {
                    URL.revokeObjectURL(this.src);             // free up memory
                    let canvas = document.createElement("canvas");  // create a temp. canvas
                    let ctx = canvas.getContext("2d");
                    canvas.width = img.width;                      // set size = image, draw
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);


                    let createBlob = blob => {
                        let name = file.name.substr(0, file.name.lastIndexOf('.')) + '.' +
                            this.convertType.split('/')[1];
                        let newFile = new File([blob], name, {type: this.convertType});
                        this.responseFiles.push(newFile);
                        this.checkProgress();
                    };


                    this.resizeWebpImage(canvas, img);

                    canvas.toBlob(createBlob, this.convertType, this.quality / 100);
                };

                img.src = URL.createObjectURL(file);

            },

            resizeWebpImage(canvas, img) {
                let resize = this.resize;
                if (resize.isResize && resize.isProportional) {

                    if (resize.width !== "" && resize.height === "") {
                        let height = this.calculateProportion(resize.width, img.width, img.height);
                        this.hermit.resample_single(canvas, resize.width, height, true);
                    } else if (resize.width === "" && resize.height !== "") {
                        let width = this.calculateProportion(resize.height, img.height, img.width);
                        this.hermit.resample_single(canvas, width, resize.height, true);
                    }

                } else if (resize.isResize && !resize.isProportional) {
                    this.hermit.resample_single(canvas, resize.width, resize.height, true);
                }
            },

            calculateProportion(newSize, oldSize, resizingSide) {
                let percent = newSize / oldSize * 100;
                return Math.round(resizingSide / 100 * percent);
            },


            save() {
                let zip = new JSZip();
                for (let i = 0; i < this.responseFiles.length; i++) {
                    zip.file(this.responseFiles[i].name, this.responseFiles[i], {base64: true});
                }
                zip.generateAsync({type: "blob"}).then((content) => window.location.href = URL.createObjectURL(content));
            }

        }
    }


</script>

<style scoped>

</style>