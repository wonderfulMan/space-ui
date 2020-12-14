import * as fs from 'fs-extra'
import * as path from 'path'
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

type DirPathConfigType = {
    dir: string
    resolveDirPath: string
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
 * @param params
 */
export function existsFile(path: string): boolean {
    try {
        return fs.existsSync(path)
    } catch (error) {
        throwError(error)
        return false
    }
}

export type PackageJSONType = typeof import('../package.json')
