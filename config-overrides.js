const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd-mobile',
		style: true // 加载less css
	}),
	addLessLoader({
		lessOptions: {
			javascriptEnabled: true,
			sourceMap: true
		}
	}),
);
