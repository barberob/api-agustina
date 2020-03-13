module.exports = ({options}) => ({
    plugins: {
        'autoprefixer': {grid: 'autoplace'},
        'postcss-flexbugs-fixes': {},
        'cssnano': options.env === 'production'
    }
});


