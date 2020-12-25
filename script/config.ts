export enum PACKAGES_CONFIG {
    'packages' = '../packages',
    'spaceUI' = '@space-ui',
    'components' = '../packages/@space-ui',
    'eslintrc' = '.eslintrc.js',
    'tsconfig' = 'tsconfig.json',
    'prettierrc' = '.prettierrc.js',
    'packageJson' = 'package.json',
}

export enum DEVELOPMENT_CONFIG {
    'entryKey' = 'main',
    'entryPath' = '../example/main.ts',
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
