import React, {useState} from 'react';
import {ImagePicker, Button, Toast} from 'antd-mobile';
import {withRouter, RouteComponentProps} from "react-router-dom";
import {heic2Jpg, isHeic, jpg2Base64} from "../utils";
import {FileProps, FilesProps} from "./interface";
import './index.less';

interface UploadProps extends RouteComponentProps {

}

const Upload: React.FC<UploadProps> = (props: UploadProps) => {
	/**
	 * 设置上传的图片
	 */
	const [files, setFiles] = useState<Array<any>>([]);
	/**
	 * 检查File的长度 确认是删除还是添加
	 * @param files
	 */
	const checkFiles: FilesProps<Array<FileProps>> = (files) => {
		return new Promise((resolve, reject) => {
			if (files.length) {
				resolve(files);
			} else {
				reject([]);
			}
		});
	};
	
	/**
	 * 检查图片类型
	 * @param files
	 */
	const checkImage: FilesProps<Array<FileProps>> = async (files) => {
		/**
		 * 用于预览 blob:http 使用FileReader对象和ImagePicker插件保持一致
		 * files[0].url = URL.createObjectURL(resultBlob);
		 */
		const file = files[0]?.file;
		if (isHeic(file?.name)) {
			const jpgFile = await heic2Jpg(file);
			files[0].url = await jpg2Base64(jpgFile);
		}
		return files;
	};
	
	/**
	 * 开始前出力loading
	 * @param files
	 */
	const run: FilesProps<Array<FileProps>> = (files) => {
		return new Promise((resolve, reject) => {
			Toast.loading('Loading...', 10, () => {
			});
			resolve(files);
		})
	};
	/**
	 * 图片选中后 如果是heic图片 此处需要做下转换
	 */
	const onChange: any = (files: Array<FileProps>, operationType: string, index: number) => {
		run(files).then((files) => {
				// 检查files数据是否合法 合法则继续
				return checkFiles(files);
			})
			.then((files) => {
				// 检查图片的类型 heic要做转换
				return checkImage(files);
			})
			.then((files) => {
				setFiles(files);
				Toast.hide();
			})
			.catch((files) => {
				setFiles(files);
				Toast.hide();
			});
	};
	
	/**
	 * 点击触发事件
	 * 如果files<上传的图片>不为空 则处理上传逻辑
	 * 否则提示用户上传失败
	 */
	const onClick = () => {
		if (files.length) {
			props.history.push({
				pathname: '/list',
				state: {
					test: 123
				}
			})
		} else {
			Toast.info('请上传图片！', 3);
		}
	};
	
	return (
		<div className={`unload`}>
			<div className={`photo`}>
				<ImagePicker
					length={1}
					files={files}
					onChange={onChange}
					onImageClick={(index, fs) => console.log(index, fs)}
					selectable={files.length < 1}
					accept="image/jpeg,image/jpg,image/heic"
					multiple={false}
				/>
			</div>
			<div className={`tip`}>
				<div>
					<p>上传图片要求</p>
					<span>1.必须为本人近期照片，不要PS，不要美颜</span>
					<span>2.人脸居中，面部清晰，面部占比尽可能大一些，</span>
					<span>3.图片jpg格式，
					照片高度>宽度，宽度>480像素，人脸大小>200像素
					瞳距>60像素，人脸个数为1</span>
				</div>
			</div>
			<Button size={`small`} onClick={onClick}>确定</Button>
		</div>
	)
};

export default withRouter(Upload);