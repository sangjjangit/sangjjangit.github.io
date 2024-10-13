---
layout: post
title: "[Unity] 2D 러너 게임"
date: 2024-10-13 19:47:00 +0900 
categories: Unity
book: 레트로의 유니티 게임 프로그래밍 에센스
tag: retr0
excerpt: "발판 반복 생성/마무리"
---

### 유니런 2D 게임

- 예제소스 : <https://github.com/IJEMIN/Unity-Programming-Essence-2021>
- 예제번호 : 11, 12, 13
- 씬과 코드는 를 제외한 모든 에엣은 준비된 상태에서 코딩과 기능 구현에 집중한다.

### 발판 
- 프로젝트 창 > Prefabs 폴더의 Platform 프리팹을 하이어라키 창으로 드래그앤드랍
- 하이어라키 창에 생성된 Platform 오브젝트 인스펙터 창
  - Sprite Renderer 컴포넌트의 Sorting Layer를 Foreground 변경
- 하이어라키 창에 생성된 Platform 오브젝트의 자식 오브젝트 선택(Shift + 클릭)
- Platform 오브젝트의 자식 오브젝트 인스펙터 창
  - Sprite Renderer 컴포넌트의 Sorting Layer를 Middleground 변경

- 프로젝트 창에 Scripts 폴더 > Platform 스크립트를 하이어라키 창의 Platform 오브젝트로 드래그앤드랍
- Platform 스크립트
```c#
using UnityEngine;
/** */
// 발판으로서 필요한 동작을 담은 스크립트
public class Platform : MonoBehaviour {
    public GameObject[] obstacles; // 장애물 오브젝트들
    private bool stepped = false; // 플레이어 캐릭터가 밟았었는가

    // 컴포넌트가 활성화될때 마다 매번 실행되는 메서드
    // 유니티 이벤트 메서드
    // 컴포넌트가 활성화될때마다 실행된다.
    private void OnEnable() {
        // 발판을 리셋하는 처리
        stepped = false;
        for (int i = 0; i < obstacles.Length; i++){
            if(Random.Range(0,3) == 0){ // 1/3의 확률
                obstacles[i].SetActive(true);
            }else{
                obstacles[i].SetActive(false);
            }
        }
    }

    void OnCollisionEnter2D(Collision2D collision) {
        // 플레이어 캐릭터가 자신을 밟았을때 점수를 추가하는 처리
        if(collision.collider.tag == "Player" && !stepped){
            stepped = true;
            GameManager.instance.AddScore(1);
        }
    }
}
```
- 하이어라키 창에 Platform 오브젝트의 인스펙트 창
  - Platform 컴포넌트의 Obstacles 배열크기 3 변경 > Obstacles 펼치기
  - 하이어라키 창에 Platform 오브젝트의 자식 오브젝트를 할당

- Platform 프리팹 갱신
- 하이어라키 창에 Platform 오브젝트의 인스펙트 창
  - Overrides > Apply All 클릭
- 하이어라키 창에 Platform 오브젝트 삭제(Delete)

### 발판 생성기
- 오브젝트 폴링 방식
- 3개의 발판 오브젝트를 미리 생성 및 보이지 않는 곳에 배치
- 일정 시간 후 발판을 리셋하고 재배치
- PlatformSpawner 스크립트
- 하이어라키 창에 + > Create Empty
- 생성한 빈 게임 오브젝트의 인스펙트 창
  - 이름: Platform Spawner
- 프로젝트 창에 Scripts 폴더 > PlatformSpawner 스크립트를 하이어라키 창의 Platform Spawner 오브젝트로 드래그앤드랍
- PlatformSpawner 스크립트 더블 클릭
```c#
using UnityEngine;
/** */
// 발판을 생성하고 주기적으로 재배치하는 스크립트
public class PlatformSpawner : MonoBehaviour {
    public GameObject platformPrefab; // 생성할 발판의 원본 프리팹
    public int count = 3; // 생성할 발판의 개수

    public float timeBetSpawnMin = 1.25f; // 다음 배치까지의 시간 간격 최솟값
    public float timeBetSpawnMax = 2.25f; // 다음 배치까지의 시간 간격 최댓값
    private float timeBetSpawn; // 다음 배치까지의 시간 간격

    public float yMin = -3.5f; // 배치할 위치의 최소 y값
    public float yMax = 1.5f; // 배치할 위치의 최대 y값
    private float xPos = 20f; // 배치할 위치의 x 값

    private GameObject[] platforms; // 미리 생성한 발판들
    private int currentIndex = 0; // 사용할 현재 순번의 발판

    private Vector2 poolPosition = new Vector2(0, -25); // 초반에 생성된 발판들을 화면 밖에 숨겨둘 위치
    private float lastSpawnTime; // 마지막 배치 시점


    void Start() {
        // 변수들을 초기화하고 사용할 발판들을 미리 생성
        platforms = new GameObject[count];
        for(int i = 0; i < count; i++){
            platforms[i] = Instantiate(platformPrefab, poolPosition, Quaternion.identity);
        }
        lastSpawnTime = 0f;
        timeBetSpawn = 0f;
    }

    void Update() {
        // 순서를 돌아가며 주기적으로 발판을 배치
        if(GameManager.instance.isGameover){
            return;
        }
        if(Time.time >= lastSpawnTime + timeBetSpawn){
            lastSpawnTime = Time.time;
            timeBetSpawn = Random.Range(timeBetSpawnMin, timeBetSpawnMax);
            float yPos = Random.Range(yMin, yMax);
            platforms[currentIndex].SetActive(false);
            platforms[currentIndex].SetActive(true);
            platforms[currentIndex].transform.position = new Vector2(xPos, yPos);
            currentIndex++;

            if(currentIndex >= count){
                currentIndex = 0;
            }
        }
    }
}
```
- 하이어라키 창에 Platform Spawner 오브젝트의 인스펙터 창
  - 프로젝트 창에 Prefabs 폴더 > Platform 프리팹을 PlatformSpawner 컴포넌트의 Platform Prefab 필드로 드래그앤드랍

- 배경음악 추가
- 프로젝트 창에 Audio 폴더 > music 오디오 클립을 하이어라키 창으로 드래그앤드랍
- 생성된 music 오브젝트의 인스펙터 창
  - Audio Source 컴포넌트의 Loop 체크

### 빌드하기
- 빌드 설정 창 열기(상단메뉴 File > Build Settings..)
- 빌드 설정 창에서 Add Open Scenes 클릭
- Build and Run 클릭
- 탐색 창에서 빌드를 저장할 폴더 선택
- Save 클릭

- 테스트.끝

[![테스트](https://img.youtube.com/vi/UpxK7G0G6oE/0.jpg)](https://youtu.be/UpxK7G0G6oE){:target="_blank"}

---