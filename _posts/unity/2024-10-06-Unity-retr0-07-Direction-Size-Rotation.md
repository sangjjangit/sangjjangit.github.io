---
layout: post
title: "[Unity] 방향,크기,회전"
date: 2024-10-06 20:54:00 +0900 
categories: Unity
book: 레트로의 유니티 게임 프로그래밍 에센스
tag: retr0
excerpt: "벡터 수학, 유니티 C# 벡터, 쿼터니언"
---

### 벡터 수학
- 대부분 2D 벡터(x,y) 기준으로 설명
- 원소 수와 상관없이 벡터의 성질은 동일하기 때문에 3D 벡터(x,y,z),4D 벡터(x,y,z,w)에도 완전히 똑같은 수식이 적용된다.

1. 벡터 정의
- 물리학자, 공학자, 게임 개발자, 데이터를 다루는 프로그래머, 수학자 등 관점이 다르다.
- (10,5,0) 오른쪽 10, 위쪽 5만큼 이동일수도, 나열된 숫자의 데이터, 벡터 연산을 만족하는 정해진 개수의 원소 등.
- 게임 개발에서의 벡터는 주로 위치, 방향, 속도를 나타내는 데 사용된다.
- 유니티는 3D벡터를 나타내는 Vector3를 3D공간에서의 x,y,z 좌표를 표현한다.

2. 상대좌표/절대좌표
- 상대좌표 : (내가 어디 있는지 모르겠지만) 현재 좌표에서 (1,1)만큼 더 가는 좌표
- 절대좌표 : 나의 좌표가 (1,1)이다.
- 절대적인 좌표와 상대적인 방향과 크기(길이)를 나타낸다.

3. 크기, 스칼라 곱
- 벡터의 크기
  - (-3,4) 벡터의 크기는 5 이다. (피타고라스 정리), 모든 원소를 제곱해서 더한 값의 제곱근.
  - (-3,4) 크기는 5, (-6,8) 크기는 10
  - (-6,8) 크기는 (-3,4)의 2배수이다.
  - 벡터에서는 배수를 취하는 숫자를 곱할 수 있으며 이것을 스칼라 곱이라고 한다.
  - 스칼라 값은 기존 벡터를 잡아 늘리거나 줄이는 배율이다.
  - 벡터의 방향은 변경할 수 없다.
- 벡터의 방향
  - 방향벡터는 크기가 1인 벡터로, 정규화된 벡터(Normalized Vector)라 부른다.
  - 크기가 1이므로 방향은 같지만 크기가 서로 다른 벡터를 비교하는 기준으로 삼는다.
  - (3,-3)을 정규화해서 얻은 방향벡터는 대략 (0.71, -0.71)이다.
  - 벡터는 방향과 크기를 동시에 표현, '방향벡터 x 스칼라 곱'으로 표현
  - 방향벡터는 크기를 1로 늘리거나 줄여서 정규화를 통해서 얻을 수 있다.
- 벡터의 덧셈, 뺄셈, 내적, 외적
  - 덧셈: 두 벡터의 같은 자리의 성분끼리 덧셈
  - 뺄셈: 두 벡터의 같은 자리의 성분끼리 뺄셈
  - 내적: 어떤 벡터B를 다른 벡터 A로 투영?, 벡터B에 벡터A의 크기를 곱
  - 덧셈: 두 벡터를 모두 수직으로 통과하는 벡터를 구하는 연산, 벡터A를 벡터B로 외적표현은 A x B

### 유니티 C# 벡터
- Vector 타입
  - new Vector2(x,y);
  - new Vector3(x,y,z);
  - new Vector4(x,y,z,w);

```c#
// 스칼라 곱
Vector3 a = new Vector3(3,6,9);
a = a * 10; // a = (30,60,90)

// 덧셈, 뺄셈
Vector3 a = new Vector3(2,4,8);
Vector3 b = new Vector3(3,6,9);
Vector3 c = a + b; // c = (5,10,17)
Vector3 d = a - b; // c = (-1,-2,-1)

// 벡터 정규화(방향벡터)
Vector3 a = new Vector3(3,3,3);
Vector3 b = a.normalized; // b = (0.6,0.6,0.6)

// 벡터의 크기
Vector3 a = new Vector3(3,3,3);
Vector3 b = a.magnitude; // b = 대략 5.19..

// 벡터의 내적
Vector3 a = new Vector3(0,1,0); // 위로 향하는 벡터
Vector3 b = new Vector3(1,0,0); // 오른쪽으로 향하는 벡터
float c = Vector3.Dot(a, b); // 수직인 벡터끼리 내적하면 결과는 0

// 벡터의 외적
Vector3 a = new Vector3(0,0,1); // 앞으로 향하는 벡터
Vector3 b = new Vector3(1,0,0); // 오른쪽으로 향하는 벡터
float c = Vector3.Cross(a, b); // c = (0,1,0)

// 벡터 응용
// currentPos : 현재위치
// destPos : 목적지
Vector3 currentPos = new Vector3(1,0,1); // 현재위치
Vector3 destPos = new Vector3(5,3,5); // 목적지

Vector3 delta = destPos - currentPos;

float distance = delta.magnitude; // 거리(크기)

// 내장함수 Distance();
float distance = Vector3.Distance(currentPos, destPos);

Vector3 direction = (destPos - currentPos).normalized; // 방향벡터
Vector3 newPos = currentPos + direction * 10; //10만큼 위치한 새로운 위치
```
### 쿼터니언
- 회전을 나타내는 타입이다.
- 인스펙터(Inspector) 창의 트랜스폼(Transform) 컴포넌트
  - Position, Scale 은 Vector3 이다.
  - Rotation 은 Vector3 가 아닌 Quaternion 이다.
  - Rotation 은 Vector3 일 경우, 짐벌락(Gimbal Lock) 현상.
  
```c#
transform.position = new Vector3(0,0,10);
transform.localScale = new Vector3(1,1,1);

Quaternion rotation = Quaternion.Euler(new Vector3(0,60,0));
Vector3 eulerRotation = rotation.enlerAngles; // (0,60,0)

// (30,0,0) 화전 후 (0,60,0) 더 회전하기
// (30,60,0) 회전하는 것과 다르다.
Quaternion a = Quaternion.Euler(new Vector3(30,0,0));
Quaternion b = Quaternion.Euler(new Vector3(0,60,0));

Quaternion rotation = a * b; // a회전 후 b 회전 표현
```

---