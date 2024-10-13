---
layout: post
title: "[Unity] 2D 러너 게임"
date: 2024-10-13 14:22:00 +0900 
categories: Unity
book: 레트로의 유니티 게임 프로그래밍 에센스
tag: retr0
excerpt: "배경, 게임 매니저"
---

### 유니런 2D 게임

- 예제소스 : <https://github.com/IJEMIN/Unity-Programming-Essence-2021>
- 예제번호 : 11, 12, 13
- 씬과 코드는 를 제외한 모든 에엣은 준비된 상태에서 코딩과 기능 구현에 집중한다.

### 배경
- 프로젝트 창에 Sprites 폴더 > Sky 스프라이트를 하이어라키 창으로 드래그앤드랍
- 하이어라키 창의 Sky 오브젝트 인스펙터 창
  - 위치 : (0,0,0) 변경
  - Sprite Renderer 컴포넌트의 Sorting Layer의 Default 클릭 > Add Sorting Layer... 클릭
  - Tags & Layers 창에서 Sorting Layers 리스트의 + 버튼
  - 생성된 Layer 이름 : Background 변경
  - [+] 버튼 > Layer 이름 : Middleground 변경
  - [+] 버튼 > Layer 이름 : Foreground 변경
- 하이어라키 창의 Main Camera 오브젝트 인스펙터 창
  - Camera 컴포넌트의 Clear Flags : Solid Color 변경
  - Background 필드 클릭 : (163,185,194) 변경
- 2D 게임 오브젝트가 그려지는 순서는 스프라이트 렌더러의 정렬 레이어가 결정한다.
- 정렬 레이어 할당
  - 하이어라키 창의 Sky 오브젝트 인스펙터 창
    - Sprite Renderer 컴포넌트의 Sorting Layer를 Background 변경
  - 하이어라키 창의 Player 오브젝트 인스펙터 창
    - Sprite Renderer 컴포넌트의 Sorting Layer를 Foreground 변경
  - 하이어라키 창의 Start Platform 오브젝트 인스펙터 창
    - Sprite Renderer 컴포넌트의 Sorting Layer를 Foreground 변경

### 움직이는 발판/배경
- 프로젝트 창에서 Sprites 폴더 > ScrollingObject 스크립트를 하이어라키 창의 Start Platform, Sky 오브젝트로 드래그앤드랍
- ScrollingObject 스크립트
```c#
using UnityEngine;
/** */
// 게임 오브젝트를 계속 왼쪽으로 움직이는 스크립트
public class ScrollingObject : MonoBehaviour {
    public float speed = 10f; // 이동 속도

    private void Update() {
        // 게임 오브젝트를 왼쪽으로 일정 속도로 평행 이동하는 처리
        // 게임 오브젝트를 (-speed,0,0)만큼 이동
        // Vector3.left = (-1,0,0)
        transform.Translate(Vector3.left * speed * Time.deltaTime);
    }
}
```

- 배경은 끊임없이 반복 스크롤링되어야 한다.
- 하이어라키 창의 Sky 오브젝트 인스펙터 창
  - Box Collider 2D 컴포넌트 추가(Add Component > Physics 2D > Box Collider 2D)
  - Box Collider 2D 컴포넌트 is Trigger 체크
- 프로젝트 창에 Scripts 폴더 > BackgroundLoop 스크립트를 하이어라키 창의 Sky 오브젝트로 드래그앤드랍
- BackgroundLoop 스크립트
```c#
using UnityEngine;
/** */
// 왼쪽 끝으로 이동한 배경을 오른쪽 끝으로 재배치하는 스크립트
public class BackgroundLoop : MonoBehaviour {
    private float width; // 배경의 가로 길이

    // Awake() : 초기 1회 자동 실행되는 유니티 이벤트 메소드, Start() 메소드보다 한 프레임 더 빠르게 실행.
    private void Awake() {
        // 가로 길이를 측정하는 처리
        BoxCollider2D backgroundCollider = GetComponent<BoxCollider2D>();
        width = backgroundCollider.size.x;
    }

    private void Update() {
        // 현재 위치가 원점에서 왼쪽으로 width 이상 이동했을때 위치를 리셋
        if(transform.position.x <= -width){
            Reposition();
        }
    }

    // 위치를 리셋하는 메서드
    private void Reposition() {
        Vector2 offset = new Vector2(width * 2f, 0);
        transform.position = (Vector2) transform.position + offset;
    }
}
```
- 하이어라키 창에서 Sky 오브젝트 복제(Ctrl + D)
- 복제된 Sky 오브젝트의 인스펙터 창
  - 위치 : (20.48,0,0)
