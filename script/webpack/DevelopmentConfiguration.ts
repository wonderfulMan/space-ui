import {Configuration} from 'webpack'
import * as Config from 'webpack-chain'
import {DEVELOPMENT_CONFIG, LANG_CONFIG, REG_CONFIG} from '../config'
import {resolve} from '../help'
import {ConfigurationInterface, StyleLoaderOptionsType} from '../script'
import {createCSSRule} from './help'
/**
 * @description 开发环境配置
 */
export default class DevelopmentConfiguration implements ConfigurationInterface {
    private config: Config

    constructor() {
        this.config = new Config()

        this.genConfigs()
    }

    get isProduction(): boolean {
        return process.env.NODE_ENV === 'production'
    }

    get isDevelopment(): boolean {
        return process.env.NODE_ENV === 'development'
    }

    genConfigs(): void {
        this.setEntry()
        this.setOutput()
        this.setCssStyle()
    }

    /**
     * @description 设置打包入口
     * @returns {void}
     */
    setEntry(): void {
        this.config.entry(DEVELOPMENT_CONFIG['entryKey']).add(DEVELOPMENT_CONFIG['entryPath'])
    }
    /**
     * @description 设置打包出口，文件名以及全局hash长度
     * @returns {void}
     */
    setOutput(): void {
        this.config.output.path(resolve('../../example/dist')).filename('bundle.[chunkhash].js').hashDigestLength(8)
    }

    /**
     * @description 设置样式loader 包含css/less/postcss的编译以及模块化css配置
     * @param {Config} config 链式对象
     * @returns {void}
     */
    setCssStyle(): void {
        createCSSRule(this.config, this.isProduction, LANG_CONFIG['css'], REG_CONFIG['css'])
        createCSSRule(this.config, this.isProduction, LANG_CONFIG['less'], REG_CONFIG['less'])
        createCSSRule(this.config, this.isProduction, LANG_CONFIG['postcss'], REG_CONFIG['postcss'])
        createCSSRule(this.config, this.isProduction, LANG_CONFIG['stylus'], REG_CONFIG['stylus'])
        createCSSRule(this.config, this.isProduction, LANG_CONFIG['sass'], REG_CONFIG['sass'])
        createCSSRule(this.config, this.isProduction, LANG_CONFIG['scss'], REG_CONFIG['scss'])
    }

    toConfig(): Configuration {
        return this.config.toConfig()
    }
}
