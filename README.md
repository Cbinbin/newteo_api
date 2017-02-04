# newteo_api

//
//  http://localhost:2017  =>  https://api.newteo.com  //

## 需求　
### 添加需求
```js
POST    http://localhost:2017/requirement?token=${token}
```

```js
{
    name: ${name},        //称呼(String)
    phone: ${phone},        //电话(Number)  !! 11位＆130~189开头的
    company: ${company},        //公司(String)
    info: ${info}        //需求(String)
}
```
=>    
```js
{
    "_id": "xxx",
    "name": "xxx",
    "phone": xxx,
    "company": "xxx",
    "info": "xxx",
    "create_time": "xxx"
}
```
### 查看需求
```js
GET    http://localhost:2017/requirement
```
=> Array    
### 查看单个需求
```js
GET    http://localhost:2017/requirement/:Id        //需求 Id
```
=> Object    
### 删除需求
```js
DELETE    http://localhost:2017/requirement/:Id?token=${token}        //需求 Id
```
=> 'requirement is deleted success'    

## 合作商
### 添加
```js
POST    http://localhost:2017/partner?token=${token}
```

```js
{
    name: ${name},        //公司名(String)
    introduction: ${introduction},        //公司简介(String)
    description: ${description}     //详情描述(String)
}
```
=>    
```js
{
    "_id": "xxx",        //合作商 Id
    "logo": "xxx",
    "name": "xxx",
    "introduction": "xxx",
    "description": "xxx",
    "create_time": "xxx",
    "products": [{
        "_id": "xxx",        //项目 Id
        "title": "xxx",
        "create_time": "xxx",
        "img": [{
            "_id": "xxx",        //图片 Id
            "img_url": "xxx"
        }]
    }]
}
```
### 查看
```js
GET    http://localhost:2017/partner
```
=> Array    
### 查看单个
```js
GET    http://localhost:2017/partner/:Id         //合作商 Id
```
=> Object    
### 删除
```js
DELETE    http://localhost:2017/partner/:Id?token=${token}         //合作商 Id
```
=> 'partner delete success'    

顺序: 先添加合作商，接着在添加 logo 或者 项目 ，有了项目再在项目中加图片．       

### 添加logo
```js
POST    http://localhost:2017/partner/:Id/logo?token=${token}         //合作商 Id
```
key: logo   
=> Object    
### 添加项目
```js
POST    http://localhost:2017/partner/:Id/product?token=${token}         //合作商 Id
```
```js
{
    title: ${title}        //项目名(String)
}
```
=> Object    
### 添加项目图片
```js
POST    http://localhost:2017/partner/product/:Id/img?token=${token}         //项目 Id
```
key: img   
=> Object    
### 删除项目
```js
DELETE    http://localhost:2017/partner/product/:Id?token=${token}         //项目 Id
```
=> 'product delete success'    