- 빈 게임 오브젝트 생성 : 하이어라키 창 + > Create Empty
- 빈 게임 오브젝트의 인스펙터 창
  - 이름 : Background
  - 위치 : (0,0,0)
- 하이어라키 창의 Sky, Sky(1) 오브젝트를 선택해서 Background 오브젝트로 드래그앤드랍

### 게임 UI
- 캔버스 게임 오브젝트를 생성한다.
- 캔버스는 모든 UI 요소를 잡아주는 루트 게임 오브젝트이다.
- 고정 픽셀 크기는 해상도에 따라 크기가 달라질 수 있다.
- 기준 크기를 정하고, 실행 화면 크기에 따라 확대/축소하는 UI 스케일 모드를 사용할 수 있다.
- 화면 크기 스케일 모드를 사용해 640 * 360 기준 해상도로 UI 배치

- 하이어라키 창 + > UI > Canvas 생성
- 하이어라키 창의 Canvas 오브젝트의 인스펙터 창
  - Canvas Scaler 컴포넌트 UI Scale Mode : Scale With Screen Size 로 변경
  - Canvas Scaler 컴포넌트 Reference Resolution : (640,360) 변경

- 점수 UI 텍스트 만들기
- 하이어라키 창 + > UI > Text 생성
- 하이어라키 창의 Text 오브젝트의 인스펙터 창
  - 이름 : Score Text
  - Rect Transform 컴포넌트의 Width: 300, Height: 80 변경
  - Anchor Preset 클릭 > Alt + Shift 누른채, bottom-center 클릭(캔버스 하단 중앙 정렬)
  - Text 필드 - Score : 0
  - Font 필드 옆 선택 버튼 클릭 > 선택 창에서 Kenney Mini Square 폰트 더블 클릭
  - Font Size : 50 
  - Alignment : Center, Middle 변경
  - Color 필드 클릭 > 폰트 컬러(255,255,255) 변경
  - Shadow 컴포넌트 추가(Add Component > UI > Effects > Shadow)

- 게임오버 UI 텍스트 만들기
- 하이어라키 창의 Score Text 오브젝트 복제(Ctrl + D)
- 하이어라키 창의 복제한 오브젝트의 인스펙터 창
  - 이름 : Gameover Text
  - Anchor Preset 클릭 > Alt + Shift 누른채, top-center 클릭(캔버스 상단 중앙 정렬)
  - Text 필드 - Gameover!
  - Color 필드 클릭 > 폰트 컬러(255,66,85) 변경
  - 인스펙터 창에서 활성화 체크 해제

- 재시작 UI 텍스트 만들기
- 하이어라키 창의 Gameover Text 오브젝트 복제(Ctrl + D)
- 하이어라키 창의 복제한 오브젝트의 인스펙터 창
  - 이름 : Restart Text
  - Rect Transform 컴포넌트의 Pos Y: -40 변경
  - Text 필드 - Jump To Restart
  - Font Size : 33
- 하이어라키 창의 Restart Text 오브젝트를 Gameover Text 오브젝트로 드래그앤드랍(Gameover Text 오브젝트 자식으로..)

### 게임 매니저
- 플레이어 상태에 따라 게임의 전반적인 상태를 관리
- 게임 매니저처럼 관리자 역할을 하는 오브젝트는 일반적으로 프로그램에 단 하나만 존재해야 한다.(단일오브젝트, 손쉬운 접근)
- 싱글톤 패턴
- 정적(static) 활용

