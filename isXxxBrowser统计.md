# isXxxBrowser 方法跨项目统计文档

> 统计范围：5g、circle、gb、globalRich、hl_vue、mainunion、rjw、teacher、ycf-app、yljy、yp、ysf 共 12 个项目
> 去重规则：同名方法取 agent 匹配关键字最多（最全面）的实现版本为准
> 统计时间：2026-07-10

---

## 一、实现风格汇总

跨项目存在三种实现风格：

| 风格 | 使用项目 | 特点 |
|------|----------|------|
| **uaContains 模式** | 5g、circle、gb、ycf-app、yljy、yp、ysf、hl_vue | 使用内部工具函数 `getUserAgent()` + `uaContains()` + `uaContainsAny()`，代码最简洁 |
| **matchUA 模式** | rjw | 使用单一 `matchUA(keywords)` 辅助函数，风格统一 |
| **旧版冗余正则模式** | globalRich、mainunion、teacher | 每个方法独立使用 `RegExp()` + `match()` + `includes()` 样板代码，冗余度高 |

### 推荐统一风格（uaContains 模式）

```javascript
// UA 检测工具函数（内部使用）
const getUserAgent = () => {
  // #ifdef H5
  return window.navigator.userAgent.toLowerCase()
  // #endif
  return ''
}

const uaContains = (keyword) => {
  return getUserAgent().includes(String(keyword).toLowerCase())
}

const uaContainsAny = (keywords) => {
  const ua = getUserAgent()
  return keywords.some(kw => ua.includes(String(kw).toLowerCase()))
}
```

---

## 二、去重后的完整方法清单

共去重得到 **24 个独立方法**（不含同名异写的冗余方法）。每个方法取 agent 匹配最全面的版本为准。

### 1. isAppBrowser（聚合判断 - 任一 APP 浏览器）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | hl_vue |
| **匹配关键字** | 聚合所有子判断 |
| **agent 数量** | 12 种浏览器聚合 |
| **说明** | 聚合判断是否在任一 APP 浏览器内，覆盖最全 |

```javascript
export const isAppBrowser = () => {
  return isEastBrowser() || isYCFBrowser() || isJJTBrowser()
    || isYMBrowser() || isYMPBrowser() || isRJWBrowser()
    || isYSFBrowser() || isWCFishBrowser()
    || isHLBrowser() || isMUBrowser() || isQQYFBrowser() || || isGinkgoBrowser()
}
```

> **注意**：5g/ysf/yp 等项目使用 config 常量匹配自身 APP agent，属于项目专属判断，不应与聚合判断混淆。项目自身的 APP 判断建议命名为 `isXxxAppBrowser`（如 is5gAppBrowser）以区分。

### 2. isOldAppBrowser（项目自身旧版 APP 判断）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | ysf |
| **匹配关键字** | `ENV_APP_AGENT`（config 配置） |
| **说明** | 匹配项目自身配置的 APP agent 关键字 |

```javascript
export const isOldAppBrowser = () => uaContains(ENV_APP_AGENT)
```

### 3. isCircleBrowser（循环 APP 浏览器）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | 5g / circle / gb / ycf-app / yljy / yp / ysf / rjw |
| **匹配关键字** | `['circle', 'avocado']` |
| **agent 数量** | 2 |
| **说明** | globalRich 及 activity-webpack 仅匹配 `['circle']`，缺少 `avocado`，应补全 |

```javascript
export const isCircleBrowser = () => uaContainsAny(['circle', 'avocado'])
```

### 4. isEastBrowser（东方G保 APP 浏览器）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | 全部项目一致 |
| **匹配关键字** | `['litchieast']` |
| **agent 数量** | 1 |

```javascript
export const isEastBrowser = () => uaContains('litchieast')
```

### 5. isYCFBrowser（ycf APP 浏览器）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | 全部项目一致 |
| **匹配关键字** | `['ycf']` |
| **agent 数量** | 1 |

```javascript
export const isYCFBrowser = () => uaContains('ycf')
```

