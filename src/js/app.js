// import '../css/common.css'
import '../css/style.scss'
import '../css/carousel.scss'
// import '../index.html'



const GoTop = require('./toTop.js')
const Carousel = require('./carousel.js')
const Lazyload = require('./lazyload.js')
const location = require('./location.js')
const stickup = require('./stickup.js')
const LoadMore = require('./loadMore.js')


location.apply($('body'))
stickup.apply($('#header'))



function src($node) {
  // console.log($node)
  $node.each(function(item, index, arr) {
    const imgUrl = $(this).attr('data-src')
    $(this).attr('src', imgUrl)
    // console.log(this)
  })
}
(function() {
  new Lazyload($('#carousel img'), src)
  new Carousel($('#carousel'))
  new LoadMore($('#portfolio'))
  new GoTop()
  
  new Lazyload($('#about img'), src)
  new Lazyload($('#portfolio img'), src)
  new Lazyload($('#team img'), src)
  new Lazyload($('#brand img'), src)
}())


