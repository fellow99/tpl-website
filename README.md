# tpl-website — 多端业务应用框架官网

> 简体中文介绍官网 · 纯原生 HTML + CSS + JS · 浅色 / 暗色主题切换
>
> 本文件同时作为 **设计记录**（Design Record）—— 记录本站的策划思路、视觉决策与实现约定。

---

## 一、定位与策划

### 1.1 产品定位

`tpl-workspace` 是**多端业务应用框架**，而非某个具体业务系统。官网的目标读者是：

- **技术决策者 / 架构师**：评估「这套骨架能否承载我的业务」
- **一线开发者**：了解「有哪些开箱即用能力，如何快速上手」
- **潜在贡献者 / 集成方**：理解整体架构与技术栈边界

因此官网的叙事主线是：**「一套骨架，贯通五端」** —— 用工程骨架的可复用性，降低多端业务应用的重复建设成本。

### 1.2 Slogan 与价值主张

| 层级 | 文案 |
|------|------|
| **主标语** | 一套骨架，贯通五端 |
| **副标题** | 多端业务应用框架 —— Web · Android · HarmonyOS · 微信小程序 · 管理后台，统一工程结构、双后端服务、跨端设计系统与一键容器化部署 |
| **价值主张** | 不绑定业务领域，沉淀多端通用能力：统一工程结构、跨端一致的设计系统、国际化与主题支持、容器编排部署。接入业务即可快速产出覆盖五端的完整产品。 |

### 1.3 核心卖点（6 张特性卡片）

| 卖点 | 一句话说明 |
|------|-----------|
| **多端覆盖** | 用户端 Web / Android / HarmonyOS / 微信小程序 + Web 管理后台，一套架构贯穿五端 |
| **双后端服务** | 用户端 API（独立 Spring Boot 4.1）+ 管理端（RuoYi-Vue-Plus），职责清晰、可独立演进 |
| **统一设计系统** | 一套 Design Tokens（色彩 / 字体 / 间距）跨端复用，保证多端视觉一致 |
| **国际化** | 三语言（zh-CN / en-US / zh-TW）语料单一事实源，脚本自动同步到各端 |
| **主题支持** | light / dark / system 三态主题，深浅色皮肤联动 |
| **部署编排** | Docker Compose 一键编排 PostgreSQL / Redis / 双后端 / 前端 / Nginx 网关 |

### 1.4 技术栈展示

按端分组的标签式展示（不堆砌，突出「每一端都用主流技术」）：

| 端 | 技术 |
|----|------|
| 用户端 Web | Vue 3 + TypeScript + Vite（纯 CSS 设计系统，无 UI 框架） |
| 管理端 Web | RuoYi-Vue-Plus-UI（Vue 3 + Element Plus） |
| 用户端后端 | Spring Boot 4.1 + JDK 21 + Sa-Token + MyBatis-Plus |
| 管理端后端 | RuoYi-Vue-Plus 6.0（Spring Boot + JDK 21） |
| Android | Kotlin + Jetpack + Material 3 |
| HarmonyOS | ArkTS + ArkUI（Stage 模型） |
| 微信小程序 | TypeScript + Skyline 渲染 + glass-easel |
| 数据 / 缓存 / 存储 | PostgreSQL · Redis · MinIO |
| 部署 | Docker Compose + Nginx 网关 |

### 1.5 叙事与页面结构（单页滚动）

```
┌─ 顶栏 (sticky) ──────────────────────────────────┐
│ Logo · 特性 · 技术栈 · 架构 · 快速开始    [🌙/☀️] │
├──────────────────────────────────────────────────┤
│ Hero：主标语 + 副标题 + 双 CTA + 五端徽章         │
│       + 轻量架构示意图（SVG）                     │
├──────────────────────────────────────────────────┤
│ 核心特性：6 张卖点卡片（hover 微动效）            │
├──────────────────────────────────────────────────┤
│ 技术栈：分端标签表                               │
├──────────────────────────────────────────────────┤
│ 系统架构：架构示意 + 数据流说明                   │
├──────────────────────────────────────────────────┤
│ 快速开始：三步代码块（clone / up / 访问）+ 复制   │
├──────────────────────────────────────────────────┤
│ 页脚：License · 工程链接 · 技术栈徽章            │
└──────────────────────────────────────────────────┘
```

---

## 二、视觉决策

### 2.1 对齐 `DESIGN.md` 设计系统

官网是框架的一部分，必须复用既有品牌设计语言（单一事实源），不另起炉灶：

