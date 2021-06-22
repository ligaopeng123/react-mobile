/**********************************************************************
 *
 * @模块名称: Error
 *
 * @模块用途: 创建错误提示页
 *
 * @创建人: ligaoming
 *
 * @date: 2021/6/22 17:39
 *
 * @版权所有: PGLI
 *
 **********************************************************************/
import React from 'react';
import {Result} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.less';
import './styles.less';

const Index: React.FC = () => {
	return (
		<React.Fragment>
			<div className="sub-title">操作失败</div>
			<Result
				imgUrl={'/GIyMDJnuqmcqPLpHCSkj.svg'}
				title="无法完成操作"
				message="缺少员工信息，请从新登录"
			/>
		</React.Fragment>
	)
};
export default Index;