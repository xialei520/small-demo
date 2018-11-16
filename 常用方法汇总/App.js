window.App = {
	/**
	 * @desc - 脱敏账号、手机号、证件号或者中文名字
	 * @param {val: string} - 要转换的字符串
	 * @example App.protect('13800138000') => 138****8000
	 * @example App.protect('张三') => 张**
	 */
	protect(val) {
		const REGEXP_MOBILE = /^(13[0-9]|15[7-9]|15[0-6]|18[5-9]|180|1[6-7]6)[0-9]{8}$/;
		const REGEXP_CNINA = /[\u4e00-\u9fa5]+$/;
		const MATCH_ACCOUNT = /^(\d{4})\d+(\d{4}|\d{3}[a-zA-Z])$/;
		const MATCH_MOBILE = /^(\d{3})\d+(\d{4}$)/;
		const MATCH_CNINA = /^([\u4e00-\u9fa5])[\u4e00-\u9fa5]+$/;

		if (val.length > 8) {
			return String(val).replace(
				REGEXP_MOBILE.test(val) ? MATCH_MOBILE : MATCH_ACCOUNT,
				($1, $2, $3) => $2 + '****' + $3
			);
		} else if (REGEXP_CNINA.test(val)) {
			return val.replace(MATCH_CNINA, ($1, $2, $3) => $2 + '**');
		} else {
			return val;
		}
	},
	/**
	 * @desc  检查字符串是否为合法的手机号码
	 * @param {number: string }  - 需要检验的手机号码
	 * @returns {boolean}  是否为合法手机号码
	 * @example let m1 = '13112345678';
	 * App.legalMobile(m1) => true;
	 * let m2 = '15312345678';
	 * App.legalMobile(m2) => false;
	 */
	legalMobile(string) {
		// let REGEXP_PHONE = new RegExp(/^(13[0-9]|15[5-9]|15[0-2]|18[4-9])[0-9]{8}$/)
		let REGEXP_PHONE = new RegExp(/^1\d{10}$/);
		return REGEXP_PHONE.test(string);
	}
}