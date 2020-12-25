import * as Config from 'webpack-chain'
import {Configuration} from 'webpack'
import {PACKAGES_CONFIG} from '../config'
import {getComponentEnties} from './help'
import {ConfigurationInterface, MapStringType} from '../script'
/**
 * @description 生成webpack配置文件
 */
export default class GenComponentsConfiguration implements ConfigurationInterface {
    private entryConfigs: MapStringType = {}

    private config!: Config

    constructor() {
        this.entryConfigs = getComponentEnties(PACKAGES_CONFIG['components'])
        this.config = new Config()

        this.genConfigs()
    }

    genConfigs(): void {
        this.setEntry()
    }

    setEntry(): void {
        Object.entries(this.entryConfigs).map(([key, value]) => {
            this.config.entry(key).add(value).end()
        })
    }

    toConfig(): Configuration {
        return this.config.toConfig()
    }
}
