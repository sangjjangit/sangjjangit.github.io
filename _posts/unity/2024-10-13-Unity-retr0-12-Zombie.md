---
layout: post
title: "[Unity] 탑다운 슈터 게임"
date: 2024-10-13 19:47:00 +0900 
categories: Unity
book: 레트로의 유니티 게임 프로그래밍 에센스
tag: retr0
excerpt: "레벨 아트와 플레이어"
---

### 좀비 서바이버 게임

- 예제소스 : <https://github.com/IJEMIN/Unity-Programming-Essence-2021>
- 예제번호 : 14, 15, 16, 17
- 씬과 코드는 를 제외한 모든 에엣은 준비된 상태에서 코딩과 기능 구현에 집중한다.

### 프로젝트 구성
- 프로젝트 창
  - Assets 폴더
    - Animations : 캐릭터 애니메이션
    - Audios : 효과음, 오디오 클립
    - Fonts : 폰트
    - Gizmos : 시네머신이 사용하는 기즈모 아이콘(시네머신 패키지 추가시 자동생성)
    - Materials : 3D 모델에 사용할 머티리얼
    - Post-Process Profile : 후처리에 사용할 프로파일(프리셋)
    - Prefabs : 프리팹
    - Scripts : 스크립트
    - Sprites : 2D 텍스처(스프라이트)
    - Textures : 3D 모델 텍스처
  - Packages 폴더
    - 패키지 매니저(Package Manager)를 사용해 임포트한 패키지
      - 상단메뉴 Window > Package Manager 로 열수 있다.      
    - 기본 포함되는 패키지는 유니티 버전에 따라 다를 수 있다.
    - 좀비 서바이버 프로젝트에 추가된 패키지
      - Cinemachine : 스마트 추적 카메라, 복잡한 카메라 연출을 쉽게 구현
      - Post-process : 포스트 프로세싱 스택(Post-processing Stack), 후처리 효과 구현
      - Timeline : 시퀀스 편집 툴. 시네마틱 컷신, 게임 플레이 이벤트 시퀀스 등, Cinemachine 패키지가 필요로하는 의존 패키지.

- 씬(Scene) 만들기
  - 프로젝트 창 [+] > Folder
    - 폴더명 : Scenes
  - [Ctrl + S]로 씬 저장 창 열기 > Main 이름으로 Scenes 폴더에 저장

### 레벨 아트와 라이팅 설정
- 씬에 레벨 아트를 추가하고 라이팅을 구성한다.

1. 레벨아트
- 하이어라키 창의 Main 펼치기
  - Directional Light 오브젝트 삭제([Delete])
- 프로젝트 창의 Prefabs 폴더의 Level Art 프리팹을 하이어라키 창으로 드래그앤드랍

2. 라이트맵
- 라이트맵은 오브젝트가 빛을 받았을 때 어떻게 보일지 미리 그려둔 텍스처라고 할 수 있다.
- 라이트맵은 오브젝트가 빛을 받았을 때의 모습을 미리 계산해 생성한 텍스처이다.
- 라이트맵을 생성하는 것을 '라이트맵을 굽는다.'라고 표현한다.
- 라이트맵을 구워두면 오브젝트가 빛을 받았을 때 실시간 라이팅 연산을 하는 대신 오브젝트 표면에 라이트맵을 씌워서 빛 효과를 표현한다.
- 런타임에 컴퓨터가 감당해야 할 라이팅 연산이 줄어든다.

3. 라이트맵 설정
- 상담메뉴 Window > Rendering > Lighting 으로 라이팅 창
- 라이팅 창 상단 Now Light Setting 클릭 > 라이트 설정 에셋 New Light Settings 생성.
- New Light Settings의 이름을 Main Light Settings 로 변경 후 프로젝트 창의 Assets > Scenes 폴더 옮김.
- 라이팅 창 하단 Auto Generate 체크 해제
- 라이팅 창 상단 Environment 탭 > Environment Lighting
  - Source : Color 변경
  - Ambient Color : (65,23,12) 변경

4. 글로벌 일루미네이션(Global Illumination)
- 물체의 표면에 직접 들어오는 빛뿐만 아니라 다른 물체의 표면에서 반사되어 들어온 간접광까지 표현
- GI라고 부릅니다.
- 라이팅 창에서는 두 가지 종류의 글로벌 일루미네이션을 선택할 수 있다.
  - 실시간 글로벌 일루미네이션(Realtime Global Illumination)
  - 베이크된 글로벌 일루미네이션(Baked Global Illumination)
- 베이크된 글로벌 일루미네이션(Baked Global Illumination)에는 세부 라이팅 모드가 있다.
  - 베이크된 간접(Baked Indirect) 모드: 간접광만 구워서 미리 계산, 직사광과 그림자는 실시간으로 처리
  - 섀도우마스크(Shadowmask) 모드: 간접광을 위한 라이트맵 이외에 그림자 맵()을 추가로 구워서 사용, 실시간 그림자와 미리 구워진 그림자가 자연스럽게 합성됨.
  - 감산(Subtractive) 모드: 간접광, 직사광, 그림자까지 하나의 라이트맵에 모두 구워버림, 실시간 그림자와 미리 구워진 그림자가 자연스럽게 합성되지 않음, 성능이 제일 좋음.
- 라이트 오브젝트들에는 라이트 컴포넌트가 있다.
  - 모드: 베이크된(Baked)모드, 실시간(Realtime), 혼합(Mixed)모드가 있다.
- 글로벌 일루미네이션 설정하기
- 라이팅 창에서 Realtime Lighting 의 Realtime Global Illumination 체크
- Mixed Lighting 의 Baked Global Illumination 체크
- Lightmapping Settings
  - Direct Samples : 16 // 직사광 연산
  - Indirect Samples : 256 // 간접광 연산
  - Environment Samples : 128 // 환경광 연산
  - Indirect Resolution : 0.5 // 간접광 텍스처 해상도 유닛당 0.5 텍셀
  - Lightmap Resolution : 10 // 라이트맵 텍스처 해상도 10 텍셀
- Generate Lighting 클릭
- 글로벌 일루미네이션은 정적(Static) 오브젝트에만 적용된다.
- 정적 오브젝트는 게임 도중에 위치가 변경될 수 없다.










- 테스트.끝

[![테스트](https://img.youtube.com/vi/UpxK7G0G6oE/0.jpg)](https://youtu.be/UpxK7G0G6oE){:target="_blank"}

---