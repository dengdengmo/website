function Exposure($node, callback) {
  this.$node = $node;
  this.callback = callback;
  this.bind(); // 添加事件
  this.check(); // 显示刚打开页面时，出现在视野内的元素
}

Exposure.prototype = {
  bind: function () {
    var _this = this;
    $(window).on('scroll', function () {
      _this.check()
    })
  },
  isVisible: function () {
    var windowHeight = $(window).height(), // window.innerHeight
      scrollTop = $(window).scrollTop(), // window.scrollY
      $nodeHeight = this.$node.outerHeight(),
      $nodeTop = this.$node.offset().top;

    if ($nodeTop >= windowHeight + scrollTop || $nodeTop + $nodeHeight <= scrollTop) {
      return false
    } else {
      return true
    }
  },
  check: function () {
    if (this.isVisible(this.$node)) {
      this.callback(this.$node)
    }
  }
}
module.exports = Exposure;