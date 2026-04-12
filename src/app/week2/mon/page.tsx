
import React from 'react';
import LessonLayout from '../../../components/LessonLayout';
import { getLessonBySlug } from '../../../data/curriculum';

export default function Page() {
  const lesson = getLessonBySlug('/week2/mon');
  if (!lesson) return <div>Lesson not found</div>;

  return (
    <LessonLayout lesson={lesson}>
      

  <section id="intro">
    <h2>1. CLAUDE.md</h2>
    <p>
      <code>{`CLAUDE.md`}</code>는 클로드 코드에게 "이 프로젝트에서 일하는 방법"을 알려주는 특별한 파일입니다. 클로드 코드는 세션을 시작할 때 자동으로 이 파일을 읽고, 내용을 대화의 맥락으로 사용합니다.
    </p>
    <p>쉽게 말하면, 새로 합류한 개발자에게 건네는 <strong>온보딩 문서</strong>와 같습니다. 단, 그 개발자가 AI라는 차이가 있을 뿐입니다.</p>

    <h3>왜 CLAUDE.md가 필요한가?</h3>
    <p>클로드 코드는 대화가 끝나면 이전 맥락을 기억하지 못합니다. 매번 "이 프로젝트는 Python 3.11을 써", "커밋 메시지는 한국어로 써"를 반복해서 설명하는 것은 비효율적입니다. <code>{`CLAUDE.md`}</code>에 한 번 써두면 모든 세션에서 자동으로 적용됩니다.</p>

    <h3>파일 위치와 적용 범위</h3>
    <ul>
      <li><strong>홈 디렉터리</strong> (<code>{`~/.claude/CLAUDE.md`}</code>): 모든 프로젝트에 공통으로 적용. 개인적인 선호도(언어, 응답 스타일).</li>
      <li><strong>프로젝트 루트</strong> (<code>{`./CLAUDE.md`}</code>): 해당 프로젝트에만 적용. <strong>git에 커밋해서 팀 전체가 공유</strong>.</li>
      <li><strong>프로젝트 로컬</strong> (<code>{`./CLAUDE.local.md`}</code>): 개인 프로젝트 설정. <code>{`.gitignore`}</code>에 추가해서 공유하지 않음.</li>
      <li><strong>부모 디렉터리</strong>: 모노레포에서 <code>{`root/CLAUDE.md`}</code>와 <code>{`root/packages/app/CLAUDE.md`}</code> 둘 다 자동 적용.</li>
      <li><strong>하위 디렉터리</strong>: 해당 디렉터리의 파일을 작업할 때 필요에 따라 자동 로드.</li>
    </ul>

    <h3>CLAUDE.md에서 다른 파일 가져오기</h3>
    <p><code>{`@경로`}</code> 문법으로 외부 파일을 참조할 수 있습니다:</p>
    <pre><code>{`# CLAUDE.md
프로젝트 개요는 @README.md를 참고.
사용 가능한 npm 명령어는 @package.json 참고.

# 추가 지침
- Git 워크플로: @docs/git-instructions.md
- 개인 설정: @~/.claude/my-project-instructions.md`}</code></pre>
  </section>

  <section id="init">
    <h2>2. /init 명령어로 시작하기</h2>
    <p>새 프로젝트에 클로드 코드를 처음 사용할 때, <code>{`/init`}</code> 명령어 하나로 <code>{`CLAUDE.md`}</code>를 자동 생성할 수 있습니다.</p>
    <pre><code>{`cd 내-프로젝트/
claude
&gt; /init`}</code></pre>
    <p>클로드 코드가 프로젝트를 분석하고 초안을 만들어줍니다. 이 초안을 검토하고 필요한 부분을 수정하면 됩니다.</p>
    <p>자동 생성된 내용에는 보통 다음이 포함됩니다:</p>
    <ul>
      <li>빌드/테스트/린트 명령어</li>
      <li>프로젝트 아키텍처 개요</li>
      <li>주요 파일 경로</li>
    </ul>
  </section>

  <section id="practice">
    <h2>3. 실제 프로젝트로 실습하기</h2>
    <p>지금 이 학습 사이트 프로젝트로 실습해봅시다:</p>
    <pre><code>{`cd ~/Desktop/claude-code-learn
claude
&gt; /init`}</code></pre>
    <p>생성된 <code>{`CLAUDE.md`}</code>를 열어보면 Astro, Bun, TypeScript 관련 정보가 자동으로 들어가 있을 것입니다.</p>
    <blockquote>
      이 사이트의 루트에는 이미 <code>{`CLAUDE.md`}</code>가 있습니다. <code>{`/init`}</code>을 실행하면 기존 파일을 기반으로 개선안을 제안해줍니다.
    </blockquote>
  </section>

  <section id="customize">
    <h2>4. CLAUDE.md 커스터마이징</h2>
    <p>자동 생성 결과를 나만의 규칙으로 채워 넣는 것이 핵심입니다. 아래는 실제로 유용한 항목들입니다:</p>

    <h3>기본 템플릿</h3>
    <pre><code>{`# CLAUDE.md

## 프로젝트 개요
이 프로젝트는 [설명]입니다.

## 기술 스택
- 언어: Python 3.11
- 프레임워크: FastAPI
- 데이터베이스: PostgreSQL 15

## 개발 명령어
\`\`\`bash
# 개발 서버 실행
uvicorn main:app --reload

# 테스트 실행
pytest tests/ -v

# 린트
ruff check . && mypy .
\`\`\`

## 코딩 컨벤션
- 함수명은 snake_case
- 클래스명은 PascalCase
- 타입 힌트 필수
- docstring은 Google 스타일

## 커밋 규칙
- feat: 새 기능
- fix: 버그 수정
- docs: 문서 변경

## 절대 하지 말 것
- .env 파일 절대 수정하지 말 것
- main 브랜치에 직접 커밋 금지`}</code></pre>
  </section>

  <section id="strategy">
    <h2>5. CLAUDE.md 활용 전략</h2>

    <h3>전역 설정과 프로젝트 설정 분리</h3>
    <p><code>{`~/.claude/CLAUDE.md`}</code>에는 개인적인 선호도를 담습니다:</p>
    <pre><code>{`## 내 작업 스타일
- 답변은 한국어로 해줘
- 코드 변경 시 이유를 설명해줘
- 변경하기 전에 영향 범위를 먼저 알려줘
- 테스트 코드도 항상 같이 작성해줘`}</code></pre>

    <h3>팀과 공유하기</h3>
    <p>프로젝트 루트의 <code>{`CLAUDE.md`}</code>는 git에 커밋해서 팀원 모두가 공유합니다. 팀 전체가 동일한 컨벤션으로 클로드 코드를 쓸 수 있게 됩니다.</p>

    <h3>동적으로 업데이트하기</h3>
    <pre><code>{`&gt; 우리가 오늘 결정한 것들을 CLAUDE.md에 추가해줘:
  - API 응답 형식은 항상 JSON
  - 에러 처리는 전역 미들웨어에서 담당`}</code></pre>
  </section>

  <section id="tips">
    <h2>6. 문제 해결 및 팁</h2>

    <h3>포함할 것 vs 제외할 것</h3>
    <p>CLAUDE.md는 코드와 같습니다. 정기적으로 리뷰하고, 불필요한 내용은 과감히 삭제하세요.</p>
    <pre><code>{`# 포함해야 할 것
- 클로드가 추론할 수 없는 Bash 명령어 (빌드, 테스트, 린트)
- 기본값과 다른 코드 스타일 규칙
- 프로젝트 고유의 아키텍처 결정
- 브랜치 명명, PR 규칙 같은 워크플로 규칙
- 개발 환경의 비직관적인 설정

# 제외해야 할 것
- 클로드가 코드를 읽으면 알 수 있는 정보
- 표준 언어 규칙 (클로드가 이미 잘 알고 있음)
- 자주 변경되는 정보
- 긴 설명이나 튜토리얼 (링크로 대체)
- "깨끗한 코드를 작성하라" 같은 자명한 지시`}</code></pre>

    <h3>CLAUDE.md가 너무 길면?</h3>
    <p>CLAUDE.md가 길면 중요한 규칙이 묻혀서 무시됩니다. 각 줄에 대해 "이 규칙을 제거하면 클로드가 실수할까?"라고 자문하세요. 아니라면 삭제하세요.</p>
    <blockquote>
      <strong>핵심:</strong> 특정 규칙을 지속적으로 무시한다면, 파일이 너무 길어서 규칙이 묻히는 것일 수 있습니다.
      중요한 규칙에 "IMPORTANT" 또는 "반드시"를 붙이면 준수율이 올라갑니다.
    </blockquote>

    <h3>CLAUDE.md가 적용되지 않는 것 같다면?</h3>
    <pre><code>{`&gt; CLAUDE.md 파일을 읽고 현재 적용된 규칙을 요약해줘`}</code></pre>

    <h3>Skills로 분리하기</h3>
    <p>모든 대화에 필요하지 않은 전문 지식은 <code>{`CLAUDE.md`}</code> 대신 <strong>Skills</strong>로 분리하세요. Skills는 관련 작업을 할 때만 필요에 따라 로드되므로, 매 세션의 컨텍스트를 가볍게 유지할 수 있습니다.</p>
    <pre><code>{`# .claude/skills/api-conventions/SKILL.md
---
name: api-conventions
description: REST API 설계 규칙
---
# API 규칙
- URL 경로는 kebab-case
- JSON 속성은 camelCase
- 목록 엔드포인트는 항상 페이지네이션 포함`}</code></pre>
  </section>


    </LessonLayout>
  );
}
