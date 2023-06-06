import {request} from "../utils/request"
export function getProductDetail(data){
	return request({
	  url:"/product/detail",
	  method:"POST",
	  data
	})
}
// https://tea.qingnian8.com/product/detail