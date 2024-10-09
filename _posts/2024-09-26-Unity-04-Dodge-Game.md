---
layout: post
title: "[Unity] 닷지 게임 - 플레이어"
date: 2024-09-26 21:15:00 +0900 
categories: Unity
tag: 레트로의 유니티 게임 프로그래밍 에센스
excerpt: "유니티의 닷지 게임을 만들며 익히기"
---

### 닷지 게임

- 예제소스 : <https://github.com/IJEMIN/Unity-Programming-Essence-2021>
- 예제번호 : 06, 07, 08

- 1차코드
```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
/**/
public class PlayerController : MonoBehaviour
{
    public Rigidbody playerRigidbody; // 이동에 사용할 리지드바디 컴포넌트
    public float speed = 8f; // 이동속도

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if(Input.GetKey(KeyCode.UpArrow) == true){
            // 위쪽 z 방향
            playerRigidbody.AddForce(0f, 0f, speed);
        }
        if(Input.GetKey(KeyCode.DownArrow) == true){
            // 위쪽 -z 방향
            playerRigidbody.AddForce(0f, 0f, -speed);
        }
        if(Input.GetKey(KeyCode.RightArrow) == true){
            // 위쪽 x 방향
            playerRigidbody.AddForce(speed, 0f, 0f);
        }
        if(Input.GetKey(KeyCode.LeftArrow) == true){
            // 위쪽 -x 방향
            playerRigidbody.AddForce(-speed, 0f, 0f);
        }
    }

    public void Die(){
        // 자신의 오브젝트 비활성화
        gameObject.SetActive(false);
    }
}
```
- 스크립트 개선하기
  - 조작이 게임에 즉시 반영되지 않는다.
  - 입력 감지 코드가 복잡하다
  - playerRigidbody에 컴포넌트를 드래그&드롭으로 할당한다.

- 2차코드
```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
/**/
public class PlayerController : MonoBehaviour
{
    private Rigidbody playerRigidbody; // 이동에 사용할 리지드바디 컴포넌트
    public float speed = 8f; // 이동속도

    // Start is called before the first frame update
    void Start()
    {
        playerRigidbody = GetComponent<Rigidbody>();
    }

    // Update is called once per frame
    void Update()
    {
        // 수평축, 수직축의 입력값 감지(-1.0, 0, 1.0)
        float xInput = Input.GetAxis("Horizontal");
        float zInput = Input.GetAxis("Vertical");

        // 실제 이동 속도를 입력값과 이동속도를 사용해서 결정
        float xSpeed = xInput * speed;
        float zSpeed = zInput * speed;

        // Vector3 속도를 생성
        Vector3 newVelocity = new Vector3(xSpeed, 0f, zSpeed);

        // 리지드바디의 속도에 할당
        playerRigidbody.velocity = newVelocity;
    }

    public void Die(){
        // 자신의 오브젝트 비활성화
        gameObject.SetActive(false);
    }
}
```
- 입력 매니저
특정 키에 직접 이벤트를 줄 경우, 단축키를 변경시, 소스 수정은 불가피하다.
입력 이름을 통해서 동작하게 한다.
```
if([마우스 왼쪽 버튼] 클릭) {
    // 총 발사
}
if("발사"에 대응되는 버튼을 클릭) {
    // 총 발사
}
```

- 입력 매너저 설정 창
  - 유니티 에디터 메뉴 > Edit > Project Settings
  - Project Seetings > Input Manager
  
---