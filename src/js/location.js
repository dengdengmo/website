function location() {
  const navbar = this.find('#header').find($('.nav')).children()

  const location = this.find('.location')
  let currentId = ''
  $(document).on('scroll', () => {
    location.each(function() {
      const $self = $(this)
      const top = $(document).scrollTop()

      if (top > $self.offset().top - 1) { // 不减去1 如何做到同样效果
        currentId = '#' + $self.attr('id')
        
      }
    })
    navbar.each(function() {
      const $this = $(this).find('a') 
      if (currentId !== $this.attr('href') && $this.hasClass('active')) {
        $this.removeClass('active')
      } else {
        if (currentId === $this.attr('href') && !$this.hasClass('active')) {
          $this.addClass('active')
        }
      }
    })
  })


}

module.exports = location