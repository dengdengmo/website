webpackJsonp([0],[,,function(t,i,n){"use strict";(function(t){function i(i){i.each(function(i,n,e){var s=t(this).attr("data-src");t(this).attr("src",s)})}n(5),n(6);var e=n(7),s=n(8),o=n(9),a=n(10),c=n(11),h=n(12);a.apply(t("body")),c.apply(t("#header")),function(){new o(t("#carousel img"),i),new s(t("#carousel")),new h(t("#portfolio")),new e,new o(t("#about img"),i),new o(t("#portfolio img"),i),new o(t("#team img"),i),new o(t("#brand img"),i)}()}).call(i,n(0))},,,function(t,i){},function(t,i){},function(t,i,n){"use strict";(function(i){function n(){this.$node=i('<div id="GoTop" title="回到顶部">^</div>'),this.addNode(),this.bind()}n.prototype={constructor:n,addNode:function(){this.$node.appendTo("body").css({color:"#fff","font-size":"36px",width:40,height:35,"line-height":"46px","text-align":"center","background-color":"#fed136",position:"fixed",bottom:30,right:25,"border-radius":"2px",opacity:"0.8","z-index":"999",cursor:"pointer",transition:"all 1s",display:"none"}).data("visible",!1)},bind:function(){var t=this;i(document).on("scroll",function(){if(i(document).scrollTop()>200){if(t.$node.data("visible"))return;t.$node.show().data("visible",!0)}else{if(!t.$node.data("visible"))return;t.$node.hide().data("visible",!1)}}),this.$node.on("click",function(){i("html,body").animate({scrollTop:"0px"},400)})}},t.exports=n}).call(i,n(0))},function(t,i,n){"use strict";function e(t){this.$ct=t,this.init(),this.bind()}e.prototype={init:function(){var t=this.$imgCt=this.$ct.find(".img-ct");this.$preBtn=this.$ct.find(".btn-pre"),this.$nextBtn=this.$ct.find(".btn-next"),this.$bullet=this.$ct.find(".bullet"),this.lis=t.find("li");var i=this.$firstImg=t.find("li").first(),n=this.$lastImg=t.find("li").last(),e=this.imgWidth=t.find(".imgwidth").width();console.log(e),this.curPageIndex=0,this.imgLength=t.children().length,this.isAnimate=!1,t.prepend(n.clone()),t.append(i.clone()),t.width(e*(this.imgLength+2)),t.css({left:-e})},bind:function(){var t=this;console.log(1,this),this.$preBtn.on("click",function(i){i.preventDefault(),t.playPre()}),this.$nextBtn.on("click",function(i){i.preventDefault(),t.playNext()})},playPre:function(){var t=this,i=this;this.isAnimate||(this.isAnimate=!0,this.$imgCt.animate({left:"+="+this.imgWidth+"px"},function(){i.curPageIndex--,t.setBullet(),i.curPageIndex<0&&(i.$imgCt.css("left",-i.imgWidth*i.imgLength),i.curPageIndex=i.imgLength-1,t.setBullet())}),this.isAnimate=!1)},playNext:function(){var t=this,i=this;this.isAnimate||(this.isAnimate=!0,this.$imgCt.animate({left:"-="+this.imgWidth+"px"},function(){i.curPageIndex++,t.setBullet(),i.curPageIndex===i.imgLength&&(i.$imgCt.css({left:-i.imgWidth}),console.log(i.imgWidth),i.curPageIndex=0,t.setBullet())}),this.isAnimate=!1)},setBullet:function(){this.$bullet.children().removeClass("active").eq(this.curPageIndex).addClass("active")}},t.exports=e},function(t,i,n){"use strict";(function(i){function n(t,i){this.$node=t,this.callback=i,this.bind(),this.check()}n.prototype={bind:function(){var t=this;i(window).on("scroll",function(){t.check()})},isVisible:function(){var t=i(window).height(),n=i(window).scrollTop(),e=this.$node.outerHeight(),s=this.$node.offset().top;return!(s>=t+n||s+e<=n)},check:function(){this.isVisible(this.$node)&&this.callback(this.$node)}},t.exports=n}).call(i,n(0))},function(t,i,n){"use strict";(function(i){function n(){var t=this.find("#header").find(i(".nav")).children(),n=this.find(".location"),e="";i(document).on("scroll",function(){n.each(function(){var t=i(this);i(document).scrollTop()>t.offset().top-1&&(e="#"+t.attr("id"))}),t.each(function(){var t=i(this).find("a");e!==t.attr("href")&&t.hasClass("active")?t.removeClass("active"):e!==t.attr("href")||t.hasClass("active")||t.addClass("active")})})}t.exports=n}).call(i,n(0))},function(t,i,n){"use strict";(function(i){function n(){function t(){var t=i(document).scrollTop();i(window).height();if(t>=400){if(s.data("sticked"))return;n()}else{if(!s.data("sticked"))return;e()}}function n(){s.css({"background-color":"#000",height:parseInt(o)+10,"font-size":a+3+"px"}).data("sticked",!0)}function e(){s.removeAttr("style").data("sticked",!1)}var s=this.data("sticked",!1),o=this.height(),a=parseInt(this.css("font-size"));t(),i(document).on("scroll",function(){t()})}t.exports=n}).call(i,n(0))},function(t,i,n){"use strict";(function(i){function n(t){this.node=t,this.box=t.find(".box"),this.btn=t.find(".btn-load").data("loading",!1),this.hide=this.box.find(".hide"),this.item=this.box.find(".item"),this.init()}n.prototype={constructor:n,init:function(){this.page=1,this.len=8,this.bind(),this.setItem(),this.loadData()},bind:function(){var t=this,n=void 0;this.btn.on("click",function(){t.loadData()}),i(window).on("resize",function(){clearTimeout(n),n=setTimeout(function(){t.setItem(),t.items=t.box.find("li.item"),t.waterFlowResize(t.items)},500)})},setItem:function(){this.arr=[],this.$width=this.item.outerWidth(!0),this.$allWidth=this.box.width(),this.num=Math.floor(this.$allWidth/this.$width);for(var t=0;t<this.num;t++)this.arr.push(0)},loadData:function(){var t=this;this.btn.data("loading")||(this.btn.data("loading",!0),i.ajax({url:"http://platform.sina.com.cn/slide/album_tech",type:"get",dataType:"jsonp",jsonp:"jsoncallback",data:{app_key:"1271687855",page:t.page,num:t.len}}).done(function(i){i&&"0"===i.status.code?t.placeNode(i):alert("请求数据失败，请稍后重试"),t.btn.data("loading",!1)}))},placeNode:function(t){var i=this,n=this.getNode(t).appendTo(this.box);i.waterFlow(n),this.page+=1},getNode:function(t){for(var n="",e=0;e<t.data.length;e++)n+='<li class="item"><a href="',n+=t.data[e].url+'" class="link"><img src="',n+=t.data[e].img_url+'" alt=""></a><h3 class="title">',n+=t.data[e].short_name+'</h3><p class="para">',n+=t.data[e].short_intro+"</p></li>";return i(n)},waterFlow:function(t){var n=this;t.each(function(){var t=i(this);t.find("img").on("load",function(){for(var i=n.arr[0],e=0,s=0;s<n.arr.length;s++)i>n.arr[s]&&(i=n.arr[s],e=s);t.css({top:i,left:e*n.$width,opacity:"1"}),n.arr[e]+=t.outerHeight(!0),n.hide.css("height",n.arr[e])})})},waterFlowResize:function(t){var n=this;t.each(function(){for(var t=i(this),e=n.arr[0],s=0,o=0;o<n.arr.length;o++)e>n.arr[o]&&(e=n.arr[o],s=o);t.css({top:e,left:s*n.$width,opacity:"1"}),n.arr[s]+=t.outerHeight(!0),n.hide.css("height",n.arr[s])})}},t.exports=n}).call(i,n(0))}],[2]);