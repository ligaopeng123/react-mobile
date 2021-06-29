/**********************************************************************
 *
 * @模块名称: utils
 *
 * @模块用途: utils工具类
 *
 * @创建人: ligaoming
 *
 * @date: 2021/6/23 17:08
 *
 * @版权所有: PGLI
 *
 **********************************************************************/
import heic2any from 'heic2any';

export const isHeic = (name: string) => name.toLowerCase().endsWith(`.heic`);

/**
 * 将heic转换成jpg
 * @param file
 */
export const heic2Jpg = (file: any): Promise<File> => {
	return new Promise((resolve, reject) => {
		const fileName = file.name;
		heic2any({
			blob: file,
			toType: "image/jpg",
		}).then((resultBlob: any) => {
			file = new File([resultBlob], fileName + ".jpg", {
				type: "image/jpeg",
				lastModified: new Date().getTime()
			});
			resolve(file);
		}).catch(() => {
			reject();
		});
	})
};
/**
 * 将jpg转换成base64
 * @param file
 */
export const jpg2Base64 = async (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader: any = new FileReader();
		reader.onload = (e: Event) => {
			// 转换base64
			resolve((e.target as any).result)
		};
		// URL.createObjectURL(resultBlob);
		reader.readAsDataURL(file);
	})
};
