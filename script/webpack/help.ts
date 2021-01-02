import Config, {Module, Rule} from 'webpack-chain'
import {getDirsPathConfig, readDirNames, throwError} from '../help'
import {DirPathConfigType, MapStringType} from '../script'
import {LANG_CONFIG, REG_CONFIG} from '../config'
import {loader} from 'mini-css-extract-plugin'
/**
 * @description 获取组件入口文件
 * @param  {string} rootPath 组件库根目录
 * @returns {MapStringType} 入口对象配置
 */
export function getComponentEnties(rootPath: string): MapStringType {
    if (!rootPath) {
        throwError('请传入rootPath: 根目录')
    }

    const packagesNames = readDirNames(rootPath)
    let packagesNameConfigs: DirPathConfigType[] = []
    if (packagesNames) {
        packagesNameConfigs = getDirsPathConfig(packagesNames, rootPath)
    }

    const entryConfigs: MapStringType = {}

    packagesNameConfigs.forEach(packagesNameConfig => {
        entryConfigs[packagesNameConfig['dir']] = packagesNameConfig['resolveDirPath']
    })

    return entryConfigs
}

/**
 * @description 设置babel配置 包含es6以上语法转换以及typescript语法转换
 * @param {Config} config 链式对象
 * @returns {void}
 */
export function setSyntaxByBabel(params: type) {}

/**
 * @description 设置图片、字体、流媒体、svg等静态资源配置
 * @param {Config} config
 * @returns {void}
 */
export function setAssetsRules(params: type) {}

/**
 * @description 创建样式规则
 * @param {boolean} isProduction 是否为生产模式
 * @returns {(rule: T extends Rule<Rule<Module>>, hasModule: boolean) => void} 返回绑定css规则的函数
 */
function createApplyCssLoader<T extends Rule<Rule<Module>>>(
    isProduction: boolean,
    loader: string,
): (rule: T, hasModule: boolean) => void {
    const sourceMap = true

    return async function (rule: T, hasModule: boolean): Promise<void> {
        if (isProduction) {
            rule.use('extrat-css-loader').loader((await import('mini-css-extract-plugin')).loader)
        } else {
            rule.use('vue-style-loader')
                .loader(await import('vue-style-loader'))
                .options({sourceMap})
        }

        const importLoaders = 2
        const cssOptions = {
            importLoaders,
            sourceMap,
        }

        if (hasModule) {
            Object.assign({modules: true, localIdentName: '[name]_[local]_[hash:base64:5]'}, cssOptions)
        }

        rule.use('css-loader').options(cssOptions)
        rule.use('postcss-loader').options({sourceMap, plugins: [require('autoprefix')]})

        let resolveLoader = null

        try {
            resolveLoader = require.resolve(loader)
        } catch (error) {
            resolveLoader = loader
        }

        rule.use(loader).loader(resolveLoader).options({sourceMap})
    }
}

/**
 * @description 设置样式loader配置
 * @param {Config} config webpack-chain链式对象
 * @param {boolean} isProduction 是否生产模式
 * @param {string} lang 语言
 * @param {RegExp} reg 匹配规则
 * @param {string} loader 预处理器
 * @returns {void}
 */
export function createCSSRule(config: Config, isProduction: boolean, lang: string, reg: RegExp): void {
    const baseConfig = config.module.rule(lang).test(lang)
    const applyCssLoader = createApplyCssLoader(isProduction, lang)
    //  <style>
    const normalVuexFileRule = baseConfig.oneOf('vue-normal').resourceQuery(/vue/)
    applyCssLoader(normalVuexFileRule, false)
    //  <style lang="module">
    const modulesVuexFileRule = baseConfig.oneOf('vue-modules').resourceQuery(/module/)
    applyCssLoader(modulesVuexFileRule, true)
    //  module后缀css文件
    const modulesRule = baseConfig.oneOf('normal-module').test(REG_CONFIG['module'])
    applyCssLoader(modulesRule, true)
    // 普通css文件
    const normalRule = baseConfig.oneOf('normal')
    applyCssLoader(normalRule, false)
}
