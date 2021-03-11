# boilerplate-vue

## 简介

boilerplate-vue 是一个面向中国用户的简单 vue 模板，目标是帮助你快速搭建网页。当然，也希望能引导你更进一步地了解 vue 生态。

当前是 vue3 分支，**暂未稳定**。要查看 vue2 模板，请切换到 vue2 分支。

### 主要依赖

- [typescript](https://www.typescriptlang.org/)
- [vue3](https://v3.cn.vuejs.org)
- [vue-cli](https://next.cli.vuejs.org/zh/)
- [vue-router](https://next.router.vuejs.org/zh/)
- [vuex](https://next.vuex.vuejs.org/)
- [vue-use](https://vueuse.js.org/)
- [mitt](https://github.com/developit/mitt#readme)
- [electron](https://www.electronjs.org/)
- [electron-builder](https://www.electron.build/)
- [vue-i18n](https://kazupon.github.io/vue-i18n/zh/)
- [axios](https://github.com/axios/axios#readme)
- [element-plus](https://element-plus.org/) - 之后会切换到 vuetify v3
- [better-scroll](https://better-scroll.github.io/docs/zh-CN/guide/)
- [lodash](https://lodash.com/)
- [xe-utils](https://github.com/x-extends/xe-utils#readme)
- [dayjs](https://dayjs.gitee.io/zh-CN/)
- [nprogress](https://ricostacruz.com/nprogress/)
- [faker.js](https://github.com/marak/Faker.js/#readme)
- [sass](https://sass-lang.com/) - 使用了 [dart-sass](https://sass-lang.com/dart-sass)
- [jest](https://jestjs.io/)
- [commitizen](http://commitizen.github.io/cz-cli/)
- [commitlint](https://commitlint.js.org/)
- [prettier](https://prettier.io/)
- [markdownlint](https://github.com/igorshubovych/markdownlint-cli#readme)
- [eslint](https://eslint.org/)
- [stylelint](https://stylelint.io/)
- [ls-lint](https://ls-lint.org/)
- [husky](https://github.com/typicode/husky#readme)
- [lint-staged](https://github.com/okonet/lint-staged#readme)
- [@modyqyw/fabric](https://github.com/ModyQyW/fabric#readme)
- [npm-check-updates](https://github.com/raineorshine/npm-check-updates#readme)

请先阅读上面的文档，并确保你对 node 和 npm 有基本的理解。

## 起步

这部分说明将让你得到能在本地运行的项目副本以开始开发。有关如何部署项目，请阅读[部署部分](#部署)。

### 准备

你可能需要使用梯子或手机 WiFi 完成准备步骤。

对于 macOS 用户，请按照以下指引操作。

```sh
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
# 设置 nvm 镜像
export NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node
# 安装 node@12
nvm install 12
# 设置 node@12 为默认版本
nvm alias default 12
# 安装 yarn
npm i -g yarn --registry=https://registry.npm.taobao.org

```

接着，请参考[清华大学开源软件镜像站 Homebrew / Linuxbrew 镜像使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/)安装 Homebrew。

最后，安装 Git 并修改默认配置。

```sh
# 安装 git
brew install git
# 不自动转换换行符
git config --global core.autocrlf false
# 设置默认分支名为 main
git config --global init.defaultBranch main

```

对于 Windows 用户，请按照以下指引操作。

首先安装 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases/download/1.1.7/nvm-setup.zip) 和 [Git](https://git-scm.com/downloads)。

如果你正在使用 [Chocolatey](https://chocolatey.org/)，你也可以通过命令安装。

```sh
choco install nvm
choco install git
```

然后配置即可。

```sh
# 不自动转换换行符
git config --global core.autocrlf false
# 设置默认分支名为 main
git config --global init.defaultBranch main
# 设置 nvm 镜像
nvm node_mirror https://npm.taobao.org/mirrors/node/
# 安装 node@12
nvm install 12.20.2
# 使用 node@12
nvm use 12.20.2
# 安装 yarn
npm i -g yarn --registry=https://registry.npm.taobao.org

```

其它系统请根据以上指引自行调整。

### 安装

```sh
# clone 项目到本地
git clone git@github.com:MillCloud/boilerplate-vue.git
# git clone git@gitee.com:MillCloud/boilerplate-vue.git
# 进入项目
cd boilerplate-vue
# 安装依赖
yarn
# 启动项目
yarn dev

```

如果一切正常，此时模板已经启动了，你可以正式开始你的开发。但如果你想通过文档了解更多，请先阅读[主要依赖](#主要依赖)内链接对应的文档，再继续阅读下去。

## 使用

这部分说明力求使你能自顶向下地理解这个模板已经替你完成的工作，以及你需要自行完成的工作。

### 特性

- 多模式配置示例，支持 development，staging 和 production
- 国际化配置示例，支持 en 和 zh-Hans
- 路由配置示例
- 状态管理配置示例
- 请求配置示例
- 布局示例
- electron 示例

### 命令

模板里内置了较多命令，以适应各种不同的情况。更多的命令你可以查看 [package.json](./package.json)。

|命令|含义|
|-|-|
|`yarn dev`|development 模式启动项目|
|`yarn staging-build`|staging 模式打包项目|
|`yarn build`|production 模式打包项目|
|`yarn electron:dev`|electron development 模式启动项目|
|`yarn electron:staging-build`|electron staging 模式打包项目|
|`yarn electron:build`|electron production 模式打包项目|
|`yarn run check`|检查项目依赖版本|
|`yarn commit`|引导填写 git 提交信息并提交，你需要手动 git add 对应部分后执行该命令|
|`yarn i18n:report`|获取国际化信息|
|`yarn test:unit`|单元测试|
|`yarn lint`|检查 json 文件，脚本文件，样式文件和目录|
|`yarn lint:json`|格式化 json 文件|
|`yarn lint:markdown`|格式化 markdown 文件|
|`yarn lint:script`|检查并自动修复脚本文件|
|`yarn lint:style`|检查并自动修复样式文件|
|`yarn lint:ls`|检查目录|

### 项目结构

```sh
.
├── public
├── src
│   ├── assets                  # 资产目录
│   ├── components              # 全局组件目录
│   ├── composables             # 组合式函数目录
│   │   ├── apis                # 请求接口的组合式函数目录
│   │   ├── index.ts            # 组合式函数入口
│   │   ├── useAxios.ts         # 进一步封装 vue-use useAxios
│   │   ├── useLanguage.ts      # 获取和设置语言的组合式函数目录
│   │   └── useToken.ts         # 获取和设置登录态的组合式函数目录
│   ├── i18n                    # 国际化目录
│   ├── layout                  # 布局目录
│   ├── plugins                 # 插件目录
│   ├── router                  # 路由目录
│   ├── store                   # 状态管理目录
│   ├── styles                  # 全局样式和全局变量目录
│   ├── utils                   # 工具方法目录
│   ├── views                   # 页面视图目录
│   ├── App.vue
│   ├── background.ts           # electron 主进程文件
│   ├── guard.ts                # 导航守卫
│   ├── main.ts
│   └── preload.ts              # electron 预加载文件
├── tests                       # 测试内容文件夹
├── typings                     # typescript 定义文件夹
├── .browserslistrc             # 浏览器支持列表文件
├── .editorconfig
├── .env                        # 所有环境都载入的环境变量
├── .env.development            # development 载入的环境变量
├── .env.production             # production 载入的环境变量
├── .env.staging                # staging 载入的环境变量
├── .eslintignore               # eslint 配置文件
├── .eslintrc.js                # eslint 配置文件
├── .gitattributes              # git 配置文件
├── .gitignore                  # git 配置文件
├── .ls-lint.yml                # ls-lint 配置文件
├── .markdownlint.json          # markdownlint 配置文件
├── .markdownlintignore         # markdownlint 配置文件
├── .npmrc                      # npm 镜像文件
├── .prettierignore             # prettier 配置文件
├── .stylelintignore            # stylelint 配置文件
├── .yarnrc                     # yarn 镜像文件
├── babel.config.js             # babel 配置文件
├── commitlint.config.js        # commitlint 配置文件
├── package.json
├── prettier.config.js          # prettier 配置文件
├── README.md
├── stylelint.config.js         # stylelint 配置文件
├── tsconfig.json               # typescript 配置文件
├── vue.config.js               # vue-cli 配置文件
└── yarn.lock
```

### 多模式配置

模板内置了四个环境变量文件。

#### .env

所有模式都会载入这个环境变量文件。

它里面包含了两个国际化变量 `VUE_APP_I18N_LOCALE` 和 `VUE_APP_I18N_FALLBACK_LOCALE`，值都是 `zh-Hans`，表示默认使用简体中文。

另外，它还包含了请求变量 `VUE_APP_TIMEOUT`，用于指定请求的超时时间，值为 `10000`，表示 10 秒超时。

#### .env.staging

staging 模式下，这个环境变量文件会被载入。

它使用 `VUE_APP_MODE` 指定当前模式为 staging，`NODE_ENV` 指定运行模式为 production。

请区分当前模式和运行模式。当前模式可以由我们任意指定，而运行模式只能是 development，production 和 test 的其中一个，它会影响实际构建的表现和效果。在代码中，你可以根据实际情况，使用它们对代码做差异化处理。

另外，它还指定了项目构建后的 publicPath `VUE_APP_PUBLIC_PATH`，值为 `/`，表示使用根目录。

而 `VUE_APP_BASE_PATH` 指定了请求的前缀地址，值为 `https://fake.url`，这是一个假地址，在实际使用时需要修改。

.env.development，.env.production 都和 .env.staging 的内容大同小异，在这里不再赘述。

如果你还需要添加更多的模式，请参考以上的说明添加对应的环境变量文件。另外，也请修改 package.json 内的 scripts，添加对应的构建命令。

### 国际化配置

模板内置了两种语言配置，分别是简体中文和英语。

简体中文文件是 [@/i18n/locales/zh-Hans.json](./src/i18n/locales/zh-Hans.json)，英语文件是 [@/i18n/locales/en.json](./src/i18n/locales/en.json)。

你可以在上面两个文件里加入你需要的字段以支持翻译，务必注意字段需要保持一致，也请注意合理地划分字段。

而要引入和 vue3 强绑定的 npm 库的语言包，你可以在 [@/i18n/index.js](./src/i18n/index.js) 内操作。目前已经为 element-plus 添加了语言包，你可以参考着为其他和 vue3 强绑定的 npm 库添加语言包。

引入和 vue3 不强绑定的 npm 库的语言包，请查看它们的文档说明。

### 路由配置

TODO

### 状态管理配置

TODO

### 请求配置

#### axios 封装

模板封装了 vue-use 提供的 useAxios 组合式函数。你可以修改[封装文件](./src/plugins/request.js)默认的配置以匹配业务。

#### proxy

在 development 模式下请求服务器往往会出现跨域问题，因此模板内已经设置了 devServer.proxy，见 [vue.config.js](./vue.config.js) L72。

理论上，devServer.proxy 应该与 production 运行模式下的 `VUE_APP_BASE_URL` 一致。

### 布局

模板内使用 element-plus 实现了 vuetify 提供的[默认布局](./src/layout/index.vue)。

常见的布局可以参考 [Ant Design 示例](https://ant-design.gitee.io/components/layout-cn/)，你可以修改布局组件的属性，或添加对应的样式来调整布局。你也可以参考 vuetify 官网。

我们会试图让布局适用于所有页面。试想这么一个情况：登录页面只显示 `el-main` 部分，而在其它页面显示所有部分。直接使用默认布局是不能实现的，所以有必要根据不同的路由来调整布局组件，只需要获取当前路由信息并加以判断即可。

我们也可能根据用户角色生成路由和侧边栏，模板内置的该部分功能较为薄弱，且思路源自 vue-element-admin，请查看 vue-element-admin [路由和侧边栏](https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html)和[权限验证](https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/permission.html)阐述的思路。

### electron

模板默认集成 electron，你可以快速开始你的 electron 开发。

模板内提供了 ipc 的演示示例，请全局搜索 ipc 查看。

### VSCode 支持

你可以参考[插件](https://www.yuque.com/modyqyw/environment/skhbfr)和 [settings.json](https://www.yuque.com/modyqyw/environment/aozv2q)。

### 测试

目前有单元测试，并提供了对 `@/utils` 下两个文件的单元测试。

如果需要添加单元测试，请先学习 [Jest](https://jestjs.io/)。

如果需要添加其它测试，请查看[文档说明](https://cn.vuejs.org/v2/guide/testing.html)。

### 部署

- 确认所有和[模式和环境变量](https://cli.vuejs.org/zh/guide/mode-and-env.html)相关的地方已经配置完成。
- 运行对应的命令，然后上传 `dist` 目录下的内容，默认会生成报告。

### 浏览器支持

请查看 [.browserslistrc](./.browserslistrc)。
