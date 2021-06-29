/**
 * @函数名:List
 * @作用: 顾问列表
 * @params: mod
 */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {ListView} from 'antd-mobile';
import MainContext from '../../Context';
import {withRouter} from "react-router";

const data = [
	{
		img: '/upload.svg',
		name: '张顾问',
		jobNumber: '999999999',
	},
	{
		img: '/upload.svg',
		name: '李顾问',
		jobNumber: '999999999',
	},
	{
		img: '/upload.svg',
		name: '王顾问',
		jobNumber: '999999999',
	},
];

const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
	const dataBlob: any = {};
	for (let i = 0; i < NUM_ROWS; i++) {
		const ii = (pIndex * NUM_ROWS) + i;
		dataBlob[`${ii}`] = `row - ${ii}`;
	}
	return dataBlob;
}

const Separator: any = (sectionID: number, rowID: number): any => (
	<div
		key={`${sectionID}-${rowID}`}
		style={{
			backgroundColor: '#F5F5F9',
			height: 8,
			borderTop: '1px solid #ECECED',
			borderBottom: '1px solid #ECECED',
		}}
	/>
);
let index = data.length - 1;
/**
 * 列组件
 * @param rowData
 * @param sectionID
 * @param rowID
 */
const Row: any = (props: any) => {
	const {rowData, sectionID, rowID} = props;
	if (index < 0) {
		index = data.length - 1;
	}
	const obj = data[index--];
	
	/**
	 * 点击跳转
	 */
	const onClick = () => {
		props.history.push({
			pathname: '/upload',
			state: {
				test: 123
			}
		})
	};
	
	return (
		<div key={rowID} style={{padding: '0 15px'}}>
			<div style={{display: 'flex', padding: '15px 0'}}>
				<div style={{position: 'relative'}}>
					<img onClick={onClick} style={{height: '64px', marginRight: '15px'}} src={obj.img} alt="待上传"/>
					<span style={{position: 'absolute', left: 14, top: 52, fontSize: 12}}>待上传</span>
				</div>
				<div style={{lineHeight: 1}}>
					<div style={{marginBottom: '8px', fontWeight: 'bold'}}>{obj.name}</div>
					<div>工号：<span style={{fontSize: '30px'}}>{obj.jobNumber}</span></div>
				</div>
			</div>
		</div>
	);
};

const List: React.FC<any> = (props) => {
	/**
	 * 公共信息
	 */
	const main = useContext(MainContext);
	/**
	 * ref
	 */
	const listRef = useRef<any>(null);
	/**
	 * 初始化数据
	 */
	const [dataSource, setDataSource] = useState(new ListView.DataSource({
		rowHasChanged: (row1: any, row2: any) => row1 !== row2,
	}));
	/**
	 * 第一页数据
	 */
	const [rData, setRData] = useState(genData(0));
	/**
	 * 控制loading
	 */
	const [isLoading, setLoading] = useState<boolean>(true);
	/**
	 * 是否有更多数据
	 */
	const [hasMore, setHasMore] = useState<boolean>(false);
	/**
	 * 加载数据
	 */
	useEffect(() => {
		setLoading(true);
		setTimeout(()=> {
			setDataSource(dataSource.cloneWithRows(rData));
			setLoading(false);
		}, 1000)
	}, []);
	/**
	 * 加载到最后一页
	 * @param event
	 */
	const onEndReached = (event: any) => {
		if (isLoading && !hasMore) {
			return;
		}
		setLoading(true);
		/**
		 * 服务端获取数据
		 */
		setTimeout(() => {
			const data = {...rData, ...genData(++pageIndex)};
			setRData(data);
			setDataSource(dataSource.cloneWithRows(data));
			setLoading(false);
		}, 1000);
	};
	
	return (
		<ListView
			ref={listRef}
			dataSource={dataSource}
			renderHeader={() => <span>待上传顾问</span>}
			renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
				{isLoading ? 'Loading...' : 'Loaded'}
			</div>)}
			renderRow={(rowData, sectionID, rowID, highlightRow) => {
				return <Row rowData={rowData} sectionID={sectionID} rowID={rowID} {...props} />
			}}
			renderSeparator={Separator}
			className="am-list"
			pageSize={4}
			useBodyScroll
			onScroll={() => {
				console.log('scroll');
			}}
			scrollRenderAheadDistance={500}
			onEndReached={onEndReached}
			onEndReachedThreshold={10}
		/>
	)
};

export default withRouter(List);