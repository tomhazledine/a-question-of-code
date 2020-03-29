---
layout: "article.njk"
title: "11ty is my favourite static site generator"
date: "2020-01-07"
excerpt: "I have an obsession with static site generators, and Eleventy is my favourite."
tags: ['articles','featured']
categories: ["code"]
intro_note: false
intro_link: false
read_time: "probably six-ish minutes"
---

I have an obsession with static site generators. They help turn simple markdown files into a lean, mean, super-fast website. They're rendered at compile-time, so there's no server-side activity to slow things down. And because all the browser ever sees is static files, there's much less chance of your site being hacked. My favourite SSG is [Eleventy](https://www.11ty.dev/) (11ty), but I've been on a long journey to get here...

> *I tried [WordPress](#i-tried-wordpress), [vanilla HTML](#i-tried-vanilla-html), [Jekyll](#i-tried-jekyll), [Gatsby](#i-tried-gatsby), and [Hugo](#i-tried-hugo), but [11ty is my favourite](#11ty-is-my-favourite)*

### I tried WordPress

Before I discovered SSGs, I was a WP ninja for years. People often complain about the speed of WordPress, but after running several massive-traffic, high-complexity, image-heavy sites for clients, I'm happy to report that WordPress is not the performance bottleneck that people think it is. (You just have to be very careful!)

I also loved the versatility of [Custom Post Types](https://developer.wordpress.org/reference/functions/register_post_type/) and the magic UI that comes with [Advanced Custom Fields Pro](https://www.advancedcustomfields.com/pro/), but never felt that WordPress as a whole aligned with *my* preferred workflow. Despite the power of CPTs and ACF, the WP dashboard was always a point of friction. It could do *too much*, while at the same time not being customisable enough 😬

### I tried vanilla HTML

Eugh! That was a fun intellectual challenge, and it's something I believe that every frontender *should* be able to do. But once you get beyond a couple of pages it was a massive pain! I missed Markdown and partials and data-management and, well, all the things people use frameworks and systems for!

### I tried Jekyll

After the over-engineering of WordPress, [Jekyll](https://jekyllrb.com/) was a breath of fresh air. Comprehensible flat files! No database to slow things down! Markdown support that makes sense! (Good markdown support is hard to manage in WP even to this day).

Even though I quickly fell out with Jekyll (too much Ruby, not enough flexibility for shared metadata and categorisation, and getting Jekyll to play nicely with my workflow automation was a major PITA), this was the moment that I fell in love with statically generated websites. The concept made perfect sense for the simple blogs I was creating at the time, *and* meant I jumped straight to the top of the my-site-loads-faster-than-yours leaderboards.

### I tried Gatsby

After I finally mastered React (maybe; it's a long journey, I suspect), it was inevitable that my React-all-the-things! instinct would carry over to my blogs. [Gatsby](https://www.gatsbyjs.org/) was an easy sell. All the power of a React SPA, with all the benefits of a statically generated site? Yes, please!

The image-handling and page-prerendering still blow my mind, but in the end it was goddam GraphQL that drove me away.

> The frontmatter's right there! Why do I need to change three files to get it! I don't want to add the data, *then* add a schema too! Fuuuuuuuuu...

Needless to say, I've retreated again to less over-engineered pastures. 

### I tried Hugo

Hugo is awesome, and being able to tell people I use GoLang is fun. But if I'm brutally honest with myself, the street-cred is the only real advantage over Jekyll 😋

It has all Jekyll's benefits, but also all of the same limitations (for me, at least). We use it for our documentation hub at my Jobby Job, and I really enjoy working with it (we might even roll out a Hugo build of our currently-WP brochure site, too). But most of the time I want more control over shortcodes and snippets and advanced features. This could all be improved if I was better at Go, I'm sure, but if there's a JavaScript option out there, that's the one I'll inevitably gravitate towards.


### 11ty is my favourite

And so we come to [11ty](https://www.11ty.dev/). It has all the benefits of Hugo and Jekyll, but it's written in JavaScript. Flat files? Check! No excess cruft? Check! Markdown is king? Check! I can customise to my heart's content, and add all the shortcodes and layout tweaks I want. The real selling point for me is the intuitive folder structure - it's so simple and elegant, and I grokked it almost instantly.

As an added benefit, it integrates very nicely indeed into my existing workflow automation. I'm not penalised for using WebPack for assets, and relying on GitHub and Netlify for CI is a breeze. I've rebuilt my site many times use many different tools, but the 11ty rebuild was by far the fastest 

There are still friction points; pagination's a real pain, as is any attempt to simulate different post types, and the documentation is still a work in process (although that almost makes me *more* excited because there's a genuine opportunity for me to contribute something meaningful to the project). So, all told, I *could* still be lured away by a newer and shinier SSG.

But after over a year of use I'm still happy with 11ty. It does the majority of things I'd want a site-generator to do, and gets out of the way when I want to add in my own crazy things. If anything, my travels through the land of SSGs have taught me that the later point is more important - a static site generator *cannot* get in the way of my workflow. As soon as it does, I'll most likely try another. And there are plenty out there still to try.