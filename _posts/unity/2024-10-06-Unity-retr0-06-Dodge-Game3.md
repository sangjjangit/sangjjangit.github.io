---
layout: post
title: "[Unity] 닷지 게임 - 최종(UI,매니저)"
date: 2024-10-06 15:30:00 +0900 
categories: Unity
book: 레트로의 유니티 게임 프로그래밍 에센스
tag: retr0
excerpt: "유니티의 닷지 게임을 만들며 익히기"
---

### 닷지 게임

- 예제소스 : <https://github.com/IJEMIN/Unity-Programming-Essence-2021>
- 예제번호 : 06, 07, 08

1. 정리
- 프로젝트(Project) 창에서 + > Folder 클릭
  - 폴더명 : Scripts, Materials, Prefabs 생성
  - 각 에셋파일을 폴더에 드래그&드랍

2. 바닥회전
- 프로젝트(Project) 창에서 + > C# Script
```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
/**/
public class Rotator : MonoBehaviour
{
    public float rotationSpeed = 60f;
    void Update() 
    {
        transform.Rotate(0f, rotationSpeed * Time.deltaTime, 0f);
    }
}
```

3. UI 제작
- 씬(Scene) 창에서 2D 클릭 : 2D 편집모드로 전환
- 하이어리키(Hierarchy) 창 + > UI > Text
- 인스펙터(Inspector) 창
  - 이름 변경
  - 앵커 프리셋(Anchor Presets) 클릭
  - alt + Top Center 클릭
  - Text 필드 내용 수정
  - Text 컴포넌트 Alignment를 Center, Middle 변경, Color, Font Size 변경
  - Horizontal, Vertical 을 Overflow
  - 그림자 효과 추가(Add Component > UI > Effects > Shadow)

4. 게임 매니저
- 게임오버 상태, 생존시간, UI 갱신, 게임 재시작
- 하이어리키(Hierarchy) 창 + > Create Empty
  - 아래 만든 스크립트 파일을 컴포넌트로 추가
- 프로젝트(Project) 창에서 + > C# Script
```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI; // UI 관련 라이브러리
using UnityEngine.SceneManagement; // 씬 관리 라이브러리
/**/
public class GameManager : MonoBehaviour
{
    public GameObject gameoverText; //게임종료 활성화 텍스트 오브젝트
    public Text timeText; // 생존시간 텍스트
    public Text recordText; // 최고 기록 텍스트
    //
    private float surviveTime; // 생존시간
    private bool isGameover; // 게임 상태
    // Start is called before the first frame update
    void Start()
    {
        // 초기화
        surviveTime = 0f;
        isGameover = false;
    }
    // Update is called once per frame
    void Update()
    {
        if (!isGameover)
        {
            surviveTime += Time.deltaTime;
            timeText.text = "Time: " + (int)surviveTime;
        }
        else
        {
            if (Input.GetKeyDown(KeyCode.R))
            {
                // 씬 로드
                SceneManager.LoadScene("SampleScene");
            }
        }
    }
    // 현재 게임을 게임오버 상태로 변경
    public void EndGame() {
        isGameover = true; // 게임오버 전환
        gameoverText.SetActive(true); // 텍스트 오브젝트 활성화

        float bestTime = PlayerPrefs.GetFloat("BestTime");

        if(surviveTime > bestTime)
        {
            bestTime = surviveTime;
            PlayerPrefs.SetFloat("BestTime", surviveTime);
        }

        recordText.text = "Best Time: " + (int)bestTime;
    }
}
```

- PlayerPrefs
  - Player Preference(플레이어 설정), 유니티 내장 클래스
  - 키-값 단위로 데이터를 로컬에 저장한다.

- PlayerController 스크립트
```c#
    public void Die(){
        // 자신의 오브젝트 비활성화
        gameObject.SetActive(false);

        GameManager gameManager = FindObjectOfType<GameManager>();
        gameManager.EndGame();
    }
```

- 빌드하기
- 유니티 상단 메뉴 File > Build Settings...
  - Build and Run 클릭 -> 파일 탐색기가 실행됨.(빌드할 폴더 선택)

![image_dodge](/assets/img/image_dodge.png){: width="30%" height="30%"}{: .center}
![image_dodge2](/assets/img/image_dodge2.png){: width="30%" height="30%"}{: .center}

---