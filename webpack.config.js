module.exports = {
    entry: {
        bundle1: './src/main1',
        bundle2: './src/main2',
        bundle3: './src/main3'
    },
    output: {
        filename: './src/[name].js'
    }
}