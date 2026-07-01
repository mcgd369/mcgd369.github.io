import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '澳门美食指南',
  description: '探索澳门的美味佳肴 - 从葡国菜到中式点心，从街头小吃到米其林餐厅',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '澳门美食指南',

    nav: [
      { text: '首页', link: '/' },
      {
        text: '美食分类',
        items: [
          { text: '葡国菜', link: '/food/portuguese' },
          { text: '粤式点心', link: '/food/dim-sum' },
          { text: '街头小吃', link: '/food/street-food' },
          { text: '甜品糕点', link: '/food/desserts' },
        ],
      },
      { text: '美食地图', link: '/map' },
      { text: '关于我们', link: '/about' },
    ],

    sidebar: {
      '/food/': [
        {
          text: '美食分类',
          items: [
            { text: '葡国菜', link: '/food/portuguese' },
            { text: '粤式点心', link: '/food/dim-sum' },
            { text: '街头小吃', link: '/food/street-food' },
            { text: '甜品糕点', link: '/food/desserts' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mcgd369/mcgd369.github.io' },
    ],

    footer: {
      message: '用心品味澳门的每一道美食',
      copyright: 'Copyright © 2024 澳门美食指南',
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索美食',
                buttonAriaLabel: '搜索美食',
              },
              modal: {
                noResultsText: '没有找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                },
              },
            },
          },
        },
      },
    },

    outline: {
      label: '页面导航',
      level: [2, 3],
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },
  },
})
