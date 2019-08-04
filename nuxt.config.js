module.exports = {
    mode: 'universal',
    loading: {
        color: '#aabbff',
        height: '1px'
    },
    plugins: [
        {src: '~plugins/vuelayers.js', ssr: false}
    ],
    modules: [
        '@nuxtjs/axios'
    ],
    router: {},
    build: {
        transpile: ['vuelayers']
    }
}
