---
layout: post
title: "[Unity] 2D 러너 게임"
date: 2024-10-20 14:22:00 +0900 
categories: Unity
book: 레트로의 유니티 게임 프로그래밍 에센스
tag: retr0
excerpt: "배경, 게임 매니저"
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
  - Ctrl + S -> Main 이름으로 씬 저장

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
- Toko_Die, Toko_jump 은 작업되어 있다.

### 캐릭터 오브젝트
- Player 오브젝트 생성
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
- 상단메뉴 Window > Animation > Animation 클릭 > 애니메이션 창이 열린다. > 드래그로 적절한 위치에 배치
- 애니메이션 창 Create 클릭 > 애니메이션 클릭 저장 창이 열린다.
- To begin animating Player, create an Animator and an Animation clip 메시지와 Create 버튼이 없다면, 하이어라키 창의 Player 오브젝트를 선택한다.
  - 저장할 새로운 애니메이션 클립명 : Run 
  - Assets 폴더 > Animations 폴더에 저장
- 프로젝트 창 > Sprites 폴더 > Toko_Run 스프라이트 펼치기
- Shift + 클릭 으로 Toko_Run_0 ~ Toko_Run_7 선택 후 애니메이션 창의 타임라인으로 드래그앤드랍
- 샘플 레이트 필드 활성화(애니메이션 창의 점3개(...) 버튼 클릭 > Show Sample Rate 체크)
- 애니메이션 창에서 Samples : 16 변경

2. Toko_Jump 애니메이션(Samples : 6)
3. Toko_Die 애니메이션(Samples : 6)
- 애니메이션 창의 Run 클릭 > Create New Clip... 클릭
- 위의 방법과 같이, 애니메이션 클립을 만든다.
- Die 애니메이션 클립은 인스펙터 창에서 Loop Time 체크 해제해준다.
- 애니메이션을 다 만들었으면, 애니메이션 창의 점3개(...) 버튼 클릭 > Close Tab 클릭으로 창을 닫는다.

4. 유한 상태 머신
- 상황에 맞는 애니메이션을 재생하려면 애니메이터 컨트롤러가 필요하다.
- 유한 상태 머신(Finite State Machine, FSM) 모델
- 유한한 수의 상태(State)가 존재하며, 한번에 한 상태만 현재 상태가 되도록 프로그램을 설계하는 모델.

5. 애니메이터 컨트롤러
- 유한 상태 머신을 사용해 재생할 애니메이션을 결정하는 상태도를 표현하는 에셋이다.
- 프로젝트 창 + > Create > Animator Controller 로 생성할 수 있다.
- 애니메이터 컨트롤러는 에셋이고, 애니메이터는 컴포넌트이다.
- 애니메이션 클립을 만들때, 애니메이터 컨트롤러가 자동 생성되었으며, 애니메이터 컨트롤러 에셋을 사용하는 애니메이터 컴포넌트가 자동 추가되었다.

- 애니메이터 창 열기
  - 유니티 상단 메뉴 > Window > Animation > Animator 클릭
  - 애니메이터 창이 열리고, 적절한 위치로 드래그로 배치.
  - 애니메이터 창에 표시된 상태도는 선택한 게임오브젝트의 애니메터 컨트롤러의 상태이다.
  - 기본 포함 상태 : Entry, Exit, Any State
    - Entry : 애니메이터 동작이 시작되는 진입점.
    - Exit : 애니메이터의 동작이 끝나는 지점.
    - Any State : 현재 상태가 무엇이든 특정 상태로의 즉시 전이를 가능하게 만든다.
  - 구현한 상태 : Run, Jump, Die
  - Run 상태를 기본 상태로 변경한다.(마우스 오른쪽 클릭 > Set as Layer Default State 클릭)
  - 전이 구성
    - Run - 마우스 오른쪽 클릭 > Make Transition 클릭
    - 전이 화살표를 Jump 연결(전이 화살표를 끌어다 Jump 클릭)
    - Jump - 마우스 오른쪽 클릭 > Make Transition 클릭
    - 전이 화살표를 Run 연결(전이 화살표를 끌어다 Run 클릭)
    - Any State - 마우스 오른쪽 클릭 > Make Transition 클릭
    - 전이 화살표를 Die 연결(전이 화살표를 끌어다 Die 클릭)
  - 파라미터 추가
    - 애니메이터 창에서 Parameters 탭 클릭
    - [+] > Bool > Grounded 이름의 파라미터 생성(캐릭터가 발판에 닿으면 true, 아니면 false)
    - [+] > Trigger > Die 이름의 파라미터 생성
    - 파라미터는 전이의 조건으로 사용하는 수치이다.
    - 파라미터 타입은 실수(float), 정수(int), 불리언(bool), 트리거(trigger)가 있다.
  - Run - Jump 전이 설정
    - 애니메이터 창에서 Run -> Jump 전이화살표 클릭
    - 인스펙터 창에서 Has Exit time 체크 해제(Has Exit time:종료시점을 활성화하는 옵션)
    - Settings 탭 펼치기 > Transition Duration 을 0 으로 변경(Transition Duration:전환 지속 시간)
    - 조건에 Grounded 추가(Conditions +버튼)
    - Grounded 조건값을 false 로 변경
    - 애니메이터 창에서 Jump -> Run 전이화살표 클릭(Run -> Jump 전이화살표와 같음. Grounded 값만 true)
    - 인스펙터 창에서 Has Exit time 체크 해제(Has Exit time:종료시점을 활성화하는 옵션)
    - Settings 탭 펼치기 > Transition Duration 을 0 으로 변경(Transition Duration:전환 지속 시간)
    - 조건에 Grounded 추가(Conditions +버튼)
    - Grounded 조건값을 true 로 변경
  - Any State - Die 전이 설정
    - 애니메이터 창에서 Any State -> Die 전이화살표 클릭
    - Settings 탭 펼치기 > Transition Duration 을 0 으로 변경(Transition Duration:전환 지속 시간)
    - 조건에 Die 추가(Conditions +버튼)
    - 트리거 타입의 파라미터는 수치 검사가 아니라 트리거의 발동을 감지하는 방식으로 전이가 실행된다.

