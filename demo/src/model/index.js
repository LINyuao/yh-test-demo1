export const Test = "测试文本";
export const menus = [
  {
    name: "会员管理",
    icon: "el-icon-location",
    children: [
      {
        name: "会员列表",
        routerName: "home"
      },
      {
        name: "送呗列表",
        routerName: "send"
      }
    ]
  },
  {
    name: "数据",
    icon: "el-icon-menu",
    children: [
      {
        name: "省市分析",
        routerName: "areaAnalysis"
      },
      {
        name: "影片分析",
        routerName: "filmAnalysis"
      },
      {
        name: "渠道分析",
        routerName: "channelAnalysis"
      }
    ]
  },
  {
    name: "测试"
  }
];
