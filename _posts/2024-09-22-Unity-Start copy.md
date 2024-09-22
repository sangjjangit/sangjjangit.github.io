---
layout: post
title: "[Unity] 시작2"
date: 2024-09-22 13:48:00 +0900
categories: Blog
excerpt: "유니티를 시작하다."
---

### 유니티 엔진 동작 원리

1. 상속과 재사용
  - class Monster
    - 몬스터 필수 기능
    - 인공지능, 애니메이션, 공격과 방어, 물리, 기타 필수
  
  - class Orc : Monster
    - 초록색 피부, 오크 애니메이션, 오크 스킬, 오크 고유기능
  
  - class OrcChieftan : Orc
    - 대장모자, 새로운 무기, 스킬, 대장 고유기능

2. 컴포넌트 패턴:조립
  - 상속에만 의존하여 게임을 개발시 생기는 문제점 보완
  - 컴포지션 패턴이라고도 부른다.(?)
  - 부품에 대표 기능을 부여
  - 예시: 동물
    - 동물이 사용할 부품(컴포넌트 주머니)
      - 폐, 아가미, 뿔, 날개, 다리, 식사, 잠자리, 등등
    - 코뿔소 : 폐, 다리, 식사, 뿔
    
  - 컴포넌트마다 한가지 기능을 가진다.
  - 미리 만들어진 컴포넌트를 빈 껍데기인 게임 오브젝트에 조립하는 방식
  - 유니티에서의 컴포넌트
    - 인스펙터(Inspector)창에서 오브젝트별 컴포넌트를 추가할 수 있다.

3. 메시지와 브로드캐스팅
  - 컴포넌트 구조에서 전체방송을 통해서 컴포넌트의 특정 기능을 간접적으로 실행할 수 있다.
  - 전체방송을 브로드캐스팅이라고 부른다.
  - MonoBehaviour : 유니티의 모든 컴포넌트는 MonoBehaviour 클래스를 상속한다.
  - 메시지 기반 방식
    - 유니티는 발동시키고 싶은 기능의 이름을 담아 게임 세상에 메시지를 뿌린다.
    - 게임 세상 오브젝트들은 모두 메시지를 받는다.
    - 메시지를 받은 오브젝트들은 명시된 기능을 가지고 있으면 해당 기능을 실행한다. 없다면 무시한다.
  - 브로드캐스팅
  - 유니티 이벤트 메서드

---

### C# 프로그래밍

1. 스크립트 작성하기
  - 유니티 프로젝트를 만든다.
  - 프로젝트(Project)창에서 [+]버튼을 클릭하고, C# Script 파일 만든다.
  - Assets 폴더에 C# 파일이 생성되며, 원하는 파일명으로 한다.
  - C#파일을 더블클릭하면, Visual Studio 가 실행된다.
    - 비주얼 스튜디오는 마이크로소프트 로그인여부에 따라 사용기간이 있다.
    - 비로그인일 경우, 60일(?), 로그인일 경우 무료사용가능하다.
  - 간혹 C#파일 더블클릭해도 비주얼 스튜디오가 안열린다.(트러블슈팅-검색으로 해결할것!)
    - 필자도 열리지 않아서 별도로 비주얼 스튜디오를 실행해서 파일을 드래그앤드랍으로 열었다.
  - C#파일을 수정하고 저장하면 유니티 에디터에 반영된다.
  - 예제 소스 샘플

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
  - 하이어리키(Hierarchy)창에서 [+]버튼으로 Create Empty로 빈오브젝트 생성
  - 오브젝트명:GameObject 가 만들어진다.
  - 프로젝트(Project)창에 C#파일을 드래그해서 GameObject에 드랍한다.
  - 인스펙터(Inspector)창에서 컴포넌트가 추가된 것을 볼수 있다.
  - 게임플레이(중앙상단) 버튼을 클릭해서 Console 로그를 확인한다.