---
layout: post
title: "[Unity] 공간, 움직임"
date: 2024-10-07 21:47:00 +0900 
categories: Unity
book: 레트로의 유니티 게임 프로그래밍 에센스
excerpt: "유니티 공간, 오브젝트 이동/회전, 평행이동"
---

### 유니티 공간
- x,y,z 좌표계
- 전역 공간
  - 전역공간은 월드의 중심이라는 절대 기존이 존재하는 공간, 월드 공간이라고도 부른다.
  - (0,0,0)이 존재하며 모든 오브젝트가 원점에서 얼마만큼 떨어져 있냐가 오브젝트의 좌표가 된다.
  - 씬(Scene) 창 상단에 (피벗/센터) 전환, (로컬/글로벌) 전환 버튼이 있다.
  - 피벗: 오브젝트의 실제 기준점을 기준으로 오브젝트를 배치
  - 센터: 눈으로 보이는 중점을 기준으로 오브젝트를 배치
  - 글로벌(전역) 모드 : 전역공간에서 오브젝트의 좌표는 오브젝트가 게임 월드의 원점(0,0,0)에서 게임 월드의 x,y,z 방향으로 각각 얼마만큼 떨어져 있냐를 결정.

- 오브젝트 공간
  - 전역 좌표계와 원점을 기준으로 배치하는 전역 공간과 반대로 오브젝트 공간은 오브젝트 자신의 x,y,z 방향(오브젝트 좌표계)를 배치 기준으로 사용한다.
  - 씬(Scene) 창 상단의 로컬 모드
  - 게임 월드에서의 오브젝트 실제 위치가 어디든 상관없이 오브젝트 공간에서 오브젝트의 위치는 항상 (0,0,0)이다.
  - 오브젝트 공간에서의 평행이동은 오브젝트는 가만히 있고, 주변 풍경이 움직이는 것으로 이해할 수 있다.

- 지역 공간
  - 게임 월드나 오브젝트 자신이 아닌 자신의 부모 오브젝트를 기준으로 한 지역좌표계로 좌표를 측정한다.
  - 부모-자식 오브젝트에서 자식 오브젝트의 인스펙터(Inspector)창의 수치는 부모 오브젝트 기준이다.

### 오브젝트의 이동과 회전
- 하이어리키(Hierarchy) 창 + > 3D Object 로 부모-자식 오브젝트 준비
- 프로젝트(Project) 창 + > C# Script
- Move 스크립트 작성
```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
/**/
public class Move : MonoBehaviour
{
    public Transform childTransform; // 움직일 자신 오브젝트의 트랜스폼

    // Start is called before the first frame update
    void Start()
    {
        transform.position = new Vector3(0, -1, 0); // 자신의 전역 위치
        childTransform.localPosition = new Vector3(0, 2, 0); // 자식의 지역 위치

        transform.rotation = Quaternion.Euler(new Vector3(0, 30, 0)); // 자신의 전역 회전
        childTransform.localRotation = Quaternion.Euler(new Vector3(0, 60, 0)); // 자식의 지역 회전
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKey(KeyCode.UpArrow)) {
            transform.Translate(new Vector3(0, 1, 0) * Time.deltaTime); // 초당 속도로 평행이동
        }
        if (Input.GetKey(KeyCode.DownArrow)) {
            transform.Translate(new Vector3(0, -1, 0) * Time.deltaTime); // 초당 속도로 평행이동
        }
        if (Input.GetKey(KeyCode.LeftArrow)) {
            transform.Rotate(new Vector3(0, 0, 180) * Time.deltaTime); // 자신을 초당 회전
            childTransform.Rotate(new Vector3(0, 180, 0) * Time.deltaTime); // 자식을 초당 회전
        }
        if (Input.GetKey(KeyCode.RightArrow)) {
            transform.Rotate(new Vector3(0, 0, -180) * Time.deltaTime); // 자신을 초당 회전
            childTransform.Rotate(new Vector3(0, -180, 0) * Time.deltaTime); // 자식을 초당 회전
        }
    }
}
```

### 벡터 연산
- 벡터의 속기
  - `Vector3 position = Vector3.up;`와 `Vector3 position = new Vector3(0,1,0);`은 같은 동작을 한다.
  - Vector3.forward : new Vector3(0,0,1)
  - Vector3.back : new Vector3(0,0,-1)
  - Vector3.right : new Vector3(1,0,0)
  - Vector3.left : new Vector3(-1,0,0)
  - Vector3.up : new Vector3(0,1,0)
  - Vector3.down : new Vector3(0,-1,0)
  - 모두 크기가 1인 방향벡터다.

- 트랜스폼의 방향
  - transform.forward : 자신의 앞쪽 방향벡트
  - transform.right : 자신의 오른쪽 방향벡트
  - transform.up : 자신의 위쪽 방향벡트
  - -1 를 곱해서 반대방향으로 표현
  - -1 * transform.forward
  - -1 * transform.right
  - -1 * transform.up

- 벡터연산의 평행이동
  - `transform.Translate(new Vector3(0,1,0));` 를 `transform.position = transform.position + transform.up * 1;` 표현할 수 있다.
  - 전역공간을 기준으로 `transform.Translate(new Vector3(0,1,0), Space.World);` 를 `transform.position = transform.position + Vector3.up * 1;` 표현할 수 있다.

---