export type FileProps = {
	file: File,
	url?: string
}

/**
 * Files函数约束
 */
export interface FilesProps<T> {
	(v: T): Promise<T>;
}