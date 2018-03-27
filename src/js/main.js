import '../css/style.scss'
import 'carousel.js'
define(['jquery', 'carousel', 'stickup', 'location'], $ => {
  $(() => {
    $('#carousel').Carousel()
    $('#header').stickup()
    $('body').location()
  })
})