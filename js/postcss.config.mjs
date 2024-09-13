function postcss() {
    module.exports = {
        plugins: [
            require('@fullhuman/postcss-purgecss')({
                content: [
                    './**/*.html',
                    './js/**/*.js'
                ],
                defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
            })
        ]
    };
}