import {Configuration} from 'webpack'
import {PACKAGES_CONFIG} from './config'

export type ConfigFileNameType = typeof PACKAGES_CONFIG

export type PackagesDevelopmentConfigsType = {
    eslintrcPath: string
    tsconfigPath: string
    prettierrcPath: string
    packageJsonPath: string
}
export type DirPathConfigType = {
    dir: string
    resolveDirPath: string
}

export type MapStringType = {[key: string]: string}

export interface ConfigurationInterface {
    setEntry(): void
    toConfig(): Configuration
    genConfigs(): void
}

export type StyleLoaderOptionsType = {
    cssOptions: {[key: string]: string}
    postcssOptions: {[key: string]: string}
}