- **品牌色**：靛青 `#3B5998`（Primary，主导航/标题/选中）、金曦 `#E8923C`（Accent，CTA 强调）
- **中性色（亮）**：素笺 `#F7F5F0`（背景）、净白 `#FFFFFF`（卡片）、墨墨 `#292522`（正文）、砚灰 `#6E6A65`（次要文字）、银线 `#D9D4CC`（边框）
- **暗色皮肤**：背景 `#1A1C1E`、卡片 `#26282B`、正文 `#E8E4DE`、次要 `#A8A29A`、边框 `#3A3A38`；Primary 提亮为 `#5B7DB1`，Accent 不变
- **字体**：`PingFang SC / HarmonyOS Sans / Microsoft YaHei / Noto Sans SC` 中文栈；等宽用 `JetBrains Mono / Fira Code / Consolas`
- **字号阶梯**：基于 4px 栅格，中文阅读优化（display 32 / h1 24 / h2 20 / h3 17 / body 15 / caption 11）
- **圆角**：卡片 8px、大卡片 12px、CTA 胶囊 24px、输入 6px
- **阴影**：极淡 `0 1px 3px rgba(0,0,0,.06)`；hover 加深至 `0 2px 8px rgba(0,0,0,.10)` + 上移 2px

### 2.2 动效原则（克制）

- 过渡 `150ms–300ms`，缓动 `cubic-bezier(0,0,0.2,1)`
- 卡片 hover：`translateY(-2px)` + 阴影加深
- 区块进入：`fade + translateY` 轻淡入（IntersectionObserver 驱动）
- **必须**尊重 `prefers-reduced-motion`：关闭非必要动效，淡入改为直接显示

### 2.3 主题实现

- `<html data-theme="light|dark">` 驱动，CSS 用角色变量两层（`--color-*` 角色变量 + 语义别名），暗色只覆盖角色变量层
- **首屏无闪烁**：`<head>` 内联脚本同步读取 `localStorage('tpl-theme')` → 否则 `prefers-color-scheme` → 写入 `data-theme`
- **切换按钮**：太阳/月亮图标切换；点击写入 `localStorage` 并更新 `data-theme` 与图标 `aria-label`
- **系统联动**：无本地记忆时监听 `prefers-color-scheme` 变化自动跟随

### 2.4 无障碍

- 正文对比度 ≥ 4.5:1（WCAG AA）
- 交互元素最小 `44×44px`，支持键盘导航
- 图标按钮带 `aria-label`；导航用 `<nav>`/`<main>`/`<footer>` 语义标签
- `:focus-visible` 靛青 2px 焦点环，偏移 2px

---

## 三、实现约定

### 3.1 文件结构

```
tpl-website/
├── index.html          # 单页入口（含 head 内联防闪烁脚本）
├── style/
│   └── main.css        # 全部样式：角色变量 + 主题 + 布局 + 组件 + 响应式 + 动效
├── js/
│   └── main.js         # 主题切换/记忆、导航高亮、平滑滚动、代码复制、滚动淡入
└── images/
    └── logo.svg        # 品牌 Logo（SVG，随主题变色）
```

### 3.2 约束

- **纯原生**：不使用任何框架 / 构建工具 / 外部 CDN / 第三方 JS 库
- 无 `fetch`、无网络依赖，静态可离线
- CSS / JS 均为单文件（本项目体量无需拆分）
- 简体中文文案，`<html lang="zh-CN">`
- 响应式：移动优先（375px 基准）→ 平板（640px）→ 桌面（>1024px，内容居中 max-width 1120px）

### 3.3 部署约定（详见 `../deploy/README.md`）

- `deploy/Dockerfile.tpl-website`：基于 `nginx:latest`，**只**拷贝 `*.html` / `images/` / `js/` / `style/`，静态直拷、无构建步骤
- `deploy/docker-compose.yml`：新增 `tpl-website` 服务（内部 :80）
- Nginx 网关（:38088）：根路径 `/` → `tpl-website`；`/web/`、`/manage/`、`/api/` 等路由保持不变
- 访问入口：`http://localhost:38088/`

---

## 四、验收标准

1. `http://localhost:38088/` 返回官网（非用户端 SPA）
2. 主题切换按钮可在浅/暗间切换；刷新后记忆；首访跟随系统偏好
3. 控制台无报错；桌面 + 移动（375px）布局均不破版
4. Docker 构建只包含网站文件（无 node_modules、无源码冗余）
5. `/web/`、`/manage/` 既有路由不受影响
