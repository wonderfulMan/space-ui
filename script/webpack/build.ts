import {Configuration, webpack} from 'webpack'
import {throwError} from '../help'

async function setup(): Promise<void> {
    let config: Configuration = {}
    const mode = process.env.SPACE_MODE
    const isDevelopmentMode = mode === 'development'
    const isBuildComponents = mode === 'build_components'
    switch (true) {
        case isDevelopmentMode:
            config = new (await import('./DevelopmentConfiguration')).default().toConfig()
            break
        case isBuildComponents:
            config = new (await import('./ComponentsConfiguration')).default().toConfig()
    }

    console.log(config)

    const compiler = webpack(config)

    compiler.run((err, stats) => {
        if (err) {
            throwError(err)
        }
    })
}

setup()
