---
layout: post
title: "[Unity] 2D 러너 게임"
date: 2024-10-12 19:50:00 +0900 
categories: Unity
book: 레트로의 유니티 게임 프로그래밍 에센스
tag: retr0
excerpt: "플레이어 제작"
---

### 유니런 2D 게임

- 예제소스 : <https://github.com/IJEMIN/Unity-Programming-Essence-2021>
- 예제번호 : 11, 12, 13
- 씬과 코드는 를 제외한 모든 에엣은 준비된 상태에서 코딩과 기능 구현에 집중한다.

### 프로젝트 열기
- 유니티 허브 실행
- 폴더 11 > Uni-Run 폴더 선택 > 열기
- 새 씬(Scene) 만들기
  - Ctrl + N
  - Basic 2D 탬플릿 선택
  - Main 이름으로 씬 저장

### 시작지점 / 데드존
- 시작 지점에는 캐릭터가 서 있을 기본 발판과 낙사 판정 영역을 만든다.
- 프로젝트 창 Sprites 폴더 > Platform_Long 스프라이트를 하이어라키 창으로 드래그앤드랍
- 하이어라키 창에 생성된 Platform_Long을 Start Platform 이름 변경
- Start Platform 오브젝트 인스펙터 창
  - 위치 변경 : (0,-1,0)
  - Box Collider 2D 컴포넌트 추가(Add Component > Physics 2D > Box Collider 2D)

- 플레이어 캐릭터가 죽게 하는 낙사 판정 영역(데드존)을 만든다.
- 빈 게임 오브젝트 생성(하이어라키 창 + > Create Empty)
- 생성한 오브젝트 인스펙터 창
  - 이름 : Deadzone
  - 위치 : (0,-8,0)
  - Box Collider 2D 컴포넌트 추가(Add Component > Physics 2D > Box Collider 2D)
  - Box Collider 2D 컴포넌트 Is Trigger 체크, Size (50,2) 변경

### 캐릭터 스프라이트
- 프로젝트 창에서 Sprites 폴더 > 사용할 스프라이트는 Toko_Die, Toko_jump, Toko_Run
- 스프라이트 시트는 여러 이미지를 하나의 이미지 파일로 합친 것이다.

- Toko_Run 스프라이트 편집
  - 프로젝트 창 > Toko_Run 선택
  - 인스펙터 창 > Sprite Mode를 Multiple 변경
  - Apply 버튼 클릭 > Sprite Editor 버튼 클릭
  - 스프라이트 편집 창 > Slice 버튼 클릭
  - Type은 Grid by Cell Size, Pixel Size는 (64,64)
  - Apply 버튼 클릭 > Sprite Editor 닫기
  - 프로젝트 창에서 Toko_Run 스프라이트 펼치서 확인

### 캐릭터 오브젝트
- 플레이어 오브젝트 생성
  - 프로젝트 창에서 Toko_Run 스프라이트 펼치기 > Toko_Run_0 스프라이트를 하이어라키 창으로 드래그앤드랍
  - Toko_Run_0 오브젝트 인스펙터 창
    - 이름 Player, 태그 Player, 위치 (-6,2,0) 변경
    - Rigidbody 2D 컴포넌트 추가(Add Component > Physics 2D > Rigidbody 2D)
    - Rigidbody 2D 컴포넌트 Collision Detection : Continuous 변경
    - Rigidbody 2D 컴포넌트 Constraints 펼치기 > Freeze Rotation : Z 체크
    - Circle Collider 2D 컴포넌트 추가(Add Component > Physics 2D > Circle Collider 2D)
    - Circle Collider 2D 컴포넌트 Offset : (0,-0.57), Radius : 0.2 변경
    - Audio Source 컴포넌트 추가(Add Component > Audio > Audio Source)
    - Audio Source 컴포넌트 AudioClip 필드 옆의 선택 버튼 > 선택 창에서 jump 오디오 더블 클릭
    - Audio Source 컴포넌트 Play On Awake 체크 해제(Play On Awake: 오디오 소스 컴포넌트가 활성화되었을 때 최초 1회 오디오를 자동 재생 옵션)

### 캐릭터 애니메이션
- 프로젝트 창 Assets 폴더 하위 새폴더 생성(프로젝트 창 + > Folder)
  - 폴더명 : Animations

1. Toko_Run 애니메이션
- 상단메뉴 Window > Animation > Animation 클릭 > 애니메이션 창이 열린다.
- 애니메이션 창 Create 클릭 > 애니메이션 클릭 저장 창이 열린다.
  - 저장할 새로운 애니메이션 클립명 : Run 
  - Assets 폴더 > Animations 폴더에 저장
- 프로젝트 창 > Sprites 폴더 > Toko_Run 스프라이트 펼치기
- Shift + 클릭 으로 Toko_Run_0 ~ Toko_Run_7 선택 후 애니메이션 창의 타임라인으로 드래그앤드랍
- 샘플 레이트 필드 활성화(애니메이션 창의 점3개(...) 버튼 클릭 > Show Sample Rate 체크)
- 애니메이션 창에서 Samples : 16 변경

2. Toko_Jump 애니메이션(Samples : 6)
3. Toko_Die 애니메이션(Samples : 6)
- 위의 방법과 같이, 애니메이션 클립을 만든다.
- Die 애니메이션 클립은 인스펙터 창에서 Loop Time 체크 해제해준다.

- 상황에 맞는 애니메이션을 재생하려면 애니메이터 컨트롤러가 필요하다.

---