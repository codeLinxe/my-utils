1. SwipeAction 滑动单元格

    目的：滑动单元格的按钮点击后，关闭当前滑动单元格

    问题：官方文档未提供方法

    解决：使用ref拿到目标组件，然后使用 closeHandler 方法即可关闭

    ```
        this.$refs['SwipeActionItemRef'][0].closeHandler()
    ```