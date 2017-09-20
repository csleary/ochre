---
title: "Migrated to Jekyll"
description: "Detailing my decision to move off a self-hosted Wordpress site, to one using the static page generator, Jekyll."
date: 2016-11-05 16:21
published: true
categories: [Misc]
tags: [web dev, jekyll, wordpress]
image:
---
I thought I'd shake things up a bit here and migrate the site over to [Jekyll](https://jekyllrb.com/) rather than use Wordpress -- possibly permanently, but let's see how we go. There's been a lot to absorb in learning how Jekyll works, including some new web dev paradigms for me, such as the Ruby infrastructure, CLI site building and whatnot, but it's been an interesting week trying to figure this all out.<!--more-->

The main difference between Wordpress and Jekyll is that the former is dynamic, looking up posts, pages, comments and settings from a central database, while the latter is completely static. Jekyll sites need to undergo a build process every time a new post is added, or if just the footer is tweaked -- the entire site will need to be rebuilt and uploaded. It's a little bit daunting to have to do this, but thankfully the process can be automated. And if you use Github pages to host your site it's particularly straightforward, as the site is automatically rebuilt once you push a new version to it, which is extremely nifty (not to mention free).

## Why? Speed, mainly.

The main advantage of a static site against dynamic is one of speed; serving static pages is extremely quick compared to constructing pages on the fly via php (though caching obviously helps with this). It's much leaner all round, with no admin -- just open up a text editor and write your posts in markdown, to be translated during the next site build. Access to page layouts is equally straightforward, with greater transparency and control, using a templating system that employs [Liquid](https://github.com/Shopify/liquid) tags and filters for repetitive site variables instead of php tags. All in all it seems closer to the metal than Wordpress, which means greater speed and simplicity (well, simple once it's working). There's undeniably a steep learning curve, but I found problems encountered were easier to troubleshoot than errant databases \*shudder\*.

One main drawback of using static sites, as you may already have noticed, is a lack of a commenting system. Processing comments would require constant site rebuilding, and while there are ingenious solutions for this if you're hosting on Github (which I'm not yet, at least for this domain), most solutions rely on bolting on an external commenting system such as Disqus. Given that a Jekyll site means control, simplicity and speed, adding a dynamic commenting system where you have zero control over the content might run against these benefits.

Still, I *do* want to get comments up and running again as soon as I can, so I'm currently researching my options. [Discourse](http://www.discourse.org/) and [Muut](https://muut.com/) look great, but I'm also intrigued by some smaller options such as [Staticman](https://staticman.net/) and [Isso](https://posativ.org/isso/), which would allow for greater control over your content than the larger former options. I'm probably getting a bit carried away with this, as you do when you're knee-deep in project tinkering! So if you have any feedback, feel free to shoot me an email/tweet for now, until I get some kind of commenting in place again. Hopefully something with a Wordpress xml import option, as it'd be a shame to lose the comments that have been left here over the years. Failing all that, it'll be back over to Wordpress.