### 6. isJJTBrowser（基建 APP 浏览器）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | 全部项目一致（5g 使用 config 常量但值相同） |
| **匹配关键字** | `['jjt', 'smoothly0427']` |
| **agent 数量** | 2 |

```javascript
export const isJJTBrowser = () => uaContainsAny(['jjt', 'smoothly0427'])
```

### 7. isYMBrowser（圆梦名片 APP 浏览器）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | 全部项目一致 |
| **匹配关键字** | `['yuanmeng']` |
| **agent 数量** | 1 |

```javascript
export const isYMBrowser = () => uaContains('yuanmeng')
```

### 8. isYMPBrowser（圆梦计划 APP 浏览器）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | 全部项目一致 |
| **匹配关键字** | `['ypbr']` |
| **agent 数量** | 1 |

```javascript
export const isYMPBrowser = () => uaContains('ypbr')
```

### 9. isRJWBrowser（人际网 APP 浏览器）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | 全部项目一致 |
| **匹配关键字** | `['rjbr']` |
| **agent 数量** | 1 |

```javascript
export const isRJWBrowser = () => uaContains('rjbr')
```

### 10. isMUBrowser（主网联盟 APP 浏览器）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | 全部项目一致 |
| **匹配关键字** | `['mainunion', 'chain0702']` |
| **agent 数量** | 2 |

```javascript
export const isMUBrowser = () => uaContainsAny(['mainunion', 'chain0702'])
```

### 11. isYSFBrowser（云闪 APP 浏览器）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | 全部项目一致 |
| **匹配关键字** | `['cumquat', 'sheep121', 'brahmalotus']` |
| **agent 数量** | 3 |

```javascript
export const isYSFBrowser = () => uaContainsAny(['cumquat', 'sheep121', 'brahmalotus'])
```

### 12. isHLBrowser（大健康/青梅 APP 浏览器）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | 全部项目一致 |
| **匹配关键字** | `['greengage']` |
| **agent 数量** | 1 |

```javascript
export const isHLBrowser = () => uaContains('greengage')
```

### 13. isWeiXinBrowser（微信浏览器）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | 全部项目一致 |
| **匹配关键字** | `['micromessenger']` |
| **agent 数量** | 1 |

```javascript
export const isWeiXinBrowser = () => uaContains('micromessenger')
```

### 14. isWCFishBrowser（武昌鱼 APP 浏览器）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | hl_vue / mainunion / teacher |
| **匹配关键字** | `['wuchangfish']` |
| **agent 数量** | 1 |
| **说明** | 仅 hl_vue、mainunion、teacher 三个项目有此方法 |

```javascript
export const isWCFishBrowser = () => uaContains('wuchangfish')
```

### 15. isHuaweiBrowser（华为/鸿蒙浏览器）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | hl_vue |
| **匹配关键字** | `['huawei', 'harmony']` |
| **agent 数量** | 2 |
| **说明** | 仅 hl_vue 有此方法，独立系统浏览器判断，不参与 isAppBrowser 聚合 |

```javascript
export const isHuaweiBrowser = () => uaContainsAny(['huawei', 'harmony'])
```

### 16. isGinkgoBrowser（银杏/云联家园 APP 浏览器）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | globalRich（yljy activity-webpack 中 isYLBrowser 同义） |
| **匹配关键字** | `['ginkgo']` |
| **agent 数量** | 1 |
| **说明** | globalRich 独有 isGinkgoBrowser；yljy activity-webpack 中 isYLBrowser 匹配相同关键字，属于同义方法 |

```javascript
export const isGinkgoBrowser = () => uaContains('ginkgo')
```

### 17. isAndroidBrowser（安卓浏览器）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | activity-webpack（5g/yp/ysf/yljy/ycf/gb/circle/rjw） |
| **匹配关键字** | `['android']` |
| **agent 数量** | 1 |
| **说明** | 仅 activity-webpack 模块有此方法 |

