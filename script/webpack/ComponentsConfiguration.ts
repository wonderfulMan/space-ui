import * as Config from 'webpack-chain'
import {Configuration} from 'webpack'
import {PACKAGES_CONFIG} from '../config'
import {getComponentEnties} from './help'
import {ConfigurationRunnerInterface, MapStringType} from '../script'
/**
 * @description 生成webpack配置文件
 */
export default class GenComponentsConfiguration implements ConfigurationRunnerInterface {
    private entryConfigs: MapStringType = {}

    private config!: Config

    constructor() {
        this.entryConfigs = getComponentEnties(PACKAGES_CONFIG['components'])
        this.config = new Config()

        this.genConfigs()
    }

    private genConfigs(): void {
        this.setEntry()
    }

    private setEntry(): void {
        Object.entries(this.entryConfigs).map(([key, value]) => {
            this.config.entry(key).add(value).end()
        })
    }

    toConfig(): Configuration {
        return this.config.toConfig()
    }
    toRunning(): Promise<void> {
        throw new Error('Method not implemented.')
    }
}
