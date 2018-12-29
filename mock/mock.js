const router = require('koa-router')();
var Mock = require('mockjs')
var Random = Mock.Random

const title = ["如何看antd圣诞彩蛋事件", "vue", "react-hooks", "webpack4.+", "测试圣诞"]
const description = ["React", "Antd", "Vue", "Webpack", "Babel", '前端', 'Ios', 'Android']

router.get('/list', (ctx, next) => {
    ctx.body = Mock.mock({
        "code": 200,
        "data|1-5": [
            {
                "id|+1": 1,
                "title|+1": title,
                "description|+1": description,
                "gmt_create": Random.datetime()
            }
        ]
    })
})

router.get('/userInfo', (ctx, next) => {
    ctx.body = Mock.mock({
        "code": 200,
        "data": {
            nickName: Random.cname(),
            email: Random.email(),
            github: Random.email(),
        }
    })
})

module.exports = router