### PlayerController 스크립트
- 프로젝트 창의 Scripts 폴더 > PlayerController 스크립트를 하이어라키 창의 Player 오브젝트로 드래그앤드랍
- Player 오브젝트 인스펙트 창의 PlayerController 스크립트 확인
```c#
using UnityEngine;
/**/
// PlayerController는 플레이어 캐릭터로서 Player 게임 오브젝트를 제어한다.
public class PlayerController : MonoBehaviour {
    public AudioClip deathClip; // 사망시 재생할 오디오 클립
    public float jumpForce = 700f; // 점프 힘

    private int jumpCount = 0; // 누적 점프 횟수
    private bool isGrounded = false; // 바닥에 닿았는지 나타냄
    private bool isDead = false; // 사망 상태

    private Rigidbody2D playerRigidbody; // 사용할 리지드바디 컴포넌트
    private Animator animator; // 사용할 애니메이터 컴포넌트
    private AudioSource playerAudio; // 사용할 오디오 소스 컴포넌트

    private void Start() {
        // 초기화
        playerRigidbody = GetComponent<Rigidbody2D>();
        animator = GetComponent<Animator>();
        playerAudio = GetComponent<AudioSource>();
    }

    private void Update() {
        // 사용자 입력을 감지하고 점프하는 처리
        if (isDead) {
            return;
        }
        // Input.GetMouseButtonDown(0)
        // 0 : 마우스 왼쪽 버튼
        // 1 : 마우스 오른쪽 버튼
        // 2 : 마우스 휠 버튼
        if (Input.GetMouseButtonDown(0) && jumpCount < 2){
            jumpCount++; // 점프 횟수 층가
            playerRigidbody.velocity = Vector2.zero; // 점프직전속도를 순간적으로 (0,0) 변경
            playerRigidbody.AddForce(new Vector2(0, jumpForce)); // 리지드바디 위쪽
            playerAudio.Play(); // 오디오 재생
        } else if (Input.GetMouseButtonUp(0) && playerRigidbody.velocity.y > 0){
            playerRigidbody.velocity = playerRigidbody.velocity * 0.5f; // 현재 속도를 절반으로 변경
        }
        animator.SetBool("Grounded", isGrounded); // 애니메이터 Grounded 파라미터 값 갱신
    }

    private void Die() {
        // 사망 처리
        animator.SetTrigger("Die"); // 트리거 파라미터 셋, Any State -> Die 전이가 실행.
        playerAudio.clip = deathClip;
        playerAudio.Play();
        playerRigidbody.velocity = Vector2.zero; // 속도를 (0,0) 변경
        isDead = true;
    }

    private void OnTriggerEnter2D(Collider2D other) {
        // 트리거 콜라이더를 가진 장애물과의 충돌을 감지
        if(other.tag == "Dead" && !isDead){
            Die();
        }
    }

    private void OnCollisionEnter2D(Collision2D collision) {
        // 바닥에 닿았음을 감지하는 처리
        if(collision.contacts[0].normal.y > 0.7f){ // 노말벡터의 방향을 검사
            isGrounded = true;
            jumpCount = 0;
        }
    }

    private void OnCollisionExit2D(Collision2D collision) {
       // 바닥에서 벗어났음을 감지하는 처리
       isGrounded = false;
    }
}
```
- PlayerController 컴포넌트 설정
  - Player 오브젝트의 인터펙터 창
    - Death Clip 필드 옆의 선택 버튼 > 선택 창에서 die 오디오 더블 클릭

- 테스트.끝

---