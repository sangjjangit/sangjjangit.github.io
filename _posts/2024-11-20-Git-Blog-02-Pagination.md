---
layout: post
title: "[jekyll] jekyll 페이징"
date: 2024-11-20 21:55:00 +0900
categories: Blog
excerpt: "jekyll 페이징"
---

### jekyll 페이징
- jekyll-pagination 설치
```
gem install jekyll-pagination
```

- _config.yml 수정
```
paginate: 10 # 페이징 처리 개수
paginate_path: "/page:num/" # URL 규칙
```

- Gamfile 수정
```
group :jekyll_plugins do
  ..
  gem 'jekyll-paginate'
end
```

- bundle install & update
```
bundle install
bundle update
```

- 소스 수정
{% raw %}
```
#수정
{% for post in site.posts %} -> {% for post in paginator.posts %}

# 하단 페이지바
<div class="pagination">
    {% if paginator.previous_page %}
    <a href="{{ paginator.previous_page_path }}" class="previous">Previous</a>
    {% else %}
    <span class="previous">Previous</span>
    {% endif %}
    <span class="page_number ">{{ paginator.page }} of {{ paginator.total_pages }}</span>
    {% if paginator.next_page %}
    <a href="{{ paginator.next_page_path }}" class="next">Next</a>
    {% else %}
    <span class="next ">Next</span>
    {% endif %}
</div>
```
{% endraw %}