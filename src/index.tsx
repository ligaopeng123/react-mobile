import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Error from './pages/Error';
import * as serviceWorker from './serviceWorker';
import './index.less';

import {createHashHistory} from 'history';

const history = createHashHistory();
/**
 * 解析根据url路径解析参数
 * @param url
 */
const getQueryObjectByUrl = (url: string) => {
	const _url = url === null ? window.location.href : url;
	const search = _url.substring(_url.lastIndexOf('?') + 1);
	const obj: any = {};
	const reg = /([^?&=]+)=([^?&=]*)/g;
	// [^?&=]+表示：除了？、&、=之外的一到多个字符
	// [^?&=]*表示：除了？、&、=之外的0到多个字符（任意多个）
	search.replace(reg, function (rs: any, $1, $2) {
		const name = decodeURIComponent($1);
		const val = String(decodeURIComponent($2));
		obj[name] = val;
		return rs;
	});
	return obj;
};
/**
 * 如果参数存在 则创建dom解构 否则提示错误信息
 * getQueryObjectByUrl(window.location.search)
 */
const params = getQueryObjectByUrl(window.location.search);
ReactDOM.render(params
	? <App history={history}/>
	: <Error/>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
