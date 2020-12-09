# cloud-computing-koa-server
云计算课程前端koa服务器，连接Hbase，为Vue前端提供数据支持

## 起步

~~~bash
# 安装依赖
npm install

# 启动本地服务器
npm run server
~~~

## 说明

* 连接 hbase 相关配置位于 src/data/consts.js 中，当读取数据失败时自动返回 mock 数据

## 接口说明

### 热度可视化

#### 获取当天的热度排行

* 方法：GET

* 路径：/hotTodayData

* 参数：

	* 无

* 返回：番剧热度信息数组

	* 番剧热度信息数据结构格式如下：

    |名称|类型|说明|
    |--|--|--|
    |commentSum|Number|评论总数（包括长评和短评）|
    |firstBroadcastTime|Number|首播日期时间戳（精确到天）|
    |hot|Number|热度|
    |id|String|番剧ID|
    |isWatchingSum|Number|在看总数|
    |name|String|番剧名称|
    |score|Number|评分（0~10）|
    |thumbUpSum|Number|点赞总数|
    |wantWatchSum|Number|想看总数|
    |watchedSum|Number|看过总数|

### 评分可视化

#### 获取番剧信息数组

* 方法：GET

* 路径：/cartoonInfoArr

* 参数：

	* 无

* 返回：番剧信息数组

	* 番剧信息数据结构格式如下：

    |名称|类型|说明|
    |--|--|--|
    |firstBroadcastTime|Number|首播日期时间戳（精确到天）|
    |id|String|番剧ID|
    |name|String|番剧名称|
    |postSrc|String|番剧海报图片URL|
    |homepage|String|主页URL|
    |score|Number|评分（0~10）|

#### 获取番剧评分变化

* 方法：GET

* 路径：/cartoonRankPath

* 参数：

    |名称|类型|说明|
    |--|--|--|
    |id|String|番剧ID|

* 返回：番剧评分信息数组

	* 番剧评分信息数据结构格式如下：
    
    |名称|类型|说明|
    |--|--|--|
    |score|Number|评分（0~10）|
    |time|Number|评分日期时间戳（精确到天）|

#### 获取时间范围内番剧评分排行变化

* 方法：GET

* 路径：/timeRangeCartoonRankPath

* 参数：

    |名称|类型|说明|
    |--|--|--|
    |from|Number|起始日期时间戳（精确到天，最早距今60天前）|
    |to|Number|结束日期时间戳（精确到天，最晚当天）|

* 返回：番剧评分详细信息二维数组

	* 一维用于表示不同天数

	* 番剧评分详细信息数据结构格式如下：
    
    |名称|类型|说明|
    |--|--|--|
    |id|String|番剧ID|
    |name|String|番剧名称|
    |score|Number|评分（0~10）|

### 用户推荐可视化

#### 随机推荐用户

* 方法：GET

* 路径：/randomUsers

* 参数：

    |名称|类型|说明|
    |--|--|--|
    |count|Number|推荐数量|

* 返回：用户信息数组

	* 用户信息数据结构格式如下：

    |名称|类型|说明|
    |--|--|--|
    |id|String|用户ID|
    |name|String|用户名称|

#### 获取推荐用户

* 方法：GET

* 路径：recommendUsers

* 参数：

    |名称|类型|说明|
    |--|--|--|
    |id|String|用户ID|

* 返回：用户信息数组

	* 数据结构同上
