import {Configuration, webpack} from 'webpack'
import * as WebpackDevServer from 'webpack-dev-server'
import * as Config from 'webpack-chain'
import {DEVELOPMENT_CONFIG, LANG_CONFIG, NODE_ENV_CONFIG, REG_CONFIG} from '../config'
import {resolve} from '../help'
import {ConfigurationRunnerInterface} from '../script'
import {createCSSRule, getWebpackDevServerOptions} from './help'
/**
 * @description 开发环境配置
 */
export default class DevelopmentConfiguration implements ConfigurationRunnerInterface {
    private config: Config

    constructor() {
        this.config = new Config()

        this.resolveConfigs()
    }

    private get isProduction(): boolean {
        return process.env.NODE_ENV === NODE_ENV_CONFIG['production']
    }

    private get isDevelopment(): boolean {
        return process.env.NODE_ENV === NODE_ENV_CONFIG['development']
    }

    /**
     * @description 设置每个chain
     * @returns {void}
     */
    private resolveConfigs(): void {
        this.setEntry()
        this.setOutput()
        this.setCssStyle()
    }

    /**
     * @description 设置打包入口
     * @returns {void}
     */
    private setEntry(): void {
        this.config.entry(DEVELOPMENT_CONFIG['entryKey']).add(resolve(DEVELOPMENT_CONFIG['entryPath']))
    }

    /**
     * @description 设置打包出口，文件名以及全局hash长度
     * @returns {void}
     */
    private setOutput(): void {
        this.config.output
            .path(resolve(DEVELOPMENT_CONFIG['outputPath']))
            .filename(DEVELOPMENT_CONFIG['outputFilename'])
            .hashDigestLength(DEVELOPMENT_CONFIG['outputFilenameHashLength'])
    }

    /**
     * @description 设置样式loader 包含css/less/postcss的编译以及模块化css配置
     * @param {Config} config 链式对象
     * @returns {void}
     */
    private setCssStyle(): void {
        createCSSRule(this.config, this.isProduction, LANG_CONFIG['css'], REG_CONFIG['css'])
        createCSSRule(this.config, this.isProduction, LANG_CONFIG['less'], REG_CONFIG['less'])
        createCSSRule(this.config, this.isProduction, LANG_CONFIG['postcss'], REG_CONFIG['postcss'])
        createCSSRule(this.config, this.isProduction, LANG_CONFIG['stylus'], REG_CONFIG['stylus'])
        createCSSRule(this.config, this.isProduction, LANG_CONFIG['sass'], REG_CONFIG['sass'])
        createCSSRule(this.config, this.isProduction, LANG_CONFIG['scss'], REG_CONFIG['scss'])
    }

    /**
     * @description 设置plugins
     * @returns {void}
     */
    private setPlugins(): void {}
    /**
     * @description 获取webpack配置
     * @returns {void}
     */
    toConfig(): Configuration {
        return this.config.toConfig()
    }

    /**
     * @description 启动webpack编译
     */
    async toRunning(): Promise<void> {
        const compiler = webpack(this.toConfig())

        switch (true) {
            case this.isDevelopment: {
                const server = new WebpackDevServer(compiler, getWebpackDevServerOptions())
                server.listen(8080)
                break
            }
            default:
                break
        }
    }
}
