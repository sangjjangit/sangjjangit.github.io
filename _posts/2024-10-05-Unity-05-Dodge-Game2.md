---
layout: post
title: "[Unity] 닷지 게임 - 탄알"
date: 2024-10-05 14:50:00 +0900 
categories: Unity
excerpt: "유니티의 닷지 게임을 만들며 익히기"
---

### 닷지 게임

- 예제소스 : <https://github.com/IJEMIN/Unity-Programming-Essence-2021>
- 예제번호 : 06, 07, 08

1. 탄알 오브젝트 준비
- 하이어리키(Hierarchy) 창 > 3D Object > Sphere
- 인스펙터(Inspector) 창
  - 이름, 위치, 스케일 수정
  - 리지드바디(Rigidbody) 컴포넌트 추가 : 상호작용 오브젝트이므로, 중력을 무시할 수 있게, Use Gravitiy 체크 해제
- 프로젝트(Project) 창 > Material
  - 색상을 선택하고, 하이어리키(Hierarchy) 창에 있는 탄알 오브젝트에 드래그&드랍으로 색상 적용

- 콜라이더 : 콜라이더를 가진 오브젝트와 충돌하면 튕겨나간다.
  - 트리거 콜라이더
    : 충돌한 물체를 밀어내는 표면이 없다. 
    : 그래서 다른 일반 콜라이더와 겹치거나 서로를 뚫고 지나갈 수 있지만 충돌 자체는 감지한다.
    : ex) 플레이어가 특정 영역으로 진입했는지 검사할 때 사용을 많이 한다.
          보이지 않는 트리거 콜라이더를 배치하고, 플레이어가 통과하면 새로운 적, 컷씬을 재생하는 방식으로 사용한다.

- 프리탭 : 언제든지 재사용할 수 있는 미리 만들어진 게임 오브젝트 에셋(파일)이다.
- 프리탭 만들기 : 하이어리키(Hierarchy) 창에 있는 탄알 오브젝트를 프로젝트(Project) 창으로 드래그&드랍한다.

2. 스크립트 준비
- 프로젝트(Project) 창 > C# Script
```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
/**/
public class Bullet : MonoBehaviour
{
    public float speed = 8f; // 속도
    private Rigidbody bulletRigidbody; // 리지드바디 컴포넌트
    // Start is called before the first frame update
    void Start()
    {
        // 리지드바디 컴포넌트 할당
        bulletRigidbody = GetComponent<Rigidbody>(); 
        // 리지드바디 속도 = 앞쪽 방향 * 속도
        bulletRigidbody.velocity = transform.forward * speed; 

        // 3초 뒤에 자신의 오브젝트 파괴
        Destroy(gameObject, 3f);
    }
    // 트리거 충돌시 자동 실행
    void OnTriggerEnter(Collider other) {
        // 충돌한 상태 오브젝트 태그정보 가져 오기
        if(other.tag == "Player") {
            // 상대방 PlayerController 컴포넌트 가져오기
            PlayerController playerController = other.GetComponent<PlayerController>();
            // 
            if(playerController != null){
                // 상대방 오브젝트 Die() 실행
                playerController.Die();
            }
        }
    }
}
```
3. 충돌처리
- 오브젝트 A,B가 충돌하면, A와 B는 자신이 충돌했다는 사실을 모른다.
- 그 대신 충돌했음을 알려주는 메시지를 A,B에 보낸다.
- A에는 충돌한 상대방 B정보를 전달.
- B에는 충돌한 상대방 A정보를 전달.
- 메시지 기반 방식
- 리지드바디 컴포넌트를 가지고 있어야 한다.
- 충돌 메시지에 대응하는 메소드를 충돌 이벤트 메서드라고 부른다.

- 충돌 이벤트 메소드
- OnCollision 계열 : 일반 충돌
  - OnCollisionEnter(Collision collision) : 충돌한 순간
  - OnCollisionStay(Collision collision) : 충돌하는 동안
  - OnCollisionExit(Collision collision) : 충돌했다가 분리되는 순간
- OnTrigger 계열 : 트리거 계열
  - OnTriggerEnter(Collider other) : 충돌한 순간
  - OnTriggerStay(Collider other) : 충돌하는 동안
  - OnTriggerExit(Collider other) : 충돌했다가 분리되는 순간
  - 트리거 충돌은 일반적인 충돌과 달리 서로를 밀어내지 않고 그대로 통과한다.

- 충돌 감지 구현
- OnTriggerEnter() 메서드 작성
- 프로젝트(Project) 창의 탄알 스크립트를 하이어리키(Hierarchy) 창에 탄알 오브젝트에 드래그&드랍
- 하이어리키(Hierarchy) 창에 탄알 오브젝트를 선택하고, 인스펙터(Inspector) 창에 Overrides > Apply All 클릭.
- Apply All 을 클릭하면 프리팹과 연동된 게임 오브젝트의 변경 사항이 프리팹에 반영된다.

4. 탄알 생성기
- 탄알을 생성하고 플레이어를 향해 발사한다.

---