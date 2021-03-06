/* ----------------------------------------------------------- */
/* 6. jQuery Tweetable                                         */
/* ----------------------------------------------------------- */
/*
 * tweetable 1.7.0 - jQuery twitter feed plugin
 *
 * Copyright (c) 2009 Philip Beel (http://www.theodin.co.uk/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * With modifications from Philipp Robbel (http://www.robbel.com/) and Patrick DW (stackoverflow)
 * for IE compatibility.
 *
 * Revision: $Id: jquery.tweetable.js 2012-07-08 $ 
 *
 */
 (function(a){jQuery.fn.tweetable=function(a){var b={limit:5,username:"philipbeel",time:false,rotate:false,speed:5e3,replies:false,position:"append",failed:"No tweets available",html5:false,retweets:false,onComplete:function(a){}};var a=jQuery.extend(b,a);return this.each(function(a){var c=jQuery(this),d=jQuery('<ul class="tweetList">')[b.position.toLowerCase()+"To"](c),e=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],f="https://api.twitter.com/1/statuses/user_timeline.json?include_entities=false&suppress_response_codes=true&screen_name=",g="&count=",h="&exclude_replies=",i="&include_rts=",j,k,l,m,n;jQuery.getJSON(f+b.username+g+(b.limit+5)+h+b.replies+i+b.retweets+"&callback=?",c,function(a){j=a&&a.error||null;if(j){d.append('<li class="tweet_content"><p class="tweet_link">'+b.failed+"</p></li>");return}jQuery.each(a,function(a,c){if(a>=b.limit)return;d.append('<li class="tweet_content_'+a+'"><p class="tweet_link_'+a+'">'+c.text.replace(/#(.*?)(\s|$)/g,'<span class="hash">#$1 </span>').replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,'<a href="$&">$&</a> ').replace(/@(.*?)(\s|\(|\)|$)/g,'<a href="http://twitter.com/$1">@$1 </a>$2')+"</p></li>");if(b.time===true){for(m=0;m<=12;m++){if(e[m]===c.created_at.substr(4,3)){l=m+1;k=l<10?"0"+l:l}}var f=c.created_at.substr(26,4)+"-"+k+"-"+c.created_at.substr(8,2)+"T"+c.created_at.substr(11,8)+"Z";jQuery(".tweet_link_"+a).append('<p class="timestamp"><'+(b.html5?'time datetime="'+f+'"':"small")+"> "+c.created_at.substr(8,2)+"/"+k+"/"+c.created_at.substr(26,4)+", "+c.created_at.substr(11,5)+"</"+(b.html5?"time":"small")+"></p>")}});if(b.rotate===true){var c=d.find("li"),f=c.length||null,g=0,h=b.speed;if(!f)return;function i(){c.eq(g++).fadeOut(400,function(){g=g===f?0:g;c.eq(g).fadeIn(400)})}c.slice(1).hide();setInterval(i,h)}b.onComplete(d)})})}})(jQuery);