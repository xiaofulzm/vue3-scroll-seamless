

const config = {
    themeConfig:{
        title:'lxuiaofu',
        siteTitle: 'vue3-scroll-seamless',
        nav: [
            { text: '指南', link: '/guide/' },
            { text: '更新日志', link: '/configs' },
            {   
                text: '其他版本',
                items: [
                    { text: 'Vue2版本', link: 'https://github.com/chenxuan0000/vue-seamless-scroll' },
                    { text: 'JavaScript版本', link: 'https://github.com/chenxuan0000/seamless-scroll' },
                ]
            },
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/xiaofulzm/vue3-scroll-seamless' }
        ],
        sidebar: {// 侧边栏
        '/guide/': [
            {
              text: '指南',
              items: [
                { text: '安装', link: '/guide/' },
                { text: '使用', link: '/guide/usage' },
                { text: '组件配置', link: '/guide/properties' },
                { text: '回调事件', link: '/guide/events' },
                { text: '注意项', link: '/guide/notice' },
                { text: '常见Issues', link: '/guide/issuesSolution' }
              ]
            },
            {
                text: '示例',
                items: [
                    { text: '01 - 默认配置', link: '/guide/01-basic' },
                    { text: '02 - 向下滚动', link: '/guide/02-direction-bottom' },
                    { text: '03 - 向右滚动', link: '/guide/03-direction-right' },
                    { text: '04 - 滚动速度', link: '/guide/04-step' },
                    { text: '05 - 静止鼠标悬停停止', link: '/guide/05-hoverStop' },
                    { text: '06 - 单步停顿', link: '/guide/06-singleStop' },
                    { text: '07 - 单行停顿时间', link: '/guide/07-singleStopTime' },
                    { text: '08 - switch控制切换', link: '/guide/08-switch' },
                    { text: '09 - echart图表无缝滚动', link: '/guide/09-echart' },
                    { text: '10 - 复杂结构数组属性更新问题', link: '/guide/10-array-property-update' },
                    { text: '11 - 滚动列表动态追加数据', link: '/guide/11-array-length-update' }
                   
                ]
              }
          ],
          
        },
        footer: {
            message: '欢迎给出一些意见和优化，期待你的 Pull Request.',
            copyright: '如有建议和疑问请前往issues.'
        }
    }
}
export default config;