```javascript
export const isAndroidBrowser = () => uaContains('android')
```

### 18. isYHBrowser（银汉商城 APP 浏览器）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | activity-webpack |
| **匹配关键字** | `['yhmall']` |
| **agent 数量** | 1 |
| **说明** | 仅 activity-webpack 模块有此方法 |

```javascript
export const isYHBrowser = () => uaContains('yhmall')
```

### 19. isYGBrowser（YG商城 APP 浏览器）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | activity-webpack |
| **匹配关键字** | `['ygmall']` |
| **agent 数量** | 1 |
| **说明** | 仅 activity-webpack 模块有此方法 |

```javascript
export const isYGBrowser = () => uaContains('ygmall')
```

### 20. isRJBrowser（人际 APP 浏览器）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | activity-webpack |
| **匹配关键字** | `['rjbr']` |
| **agent 数量** | 1 |
| **说明** | 与 isRJWBrowser 同义，仅 activity-webpack 模块使用此命名 |

```javascript
export const isRJBrowser = () => uaContains('rjbr')
```

### 21. isWXBrowser（微信浏览器 - 异名同义）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | activity-webpack |
| **匹配关键字** | `['micromessenger']` |
| **agent 数量** | 1 |
| **说明** | 与 isWeiXinBrowser 完全同义，仅 activity-webpack 模块使用此命名，建议统一为 isWeiXinBrowser |

```javascript
export const isWXBrowser = () => uaContains('micromessenger')
```

### 22. isQQBrowser（QQ 内置浏览器）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | activity-webpack |
| **匹配关键字** | `['qq', 'mqqbrowser']` |
| **agent 数量** | 2 |
| **说明** | 仅 activity-webpack 模块有此方法 |

```javascript
export const isQQBrowser = () => uaContainsAny(['qq', 'mqqbrowser'])
```

### 23. isYLBrowser（云联家园 APP 浏览器 - 异名同义）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | yljy activity-webpack |
| **匹配关键字** | `['ginkgo']` |
| **agent 数量** | 1 |
| **说明** | 与 isGinkgoBrowser 完全同义，仅 yljy activity-webpack 使用此命名，建议统一为 isGinkgoBrowser |

```javascript
export const isYLBrowser = () => uaContains('ginkgo')
```

### 24. isTargetMallApp（商城 APP 浏览器）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | teacher |
| **匹配关键字** | `['mall']` |
| **agent 数量** | 1 |
| **说明** | 仅 teacher 项目有此方法 |

```javascript
export const isTargetMallApp = () => uaContains('mall')
```

### 25. isQQYFBrowser（全球云富 APP 浏览器）

| 属性 | 内容 |
|------|------|
| **推荐实现来源** | yljy |
| **匹配关键字** | `['global/android']` |
| **agent 数量** | 1 |
| **说明** | 仅 teacher 项目有此方法 |

```javascript
export const isTargetMallApp = () => uaContains('global/android')
```

---

## 三、项目专属分拆方法（非通用，保留项目内使用）

以下方法为特定项目的分拆判断，不建议推广到其他项目：

### isAppBrowser1 / isAppBrowser2 / isAppBrowser3 / isAppBrowser4（5g 项目专属）

| 方法 | 匹配关键字 | 说明 |
|------|-----------|------|
| isAppBrowser1 | `'jjt'` (ENV_APP_AGENT1) | 基建 APP |
| isAppBrowser2 | `'smoothly0427'` (ENV_APP_AGENT2) | 基建 APP 旧版 |
| isAppBrowser3 | `'smoothly0427/2.0.10'` (ENV_APP_AGENT3) | 阅畅通 |
| isAppBrowser4 | `'smoothly0427/2.0.11'` (ENV_APP_AGENT4) | 5G链 |

> 5g 项目的 isAppBrowser 聚合了以上 4 个分拆方法，agent 匹配最全面（4 个）。其他项目如需匹配自身多个 agent，建议参考此分拆模式。

