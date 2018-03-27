function stickup() {
  const $this = this.data('sticked', false),
    $hei = this.height(),
    // $wid = this.width(),
    // $left = this.offset().left,
    // $top = this.offset().top,
    $font = parseInt(this.css('font-size'))

  judgeStick()
  $(document).on('scroll', () => {
    judgeStick()
  })
  function judgeStick() {
    let scrT = $(document).scrollTop(),
      top = $(window).height()
    if (scrT >= 400) {
      if ($this.data('sticked')) return
      stickUp()
    } else {
      if (!$this.data('sticked')) return
      cancelStick()
    }
  }
  function stickUp() {
    $this.css({
      'background-color': '#000',
      'height': parseInt($hei) + 10,
      'font-size': $font + 3 + 'px'
    }).data('sticked', true)
  }
  function cancelStick() {
    $this.removeAttr('style').data('sticked', false);
  }
}

module.exports = stickup