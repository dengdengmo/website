function GoTop() {
  this.$node = $('<div id="GoTop" title="回到顶部">^</div>')
  this.addNode()
  this.bind()
}
GoTop.prototype = {
  constructor: GoTop,
  addNode() {
    this.$node.appendTo('body').css({
      'color': '#fff',
      'font-size': '36px',
      'width': 40,
      'height': 35,
      'line-height': '46px',
      'text-align': 'center',
      'background-color': '#fed136',
      'position': 'fixed',
      'bottom': 30,
      'right': 25,
      'border-radius': '2px',
      'opacity': '0.8',
      'z-index': '999',
      // "box-shadow":"2px 2px 3px #ccc",
      'cursor': 'pointer',
      transition: 'all 1s',
      'display': 'none'
    }).data('visible', false)
  },
  bind() {
    let self = this
    $(document).on('scroll', () => {
      let scrT = $(document).scrollTop()
      if (scrT > 200) {
        if (self.$node.data('visible')) return
        self.$node.show().data('visible', true)
      } else {
        if (!self.$node.data('visible')) return;
        self.$node.hide().data('visible', false)
      }
    })
    this.$node.on('click', () => {
      $('html,body').animate({'scrollTop': '0px' }, 400)
    })
  }
}
// console.log(GoTop)

module.exports = GoTop
