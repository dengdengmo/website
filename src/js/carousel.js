function Carousel($node) {
  this.$ct = $node
  this.init()
  this.bind()
}
Carousel.prototype = {
  init() {
    const $imgCt = this.$imgCt = this.$ct.find('.img-ct')
    this.$preBtn = this.$ct.find('.btn-pre')
    this.$nextBtn = this.$ct.find('.btn-next')
    this.$bullet = this.$ct.find('.bullet')
    this.lis = $imgCt.find('li')


    const $firstImg = this.$firstImg = $imgCt.find('li').first(),
      $lastImg = this.$lastImg = $imgCt.find('li').last(),
      imgWidth = this.imgWidth = $imgCt.find('.imgwidth').width()
    console.log(imgWidth)

    this.curPageIndex = 0
    this.imgLength = $imgCt.children().length
    this.isAnimate = false

    $imgCt.prepend($lastImg.clone())
    $imgCt.append($firstImg.clone())

    

    $imgCt.width(imgWidth * (this.imgLength + 2))
    $imgCt.css({
      left: -imgWidth
    })
  },

  bind() {
    const _this = this
    console.log(1, this)
    this.$preBtn.on('click', e => {
      e.preventDefault()
      _this.playPre()
    })

    this.$nextBtn.on('click', e => {
      e.preventDefault()
      _this.playNext()
    })
  },

  playPre() {
    const _this = this
    
    if (this.isAnimate) return
    this.isAnimate = true
    this.$imgCt.animate({
      left: '+=' + this.imgWidth + 'px'
    }, () => {
      _this.curPageIndex--
      this.setBullet()

      if (_this.curPageIndex < 0) {
        _this.$imgCt.css('left', -(_this.imgWidth * _this.imgLength))
        _this.curPageIndex = _this.imgLength - 1
        this.setBullet()
      }
    })
    this.isAnimate = false
  },
  playNext() {
    const _this = this
    
    if (this.isAnimate) return
    this.isAnimate = true
    this.$imgCt.animate({
      left: '-=' + this.imgWidth + 'px'
    }, () => {
      _this.curPageIndex++
      this.setBullet()

      if (_this.curPageIndex === _this.imgLength) {
        _this.$imgCt.css({
          left: -_this.imgWidth
        })
        console.log(_this.imgWidth)
        _this.curPageIndex = 0
        this.setBullet()
      }
    })
    this.isAnimate = false
    
  },
  setBullet() {
    this.$bullet.children()
      .removeClass('active')
      .eq(this.curPageIndex)
      .addClass('active')
  }
}

module.exports = Carousel