- GameManager 스크립트
- 하이어라키 창 + > Create Empty 생성
- 하이어라키 창의 빈 게임 오브젝트의 인스펙터 창
  - 이름 : Game Manager
- 프로젝트 창 > Scripts 폴더의 GameManager 스크립트를 하이어라키 창의 Game Manager 오브젝트에 드래그앤드랍
- GameManager 스크립트 더블 클릭
```c#
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
/** */
// 게임 오버 상태를 표현하고, 게임 점수와 UI를 관리하는 게임 매니저
// 씬에는 단 하나의 게임 매니저만 존재할 수 있다.
public class GameManager : MonoBehaviour {
    public static GameManager instance; // 싱글톤을 할당할 전역 변수

    public bool isGameover = false; // 게임 오버 상태
    public Text scoreText; // 점수를 출력할 UI 텍스트
    public GameObject gameoverUI; // 게임 오버시 활성화 할 UI 게임 오브젝트

    private int score = 0; // 게임 점수

    // 게임 시작과 동시에 싱글톤을 구성
    void Awake() {
        // 싱글톤 변수 instance가 비어있는가?
        if (instance == null)
        {
            // instance가 비어있다면(null) 그곳에 자기 자신을 할당
            instance = this;
        }
        else
        {
            // instance에 이미 다른 GameManager 오브젝트가 할당되어 있는 경우

            // 씬에 두개 이상의 GameManager 오브젝트가 존재한다는 의미.
            // 싱글톤 오브젝트는 하나만 존재해야 하므로 자신의 게임 오브젝트를 파괴
            Debug.LogWarning("씬에 두개 이상의 게임 매니저가 존재합니다!");
            Destroy(gameObject);
        }
    }

    void Update() {
        // 게임 오버 상태에서 게임을 재시작할 수 있게 하는 처리
        if(isGameover && Input.GetMouseButtonDown(0)){
            // 게임오버상태에서 마우스 왼쪽 버튼 클릭시, 현재 씬 재시작
            SceneManager.LoadScene(SceneManager.GetActiveScene().name);
        }
    }

    // 점수를 증가시키는 메서드
    public void AddScore(int newScore) {
        if(!isGameover){
          score += newScore;
          scoreText.text = "Score : " + score;
        }        
    }

    // 플레이어 캐릭터가 사망시 게임 오버를 실행하는 메서드
    public void OnPlayerDead() {
        isGameover = true;
        gameoverUI.SetActive(true);
    }
}
```

- PlayerController 스크립트 수정
```c#
   private void Die() {
        // 사망 처리
        animator.SetTrigger("Die"); // 트리거 파라미터 셋, Any State -> Die 전이가 실행.
        playerAudio.clip = deathClip;
        playerAudio.Play();
        playerRigidbody.velocity = Vector2.zero; // 속도를 (0,0) 변경
        isDead = true;

        // 게임 매니저의 게임오버 처리
        GameManager.instance.OnPlayerDead();
    }
```

- ScrollingObject 스크립트 수정
```c#
    private void Update() {
        // 게임오버가 아니면,
        if(!GameManager.instance.isGameover){
            // 게임 오브젝트를 왼쪽으로 일정 속도로 평행 이동하는 처리
            // 게임 오브젝트를 (-speed,0,0)만큼 이동
            // Vector3.left = (-1,0,0)
            transform.Translate(Vector3.left * speed * Time.deltaTime);
        }
    }
```

- GameManager 오브젝트 설정
- 하이어라키 창의 GameManager 오브젝트의 인스펙터 창
  - 하이어라키 창의 Score Text 오브젝트를 Score Text 필드로 드래그앤드랍
  - 하이어라키 창의 Gameover Text 오브젝트를 Gameover UI 필드로 드래그앤드랍

- 테스트.끝

[![테스트](https://img.youtube.com/vi/I_Iu_Cyo0zE/0.jpg)](https://youtu.be/I_Iu_Cyo0zE){:target="_blank"}

---