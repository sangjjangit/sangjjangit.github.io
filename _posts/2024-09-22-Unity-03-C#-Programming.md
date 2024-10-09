---
layout: post
title: "[Unity] C# 프로그래밍"
date: 2024-09-22 13:55:00 +0900 
categories: Unity
tag: 레트로의 유니티 게임 프로그래밍 에센스
excerpt: "유니티의 C# 프로그래밍"
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
```c#
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
/**/
    float GetDistance(float x1, float y1, float x2, float y2)
    {
        float width = x2 - x1;
        float height = y2 - y1;
        float distance = (width * width) + (height * height);

        distance = Mathf.Sqrt(distance);
        return distance;
    }
/**/
    // Update is called once per frame
    void Update()
    {
        // update
    }
}
```

2. C#스크립트와 오브젝트 연결
- 하이어리키(Hierarchy)창에서 [+]버튼으로 Create Empty로 빈오브젝트 생성
- 오브젝트명:GameObject 가 만들어진다.
- 프로젝트(Project)창에 C#파일을 드래그해서 GameObject에 드랍한다.
- 인스펙터(Inspector)창에서 컴포넌트가 추가된 것을 볼수 있다.
- 게임플레이(중앙상단) 버튼을 클릭해서 Console 로그를 확인한다.

---

### 게임 오브젝트

```c#
public class Animal
{
    public string name;
    public string sound;

    public void PlaySound(){
        Debug.Log(name + " : " + sound);
    }
}

```
```c#
public class Zoo : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        Animal tom = new Animal();
        tom.name = "톰";
        tom.sound = "냐옹!";
        
        tom.PlaySound();
    }
}
```
- 오브젝트 연결
  - 하이어리키(Hierarchy)창에서 [+]버튼으로 Create Empty로 빈오브젝트 생성
  - 프로젝트(Project)창에 Zoo 스크립트를 드래그해서 GameObject에 드랍한다.

```c#
public class Jumper : MonoBehaviour
{
    public Rigidbody myRigidbody;

    // Start is called before the first frame update
    void Start()
    {
        myRigidbody.AddForce(0, 500, 0);
    }
}
```
- 변수로 컴포넌트 사용하기
  - 하이어리키(Hierarchy)창에서 [+]버튼으로 3D Object - Cube 생성
  - 인스펙터(Inspector)창에 Rigidbody 컴포넌트를 추가한다.
  - 프로젝트(Project)창에 Jumper 스크립트를 Cube에 드래그앤드랍한다.
  - 인스펙터(Inspector)창에 Rigidbody 컴포넌트를 Jumper 컴포넌트의 My Rigidbody 에 드래그앤드랍한다.

---