### isAppBrowser1 / isAppBrowser2（mainunion 项目专属）

| 方法 | 匹配关键字 | 说明 |
|------|-----------|------|
| isAppBrowser1 | `ENV_APP_AGENT` (config) | 主 agent |
| isAppBrowser2 | `ENV_APP_AGENT2` (config) | 副 agent |

### isApp1Browser / isApp2Browser（circle 项目专属）

| 方法 | 匹配关键字 | 说明 |
|------|-----------|------|
| isApp1Browser | `ENV_APP_AGENT` (config) | 主 agent |
| isApp2Browser | `ENV_APP_AGENT2` (config) | 副 agent |

### isTargetApp（teacher / mainunion 项目专属）

| 项目 | 实现 |
|------|------|
| teacher | 匹配 `['preschool', 'mall']` |
| mainunion | 聚合 `isAppBrowser1() \|\| isAppBrowser2()` |

### isJJTBrowser1 / isJJTBrowser2（5g activity-webpack 专属）

| 方法 | 匹配关键字 |
|------|-----------|
| isJJTBrowser1 | `'jjt'` |
| isJJTBrowser2 | `'smoothly0427'` |

> 已被 isJJTBrowser 聚合替代，不单独推荐。

---

## 四、各项目方法清单对比

| 方法名 | 5g | circle | gb | globalRich | hl_vue | mainunion | rjw | teacher | ycf-app | yljy | yp | ysf | activity-webpack |
|--------|:--:|:------:|:--:|:----------:|:------:|:---------:|:---:|:-------:|:-------:|:----:|:--:|:--:|:----------------:|
| isAppBrowser | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| isCircleBrowser | ✓ | ✓ | ✓ | ✓ | - | - | ✓ | - | ✓ | ✓ | ✓ | ✓ | ✓ |
| isEastBrowser | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| isYCFBrowser | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| isJJTBrowser | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| isYMBrowser | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| isYMPBrowser | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| isRJWBrowser | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| isMUBrowser | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| isYSFBrowser | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| isHLBrowser | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| isWeiXinBrowser | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| isWCFishBrowser | - | - | - | - | ✓ | ✓ | - | ✓ | - | - | - | - | - |
| isHuaweiBrowser | - | - | - | - | ✓ | - | - | - | - | - | - | - | - |
| isGinkgoBrowser | - | - | - | ✓ | - | - | - | - | - | - | - | - | - |
| isAndroidBrowser | - | - | - | - | - | - | - | - | - | - | - | - | ✓ |
| isYHBrowser | - | - | - | - | - | - | - | - | - | - | - | - | ✓ |
| isYGBrowser | - | - | - | - | - | - | - | - | - | - | - | - | ✓ |
| isRJBrowser | - | - | - | - | - | - | - | - | - | - | - | - | ✓ |
| isWXBrowser | - | - | - | - | - | - | - | - | - | - | - | - | ✓ |
| isQQBrowser | - | - | - | - | - | - | - | - | - | - | - | - | ✓ |
| isYLBrowser | - | - | - | - | - | - | - | - | - | - | - | - | ✓(yljy) |
| isTargetApp | - | - | - | - | - | ✓ | - | ✓ | - | - | - | - | - |
| isTargetMallApp | - | - | - | - | - | - | - | ✓ | - | - | - | - | - |
| isQQYFBrowser | - | - | - | - | - | - | - | - | - | ✓ | - | - | - |

---

## 五、同义异名方法（建议统一命名）

以下方法对功能完全相同，仅命名不同，建议统一命名以减少混淆：

| 保留命名 | 废弃命名 | 匹配关键字 | 出现位置 |
|----------|----------|-----------|----------|
| isWeiXinBrowser | isWXBrowser | `['micromessenger']` | activity-webpack 使用 isWXBrowser |
| isRJWBrowser | isRJBrowser | `['rjbr']` | activity-webpack 使用 isRJBrowser |
| isGinkgoBrowser | isYLBrowser | `['ginkgo']` | yljy activity-webpack 使用 isYLBrowser |

