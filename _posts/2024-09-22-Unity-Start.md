---
layout: post
title: "[Unity] 시작"
date: 2024-09-22 13:48:00 +0900
categories: Blog
excerpt: "유니티를 시작하다."
---

### 유니티 맛보기

1. [유니티](https://unity.com/)에서 가입하고, 로그인한다.

2. 유니티허브 설치하기
  + 유니티허브를 다운로드(https://unity.com/download)받아서 설치하고, 유니티 허브를 통해서 유니티를 설치.
  + 유니티 허브 설치 후, 유니티 에디터 설치에 대한 물음이 뜨면, 해당 화면에서는 스킵을 한다.
  + 설정아이콘을 클릭하고, 개인 라이센스를 설정한다.
  + 유니티 에디터 설치
    - 유니티가 유니티 전체 요소를 가리키는 단어
    - 유니티 에디터는 실행하고 있는 유니티 개발 프로그램과 그 창을 특정하는 것.
  + 유니티 에디터 설치 과정 중에서 Visual Studio 설치창이 뜨면, 설치한다.
    - Window: Visual Studio Community 

3. 프로젝트 생성하기
  + 프로젝트명, 경로, 템플릿를 확인 후, Create project 버튼 클릭.
  + 하이어리키(Hierarchy, 왼쪽)창에서 3D Object - Cube, plane(바닥) 생성
  + 하이어리키(Hierarchy, 왼쪽)창에서 Cube 를 선택하면, 인스펙터(Inspector,오른쪽)창에 Transform 컴포넌트로 위치(Position)를 조정한다.
  + Cube 인스펙터창 하단에 Add Component 를 클릭하고 리지드바디(Rigidbody)를 추가한다.
  + 유니티 에디터 중앙상단에 플레이버튼을 클릭해서 동작을 확인한다. 다시 플레이버튼을 원래대로 돌아온다.
  + Ctrl + S 를 누르고 씬(Scenes)을 저장한다.
  + 프로젝트(Project, 하단)창에서 저장된 씬을 찾을 수 있다.

---

### 유니티 에디터 둘러보기

+ 예제소스 : https://github.com/IJEMIN/Unity-Programming-Essence-2021

1. 기존 프로젝트 불러오기
  + 유니티 허브 실행 > Projects 탭에서 Add
  + 유니티 에디터 버전이 다르다는 경고가 나오면, 기존 설치된 버전으로 열자.
  + 그리고 가능하면 최신 버전의 유니티 에디터를 사용하자.
  + 프로젝트(Project, 하단)창에서 씬(Scenes)파일을 더블클릭해서 열자.

2. 레이아웃 변경
  + 레이아웃: 유니티 창의 배치
    - 우측 상단 레이아웃 버튼을 통해서 변경할 수 있다.
    - 유니티 창들은 드래그를 위치를 이동할 수 있다.
    - 유니티 상단 메뉴 Window > General > Console 클릭해서 창을 추가할 수 있다.

3. 메인 창
  + 씬(Scene)창
    - 씬(Scene) : 하나의 게임 월드를 뜻한다.
    - 시각적으로 편집할 수 있다.
    - 툴(Tool)
      * 핸드(Hand) : 씬 카메라를 움직인다.
      * 평행이동(Translate) : 오브젝트를 이동한다.
      * 회전(Rotate) : 오브젝트를 회전한다.
      * 렉트(Rect) : UI, 2D오브젝트의 크기를 조정한다.
      * 트랜스폼(Transform) : 평행이동, 회전, 스케일 툴을 하나로 합친 툴이다.
    - 마우스 휠로 줌인/줌아웃
    - 마우스 오른쪽 누르는 동안 플라이스루(Flythrough)모드(W,A,S,D로 이동)
    - Alt + 마우스 왼쪽 누르는 동안 퀘도 모드
    - 오브젝트를 선택하고 화살표(x,y,z) 및 색상평면을 누르는 동안 이동이 가능하다.
    - 씬 기즈모(Gizmo)
      * 씬(Scene)창 오른쪽 상단에 있다.
      * 현재 씬을 바라보는 방향을 표시, 나침반
  + 게임 창
    - 플레이어가 실제로 보는 화면
    - Free Aspect 버튼을 누르고 화면비율, 해상도를 선택할 수 있다.
  + 하이어라키(Hierarchy)창
    - 현재 씬에 존재하는 모든 게임 오브젝트
  + 인스펙터(Inspector)창
    - 선택한 게임 오브젝트의 정보를 표시
    - 트랜스폼(Transform) : 오브젝트의 3차원 좌표와 크기, 회전을 지정
    - 메시 필터(Mesh Filter) : 오브젝트의 외곽선 지정
    - 메시 렌더러(Mesh Renderer) : 색을 채워 그래픽 외형을 그린다.
    - 박스 콜라이더(Box Collider) : 다른 물체가 부딪칠 수 있는 물리적인 표면을 만든다.
  + 프로젝트(Project)창
    - 프로젝트에서 사용할 모든 에셋을 표시
    - Assets 폴더
      * 프로젝트에 사용할 모든 형태의 파일을 의미(이미지, 음악, 비디오, 3D모델, 애니메이션, 스크립트 파일 등등)
      * 드래그앤드랍으로 파일 추가 가능      
    - Packages 폴더
      * 패키지 매니저에 의해 자동 관리되는 폴더.
  + 콘솔(Console)창
    - 유니티 기록(로그)

---

### 유니티 엔진 동작 원리

1. 상속과 재사용
  + class Monster
    - 몬스터 필수 기능
    - 인공지능, 애니메이션, 공격과 방어, 물리, 기타 필수
  + class Orc : Monster
    - 초록색 피부, 오크 애니메이션, 오크 스킬, 오크 고유기능
  + class OrcChieftan : Orc
    - 대장모자, 새로운 무기, 스킬, 대장 고유기능

2. 컴포넌트 패턴:조립
  + 상속에만 의존하여 게임을 개발시 생기는 문제점 보완
  + 컴포지션 패턴이라고도 부른다.(?)
  + 부품에 대표 기능을 부여
  + 예시: 동물
    - 동물이 사용할 부품(컴포넌트 주머니)
      * 폐, 아가미, 뿔, 날개, 다리, 식사, 잠자리, 등등
    - 코뿔소 : 폐, 다리, 식사, 뿔
  + 컴포넌트마다 한가지 기능을 가진다.
  + 미리 만들어진 컴포넌트를 빈 껍데기인 게임 오브젝트에 조립하는 방식
  + 유니티에서의 컴포넌트
    - 인스펙터(Inspector)창에서 오브젝트별 컴포넌트를 추가할 수 있다.

3. 메시지와 브로드캐스팅
  + 컴포넌트 구조에서 전체방송을 통해서 컴포넌트의 특정 기능을 간접적으로 실행할 수 있다.
  + 전체방송을 브로드캐스팅이라고 부른다.
  + MonoBehaviour : 유니티의 모든 컴포넌트는 MonoBehaviour 클래스를 상속한다.
  + 메시지 기반 방식
    - 유니티는 발동시키고 싶은 기능의 이름을 담아 게임 세상에 메시지를 뿌린다.
    - 게임 세상 오브젝트들은 모두 메시지를 받는다.
    - 메시지를 받은 오브젝트들은 명시된 기능을 가지고 있으면 해당 기능을 실행한다. 없다면 무시한다.
  + 브로드캐스팅
  + 유니티 이벤트 메서드

---

### C# 프로그래밍

1. 스크립트 작성하기
  + 유니티 프로젝트를 만든다.
  + 프로젝트(Project)창에서 [+]버튼을 클릭하고, C# Script 파일 만든다.
  + Assets 폴더에 C# 파일이 생성되며, 원하는 파일명으로 한다.
  + C#파일을 더블클릭하면, Visual Studio 가 실행된다.
    - 비주얼 스튜디오는 마이크로소프트 로그인여부에 따라 사용기간이 있다.
    - 비로그인일 경우, 60일(?), 로그인일 경우 무료사용가능하다.
  + 간혹 C#파일 더블클릭해도 비주얼 스튜디오가 안열린다.(트러블슈팅-검색으로 해결할것!)
    - 필자도 열리지 않아서 별도로 비주얼 스튜디오를 실행해서 파일을 드래그앤드랍으로 열었다.
  + C#파일을 수정하고 저장하면 유니티 에디터에 반영된다.
  + 예제 소스 샘플

```C#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HelloCode : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        // Debug.Log("Hello World!");
        string characterName = "라라";
        char bloodType = 'A';
        int age = 27;
        float height = 161.9f; // float:32bit // 3.1234567 // 7자리소수점까지정확히..
        bool isFemale = true;
        
        Debug.Log("characterName: " + characterName);
        Debug.Log("bloodType: " + bloodType);
        Debug.Log("age: " + age);
        Debug.Log("height: " + height);
        Debug.Log("isFemale: " + isFemale);
        Debug.Log("---------------------------");

        float distance = GetDistance(2,2,5,6);
        Debug.Log("(2,2) ~ (5,6)까지의 거리: " + distance);
    }

    float GetDistance(float x1, float y1, float x2, float y2)
    {
        float width = x2 - x1;
        float height = y2 - y1;

        float distance = (width * width) + (height * height);
        distance = Mathf.Sqrt(distance);

        return distance;
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
```

2. C#스크립트와 오브젝트 연결
  + 하이어리키(Hierarchy)창에서 [+]버튼으로 Create Empty로 빈오브젝트 생성
  + 오브젝트명:GameObject 가 만들어진다.
  + 프로젝트(Project)창에 C#파일을 드래그해서 GameObject에 드랍한다.
  + 인스펙터(Inspector)창에서 컴포넌트가 추가된 것을 볼수 있다.
  + 게임플레이(중앙상단) 버튼을 클릭해서 Console 로그를 확인한다.