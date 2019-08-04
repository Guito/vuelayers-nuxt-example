<template>
    <div>
        <button @click="urlFunction = !urlFunction">Change features</button>
        <no-ssr>
            <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
                    data-projection="EPSG:4326" style="height: 800px">
                <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

                <vl-layer-tile>
                    <vl-source-osm></vl-source-osm>
                </vl-layer-tile>

                <vl-layer-vector v-if="urlFunction">
                    <vl-source-vector :url="urlFunction" :strategy-factory="loadingStrategyFactory"></vl-source-vector>
                </vl-layer-vector>
                <vl-layer-vector v-else>
                    <vl-source-vector url="https://openlayers.org/en/latest/examples/data/geojson/countries.geojson"></vl-source-vector>
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
    // import {loadingBBox} from 'vuelayers/lib/ol-ext'

    export default {
        head() {
            return {
                title: 'Vuelayers with nuxt',
            }
        },
        data() {
            return {
                urlFunction: true,
                zoom: 3,
                center: [1, 0],
                rotation: 0,
                geolocPosition: undefined,
            }
        },
        methods: {
            urlFunction (extent, resolution, projection) {
                return 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
                    'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
                    'outputFormat=application/json&srsname=' + projection + '&' +
                    'bbox=' + extent.join(',') + ',' + projection
            },
            loadingStrategyFactory () {
                // VueLayers.olExt available only in UMD build
                // in ES build it should be imported explicitly from 'vuelayers/lib/ol-ext'
                return loadingBBox
            },
        }
    }
</script>

<style lang="scss">
</style>
