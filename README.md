# 一个使用react开发的简单记账本

## 支持的功能：
1. 导入.csv账单文件（文件需要包含time, type, category, amount字段）（bill.csv）
2. 导入.csv说明文件（文件包含id, name字段，账单显示会将账单文件中的category字段替换为说明文件中对应的name字段内容）（category.csv）
3. 账单文件支持连续导入以及重新导入，连续导入时导入的文件的格式需要符合1中所述要求的csv账单文件，不符合则当前导入的文件失败，不会影响之前导入的账单数据显示
4. 账单列表信息支持年，月时间筛选，同时，如果导入了说明文件，则支持说明文件中name字段分类筛选
5. 账单信息收入支持分开显示，如果显示所有时间的账单信息，则账单列表按照时间先后顺序显示，若选择某年某月筛选条件，则会按照金额从小到大显示
6. 支持当前账单信息总收入总支出以及总净收益统计并显示

## 项目如何跑起来？

1. 将代码clone到本地
2. yarn安装依赖
3. yarn start即可进行本地测试
4. yarn build即可对项目进行打包

## 项目开发问题思考过程与解决：

1. 页面一共四个部分组成，分别是title, control, dataList, footer四个部分，control是文件导入，列表信息筛选等控制部分，dataList是列表信息展示部分。
2. control分为文件导入和信息筛选两部分，文件导入分为账单文件导入和账单说明文件导入，账单文件导入方式分为重新导入以及连续导入，信息筛选分为时间筛选和分类筛选。
3. 在control和dataList需要通信的数据有：解析后的账单列表，当前所选择的分类，当前所选择的时间。使用react-redux对这些数据进行管理。
4. 解析导入的文件使用<input type="file"></input>，我在这里对该按钮进行封装，本来准备使用Antd组件库里面的Upload组件，无奈该组件自由度不够，因此自己根据该组件库的样式进行封装。
5. 将导入的.csv文件解析为text文本文件后，需要经过一系列的处理然后传入到redux的store中，在此我将这些处理使用compose函数包装成调用栈，因此只需要修改该调用栈就能轻松插入删除数据处理逻辑。
6. 账单信息（bill.csv）中的category字段需要根据账单说明文件（category.csv）文件中的id, name字段进行解释，因此我对导入的说明文件中的id, name字段建立Map映射集，将映射集注册到dataMap
函数上，dataMap函数会针对传入的账单信息文件自动映射，注册映射集的同时可以传入在账单信息需要映射的字段（category），每次我们更新说明文件，useEffect监听到修改后都会自动更新映射集并
自动重新映射。
7. 每次重新导入前都需要清空已经导入的信息，导入文件首先被读取为text文本，然后包装成object类型的对象，第一步需要对text文本的title信息进行检测，如果缺失所要求的字段，则提示文件格式错误，
读取的数据被修改为undefined，在重新导入的方式下，之前的内容会被清空，连续导入则会保留之前的内容。
8. 导入说明文件后，需要提取其中的name字段作为分类筛选的条目。
9. 导入新文件时是根据文件名来判断是否之前已经导入过该文件。
10. dataList部分通过useSelector获取已导入的账单信息以及当前选择的筛选信息，也使用compose调用栈进行包装，此时只需要编写相应筛选函数并且传入到调用栈中即可。
11. dataList列表使用虚拟列表以应对大量账单条目的情形，列表高度根据当前需要显示条目个数弹性变化，最低显示6个条目，最多显示16个条目。
12. 列表条目先排序后分类，如果是选择显示所有时间的账单信息，则根据时间先后排序，如果选择了某个月份，则根据金额从小到大排序，排序完成后会根据收入还是支持分类显示。
