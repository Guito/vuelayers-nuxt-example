<template>
    <div>
        <button @click="changeMap">Change features</button>
        <no-ssr>
            <vl-map v-if="!reloading" :load-tiles-while-animating="true" :load-tiles-while-interacting="true" style="height: 800px">
                <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

                <vl-layer-tile>
                    <vl-source-osm></vl-source-osm>
                </vl-layer-tile>

                <vl-layer-vector v-if="useUrlFunction">
                    <vl-source-vector :url="urlFunction" :strategy-factory="loadingStrategyFactory"></vl-source-vector>
                </vl-layer-vector>
                <vl-layer-vector v-else>
                    <vl-source-vector url="https://openlayers.org/en/latest/examples/data/geojson/countries.geojson" projection="EPSG:4326"></vl-source-vector>
                </vl-layer-vector>
            </vl-map>
            <div style="padding: 20px">
                Zoom: {{ zoom }}<br>
                Center: {{ center }}<br>
                Rotation: {{ rotation }}<br>
                My geolocation: {{ geolocPosition }}
            </div>
        </no-ssr>
    </div>
</template>

<script>
    export default {
        head() {
            return {
                title: 'Vuelayers with nuxt',
            }
        },
        data() {
            return {
                useUrlFunction: true,
                zoom: 3,
                center: [1, 0],
                rotation: 0,
                geolocPosition: undefined,
                reloading: false
            }
        },
        methods: {
            changeMap() {
                this.useUrlFunction = !this.useUrlFunction
                this.reloading = true
                this.$nextTick(() => {
                    this.reloading = false
                })
            },
            urlFunction(extent, resolution, projection) {
                return 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
                    'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
                    'outputFormat=application/json&srsname=' + projection + '&maxFeatures=50' + '&' +
                    'bbox=' + extent.join(',') + ',' + projection
            },
            loadingStrategyFactory() {
                return this.$loadingBBox()
            }
        }
    }
</script>

<style lang="scss">
</style>
