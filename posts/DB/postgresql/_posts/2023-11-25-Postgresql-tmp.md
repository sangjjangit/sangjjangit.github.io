---
title: Postgresql temp
layout: post
author: sang
categories: [DB, postgresql]
tags: [Postgresql, pk, index]
date: '2023-11-25 23:30:00'
---

Postgresql temp
- pk / index

-- 1. pk 삭제
ALTER TABLE [테이블명] DROP CONSTRAINT [테이블명_PK];

-- 2. index 생성
CREATE UNIQUE INDEX [테이블명_PK] ON [테이블명]
( 칼럼1, 칼럼2 );

-- 3. 제약조건 추가
ALTER TABLE [테이블명] *
 ADD CONSTRAINT [테이블명_PK] PRIMARY KEY 
 USING INDEX [테이블명_PK];
 

 

- index 

- 삭제
DROP INDEX [인덱스명];

- 생성
CREATE INDEX [인덱스명]
ON [테이블명] ( [컬럼명] );

- 생성 인덱스 확인 / 테이블명 대소문자 구분
SELECT * FROM pg_indexes WHERE tablename = '[테이블명]';