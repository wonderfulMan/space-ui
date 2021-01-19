import {Configuration} from 'webpack-dev-server'
import {resolve} from './help'
export enum PACKAGES_CONFIG {
    packages = '../packages',
    spaceUI = '@space-ui',
    components = '../packages/@space-ui',
    eslintrc = '.eslintrc.js',
    tsconfig = 'tsconfig.json',
    prettierrc = '.prettierrc.js',
    packageJson = 'package.json',
}

export enum NODE_ENV_CONFIG {
    production = 'production',
    development = 'development',
}

export enum SPACE_MODE_CONFIG {
    production = 'production',
    development = 'development',
}
export enum DEVELOPMENT_CONFIG {
    entryKey = 'main',
    entryPath = '../example/index.ts',
    outputPath = '../../example/dist',
    outputFilename = 'js/bundle.[contenthash].js',
    outputFilenameHashLength = 8,
}

export const REG_CONFIG = {
    css: /\.css$/,
    less: /\.less$/,
    scss: /\.scss$/,
    sass: /\.sass$/,
    stylus: /\.styl(us)?$/,
    postcss: /\.p(ost)?css$/,
    module: /\.module\.\w+$/,
}

export const LANG_CONFIG = {
    css: 'css',
    less: 'less',
    scss: 'scss',
    sass: 'sass',
    stylus: 'stylus',
    postcss: 'postcss',
}

export const DEV_SERVER_OPTIONS: Configuration = {
    port: 8080,
    host: 'localhost',
    disableHostCheck: true,
    quiet: true,
    noInfo: true,
    contentBase: resolve('../example/dist'),
}
