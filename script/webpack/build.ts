import {SPACE_MODE_CONFIG} from '../config'
import {throwError} from '../help'
import {ConfigurationRunnerInterface} from '../script'

async function setup(): Promise<void> {
    let configRunnerInstance!: ConfigurationRunnerInterface

    const mode = process.env.SPACE_MODE

    const isDevelopmentMode = mode === SPACE_MODE_CONFIG['development']

    const isBuildComponents = mode === SPACE_MODE_CONFIG['production']

    switch (true) {
        case isDevelopmentMode:
            configRunnerInstance = new (await import('./DevelopmentConfiguration')).default()
            break
        case isBuildComponents:
            configRunnerInstance = new (await import('./ComponentsConfiguration')).default()
            break
        default:
            throwError('请确认当前环境变量 process.env.SPACE_MODE 是否为 development or build_components')
            break
    }

    if (configRunnerInstance) {
        configRunnerInstance.toRunning()
    }
}

setup()