---

## 六、推荐统一实现（完整代码）

基于去重结果，推荐以下统一实现（uaContains 模式）：

```javascript
// UA 检测工具函数（内部使用）
const getUserAgent = () => {
  // #ifdef H5
  return window.navigator.userAgent.toLowerCase()
  // #endif
  return ''
}

const uaContains = (keyword) => {
  return getUserAgent().includes(String(keyword).toLowerCase())
}

const uaContainsAny = (keywords) => {
  const ua = getUserAgent()
  return keywords.some(kw => ua.includes(String(kw).toLowerCase()))
}

// ========== 各业务 APP 浏览器判断 ==========
export const isCircleBrowser = () => uaContainsAny(['circle', 'avocado'])
export const isEastBrowser = () => uaContains('litchieast')
export const isYCFBrowser = () => uaContains('ycf')
export const isJJTBrowser = () => uaContainsAny(['jjt', 'smoothly0427'])
export const isYMBrowser = () => uaContains('yuanmeng')
export const isYMPBrowser = () => uaContains('ypbr')
export const isRJWBrowser = () => uaContains('rjbr')
export const isMUBrowser = () => uaContainsAny(['mainunion', 'chain0702'])
export const isYSFBrowser = () => uaContainsAny(['cumquat', 'sheep121', 'brahmalotus'])
export const isHLBrowser = () => uaContains('greengage')
export const isWCFishBrowser = () => uaContains('wuchangfish')
export const isGinkgoBrowser = () => uaContains('ginkgo')
export const isQQYFBrowser = () => uaContains('global/android')


// ========== 系统浏览器判断 ==========
export const isWeiXinBrowser = () => uaContains('micromessenger')
export const isQQBrowser = () => uaContainsAny(['qq', 'mqqbrowser'])
export const isAndroidBrowser = () => uaContains('android')
export const isHuaweiBrowser = () => uaContainsAny(['huawei', 'harmony'])

// ========== 聚合判断 ==========
export const isInBrandAppBrowser = () => {
  return isEastBrowser() || isYCFBrowser() || isJJTBrowser()
    || isYMBrowser() || isYMPBrowser() || isRJWBrowser()
    || isYSFBrowser() || isWCFishBrowser()
    || isHLBrowser() || isMUBrowser() || isQQYFBrowser() || isGinkgoBrowser()
}
```

---

## 七、待修复项

| 问题 | 涉及项目 | 状态 |
|------|----------|------|
| isCircleBrowser 缺少 `avocado` 关键字 | globalRich、activity-webpack 全部 | ✅ 已修复 — globalRich 主项目 + 9 个 activity-webpack env.js 全部补全为 `['circle', 'avocado']` |
| isWXBrowser 与 isWeiXinBrowser 同义 | activity-webpack 全部 | ✅ 已修复 — 8 个移除 isWXBrowser（保留 isWeiXinBrowser），2 个（ysf/rjw）重命名；rjw 重复定义已清理；所有调用方已同步更新 |
| isRJBrowser 与 isRJWBrowser 同义 | activity-webpack 全部 | ✅ 已修复 — 10 个 env.js 全部重命名为 isRJWBrowser，所有调用方已同步更新 |
| isYLBrowser 与 isGinkgoBrowser 同义 | yljy、globalRich activity-webpack | ✅ 已修复 — yljy 和 globalRich activity-webpack 均已重命名为 isGinkgoBrowser，调用方已同步更新 |
| 旧版冗余正则模式未优化 | globalRich、mainunion、teacher | ✅ 已修复 — 三个项目全部迁移为 uaContains 模式 |
| isAppBrowser 语义混乱 | 5g/ysf/yp 等 | ⏳ 待处理 — 需区分"自身APP判断"与"聚合APP判断"， 自身APP的agent一般在config文件夹下的ENV_APP_AGENT参数，自身判断命名 isXxxAppBrowser，聚合APP判断命名 isInBrandAppBrowser |
