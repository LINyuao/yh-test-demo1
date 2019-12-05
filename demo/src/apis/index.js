// import Axios from "@/utils/request";
import Axios from "@/utils/myAxios";

export default {
  user(params) {
    return Axios({ url: "/user", method: "post", params: params });
  },
  login(params) {
    return Axios({ url: "/login", method: "post", params: params });
  },
  register(params) {
    return Axios({ url: "/register", method: "post", params: params });
  },
  noticeClass(params) {
    return Axios({ url: "/noticeClass", method: "post", params: params });
  },
  noticeSchool(params) {
    return Axios({ url: "/noticeSchool", method: "post", params: params });
  },
  noticeDean(params) {
    return Axios({ url: "/noticeDean", method: "post", params: params });
  },
  taskAlready(params) {
    return Axios({ url: "/taskAlready", method: "post", params: params });
  },
  taskAwait(params) {
    return Axios({ url: "/taskAwait", method: "post", params: params });
  },
  classes(params) {
    return Axios({ url: "/classes", method: "post", params: params });
  },
  inserttaskAwait(params) {
    return Axios({ url: "/inserttaskAwait", method: "post", params: params });
  },
  switchtask(params) {
    return Axios({ url: "/switchtask", method: "post", params: params });
  },
  selecttask(params) {
    return Axios({ url: "/selecttask", method: "post", params: params });
  },
  deletetask(params) {
    return Axios({ url: "/deletetask", method: "post", params: params });
  },
  taskdetail(params) {
    return Axios({ url: "/taskdetail", params: { params } });
    //get
  },
  classpay(params) {
    return Axios({ url: "/classpay", method: "post", params: params });
  },
  oddclasspay(params) {
    return Axios({ url: "/oddclasspay", method: "post", params: params });
  },
  insertclasspay(params) {
    return Axios({ url: "/insertclasspay", method: "post", params: params });
  },
  editclasspay(params) {
    return Axios({ url: "/editclasspay", method: "post", params: params });
  },
  deleteclasspay(params) {
    return Axios({ url: "/deleteclasspay", method: "post", params: params });
  },
  office(params) {
    return Axios({ url: "/office", method: "post", params: params });
  },
  deleteapproval(params) {
    return Axios({ url: "/deleteapproval", method: "post", params: params });
  },
  insertapproval(params) {
    return Axios({ url: "/insertapproval", method: "post", params: params });
  },
  oddapproval(params) {
    return Axios({ url: "/oddapproval", method: "post", params: params });
  },
  editapproval(params) {
    return Axios({ url: "/editapproval", method: "post", params: params });
  },
  officeing(params) {
    return Axios({ url: "/officeing", method: "post", params: params });
  },
  insertapprovaling(params) {
    return Axios({ url: "/insertapprovaling", method: "post", params: params });
  },
  approvaldetail(params) {
    return Axios({ url: "/approvaldetail", params: { params } });
    //get
  },
  approvalend(params) {
    return Axios({ url: "/approvalend", method: "post", params: params });
  },
  switchapproval(params) {
    return Axios({ url: "/switchapproval", method: "post", params: params });
  },
  deleteapprovaling(params) {
    return Axios({ url: "/deleteapprovaling", method: "post", params: params });
  },
  approvalenddetail(params) {
    return Axios({ url: "/approvalenddetail", params: { params } });
    //get
  },
  classleave(params) {
    return Axios({ url: "/classleave", method: "post", params: params });
  },
  insertclassleave(params) {
    return Axios({ url: "/insertclassleave", method: "post", params: params });
  },
  classleaveend(params) {
    return Axios({ url: "/classleaveend", method: "post", params: params });
  },
  switchclassleaveend(params) {
    return Axios({
      url: "/switchclassleaveend",
      method: "post",
      params: params
    });
  },
  deleteclassleaveend(params) {
    return Axios({
      url: "/deleteclassleaveend",
      method: "post",
      params: params
    });
  }
};
