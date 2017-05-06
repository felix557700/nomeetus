import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'

export default {
    dest: 'build/bundle.js',
    entry: 'src/index.js',
    format: 'iife',
    plugins: [
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            presets: [ [ 'es2015', { modules: false } ] ],
            plugins: [ 'transform-decorators-legacy', 'external-helpers', 'inferno' ]
        }),
        resolve({
            jsnext: true,
            module: true,
            browser: true,
            main: true
        }),
        commonjs({
            // exclude: '',
            // include: [
            // 'node_modules/object-assign/**',
            // 'node_modules/inferno/**',
            // 'node_modules/inferno-component/**',
            // 'node_modules/prop-types/**'
            // ]
        }),
        globals(),
        replace({ 'process.env.NODE_ENV': JSON.stringify('development') })
    ],
    sourceMap: true
}
