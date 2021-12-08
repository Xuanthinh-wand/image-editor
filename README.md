
# ![Removal Logo](https://removal.ai/wp-content/uploads/2020/03/fasion.png) Removal Editor
---
## Information
- Author: Lê Hoàng Trình
- Website: [https://lehoangtrinh.com](https://lehoangtrinh.com)
- Time: 24/08/2020

## Instructions to add applications to wordpress
1. Build application
```
yarn build
```
2. Copy the folder to the website you want
3. Add to the page you want to insert the html code snippets in the following order

RME css path
```
<link rel="stylesheet" type="text/css" href="RME css path">
```

Container tag for application
```
<div id="rmeApp"></div>
```

List of buttons, can be 1 or more
```
<button class="rme-image" data-image="Main image path">Edit</button>
```

RME js path, usually on the last line of the file
```
<script type="text/javascript" src="RME js path"></script>
```