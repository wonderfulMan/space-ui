import fs from "fs-extra";
import path from 'path';
/**
 * @description 抛出错误
 * @param {Error | string} error
 * @returns {void}
 */
export function throwError(error: Error | string): void {
  if (error instanceof Error) {
    throw error;
  } else {
    throw new Error(error);
  }
}

/**
 * @description 推出进程
 * @param {number} exitCode
 * @returns {void}
 */
export function exit(exitCode: number = 1): void {
  process.exit(1);
}

/**
 * @description 获取全路径
 * @param dir 相对路径
 * @returns {string} 全路径
 */
export function resolve(dir: string): string {
  if (!dir) {
    exit();
  }
  return path.resolve(__dirname, dir);
}

/**
 * @description 读取目录
 * @param {string} rootDir 根目录相对路径
 * @returns {void} 路径数组
 */
export function readDirNames(rootDir: string): Array<string> | void {
  if (!rootDir) {
    exit();
  }

  try {
    const _rootDir = resolve(rootDir)
    fs.emptyDirSync(resolve(rootDir))
    const dirs = fs.readdirSync(_rootDir)
    return dirs
  } catch (error) {
    throwError(error)
  }

}
