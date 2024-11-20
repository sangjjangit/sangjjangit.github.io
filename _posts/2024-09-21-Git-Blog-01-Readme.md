---
layout: post
title: "[jekyll] 깃블로그 만들기"
date: 2024-09-21 18:07:00 +0900
categories: Blog
excerpt: "깃블로그 README.md"
---

### Ruby
1. Ruby 다운로드
    - [Ruby 공식 웹사이트](https://www.ruby-lang.org/en/downloads/)
    - [Ruby Installer](https://rubyinstaller.org/downloads/archives/)
2. window : Ruby Installer 를 바이너리 다운로드한다.(rubyinstaller-3.3.5-1-x64.7z)
3. 압축파일 해제 후 인텔리제이 터미널 셋팅으로 환경변수를 잡아준다.
4. 인텔리제이 터미널
```bash
ruby -v
```

### jekyll
1. jekyll 설치
```bash
rdik install
gem install jekyll bundler
```

### Jekyll 프로젝트 생성
```bash
cd ..
jekyll new jekyll-sangjjang
cd jekyll-sangjjang
bundle install
```

### Jekyll 서버 실행
```bash
bundle exec jekyll serve
```
- `http://localhost:4000`