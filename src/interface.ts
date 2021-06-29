/**********************************************************************
 *
 * @模块名称: interface
 *
 * @模块用途: interface
 *
 * @创建人: ligaoming
 *
 * @date: 2021/6/23 11:35
 *
 * @版权所有: PGLI
 *
 **********************************************************************/
/**
 * 插槽
 */
interface Slot {
	children?: Element;
}

/**
 * 员工信息
 */
export interface UserProps extends Slot {
	name?: string;
	jobNumber?: number;
}