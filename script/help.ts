import * as fs from 'fs-extra'
import * as path from 'path'
import {ConfigFileNameType, DirPathConfigType, PackagesDevelopmentConfigsType} from './script'
/**
 * @description 抛出错误
 * @param {Error | string} error
 * @returns {void}
 */
export function throwError(error: Error | string): void {
    if (error instanceof Error) {
        throw error
    } else {
        throw new Error(error)
    }
}

/**
 * @description 推出进程
 * @param {number} exitCode
 * @returns {void}
 */
export function exit(exitCode = 1): void {
    process.exit(exitCode)
}

/**
 * @description 获取全路径
 * @param dir 相对路径
 * @returns {string} 全路径
 */
export function resolve(dir: string): string {
    if (!dir) {
        exit()
    }
    return path.resolve(__dirname, dir)
}

/**
 * @description 读取目录
 * @param {string} rootDir 根目录相对路径
 * @returns {void} 路径数组
 */
export function readDirNames(rootDir: string): Array<string> | void {
    if (!rootDir) {
        exit()
    }

    try {
        const _rootDir = resolve(rootDir)
        const dirs = fs.readdirSync(_rootDir)
        return dirs
    } catch (error) {
        throwError(error)
    }
}

/**
 * @description 获取路径配置数据
 * @param {Array<string>} dirs 子路径
 * @param {string} rootDir 根路径
 * @returns {Array<DirPathConfigType>} 返回路径配置数据
 */
export function getDirsPathConfig(dirs: Array<string>, rootDir: string): Array<DirPathConfigType> {
    return dirs.map(dir => {
        return {
            dir,
            resolveDirPath: resolve(`${rootDir}/${dir}`),
        }
    })
}

/**
 * @description 判断指定文件是否存在
 * @param {string} targetPath 指定路径
 * @returns {boolean} 是否存在文件
 */
export function existsFile(targetPath: string): boolean {
    try {
        return fs.existsSync(targetPath)
    } catch (error) {
        throwError(error)
        return false
    }
}

// export type PackageJSONType = typeof import('../package.json')

/**
 * @description 返回每个组件包开发配置文件路径
 * @param {string} targetPath 目标路径
 * @param {configFileName} 配置文件名称
 * @returns {PackagesDevelopmentConfigsType} 配置文件对象
 */
export function genPackagesDevelopConfigsPath(
    targetPath: string,
    configFileName: ConfigFileNameType,
): PackagesDevelopmentConfigsType {
    return {
        eslintrcPath: `${targetPath}/${configFileName['eslintrc']}`,
        tsconfigPath: `${targetPath}/${configFileName['tsconfig']}`,
        prettierrcPath: `${targetPath}/${configFileName['prettierrc']}`,
        packageJsonPath: `${targetPath}/${configFileName['packageJson']}`,
    }
}

/**
 * @description 根据指定路径和内容写入文件
 * @param {string} targetPath 指定路径
 * @param {string} filename 文件名
 * @param {string | Buffer} content 内容
 * @returns {boolean} 是否成功写入
 */
export function writeFile(targetPath: string, filename: string, content: string | Buffer): Promise<boolean | void> {
    if (!targetPath) {
        throwError('请传入targetPath')
    }

    if (!content) {
        throwError('content不能为空')
    }

    let contentBuffer: string | Buffer = content

    if (content instanceof String) {
        contentBuffer = Buffer.from(content)
    }
    contentBuffer = content
    const writeStream = fs.createWriteStream(path.join(targetPath, filename))

    return new Promise(resolve => {
        writeStream.on('open', () => {
            const blockSize = 128
            const contentLength = contentBuffer.length
            const fileChunks = Math.ceil(contentLength / blockSize)

            for (let index = 0; index < fileChunks; index++) {
                const block = contentBuffer.slice(blockSize * index, Math.min(blockSize * (index + 1), contentLength))
                writeStream.write(block)
            }

            resolve(true)
        })
    })
}
