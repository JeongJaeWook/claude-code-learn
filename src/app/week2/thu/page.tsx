
import React from 'react';
import LessonLayout from '../../../components/LessonLayout';
import { getLessonBySlug } from '../../../data/curriculum';

export default function Page() {
  const lesson = getLessonBySlug('/week2/thu');
  if (!lesson) return <div>Lesson not found</div>;

  return (
    <LessonLayout lesson={lesson}>
      

  <section id="intro">
    <h2>1. 클로드 코드의 내장 도구 이해하기</h2>
    <p>
      클로드 코드가 단순한 "챗봇"과 다른 이유는 실제로 행동할 수 있기 때문입니다. 파일을 읽고, 코드를 실행하고, 웹을 검색하는 내장 도구들이 있습니다. 이 도구들을 이해하면 클로드 코드를 훨씬 효과적으로 사용할 수 있습니다.
    </p>
    <p>
      클로드 코드는 작업을 수행하기 위해 도구를 선택하고 호출합니다. <code>{`/verbose`}</code> 모드에서는 어떤 도구가 어떤 순서로 사용되는지 볼 수 있습니다.
    </p>
  </section>

  <section id="filesystem">
    <h2>2. 파일 시스템 도구</h2>
    <p>가장 자주 사용되는 핵심 도구들입니다.</p>

    <h3>Read — 파일 읽기</h3>
    <p>특정 파일의 내용을 읽습니다. 전체 파일 또는 특정 줄 범위만 읽을 수 있습니다.</p>
    <pre><code>{`&gt; @src/main.py 이 파일에서 메인 함수를 찾아줘`}</code></pre>

    <h3>Write — 파일 쓰기</h3>
    <p>파일을 생성하거나 전체 내용을 덮어씁니다. 새 파일을 만들 때 주로 사용됩니다.</p>

    <h3>Edit — 파일 수정</h3>
    <p>기존 파일의 특정 부분만 정밀하게 수정합니다. 전체 파일을 다시 쓰는 것보다 안전하고 정확합니다. 클로드 코드가 코드를 변경할 때 가장 많이 사용하는 도구입니다.</p>

    <h3>Glob — 파일 패턴 검색</h3>
    <p>패턴으로 파일을 찾습니다.</p>
    <pre><code>{`&gt; 프로젝트에서 모든 테스트 파일을 찾아줘 (test_*.py 패턴)`}</code></pre>

    <h3>Grep — 내용 검색</h3>
    <p>파일 내용에서 특정 텍스트나 패턴을 검색합니다.</p>
    <pre><code>{`&gt; 프로젝트 전체에서 "TODO" 주석이 있는 파일과 줄 번호를 모두 찾아줘`}</code></pre>
  </section>

  <section id="exec">
    <h2>3. 시스템 실행 도구</h2>

    <h3>Bash — 셸 명령어 실행</h3>
    <p>터미널 명령어를 직접 실행하는 가장 강력한 도구입니다. 클로드 코드는 이를 통해 테스트를 실행하고, git 명령어를 쓰고, 빌드를 돌립니다.</p>
    <pre><code>{`&gt; 테스트를 실행하고 실패한 테스트를 고쳐줘`}</code></pre>
    <p>클로드 코드가 내부적으로 <code>{`pytest`}</code>를 실행하고, 결과를 보고, 실패한 부분을 수정합니다.</p>

    <blockquote>
      클로드 코드가 실행하는 명령어가 위험해 보이면 <strong>거절(Deny)</strong>하세요. 파일 삭제, 시스템 변경 등은 반드시 내용을 확인한 뒤 승인합니다.
    </blockquote>
  </section>

  <section id="web">
    <h2>4. 웹 리소스 도구</h2>

    <h3>WebFetch — 웹 페이지 가져오기</h3>
    <p>특정 URL의 내용을 가져옵니다. 공식 문서를 참조하거나, API 스펙을 확인할 때 사용합니다.</p>
    <pre><code>{`&gt; https://fastapi.tiangolo.com/tutorial/dependencies/ 문서를 참고해서
  우리 프로젝트에 의존성 주입 패턴을 적용해줘`}</code></pre>

    <h3>WebSearch — 웹 검색</h3>
    <p>검색 엔진을 통해 최신 정보를 찾습니다. 클로드 코드의 학습 데이터에 없는 최신 라이브러리나 API를 사용할 때 유용합니다.</p>
    <pre><code>{`&gt; Astro 4.0에서 추가된 새로운 기능들을 검색해서 우리 프로젝트에 적용할 수 있는 게 있으면 알려줘`}</code></pre>
  </section>

  <section id="task">
    <h2>5. 작업 관리 도구</h2>

    <h3>TodoWrite / TodoRead — 할 일 관리</h3>
    <p>클로드 코드는 복잡한 작업을 수행할 때 내부적으로 할 일 목록을 만들어 관리합니다. 이를 통해 긴 작업도 놓치는 것 없이 체계적으로 처리합니다.</p>
    <pre><code>{`&gt; 인증 시스템을 JWT에서 세션 기반으로 마이그레이션해줘.
  변경이 필요한 모든 파일 목록을 먼저 작성하고, 순서대로 처리해줘.`}</code></pre>

    <h3>Agent — 서브에이전트 실행</h3>
    <p>복잡한 작업을 별도 컨텍스트에서 처리합니다. 탐색 결과가 메인 대화를 오염시키지 않습니다.</p>
    <pre><code>{`&gt; 서브에이전트를 사용해서 이 프로젝트의 인증 흐름을 분석해줘`}</code></pre>
    <p>내장 서브에이전트:</p>
    <ul>
      <li><strong>Explore</strong>: 읽기 전용 파일 탐색 전문가</li>
      <li><strong>Plan</strong>: 구현 전략 수립 전문가</li>
      <li><strong>general-purpose</strong>: 모든 도구 사용 가능한 범용 에이전트</li>
    </ul>

    <h3>AskUserQuestion — 사용자 질문</h3>
    <p>클로드 코드가 판단하기 어려운 결정이 필요할 때 선택지를 제시합니다.</p>
  </section>

  <section id="combo">
    <h2>6. 내장 도구 조합 패턴</h2>
    <p>실제 작업에서는 여러 도구가 자동으로 조합되어 사용됩니다. <code>{`/verbose`}</code> 모드로 어떤 도구가 어떤 순서로 호출되는지 관찰해보세요.</p>

    <h3>버그 수정 패턴</h3>
    <pre><code>{`Grep로 에러 발생 위치 찾기
  → Read로 해당 파일 읽기
  → Edit로 수정
  → Bash로 테스트 실행
  → 실패 시 반복`}</code></pre>

    <h3>새 기능 개발 패턴</h3>
    <pre><code>{`WebSearch로 모범 사례 검색
  → Read로 관련 기존 코드 파악
  → Write/Edit로 새 코드 작성
  → Bash로 테스트 실행 및 검증`}</code></pre>
  </section>

  <section id="terminal">
    <h2>7. 터미널 도구 활용</h2>

    <h3>! 접두사로 직접 실행</h3>
    <p>클로드 코드에게 도구를 사용하게 하는 것이 아니라, 여러분이 직접 명령어를 실행하고 결과를 컨텍스트에 포함시킬 수 있습니다.</p>
    <pre><code>{`&gt; ! npm test 2>&1 | tail -30
  실패한 테스트들을 모두 고쳐줘`}</code></pre>

    <h3>결과를 파이프로 넘기기</h3>
    <pre><code>{`# 빌드 에러를 클로드에게 분석시키기
npm run build 2>&1 | claude -p "이 빌드 에러를 분석하고 해결 방법을 알려줘"`}</code></pre>
  </section>

  <section id="best-practice">
    <h2>8. 도구 활용 베스트 프랙티스</h2>

    <h3>권한 요청에 신중하게 응답하기</h3>
    <p>클로드 코드가 Bash 명령어 실행을 요청할 때, 명령어 내용을 반드시 읽어보세요. 특히:</p>
    <ul>
      <li><code>{`rm -rf`}</code> 포함 여부</li>
      <li>환경 변수나 시스템 설정 변경</li>
      <li>외부 네트워크 요청 (curl, wget)</li>
    </ul>

    <h3>작은 단계로 진행하기</h3>
    <p>큰 변경은 한 번에 승인하기보다 작은 단계로 나눠서 진행하면 실수를 줄일 수 있습니다.</p>

    <h3>git commit을 자주 하기</h3>
    <p>클로드 코드와 작업하는 중간중간에 git commit을 해두면, 잘못된 방향으로 갔을 때 쉽게 되돌릴 수 있습니다.</p>
    <pre><code>{`&gt; 지금까지 변경한 내용을 git commit 해줘`}</code></pre>
  </section>


    </LessonLayout>
  );
}
