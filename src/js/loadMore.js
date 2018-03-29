// function addScriptTag(src) {
//   const script = document.createElement('script')
//   script.setAttribute('type', 'text/javascript')
//   script.src = src
//   document.body.appendChild(script)
// }
// window.onload = function() {
//   addScriptTag('http://platform.sina.com.cn/slide/album_tech')
// }
function LoadMore($node) {
  this.node = $node
  this.box = $node.find('.box')
  this.btn = $node.find('.btn-load').data('loading', false)
  this.hide = this.box.find('.hide')
  this.item = this.box.find('.item')
  this.init()
}
LoadMore.prototype = {
  constructor: LoadMore,
  init() {
    this.page = 1
    this.len = 8
    this.bind()
    this.setItem()
    this.loadData()
  },
  bind() {
    const _this = this
    let clock
    this.btn.on('click', () => {
      _this.loadData()
    })
    $(window).on('resize', () => {
      clearTimeout(clock)
      clock = setTimeout(() => {
        _this.setItem()
        _this.items = _this.box.find('li.item')
        _this.waterFlowResize(_this.items)
      }, 500)
    })
  },
  setItem() {
    this.arr = []
    this.$width = this.item.outerWidth(true)
    this.$allWidth = this.box.width()
    this.num = Math.floor(this.$allWidth / this.$width)
    for (let i = 0; i < this.num; i++) {
      this.arr.push(0)
    }
  },
  createCORSRequest(method, url) {
    let xhr = new XMLHttpRequest()
    if ('withCredentials' in xhr) {
      xhr.open(method, url, true)
    } else if (typeof XDomainRequest != 'undefined') {
      xhr = new XDomainRequest()
      xhr.open(method, url)
    } else {
      xhr = null
    }
    return xhr
  },
  loadData() {
    const _this = this
    if (this.btn.data('loading')) return
    this.btn.data('loading', true)
    $.ajax({
      url: 'https://platform.sina.com.cn/slide/album_tech',
      type: 'get',
      dataType: 'jsonp',
      jsonp: 'jsoncallback',
      data: {
        app_key: '1271687855',
        page: _this.page,
        num: _this.len
      },
      success: response => {
        if (response && response.status.code === '0') {
          _this.placeNode(response)
        } else {
          alert('请求数据失败，请稍后重试')
        }
        _this.btn.data('loading', false)
      }
    })
    // let request = _this.createCORSRequest('get', 'https://platform.sina.com.cn/slide/album_tech?app_key=1271687855&page=1&num=8')
    // console.log(request)
    
    // if (request) {
    //   request.onload = function() {
    //     _this.placeNode(request.responseText)
    //   }
    //   request.onerror = () => {
    //     alert('chucuole')
    //   }
    //   request.send(null)
    // }
  },
  placeNode(ret) {
    const _this = this
    const node = this.getNode(ret).appendTo(this.box)
    // node.find("img").on("load",function(){
    _this.waterFlow(node)
    // })
    this.page += 1
  },
  getNode(ret) {
    let node = ''
    for (let i = 0; i < ret.data.length; i++) {
      node += '<li class="item"><a href="'
      node += ret.data[i].url + '" class="link"><img src="'
      node += ret.data[i].img_url + '" alt=""></a><h3 class="title">'
      node += ret.data[i].short_name + '</h3><p class="para">'
      node += ret.data[i].short_intro + '</p></li>'
    }
    let $node = $(node)
    return $node
  },
  waterFlow(node) {
    const self = this
    node.each(function() {
      const $this = $(this)
      $this.find('img').on('load', () => {
        let min = self.arr[0]
        let idx = 0
        for (let i = 0; i < self.arr.length; i++) {
          if (min > self.arr[i]) {
            min = self.arr[i]
            idx = i
          }
        }
        $this.css({
          top: min,
          left: idx * self.$width,
          opacity: '1'
        })
        self.arr[idx] += $this.outerHeight(true)
        self.hide.css('height', self.arr[idx])
      })
    })
  },
  waterFlowResize(node) {
    const self = this
    node.each(function() {
      const $this = $(this)
      let min = self.arr[0]
      let idx = 0
      for (let i = 0; i < self.arr.length; i++) {
        if (min > self.arr[i]) {
          min = self.arr[i]
          idx = i
        }
      }
      $this.css({
        top: min,
        left: idx * self.$width,
        opacity: '1'
      })
      self.arr[idx] += $this.outerHeight(true)
      self.hide.css('height', self.arr[idx])
    })
  }
}
// function createCORSRequest(method, url) {
//   let xhr = new XMLHttpRequest()
//   if ('withCredentials' in xhr) {
//     xhr.open(method, url, true)
//   } else if (typeof XDomainRequest != 'undefined') {
//     xhr = new XDomainRequest()
//     xhr.open(method, url)
//   } else {
//     xhr = null
//   }
//   return
// }


module.exports = LoadMore